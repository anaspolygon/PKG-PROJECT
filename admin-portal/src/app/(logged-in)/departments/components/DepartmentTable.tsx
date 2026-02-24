"use client";

import React, { useMemo, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useItemsStore } from "@/store/useUserstore";
import { UserLoginInfo } from "@/app/(guest)/auth/login/types/AdminLoginTypes";
import DepartmentUpdateFormModal from "./DepartmentUpdateFormModal";
import { Department } from "../types/DepartmentTypes";

interface DepartmentTableProps {
    departments: Department[];
  onDepartmentUpdated: () => void;
}

const DepartmentTable = ({ departments, onDepartmentUpdated }: DepartmentTableProps) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<Department | null>(null);

  const { items } = useItemsStore();
  const info: UserLoginInfo = items.info as UserLoginInfo ?? null;

  const handleEditClick = (branch: Department) => {
    setSelectedBranch(branch);
    setEditModalOpen(true);
  };

  const closeModal = () => {
    setEditModalOpen(false);
    setSelectedBranch(null);
  };

  const memoizedInitialData = useMemo(() => {
    if (!selectedBranch) return null;
    return {
      id: selectedBranch.id,
      label_en: selectedBranch.label_en,
      label_bn: selectedBranch.label_bn,
    };
  }, [selectedBranch]);

  const headings = [
    "Department Name (En)",
    "Department Name (Bn)",
  ];

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
            {info && info.can_update_branch && (
              <th className="px-4 py-4 text-left text-sm font-medium text-gray-500 capitalize">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr
              key={department.id}
              className="border-b border-gray-300 border-dashed hover:bg-gray-50"
            >
              <td className="px-4 py-4 text-sm text-gray-700">
                {department.label_en}
              </td>
              <td className="px-4 py-4 text-sm text-gray-700">
                {department.label_bn}
              </td>
              {info && info.can_update_branch && (
                <td className="px-4 py-4 text-sm text-gray-700">
                  <button
                    onClick={() => handleEditClick(department)}
                    className="text-indigo-500 hover:text-indigo-700 transform hover:scale-110 transition-all cursor-pointer duration-200"
                    title="Edit Department"
                  >
                    <FaEdit className="w-5 h-5 text-[#003970]" />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {editModalOpen && (
        <DepartmentUpdateFormModal
          isOpen={editModalOpen}
          onClose={closeModal}
          initialData={memoizedInitialData}
          onDepartmentUpdated={onDepartmentUpdated}
        />
      )}
    </div>
  );
};

export default DepartmentTable;