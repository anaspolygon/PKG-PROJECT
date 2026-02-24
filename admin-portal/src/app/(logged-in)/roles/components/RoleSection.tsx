"use client";
import React, { useState } from "react";
import Loader from "@/app/components/Loader";
import useGetRoleList from "../hooks/useGetRoleList";
import RoleTable from "./RoleTable";
import RoleAddFormModal from "./RoleAddFormModal";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import PrimaryBtn from "@/components/buttons/PrimaryBtn";

const BranchSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const info = useLocalStorage("info");
  const { roles, loading, error, fetchRoles } = useGetRoleList();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="md:text-lg lg:text-2xl font-medium">Role List</h1>
        {info?.permissions.can_create_role ? (
          <div className="flex gap-2 items-center">
            <PrimaryBtn
              variant="primary"
              onClick={() => setIsModalOpen(true)}
              loadingAll={false}
              content="Add Role"
              icon="plus"
            />
          </div>
        ) : null}
      </div>

      <hr className="text-gray-300 py-2" />

      {loading && <Loader />}

      {error && (
        <div className="py-8 text-center">
          <p className="text-red-500 font-medium">Failed to load roles.</p>
          <p className="text-gray-500 mt-1">
            Please try again later or contact support.
          </p>
        </div>
      )}

      {!loading && !error && roles?.data && (
        <>
          {roles.data.length > 0 ? (
            <>
              <RoleTable roles={roles.data} onRoleUpdated={fetchRoles} />
            </>
          ) : (
            <div className="py-8 text-center text-gray-500">No Data found.</div>
          )}
        </>
      )}
      <RoleAddFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRoleAdded={fetchRoles}
      />
    </div>
  );
};

export default BranchSection;
