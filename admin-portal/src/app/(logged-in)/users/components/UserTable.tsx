/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import clsx from "clsx";
import { User } from "../types/UserTypes";
import { isSuperAdmin } from "@/app/helpers/StringHelper";
import {
  UserStatus,
  UserStatusBgColors,
  UserStatusTextColors,
} from "@/constants/enums-with-colors";
import { formatDateWithTime } from "@/utils/date";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Modal from "../../components/Modal";
import { UserFormData } from "./UserForm";
import ActionBtn from "@/components/buttons/ActionBtn";
import Table from "@/components/ui/table";
interface UserTableProps {
  users: User[];
  setSelectedItem: (item: UserFormData) => void;
  selectedItemId: (id: number | null) => void;
  onUserUpdated: () => void;
  showEditModal: () => void;
}

const UserTable = ({
  users,
  setSelectedItem,
  selectedItemId,
  showEditModal,
}: UserTableProps) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openProfileView, setProfileView] = useState(false);

  const info = useLocalStorage("info");

  const hadleProfileView = (user: User) => {
    setProfileView(true);
    setSelectedUser(user);
  };

  const getStatus = (value: number) => {
    return value === 1 ? "active" : "inactive";
  };


  const columns = [
    { title: "Employee ID", key: "employee_id" as keyof User },
    { title: "Name", key: "name" as keyof User },
    {
      title: "Role",
      key: "roles" as keyof User,
      render: (_: any, record: User) => (
        <span
          className={clsx(
            "px-2 py-1 rounded-md text-xs capitalize font-medium",
            record?.roles &&
              record.roles.length > 0 &&
              !isSuperAdmin(record?.roles[0].name) &&
              "bg-cyan-100 text-cyan-700",
            record?.roles &&
              record.roles.length > 0 &&
              isSuperAdmin(record?.roles[0].name) &&
              "bg-red-100 text-red-700"
          )}
        >
          {record?.roles && record.roles.length > 0
            ? record?.roles[0]?.name
            : "N/A"}
        </span>
      ),
    },
    {
      title: "Status",
      key: "is_active" as keyof User,
      render: (_: any, record: User) => (
        <span
          className={clsx(
            "px-2 py-1 rounded-md text-xs font-medium capitalize",
            UserStatusBgColors[getStatus(record.is_active) as UserStatus],
            UserStatusTextColors[getStatus(record.is_active) as UserStatus]
          )}
        >
          {getStatus(record.is_active)}
        </span>
      ),
    },
    {
      title: "Created At",
      key: "created_at" as keyof User,
      render: (value: any) => formatDateWithTime(value),
    },
    {
      title: "Updated At",
      key: "updated_at" as keyof User,
      render: (value: any) => formatDateWithTime(value),
    },
    {
      title: "Actions",
      key: "id" as keyof User,
      render: (_: any, user: User) => {
        return (
          <div className="flex items-center gap-2">
            <ActionBtn onClick={() => hadleProfileView(user)} type="view" />
            {info?.permissions?.can_update_user ? (
              <ActionBtn
                onClick={() => {
                  setSelectedItem({
                    name: user.name,
                    role_id: user.roles[0]?.id,
                    employee_id: user.employee_id,
                    branch_id: Number(user.branch_id),
                    valid_till: user.valid_till,
                    user_type: user.user_type,
                    is_active: user.is_active.toString(),
                  });
                  selectedItemId(user.id as number);
                  showEditModal();
                }}
                type="edit"
              />
            ) : null}
          </div>
        );
      },
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={users} />

      {openProfileView && (
        <Modal title="User Profile" closeModal={() => setProfileView(false)}>
          <div className="space-y-4">
            {/* Profile Header */}
            <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-lg font-bold shadow-md">
                {selectedUser?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {selectedUser?.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {selectedUser?.employee_id}
                </p>
              </div>
            </div>

            {/* Profile Details */}
            <div className="space-y-3">
              {/* Mobile */}
              {selectedUser?.mobile && (
                <div className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 transition-colors">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium">Mobile</p>
                    <p className="text-sm text-gray-800">
                      {selectedUser?.mobile}
                    </p>
                  </div>
                </div>
              )}

              {/* Role */}
              <div className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 transition-colors">
                <div className="flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-purple-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-medium mb-1">Role</p>
                  <span
                    className={clsx(
                      "inline-flex px-2 py-1 rounded-md text-xs capitalize font-medium",
                      selectedUser?.roles[0] &&
                        !isSuperAdmin(selectedUser?.roles[0].name) &&
                        "bg-cyan-100 text-cyan-700",
                      selectedUser?.roles[0] &&
                        isSuperAdmin(selectedUser?.roles[0].name) &&
                        "bg-red-100 text-red-700"
                    )}
                  >
                    {selectedUser?.roles[0]?.name ?? "N/A"}
                  </span>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 transition-colors">
                <div className="flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-medium mb-1">
                    Status
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={clsx(
                        "inline-flex px-2 py-1 rounded-md text-xs font-medium capitalize",
                        UserStatusBgColors[
                          getStatus(
                            selectedUser?.is_active as number
                          ) as UserStatus
                        ],
                        UserStatusTextColors[
                          getStatus(
                            selectedUser?.is_active as number
                          ) as UserStatus
                        ]
                      )}
                    >
                      {getStatus(selectedUser?.is_active as number)}
                    </span>
                    {selectedUser?.comments && (
                      <span className="text-xs text-gray-600 italic">
                        {selectedUser?.comments}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default UserTable;
