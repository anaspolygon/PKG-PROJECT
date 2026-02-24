/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useMemo, useState } from "react";
import { Role } from "../types/RoleTypes";
import RoleUpdateFormModal from "./RoleUpdateFormModal";
import { formatDateWithTime } from "@/utils/date";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import ActionBtn from "@/components/buttons/ActionBtn";
import Table from "@/components/ui/table";
interface RoleTableProps {
  roles: Role[];
  onRoleUpdated: () => void;
}

const RoleTable = ({ roles, onRoleUpdated }: RoleTableProps) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const info = useLocalStorage("info");

  const handleEditClick = (role: Role) => {
    setSelectedRole(role);
    setEditModalOpen(true);
  };

  const closeModal = () => {
    setEditModalOpen(false);
    setSelectedRole(null);
  };

  const memoizedInitialData = useMemo(() => {
    if (!selectedRole) return null;
    return {
      id: selectedRole.id,
      name: selectedRole.name,
      permissions: selectedRole.permissions,
      guard_name: selectedRole.guard_name,
      created_at: selectedRole.created_at,
      updated_at: selectedRole.updated_at,
    };
  }, [selectedRole]);

  const columns = [
    { title: "Role Name", key: "name" as keyof Role },
    {
      title: "Created At",
      key: "created_at" as keyof Role,
      render: (_: any, record: Role) => formatDateWithTime(record.created_at),
    },
    {
      title: "Updated At",
      key: "updated_at" as keyof Role,
      render: (_: any, record: Role) => formatDateWithTime(record.updated_at),
    },
    ...(info && info?.permissions?.can_update_role
      ? [
          {
            title: "Actions",
            key: "actions" as keyof Role,
            render: (_: any, record: Role) => (
              <div className="flex justify-start items-center">
                <ActionBtn
                  onClick={() => handleEditClick(record)}
                  type="edit"
                />
              </div>
            ),
          },
        ]
      : []),
  ];

  return (
    <>
      <Table columns={columns} dataSource={roles} />

      {editModalOpen && (
        <RoleUpdateFormModal
          isOpen={editModalOpen}
          onClose={closeModal}
          initialData={memoizedInitialData}
          onRoleUpdated={onRoleUpdated}
        />
      )}
    </>
  );
};

export default RoleTable;
