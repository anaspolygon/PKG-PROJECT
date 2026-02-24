/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  MakerCheckerStatus,
  MakerCheckerStatusBgColors,
  MakerCheckerStatusTextColors,
} from "@/constants/enums-with-colors";
import { useGlobalState } from "@/components/layouts/GlobalContext";
import { Logs, MakerCheckerItem } from "../types/CheckerMakerTypes";
import LogsModal from "./LogsModal";
import RejectionModal from "./MakerCheckerModal";
import ViewModal from "../../components/ViewModal";
import approveOrRejectAction from "../actions/approveOrRejectAction";
import ActionBtn from "@/components/buttons/ActionBtn";
import Table from "@/components/ui/table";
import { useAddress } from "@/hooks/useAddress";
import PrimaryBtn from "@/components/buttons/PrimaryBtn";
import { useLocalStorage } from "@/hooks/useLocalStorage";
interface CheckerMakerTableProps {
  data: MakerCheckerItem[];
  fetchCheckerMaker: () => void;
}

const MakerCheckerTable = ({
  data,
  fetchCheckerMaker,
}: CheckerMakerTableProps) => {
  const [openRejectionModal, setOpenRejectionModal] = useState(false);
  const [openLogsModal, setOpenLogsModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actionId, setActionId] = useState<number | null>(null);
  const [logs, setLogs] = useState<Logs | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string | null>(null);
  const [logLabel, setLogLabel] = useState<string | null>(null);
  const [actionStatus, setActionStatus] = useState<string | null>(null);
  const info = useLocalStorage("info");

  const { fetchPendingCount } = useGlobalState();
  const router = useRouter();
  const { divisions, districts, thanas, postal_codes } = useAddress();

  const status = useMemo(() => ["approved", "rejected", "remake"], []);

  const openModal = useCallback((item: MakerCheckerItem) => {
    setLogs({
      body: item.body,
      old_data: item.old_data,
      action_type: item.action_type,
      subject: item.subject_type,
    });
    setLogLabel(item.action_label);
    setOpenLogsModal(true);
  }, []);

  const closeLogsModal = () => setOpenLogsModal(false);
  const closeRejectionModal = () => setOpenRejectionModal(false);
  const closeViewModal = () => setOpenViewModal(false);

  const handleApproved = useCallback(
    async (actionId: number) => {
      setLoading(true);
      if (actionId) {
        const res = await approveOrRejectAction(actionId, "approve");
        if (res.success) {
          toast.success(res.message);
          fetchCheckerMaker();
          fetchPendingCount();
        } else {
          if (res.code === 401) {
            router.push("/auth/login");
          }
          toast.error(res.message);
        }
      }
      setLoading(false);
    },
    [fetchCheckerMaker, fetchPendingCount, router],
  );

  const columns = [
    {
      title: "Maker Employee ID",
      key: "action_maker" as keyof MakerCheckerItem,
      render: (value: any) => value ?? "Maker not assigned yet",
    },
    {
      title: "Checker Employee ID",
      key: "action_checker" as keyof MakerCheckerItem,
      render: (value: any) => value ?? "N/A",
    },
    {
      title: "Action Type",
      key: "action_label" as keyof MakerCheckerItem,
    },
    {
      title: "Status",
      key: "status" as keyof MakerCheckerItem,
      render: (_: any, row: MakerCheckerItem) => {
        const status = row.status.toLowerCase() as MakerCheckerStatus;
        return (
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium capitalize ${MakerCheckerStatusBgColors[status]} ${MakerCheckerStatusTextColors[status]}`}
          >
            {row.status}
          </span>
        );
      },
    },
    {
      title: "Rejection Reason",
      key: "rejection_reason" as keyof MakerCheckerItem,
      render: (_: any, row: MakerCheckerItem) =>
        row.rejection_reason ? (
          <ActionBtn
            type="view"
            onClick={() => {
              setOpenViewModal(true);
              setRejectionReason(row.rejection_reason!);
            }}
          />
        ) : (
          "N/A"
        ),
    },
    {
      title: "Actions",
      key: "id" as keyof MakerCheckerItem,
      render: (_: any, row: MakerCheckerItem) => (
        <div className="flex items-center gap-3">
          {row.status.toLowerCase() === "pending" &&
          info?.permissions?.can_approve_maker_checker ? (
            <>
              <PrimaryBtn
                variant="success"
                onClick={async () => {
                  setActionId(row.id);
                  await handleApproved(row.id);
                }}
                content="Approve"
                loadingAll={loading && actionId === row.id}
                disabled={
                  status.includes(row.status) ||
                  (loading && actionId === row.id)
                }
                loadingContent="Approving..."
              />
              <PrimaryBtn
                variant="danger"
                onClick={() => {
                  setActionId(row.id);
                  setOpenRejectionModal(true);
                }}
                content="Reject"
                loadingAll={false}
                disabled={
                  status.includes(row.status) ||
                  (loading && actionId === row.id)
                }
              />
            </>
          ) : null}
          <ActionBtn
            type="view"
            onClick={() => {
              setActionId(row.id);
              openModal(row);
              setActionStatus(row.status);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} />

      {openRejectionModal && (
        <RejectionModal
          actionId={actionId}
          closeModal={closeRejectionModal}
          fetchCheckerMaker={fetchCheckerMaker}
          modalType="reject"
        />
      )}

      {openLogsModal && logs && (
        <LogsModal
          label={logLabel}
          logs={logs}
          divisions={divisions}
          districts={districts}
          thanas={thanas}
          postal_codes={postal_codes}
          isMakerChecker={true}
          closeModal={closeLogsModal}
          actionId={actionId}
          setActionId={setActionId}
          handleApproved={handleApproved}
          loading={loading}
          setOpenRejectionModal={setOpenRejectionModal}
          closeLogsModal={closeLogsModal}
          actionStatus={actionStatus}
        />
      )}

      {openViewModal && (
        <ViewModal
          label="Rejection Reason"
          value={rejectionReason}
          onClose={closeViewModal}
        />
      )}
    </div>
  );
};

export default MakerCheckerTable;
