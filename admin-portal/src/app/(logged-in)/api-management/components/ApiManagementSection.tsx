"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import Loader from "@/app/components/Loader";
import ApiManagementTable from "./ApiManagementTable";
import useApiList from "../hooks/useApiList";
import { API } from "../types/ApiTypes";
import ApiForm, { ApiFormData } from "./ApiForm";
import { addApiAction } from "../actions/addApiAction";
import { updateApiAction } from "../actions/updateApiAction";
import Modal from "../../components/Modal";
import { useGlobalState } from "@/components/layouts/GlobalContext";
import PaginationWrapper from "@/components/layouts/PaginationWrapper";
import { useRouter } from "next/navigation";

const ApiManagementSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<API | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [editBranchLoading, setEditBranchLoading] = useState(false);
  const router = useRouter();
  const { fetchPendingCount } = useGlobalState();

  const { apis, apisLoading, error } = useApiList(currentPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showEditModal = () => {
    setOpenEditModal(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const closeEditModal = () => {
    setOpenEditModal(false);
  };

  const handleAdd = async (data: ApiFormData) => {
    try {
      setLoading(true);
      const res = await addApiAction(data);
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

  const handleEdit = async (data: ApiFormData) => {
    try {
      setEditBranchLoading(true);
      const res = await updateApiAction(data, selectedItemId);
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
      setEditBranchLoading(false);
      closeEditModal();
    }
  };

  if (apisLoading) return <Loader />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="sm:text-lg lg:text-2xl font-medium">API List</h1>
      </div>

      <hr className="text-gray-300 py-2" />

      {loading && <Loader />}

      {error && (
        <div className="py-8 text-center">
          <p className="text-red-500 font-medium">Failed to load data.</p>
          <p className="text-gray-500 mt-1">
            Please try again later or contact support.
          </p>
        </div>
      )}

      {!loading && !error && apis?.data && (
        <>
          {(apis.data ?? []).length > 0 ? (
            <>
              <ApiManagementTable
                data={apis.data}
                openModal={showEditModal}
                setSelectedItem={setSelectedItem}
                setSelectedItemId={setSelectedItemId}
              />
              {(apis.meta.last_page ?? 0) > 1 && (
                <PaginationWrapper
                  currentPage={apis.meta.current_page ?? 1}
                  lastPage={apis.meta.last_page ?? 1}
                  links={apis.meta.links ?? []}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          ) : (
            <div className="py-8 text-center text-gray-500">No data found.</div>
          )}
        </>
      )}

      {open && (
        <Modal title="Add Branch" closeModal={closeModal}>
          <ApiForm
            onSubmit={handleAdd}
            loading={loading}
            onClose={closeModal}
          />
        </Modal>
      )}

      {openEditModal && (
        <Modal title="Update API" width={700} closeModal={closeEditModal}>
          <ApiForm
            onSubmit={handleEdit}
            loading={editBranchLoading}
            additionalFields={selectedItem?.additional_fields}
            defaultValues={selectedItem!}
            isEdit={true}
            onClose={closeEditModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default ApiManagementSection;
