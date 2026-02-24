/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { FaEdit } from "react-icons/fa";
import { PercentageConfig } from "../types/Types";
import useUpdateConfig from "../hooks/useUpdateConfig";
import Table from "@/components/ui/table";
import { useLocalStorage } from "@/hooks/useLocalStorage";
interface ConfigProps {
  configs: PercentageConfig[];
}

const PercentageList = ({ configs }: ConfigProps) => {
  const { handleChange, handleUpdate, loading, editing } = useUpdateConfig();
  const info = useLocalStorage("info");

  const columns = [
    { title: "Parameter", key: "label" as keyof PercentageConfig },
    {
      title: "Percentage",
      key: "value" as keyof PercentageConfig,
      render: (_: any, record: PercentageConfig) => (
        <div className="flex items-center gap-2">
          <input
            type="number"
            max="100"
            min="0"
            value={editing[record.key] ?? record.value}
            onKeyDown={(e) => {
              if (e.key === "-" || e.key === "+") {
                e.preventDefault();
              }
            }}
            onChange={(e: any) => {
              const value = e.target.value;
              handleChange(record.key, Number(value));
            }}
            className="border border-gray-300 focus:outline-none focus:!border-[#003970] transform transition duration-200 hover:scale-105 hover:!border-[#a8b8c7] rounded-md px-2 py-1 w-20 text-sm text-center"
          />
          <span className="text-gray-600 text-sm">%</span>
        </div>
      ),
    },
    ...(info && info.permissions.can_percentage_update
      ? [
          {
            title: "Actions",
            key: "actions" as keyof PercentageConfig,
            render: (_: any, record: PercentageConfig) => {
              const disabled =
                !(record.key in editing) ||
                (record.key in editing &&
                  Number(editing[record.key]) === Number(record.value));
              return (
                <button
                  onClick={() =>
                    handleUpdate(
                      record.key,
                      editing[record.key] ?? record.value,
                      record.id,
                    )
                  }
                  className="flex items-center gap-1 text-primary transform hover:scale-110 disabled:scale-100 transition duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                  title="Update value"
                  disabled={loading[record.key] || disabled}
                >
                  <FaEdit className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm">
                    {loading[record.key] ? "Updating" : "Update"}
                  </span>
                </button>
              );
            },
          },
        ]
      : []),
  ];

  return (
    <div className="overflow-x-auto">
      <Table columns={columns} dataSource={configs} />
    </div>
  );
};

export default PercentageList;
