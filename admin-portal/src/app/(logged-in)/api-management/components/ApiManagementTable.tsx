/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { formatDateWithTime } from "@/utils/date";
import { API } from "../types/ApiTypes";
import ActionBtn from "@/components/buttons/ActionBtn";
import Table from "@/components/ui/table";
import { useLocalStorage } from "@/hooks/useLocalStorage";
interface ApiManagementTableProps {
  data: API[];
  openModal: () => void;
  setSelectedItem: (item: API) => void;
  setSelectedItemId: (id: number) => void;
}

const ApiManagementTable = ({
  data,
  openModal,
  setSelectedItem,
  setSelectedItemId,
}: ApiManagementTableProps) => {
  const info = useLocalStorage("info");
  const columns = [
    { title: "API Label", key: "label" as keyof API },
    { title: "URL", key: "url" as keyof API },
    { title: "Login ID", key: "login_id" as keyof API },
    { title: "Created At", key: "created_at" as keyof API },
    { title: "Updated At", key: "updated_at" as keyof API },
    ...(info && info?.permissions.can_update_api
      ? [
          {
            title: "Actions",
            key: "actions" as keyof API,
            render: (_: any, record: API) => (
              <div className="flex justify-start items-center">
                <ActionBtn
                  onClick={() => {
                    openModal();
                    setSelectedItem({
                      ...record,
                      login_id: record.login_id ?? "",
                    });
                    setSelectedItemId(record.id);
                  }}
                  type="edit"
                />
              </div>
            ),
          },
        ]
      : []),
  ];

  const apis = data.map((item) => ({
    ...item,
    created_at: formatDateWithTime(item.created_at),
    updated_at: formatDateWithTime(item.updated_at),
  }));


  return (
    <>
      <Table columns={columns} dataSource={apis} />
    </>
  );
};

export default ApiManagementTable;
