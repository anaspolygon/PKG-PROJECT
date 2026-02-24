/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { AuditLog } from "../types/AuditTypes";
import ActionBtn from "@/components/buttons/ActionBtn";
import Table from "@/components/ui/table";
import LogsModal from "../../maker-checker/components/LogsModal";
import { useAddress } from "@/hooks/useAddress";
interface AuditLogsTableProps {
  data: AuditLog[];
}

const AuditLogsTable = ({ data }: AuditLogsTableProps) => {
  const [openLogs, setOpenLogs] = useState(false);
  const [label, setLabel] = useState("");
  const [logs, setLogs] = useState<[] | Record<string, any> | null>(null);

  const { divisions, districts, thanas, postal_codes } = useAddress();

  const handleLabel = (value: string) => {
    setLabel(value);
  };

  const columns = [
    { title: "ID", key: "id" as keyof AuditLog },
    { title: "Employee ID", key: "performed_by" as keyof AuditLog },
    { title: "Audited Section", key: "audited_section" as keyof AuditLog },
    { title: "IP Address", key: "ip_address" as keyof AuditLog },
    { title: "Created At", key: "created_at" as keyof AuditLog },
    {
      title: "Full Logs",
      key: "id" as keyof AuditLog,
      render: (_: any, record: AuditLog) => (
        <div className="flex items-start">
          <ActionBtn
            type="view"
            onClick={() => {
              setOpenLogs(true);
              handleLabel(`Full logs of ${record.audited_section}`);
              setLogs({
                action_type: "audit_logs",
                body:
                  record.field_slug === "cheque_book_delivery_branch"
                    ? record.changes
                    : record.new_values,
                old_data: record.old_values,
                time_ago: record.time_ago,
                ...(record.field_label
                  ? { field_label: record.field_label }
                  : {}),
                ...(record.id ? { id: record.id } : {}),
                ...(record.ip_address ? { ip_address: record.ip_address } : {}),
                ...(record.field_slug ? { field_slug: record.field_slug } : {}),
                ...(record.created_at ? { created_at: record.created_at } : {}),
                ...(record.performed_by
                  ? { performed_by: record.performed_by }
                  : {}),
              });
            }}
          />
        </div>
      ),
    },
  ];



  return (
    <>
      <Table columns={columns} dataSource={data} />
      {openLogs && logs && (
        <LogsModal
          label={label}
          divisions={divisions}
          districts={districts}
          thanas={thanas}
          postal_codes={postal_codes}
          logs={logs as any}
          closeModal={() => setOpenLogs(false)}
          isMakerChecker={false}
        />
      )}
    </>
  );
};

export default AuditLogsTable;
