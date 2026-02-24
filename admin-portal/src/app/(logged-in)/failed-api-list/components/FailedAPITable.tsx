/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { formatDateWithTime } from "@/utils/date";
import Table from "@/components/ui/table";
import ActionBtn from "@/components/buttons/ActionBtn";
import Modal from "../../components/Modal";
import { FailedAPI } from "../types/FailedAPITypes";
import { useLocalStorage } from "@/hooks/useLocalStorage";

/* =========================
   Helper functions
========================= */

const methodBadgeClass = (method?: string) => {
  switch (method?.toUpperCase()) {
    case "GET":
      return "bg-green-100 text-green-700";
    case "POST":
      return "bg-blue-100 text-blue-700";
    case "PUT":
      return "bg-yellow-100 text-yellow-700";
    case "PATCH":
      return "bg-purple-100 text-purple-700";
    case "DELETE":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const statusBadgeClass = (isFailed?: boolean) => {
  return isFailed
    ? "bg-red-100 text-red-700"
    : "bg-green-100 text-green-700";
};

const formatStatusText = (isFailed?: boolean) => {
  return isFailed ? "Failed" : "Success";
};

function formatText(str: string) {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/* =========================
   Component
========================= */

interface FailedAPITableProps {
  apis: FailedAPI[];
  retryLoading: boolean;
  handleRetry: (applicationId: number, failedApiId: number) => void;
}

const FailedAPITable = ({
  apis,
  retryLoading,
  handleRetry,
}: FailedAPITableProps) => {
  const [requestPayload, setRequestPayload] = useState<any>({});
  const [response, setResponse] = useState<any>({});
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const info = useLocalStorage("info");

  const ALLOWED_APIS = [
    "signature_creation_ababil",
    "do_signature_add_finacle",
    "open_saving_banking_account",
    "customer_info_update_ababil",
    "casa_account_opening",
    "cbs_customer_creation",
    "open_current_account",
    "individual_customer_creation",
    "update_cbs_customer",
    "update_saving_account",
    "update_current_account",
    "send_sms",
  ];

  const columns = [
    { title: "ID", key: "id" as keyof FailedAPI },
    { title: "Transaction ID", key: "trans_id" as keyof FailedAPI },
    { title: "Application ID", key: "application_id" as keyof FailedAPI },
    { title: "API Name", key: "api_name" as keyof FailedAPI },

    {
      title: "Method",
      key: "method" as keyof FailedAPI,
      render: (_: any, api: FailedAPI) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${methodBadgeClass(
            api.method,
          )}`}
        >
          {api.method}
        </span>
      ),
    },

    { title: "URL", key: "url" as keyof FailedAPI },

    {
      title: "API Status",
      key: "is_failed" as keyof FailedAPI,
      render: (_: any, api: FailedAPI) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${statusBadgeClass(
            api.is_failed,
          )}`}
        >
          {formatStatusText(api.is_failed)}
        </span>
      ),
    },

    { title: "Created At", key: "created_at" as keyof FailedAPI },
    { title: "Updated At", key: "updated_at" as keyof FailedAPI },

    {
      title: "Actions",
      key: "actions" as keyof FailedAPI,
      render: (_: any, api: FailedAPI) => (
        <div className="flex justify-start items-center gap-2">
          <ActionBtn
            type="view"
            onClick={() => {
              setRequestPayload(api.request_payload);
              setResponse(api.response);
              setOpenViewModal(true);
            }}
          />

          {info?.permissions?.can_retry_failed_api_list &&
          ALLOWED_APIS.includes(api.api_name) &&
          api.is_failed ? (
            <ActionBtn
              type="retry"
              isLoading={selectedId === api.id && retryLoading}
              disabled={selectedId === api.id && retryLoading}
              onClick={() => {
                setSelectedId(api.id);
                handleRetry(api.application_id, api.id);
              }}
            />
          ) : null}
        </div>
      ),
    },
  ];

  const failedAPIList = (apis ?? []).map((item) => ({
    ...item,
    api_name: formatText(item.api_name),
    created_at: formatDateWithTime(item.created_at),
    updated_at: formatDateWithTime(item.updated_at),
  }));

  return (
    <>
      <Table columns={columns} dataSource={failedAPIList} />

      {openViewModal && (
        <Modal
          title="API Request & Response"
          closeModal={() => setOpenViewModal(false)}
        >
          <div className="space-y-4 h-125 overflow-y-auto pr-3">
            <div>
              <h3 className="font-semibold mb-2">Request Payload</h3>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                {JSON.stringify(requestPayload, null, 2)}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Response</h3>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default FailedAPITable;
