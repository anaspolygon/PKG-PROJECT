"use client";

import { DefaultEcUser } from "../types/DefaultEcUserTypes";
import { useState } from "react";
import { FaEdit, FaKey } from "react-icons/fa";
import DefaultEcUserUpdateFormModal from "./DefaultEcUserUpdateFormModal";
import { useItemsStore } from "@/store/useUserstore";
import { UserLoginInfo } from "@/app/(guest)/auth/login/types/AdminLoginTypes";
import UserPasswordModal from "../../ec-users/components/UserPasswordModal";
import { formatDateWithTime } from "@/utils/date";

interface DefaultEcUserProps {
  user: DefaultEcUser;
  onUserUpdated: () => void;
}

const DefaultEcUserTable = ({ user, onUserUpdated }: DefaultEcUserProps) => {
  const { items } = useItemsStore();
  const info: UserLoginInfo = items.info as UserLoginInfo ?? null;

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const closeModal = () => {
    setEditModalOpen(false);
  };

  const headings = [
    "ID",
    "User Name",
    "Token Issue Time ",
    "Token Expire Time ",
    "Created At",
    "Updated At",
    // ...(info.canEcUserUpdate ? ["Actions"] : []),
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
          <tr
            key={user.id}
            className="border-b border-gray-300 border-dashed hover:bg-gray-50"
          >
            <td className="px-4 py-4 text-sm text-gray-700">{user.id}</td>
            <td className="px-4 py-4 text-sm text-gray-700">{user.name}</td>

            <td className="px-4 py-4 text-sm text-gray-700">
              {formatDateWithTime(user.token_issue_time)}
            </td>
            <td className="px-4 py-4 text-sm text-gray-700">
              {formatDateWithTime(user.token_expire_time)}
            </td>
            <td className="px-4 py-4 text-sm text-gray-700">
              {formatDateWithTime(user.created_at)}
            </td>
            <td className="px-4 py-4 text-sm text-gray-700">
              {formatDateWithTime(user.updated_at)}
            </td>
            {info && info.canEcUserUpdate && (
              <td className="px-4 py-4 text-sm text-gray-700">
                <div className="flex gap-3 items-center">
                  <button
                    onClick={() => handleEditClick()}
                    className="text-indigo-500 hover:text-indigo-700 transform hover:scale-110 transition-all cursor-pointer duration-200"
                    title="Edit User"
                  >
                    <FaEdit className="w-5 h-5 text-[#003970]" />
                  </button>
                  <button
                    onClick={() => {
                      setPasswordModal(true);
                    }}
                    className="text-indigo-500 hover:text-indigo-700 transform hover:scale-110 transition-all cursor-pointer duration-200"
                    title="Change password"
                  >
                    <FaKey className="w-5 h-5 text-[#003970]" />
                  </button>
                </div>
              </td>
            )}
          </tr>
        </tbody>
      </table>
      {editModalOpen && (
        <DefaultEcUserUpdateFormModal
          isOpen={editModalOpen}
          onClose={closeModal}
          initialData={user}
          onUserUpdated={onUserUpdated}
        />
      )}
      {passwordModal && user && (
        <UserPasswordModal
          userId={user?.id}
          isEcUser={true}
          isOpen={passwordModal}
          onClose={() => setPasswordModal(false)}
        />
      )}
    </div>
  );
};

export default DefaultEcUserTable;
