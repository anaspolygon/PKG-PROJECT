"use client";

import React, { useMemo, useState } from "react";
import { FaEdit, FaToggleOff, FaToggleOn } from "react-icons/fa";
import clsx from "clsx";
import { Branch } from "../types/BranchTypes";
import { useItemsStore } from "@/store/useUserstore";
import BranchUpdateFormModal from "./BranchUpdateFormModal";
import { getActiveStatus } from "@/app/helpers/StringHelper";
import StatusChangeModal from "./StatusChangeModal";
import { UserLoginInfo } from "@/app/(guest)/auth/login/types/AdminLoginTypes";
import { BankType, BankTypeBgColors } from "@/constants/enums-with-colors";

interface BranchTableProps {
  branches: Branch[];
  onBranchUpdated: () => void;
}

const BranchTable = ({ branches, onBranchUpdated }: BranchTableProps) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  const { items } = useItemsStore();
  const preload = items.preload as Record<string, { v: string; l: string }[]>;
  const info: UserLoginInfo = items.info as UserLoginInfo ?? null;

  const getDistrictLabel = (key?: string, value?: string) => {
    if (key && value) {
      const obj = preload?.[key];
      if (Array.isArray(obj)) {
        const foundItem = obj.find((item) => item.v === value);
        return foundItem?.l;
      }
    }
    return value;
  };

  const handleEditClick = (user: Branch) => {
    setSelectedBranch(user);
    setEditModalOpen(true);
  };

  const closeModal = () => {
    setEditModalOpen(false);
    setStatusModalOpen(false);
    setSelectedBranch(null);
  };

  const memoizedInitialData = useMemo(() => {
    if (!selectedBranch) return null;
    return {
      id: selectedBranch.id,
      label_en: selectedBranch.label_en,
      label_bn: selectedBranch.label_bn,
      code: selectedBranch.code,
      is_islamic: selectedBranch.is_islamic
        ? "islamic"
        : selectedBranch.is_islamic === null
        ? ""
        : "conventional",
      is_onboarding: selectedBranch.is_onboarding,
      division: selectedBranch.division,
      district: selectedBranch.district,
    };
  }, [selectedBranch]);

  const handleToggleActive = (branch: Branch) => {
    setStatusModalOpen(true);
    setSelectedBranch(branch);
  };

  const headings = [
    "Branch Name (En)",
    "Branch Name (Bn)",
    "Code",
    "Type",
    "District",
    "Status",
  ];

  const getBranchType = (isIslamic: boolean) => {
    if (isIslamic) return "Islamic";
    return "Conventional";
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead className="text-gray-400">
          <tr>
            {headings.map((heading, index) => (
              <th
                key={index}
                className="px-4 py-4 text-left text-sm font-medium text-gray-500 capitalize"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {branches.map((branch) => (
            <tr
              key={branch.id}
              className="border-b border-gray-300 border-dashed hover:bg-gray-50"
            >
              <td className="px-4 py-4 text-sm text-gray-700">
                {branch.label_en}
              </td>
              <td className="px-4 py-4 text-sm text-gray-700">
                {branch.label_bn}
              </td>
              <td className="px-4 py-4 text-sm text-gray-700">{branch.code}</td>
              <td className="px-4 py-4 text-sm">
                <span
                  className={clsx(
                    "px-3 py-2 rounded-md text-xs  font-medium text-white",
                    BankTypeBgColors[
                      getBranchType(branch.is_islamic).toLowerCase() as BankType
                    ]
                  )}
                >
                  {getBranchType(branch.is_islamic)}
                </span>
              </td>
              <td className="px-4 py-4 text-sm text-gray-700">
                { branch && branch.district ? getDistrictLabel("districts", branch.district) : "N/A"}
              </td>
              <td className="px-4 py-4 text-sm text-gray-700">
                <span
                  className={clsx(
                    "px-3 py-2 rounded-md text-xs  font-medium text-white",

                    branch.is_active ? "bg-[#28A745]" : "bg-[#95A5A6]"
                  )}
                >
                  {getActiveStatus(branch.is_active)}
                </span>
              </td>
              {info && info.can_update_branch && (
                <td className="px-4 py-4 text-sm text-gray-700">
                  <div className="flex gap-3 items-center">
                    <button
                      onClick={() => handleEditClick(branch)}
                      className="text-indigo-500 hover:text-indigo-700 transform hover:scale-110 transition-all cursor-pointer duration-200"
                      title="Edit Branch"
                    >
                      <FaEdit className="w-5 h-5 text-[#003970]" />
                    </button>
                    <button
                      onClick={() => handleToggleActive(branch)}
                      className="transform hover:scale-110 transition-all cursor-pointer duration-200"
                      title={
                        branch.is_active
                          ? "Deactivate Branch"
                          : "Activate Branch"
                      }
                    >
                      {branch.is_active ? (
                        <FaToggleOn className="w-7 h-7  text-[#003970] hover:text-blue-900" />
                      ) : (
                        <FaToggleOff className="w-7 h-7 text-[#003970] fill-gray-400  hover:text-blue-900" />
                      )}
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {editModalOpen && (
        <BranchUpdateFormModal
          isOpen={editModalOpen}
          onClose={closeModal}
          initialData={memoizedInitialData}
          onBranchUpdated={onBranchUpdated}
        />
      )}

      {statusModalOpen && (
        <StatusChangeModal
          isOpen={statusModalOpen}
          onClose={closeModal}
          id={selectedBranch?.id}
          currentStatus={selectedBranch?.is_active}
          onUpdated={onBranchUpdated}
          term="branch"
        />
      )}
    </div>
  );
};

export default BranchTable;
