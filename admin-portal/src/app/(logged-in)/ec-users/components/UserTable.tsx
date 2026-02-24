"use client";

import React, { useMemo, useState } from "react";
import { User } from "../types/UserTypes";
// import {
//   getRole,
//   getUserStatus,
//   isSuperAdmin,
// } from "@/app/helpers/StringHelper";
import { FaEdit, FaKey, FaTrash } from "react-icons/fa";

// import clsx from "clsx";
import UserUpdateFormModal from "./UserUpdateFormModal";
import { BranchList } from "../types/BranchTypes";
import deleteEcUser from "../actions/DeleteUser";
import { toast } from "sonner";
import UserPasswordModal from "./UserPasswordModal";
import { useItemsStore } from "@/store/useUserstore";
import { UserLoginInfo } from "@/app/(guest)/auth/login/types/AdminLoginTypes";
import { formatDateWithTime } from "@/utils/date";

interface UserTableProps {
  users: User[];
  branchList: BranchList;
  onUserUpdated: () => void;
}

const UserTable = ({ users, branchList, onUserUpdated }: UserTableProps) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { items } = useItemsStore();
  const info : UserLoginInfo = items.info as UserLoginInfo ?? null;

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const closeModal = () => {
    setEditModalOpen(false);
    setSelectedUser(null);
  };

  const memoizedInitialData = useMemo(() => {
    if (!selectedUser) return null;
    return {
      id: selectedUser.id,
      branch_id: selectedUser.branch_id,
      username: selectedUser.username,
    };
  }, [selectedUser]);

  const headings = ["Name", "Branch", "Created At", "Updated At",  ...(info.canEcUserUpdate ? ['Actions'] : []),];

  const deleteUser = async (userId: number) => {
    const res = await deleteEcUser(userId);
    if (res.success) {
      toast.success("User deleted successfully!");
      onUserUpdated();
    } else {
      toast.error("Failed to delete user.");
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead className="text-gray-400">
          <tr>
            {headings.map((heading, index) => (
              <th
                key={index}
                className="px-4 py-4 text-left text-sm font-semibold"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-gray-300 border-dashed hover:bg-gray-50"
            >
              <td className="px-4 py-4 text-sm text-gray-700">
                {user.username}
              </td>
              <td className="px-4 py-4 text-sm text-gray-700">
                {user.branch_id}
              </td>

              <td className="px-4 py-4 text-sm text-gray-700">
                {formatDateWithTime(user.created_at)}
              </td>
              <td className="px-4 py-4 text-sm text-gray-700">
                {formatDateWithTime(user.updated_at)}
              </td>
              {info && info.canEcUserUpdate && 
                <td className="px-4 py-4 text-sm text-gray-700">
                  <div className="flex gap-3 items-center">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="text-indigo-500 hover:text-indigo-700 transform hover:scale-110 transition-all cursor-pointer duration-200"
                      title="Edit user"
                      >
                      <FaEdit className="w-5 h-5 text-[#003970]" />
                    </button>

                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-indigo-500 hover:text-indigo-700 transform hover:scale-110 transition-all cursor-pointer duration-200"
                      title="Delete user"
                      >
                      <FaTrash className="w-5 h-5 text-[#003970]" />
                    </button>
                    <button
                      onClick={() =>{setSelectedUser(user); setPasswordModal(true)}}
                      className="text-indigo-500 hover:text-indigo-700 transform hover:scale-110 transition-all cursor-pointer duration-200"
                      title="Change password"
                      >
                      <FaKey className="w-5 h-5 text-[#003970]" />
                    </button>
                  </div>
                </td>
              }
            </tr>
          ))}
        </tbody>
      </table>
      {editModalOpen && (
        <UserUpdateFormModal
          isOpen={editModalOpen}
          onClose={closeModal}
          branchList={branchList}
          initialData={memoizedInitialData}
          onUserUpdated={onUserUpdated}
        />
      )}
      {passwordModal && selectedUser && (
        <UserPasswordModal
          isEcUser={true}
          userId={selectedUser?.id}
          isOpen={passwordModal}
          onClose={() => setPasswordModal(false)}
        />
      )}
    </div>
  );
};

export default UserTable;
