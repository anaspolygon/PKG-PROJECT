"use client";
import React, { useState } from "react";
import Loader from "@/app/components/Loader";
import Pagination from "@/components/layouts/Pagination";
import ApkVersionTable from "./ApkVersionTable";
import useApkVersionList from "../hooks/useApkVersionList";
import { ApkVersionFormData } from "./ApkVersionForm";
import { toast } from "sonner";
import { addApkVersionAction } from "../actions/addApkVersion";
import { updateApkVersionAction } from "../actions/updateApkVersion";
import PrimaryBtn from "@/components/buttons/PrimaryBtn";
import Modal from "../../components/Modal";
import ApkVersionForm from "./ApkVersionForm";
import { useGlobalState } from "@/components/layouts/GlobalContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import { deleteApkAction } from "../actions/deleteApkVersion";
const ApkVersionSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ApkVersionFormData | null>(
    null,
  );
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const { apkVersions, apkVersionsLoading, error } =
    useApkVersionList(currentPage);
  const { fetchPendingCount } = useGlobalState();
  const info = useLocalStorage("info");
  const router = useRouter();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const openEditModal = () => {
    setEditModal(true);
  };

  const closeEditModal = () => {
    setEditModal(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAdd = async (data: ApkVersionFormData) => {
    try {
      setLoading(true);
      const res = await addApkVersionAction(data);
      if (res.success) {
        fetchPendingCount();
        toast.success(res.message);
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

  const handleEdit = async (data: ApkVersionFormData) => {
    try {
      setEditLoading(true);
      const res = await updateApkVersionAction(data, selectedItemId);
      if (res.success) {
        fetchPendingCount();
        toast.success(res.message);
      } else {
        toast.error(res.message);
        if (res.code === 401) {
          router.push("/auth/login");
        }
      }
    } finally {
      setEditLoading(false);
      closeEditModal();
    }
  };

  const handleDelete = async (id: number) => {
    const res = await deleteApkAction(id);
    if (res.success) {
      toast.success(res.message);
      fetchPendingCount();
    } else {
      toast.error(res.message);
      if (res.code === 401) {
        router.push("/auth/login");
      }
    }
  };

  if(apkVersionsLoading) return <Loader/>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="sm:text-lg lg:text-2xl font-medium">APK Version List</h1>
        {info?.permissions.can_create_apk ? (
          <div className="flex gap-2 items-center">
            <PrimaryBtn
              variant="primary"
              onClick={openModal}
              loadingAll={false}
              content="Add APK Version"
              icon="plus"
            />
          </div>
        ) : null}
      </div>

      <hr className="text-gray-300 my-4" />

      {loading && <Loader />}

      {error && (
        <div className="py-8 text-center">
          <p className="text-red-500 font-medium">Failed to load data.</p>
          <p className="text-gray-500 mt-1">
            Please try again later or contact support.
          </p>
        </div>
      )}

      {!loading && !error && apkVersions?.data && (
        <>
          {(apkVersions.data ?? []).length > 0 ? (
            <>
              <ApkVersionTable
                apkVersions={apkVersions.data}
                openEditModal={openEditModal}
                setSelectedItem={setSelectedItem}
                setSelectedItemId={setSelectedItemId}
                handleDelete={handleDelete}
              />
              {(apkVersions.meta.last_page ?? 0) > 1 && (
                <Pagination
                  currentPage={apkVersions.meta.current_page ?? 1}
                  lastPage={apkVersions.meta.last_page ?? 1}
                  links={apkVersions.meta.links ?? []}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          ) : (
            <div className="py-8 text-center text-gray-500">
              No APK version list found.
            </div>
          )}
        </>
      )}
      {isModalOpen && (
        <Modal title="Add APK Version" closeModal={closeModal}>
          <ApkVersionForm
            onSubmit={handleAdd}
            loading={loading}
            closeModal={closeModal}
          />
        </Modal>
      )}
      {editModal && (
        <Modal title="Update Apk Version" closeModal={closeEditModal}>
          <ApkVersionForm
            onSubmit={handleEdit}
            loading={editLoading}
            closeModal={closeEditModal}
            defaultValues={selectedItem!}
            isEdit={true}
          />
        </Modal>
      )}
    </div>
  );
};

export default ApkVersionSection;
