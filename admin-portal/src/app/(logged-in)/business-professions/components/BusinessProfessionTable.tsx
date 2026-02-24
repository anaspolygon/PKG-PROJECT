"use client";

import React, { useMemo, useState } from "react";
import { FaEdit, FaToggleOff, FaToggleOn } from "react-icons/fa";
import { BusinessProfession } from "../types/BusinessTypes";
import clsx from "clsx";
import { getActiveStatus, isBusiness } from "@/app/helpers/StringHelper";
import BusinessProfessionUpdateFormModal from "./BusinessProfessionUpdateFormModal";
import StatusChangeModal from "./StatusChangeModal";
import { useItemsStore } from "@/store/useUserstore";
import { UserLoginInfo } from "@/app/(guest)/auth/login/types/AdminLoginTypes";
import {
  BusinessProfessionStatus,
  BusinessProfessionStatusBgColors,
} from "@/constants/enums-with-colors";
import { formatDateWithTime } from "@/utils/date";

interface BranchTableProps {
  businessProfessions: BusinessProfession[];
  onUpdated: () => void;
}

const BusinessProfessionTable = ({
  businessProfessions,
  onUpdated,
}: BranchTableProps) => {
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBusinessProfession, setSelectedBusinessProfession] =
    useState<BusinessProfession | null>(null);
  const { items } = useItemsStore();
  const info: UserLoginInfo = items.info as UserLoginInfo ?? null;

  const handleEditClick = (businessProfession: BusinessProfession) => {
    setSelectedBusinessProfession(businessProfession);
    setEditModalOpen(true);
  };

  const closeModal = () => {
    setEditModalOpen(false);
    setStatusModalOpen(false);
    setSelectedBusinessProfession(null);
  };

  const memoizedInitialData = useMemo(() => {
    if (!selectedBusinessProfession) return null;
    return {
      id: selectedBusinessProfession.id,
      label_bn: selectedBusinessProfession.label_bn,
      label_en: selectedBusinessProfession.label_en,
      type: selectedBusinessProfession.type,
      occupation_nature: selectedBusinessProfession.occupation_nature,
      created_at: selectedBusinessProfession.created_at,
      updated_at: selectedBusinessProfession.updated_at,
    };
  }, [selectedBusinessProfession]);

  const handleToggleActive = (businessProfession: BusinessProfession) => {
    setStatusModalOpen(true);
    setSelectedBusinessProfession(businessProfession);
  };

  const headings = [
    "Name (En)",
    "Name (Bn)",
    "Ocuupation Nature",
    "Type",
    "Status",
    "Created At",
    "Updated At",
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
          </tr>
        </thead>
        <tbody>
          {businessProfessions.map((businessProfession) => (
            <tr
              key={businessProfession.id}
              className="border-b border-gray-300 border-dashed hover:bg-gray-50"
            >
              <td className="px-4 py-4 text-sm text-gray-700 w-[20%]">
                {businessProfession.label_en}
              </td>
              <td className="px-4 py-4 text-sm text-gray-700 w-[20%]">
                {businessProfession.label_bn}
              </td>
              <td className="px-4 py-4 text-sm text-gray-700">
                {businessProfession.occupation_nature}
              </td>

              <td className="px-4 py-4 text-sm text-gray-700">
                <span
                  className={clsx(
                    "px-3 py-2 rounded-md text-xs font-medium capitalize text-white",
                    isBusiness(businessProfession.type) && "bg-[#16A085]",
                    !isBusiness(businessProfession.type) && "bg-[#34495E]"
                  )}
                >
                  {businessProfession.type}
                </span>
              </td>

              <td className="px-4 py-4 text-sm text-gray-700">
                <span
                  className={clsx(
                    "px-3 py-2 rounded-md text-xs  font-medium text-white",
                    BusinessProfessionStatusBgColors[
                      getActiveStatus(
                        businessProfession.is_active
                      ).toLowerCase() as BusinessProfessionStatus
                    ]
                  )}
                >
                  {getActiveStatus(businessProfession.is_active)}
                </span>
              </td>

              <td className="px-4 py-4 text-sm text-gray-700">
                {formatDateWithTime(businessProfession.created_at)}
              </td>
              <td className="px-4 py-4 text-sm text-gray-700">
                {formatDateWithTime(businessProfession.updated_at)}
              </td>

              {info && info.canBusinessProfessionsUpdate && (
                <td className="px-4 py-4 text-sm text-gray-700">
                  <div className="flex gap-3 items-center">
                    <button
                      onClick={() => handleEditClick(businessProfession)}
                      className="text-indigo-500 hover:text-indigo-700 transform hover:scale-110 transition-all cursor-pointer duration-200"
                      title="Edit Business Profession"
                    >
                      <FaEdit className="w-5 h-5 text-[#003970]" />
                    </button>
                    <button
                      onClick={() => handleToggleActive(businessProfession)}
                      className="transform hover:scale-110 transition-all cursor-pointer duration-200"
                      title={
                        businessProfession.is_active ? "Deactivate" : "Activate"
                      }
                    >
                      {businessProfession.is_active ? (
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
        <BusinessProfessionUpdateFormModal
          isOpen={editModalOpen}
          onClose={closeModal}
          initialData={memoizedInitialData}
          onUpdated={onUpdated}
        />
      )}
      {statusModalOpen && (
        <StatusChangeModal
          isOpen={statusModalOpen}
          onClose={closeModal}
          id={selectedBusinessProfession?.id}
          currentStatus={selectedBusinessProfession?.is_active}
          onUpdated={onUpdated}
          term="business profession"
        />
      )}
    </div>
  );
};

export default BusinessProfessionTable;
