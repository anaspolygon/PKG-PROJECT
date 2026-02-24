/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import clsx from "clsx";
import { formatDateWithTime } from "@/utils/date";
import { Branch } from "../types/BranchTypes";
import {
  BankType,
  BankTypeBgColors,
  BankTypeTextColors,
} from "@/constants/enums-with-colors";
import { LabelValue } from "../../components/form/FormSelect";
import ActionBtn from "@/components/buttons/ActionBtn";
import Table from "@/components/ui/table";
import { useLocalStorage } from "@/hooks/useLocalStorage";
interface BranchTableProps {
  data: Branch[];
  divisions: LabelValue[];
  districts: LabelValue[];
  thanas: LabelValue[];
  postal_codes: LabelValue[];
  openModal: () => void;
  setSelectedItem: (item: Branch) => void;
  setSelectedItemId: (id: number) => void;
  handleDelete: (id: number) => void;
}

const BranchTable = ({
  data,
  divisions,
  districts,
  thanas,
  postal_codes,
  openModal,
  setSelectedItem,
  setSelectedItemId,
  handleDelete,
}: BranchTableProps) => {
  const info = useLocalStorage("info");
  const get_division = (value: string) => {
    return (
      divisions.find((item: LabelValue) => item.value === value)?.label ?? "N/A"
    );
  };

  const get_district = (value: string) => {
    return (
      districts.find((item: LabelValue) => item.value === value)?.label ?? "N/A"
    );
  };

  const get_thana = (value: string) => {
    return (
      thanas.find((item: LabelValue) => item.value === value)?.label ?? "N/A"
    );
  };

  const get_postal_code = (value: string) => {
    return (
      postal_codes.find((item: LabelValue) => item.value === value)?.label ??
      "N/A"
    );
  };

  const columns = [
    {
      title: "Branch Name",
      key: "branch_name" as keyof Branch,
    },
    {
      title: "Branch Code",
      key: "branch_code" as keyof Branch,
    },
    {
      title: "Window Branch Code",
      key: "window_branch_code" as keyof Branch,
    },
    {
      title: "Division",
      key: "division" as keyof Branch,
      render: (_: any, record: Branch) => get_division(record.division),
    },
    {
      title: "District",
      key: "district" as keyof Branch,
      render: (_: any, record: Branch) => get_district(record.district),
    },
    {
      title: "Thana",
      key: "thana" as keyof Branch,
      render: (_: any, record: Branch) => get_thana(record.thana),
    },
    {
      title: "Postal Code",
      key: "postal_code" as keyof Branch,
      render: (_: any, record: Branch) => get_postal_code(record.postal_code),
    },
    {
      title: "Banking System",
      key: "banking_type" as keyof Branch,
      render: (_: any, record: Branch) => (
        <span
          className={clsx(
            "px-2 py-1 rounded-md text-xs  font-medium capitalize",
            BankTypeBgColors[record.banking_type.toLowerCase() as BankType],
            BankTypeTextColors[record.banking_type.toLowerCase() as BankType]
          )}
        >
          {record.banking_type ?? "N/A"}
        </span>
      ),
    },
    {
      title: "Created At",
      key: "created_at" as keyof Branch,
      render: (value: any) => formatDateWithTime(value),
    },
    {
      title: "Updated At",
      key: "updated_at" as keyof Branch,
      render: (value: any) => formatDateWithTime(value),
    },
    ...(info &&
    (info?.permissions.can_update_branch || info?.permissions.can_delete_branch)
      ? [
          {
            title: "Actions",
            key: "id" as keyof Branch,
            render: (_: any, branch: Branch) => (
              <div className="flex justify-start items-center gap-4">
                {info && info?.permissions.can_update_branch ? (
                  <ActionBtn
                    onClick={() => {
                      openModal();
                      setSelectedItem(branch);
                      setSelectedItemId(branch.id);
                    }}
                    type="edit"
                  />
                ) : null}

                {info && info?.permissions.can_delete_branch ? (
                  <ActionBtn
                    onClick={() => handleDelete(branch.id)}
                    type="delete"
                  />
                ) : null}
              </div>
            ),
          },
        ]
      : []),
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default BranchTable;
