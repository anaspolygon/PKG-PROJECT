"use client";
import React, { useState } from "react";
import { Input } from "antd";
import UserTable from "./UserTable";
import useGetUserList from "../hooks/useGetUserList";
import Loader from "@/app/components/Loader";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import UserForm, { UserFormData } from "./UserForm";
import Modal from "../../components/Modal";
import { toast } from "sonner";
import { addUserAction } from "../actions/AddUserAction";
import { updateUserAction } from "../actions/UpdateUserAction";
import { useGlobalState } from "@/components/layouts/GlobalContext";
import PrimaryBtn from "@/components/buttons/PrimaryBtn";
import PaginationWrapper from "@/components/layouts/PaginationWrapper";
import { useRouter } from "next/navigation";
import useGetAllBranch from "../../branches/hooks/useGetAllBranch";
import useGetRoleList from "../../roles/hooks/useGetRoleList";
const UserSection = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editUserLoading, setEditUserLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<UserFormData | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const info = useLocalStorage("info");
  const { fetchPendingCount } = useGlobalState();
  const router = useRouter();

  const { users, error, fetchUsers, searchValue, setSearchValue } =
    useGetUserList(currentPage);

  const { branches } = useGetAllBranch();
  const { roles } = useGetRoleList();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showModal = () => {
    setOpenAddModal(true);
  };

  const showEditModal = () => {
    setEditModal(true);
  };

  const closeModal = () => {
    setOpenAddModal(false);
  };

  const closeEditModal = () => {
    setEditModal(false);
  };

  const handleAdd = async (data: UserFormData) => {
    try {
      setLoading(true);
      const res = await addUserAction(data);
      if (res.success) {
        toast.success(res.message);
        fetchPendingCount();
      } else {
        toast.error(res.message);
        if (res.code === 401) {
          router.push("/auth/login");
        }
      }
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  const handleEdit = async (data: UserFormData) => {
    // console.log("Editing user with data:", data, "and ID:", selectedItemId);
    // return;
    try {
      setEditUserLoading(true);
      const res = await updateUserAction(data, selectedItemId as number);
      if (res.success) {
        toast.success(res.message);
        fetchPendingCount();
      } else {
        toast.error(res.message);
        if (res.code === 401) {
          router.push("/auth/login");
        }
      }
    } finally {
      setEditUserLoading(false);
      closeEditModal();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="md:text-lg lg:text-2xl font-medium">User List</h1>
        <div className="flex items-center gap-4">
          {info && info?.permissions?.can_create_user && (
            <PrimaryBtn
              variant="primary"
              onClick={showModal}
              loadingAll={false}
              content="Add User"
              icon="plus"
            />
          )}
        </div>
      </div>

      <hr className="text-gray-300 py-2" />

      <div className="flex items-center justify-end mb-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search by Employee ID | Name"
              allowClear
              className="!border-gray-400 focus:!border-[#003970] sm:!w-[270px] md:!w-[270px] hover:!border-[#003970] 
              !text-gray-600 !rounded-md !px-3 !py-2 pr-16 text-sm  sm:placeholder:text-[10px] lg:placeholder:text-xs placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>

      {loading && <Loader />}

      {error && (
        <div className="py-8 text-center">
          <p className="text-red-500 font-medium">{error.message}</p>
          <p className="text-gray-500 mt-1">
            Please try again later or contact support.
          </p>
        </div>
      )}

      {!loading && !error && users?.data && (
        <>
          {(users.data ?? []).length > 0 ? (
            <>
              <UserTable
                users={users.data}
                onUserUpdated={fetchUsers}
                setSelectedItem={setSelectedItem}
                selectedItemId={setSelectedItemId}
                showEditModal={showEditModal}
              />
              {users.meta && users.meta.last_page > 1 && (
                <PaginationWrapper
                  currentPage={users.meta.current_page}
                  lastPage={users.meta.last_page}
                  links={users.meta.links}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          ) : (
            <div className="py-8 text-center text-gray-500">No data found.</div>
          )}
        </>
      )}
      {openAddModal && (
        <Modal title="Add User" width={700} closeModal={closeModal}>
          <UserForm
            branches={branches}
            roles={roles}
            onSubmit={handleAdd}
            loading={loading}
            onClose={closeModal}
          />
        </Modal>
      )}
      {editModal && (
        <Modal title="Edit User" width={700} closeModal={closeEditModal}>
          <UserForm
            branches={branches}
            roles={roles}
            onSubmit={handleEdit}
            loading={editUserLoading}
            defaultValues={selectedItem || undefined}
            isEdit={true}
            onClose={closeEditModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default UserSection;
