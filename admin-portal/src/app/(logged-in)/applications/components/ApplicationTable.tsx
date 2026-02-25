/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Link from "next/link";
import { Application } from "../types/ApplicationTypes";
import {
  getApplicationStatus,
  getBankingType,
} from "@/app/helpers/StringHelper";
import clsx from "clsx";
import {
  ApplicationStatus,
  ApplicationStatusBgColors,
  BankType,
  BankTypeBgColors,
  BankTypeTextColors,
  ApplicationStatusTextColors,
} from "@/constants/enums-with-colors";
import { formatDateWithTime } from "@/utils/date";
import { Tooltip } from "antd";
import { Eye } from "lucide-react";
import Table from "./table";
interface ApplicationTableProps {
  canDownloadPdf: boolean;
  data: Application[];
}

const ApplicationTable = ({ data }: ApplicationTableProps) => {
  const columns = [
    {
      title: "Display ID",
      key: "display_id" as keyof Application,
    },
    {
      title: "Account No.",
      key: "account_number" as keyof Application,
    },
    {
      title: "Name",
      key: "name" as keyof Application,
    },
    {
      title: "Mobile",
      key: "identifier" as keyof Application,
    },
    {
      title: "Gender",
      key: "gender" as keyof Application,
      render: (_: any, record: Application) =>
        record.gender
          ? record.gender.charAt(0).toUpperCase() + record.gender.slice(1)
          : "N/A",
    },
    {
      title: "Banking Type",
      key: "banking_type" as keyof Application,
      render: (_: any, record: Application) => (
        <span
          className={clsx(
            "px-2 py-1 rounded-md text-xs font-medium inline-block text-center",
            BankTypeBgColors[record.banking_type?.toLowerCase() as BankType],
            BankTypeTextColors[record.banking_type?.toLowerCase() as BankType],
          )}
        >
          {getBankingType(record.banking_type) ?? (
            <span className="text-gray-700 text-sm font-normal">N/A</span>
          )}
        </span>
      ),
    },
    {
      title: "Branch Code",
      key: "branch_code" as keyof Application,
    },
    {
      title: "Product Type",
      key: "product_type" as keyof Application,
      render: (_: any, record: Application) =>
        record.product_type
          ? record.product_type
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")
          : "N/A",
    },
    {
      title: "Application Status",
      key: "status" as keyof Application,
      render: (_: any, record: Application) => (
        <Tooltip placement="top" title={record.failed_reason}>
          <span
            className={clsx(
              "px-2 py-1 rounded-md text-xs font-medium inline-block text-center",
              ApplicationStatusBgColors[
                record.status.toLowerCase() as ApplicationStatus
              ],
              ApplicationStatusTextColors[
                record.status.toLowerCase() as ApplicationStatus
              ],
            )}
          >
            {getApplicationStatus(record.status)}
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Submitted At",
      key: "last_submission_at" as keyof Application,
      render: (value: any) => formatDateWithTime(value),
    },
    {
      title: "Actions",
      key: "id" as keyof Application,
      render: (_: any, record: Application) => {
        if (
          ["submitted", "cbs_failed", "in_progress"].includes(
            record.status.toLowerCase(),
          )
        ) {
          return (
            <div className="flex gap-3  items-center">
              <Link
                className="px-2 py-2 bg-purple-100 text-purple-500 hover:bg-purple-400 hover:text-white rounded-md shadow flex items-center cursor-pointer transition-all duration-300 ease-in-out"
                href={`/applications/${record.id}`}
              >
                <button
                  className="transform cursor-pointer"
                  title="Application Details"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </Link>
            </div>
          );
        }
        return null;
      },
    },
  ];
  return <Table columns={columns} dataSource={data} />;
};

export default ApplicationTable;
