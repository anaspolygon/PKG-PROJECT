"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import Loader from "@/app/components/Loader";
import BranchTable from "./BranchTable";
import BranchForm, { BranchFormData } from "./BranchForm";
import useBranchList from "../hooks/useBranchList";
import { Branch } from "../types/BranchTypes";
import { addBranchAction } from "../actions/addBranchAction";
import { updateBranchAction } from "../actions/updateBranchAction";
import FileUpload from "../../components/form/FileUpload";
import { uplaodFileAction } from "../actions/uploadFileAction";
import { downloadFileAction } from "../actions/downloadFileAction";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useAddress } from "@/hooks/useAddress";
import Modal from "../../components/Modal";
import { useGlobalState } from "@/components/layouts/GlobalContext";
import PrimaryBtn from "@/components/buttons/PrimaryBtn";
import PaginationWrapper from "@/components/layouts/PaginationWrapper";
import { deleteBranchAction } from "../actions/deleteBranchAction";
import { useRouter } from "next/navigation";

export function downloadFile(buffer: ArrayBuffer, fileName: string) {
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = fileName;
  a.click();

  window.URL.revokeObjectURL(url);
}

const BranchSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openFileUplaodModal, setFileUploadModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Branch | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [editBranchLoading, setEditBranchLoading] = useState(false);
  const [uploadloading, setUploadLoading] = useState(false);
  const [downloadloading, setDownloadLoading] = useState(false);
  const info = useLocalStorage("info");
  const { fetchPendingCount } = useGlobalState();
  const { divisions, districts, thanas, postal_codes } = useAddress();
  const { branches, branchesLoading, error, fetchBranches } =
    useBranchList(currentPage);
  const router = useRouter();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showModal = () => {
    setOpen(true);
  };

  const showEditModal = () => {
    setOpenEditModal(true);
  };

  const showFileUploadModal = () => {
    setFileUploadModal(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const closeEditModal = () => {
    setOpenEditModal(false);
  };

  const closeFileUploadModal = () => {
    setFileUploadModal(false);
  };

  const handleAdd = async (data: BranchFormData) => {
    try {
      setLoading(true);
      const res = await addBranchAction(data);
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

  const handleEdit = async (data: BranchFormData) => {
    try {
      setEditBranchLoading(true);
      const res = await updateBranchAction(data, selectedItemId);
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

  const handleDelete = async (id: number) => {
    const res = await deleteBranchAction(id);
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

  const onLoad = (file: File) => {
    setSelectedFile(file);
  };

  const uploadFileToServer = async () => {
    try {
      setUploadLoading(true);
      const res = await uplaodFileAction(selectedFile);
      if (res.success) {
        fetchBranches();
        fetchPendingCount();
        toast.success(res.message);
      } else {
        toast.error(res.message);
        if (res.code === 401) {
          router.push("/auth/login");
        }
        closeModal();
      }
    } finally {
      setUploadLoading(false);
      closeFileUploadModal();
    }
  };

  const downloadFileFromServer = async () => {
    try {
      setDownloadLoading(true);
      const res = await downloadFileAction();
      if (!res.success) {
        toast.error(res.message);
        if (res.code === 401) {
          router.push("/auth/login");
        }
        return;
      }
      if (res.file && res.fileName) {
        downloadFile(res.file, res.fileName);
      } else {
        toast.error("File not available");
      }
    } finally {
      setDownloadLoading(false);
    }
  };

  if (branchesLoading) return <Loader />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="sm:text-lg lg:text-2xl font-medium">Branch List</h1>
        <div className="flex gap-4 items-center">
          {info && info.permissions.can_create_branch ? (
            <PrimaryBtn
              variant="primary"
              onClick={showModal}
              loadingAll={false}
              content="Add Branch"
              icon="plus"
            />
          ) : null}
          {info && info.permissions.can_upload_branch_excel ? (
            <PrimaryBtn
              variant="secondary"
              onClick={showFileUploadModal}
              loadingAll={false}
              content="Upload File"
              icon="upload"
            />
          ) : null}
          {info && info.permissions.can_download_branch_excel ? (
            <PrimaryBtn
              variant="primary"
              onClick={downloadFileFromServer}
              loadingAll={downloadloading}
              content="Download Sample"
              icon="download"
              loadingContent="Downloading..."
            />
          ) : null}
        </div>
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

      {!loading && !error && branches?.data && (
        <>
          {(branches.data ?? []).length > 0 ? (
            <>
              <BranchTable
                data={branches.data}
                divisions={divisions}
                districts={districts}
                thanas={thanas}
                postal_codes={postal_codes}
                openModal={showEditModal}
                setSelectedItem={setSelectedItem}
                setSelectedItemId={setSelectedItemId}
                handleDelete={handleDelete}
              />
              {(branches.meta.last_page ?? 0) > 1 && (
                <PaginationWrapper
                  currentPage={branches.meta.current_page ?? 1}
                  lastPage={branches.meta.last_page ?? 1}
                  links={branches.meta.links ?? []}
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
        <Modal title="Add Branch" width={800} closeModal={closeModal}>
          <BranchForm
            onSubmit={handleAdd}
            loading={loading}
            divisions={divisions}
            districts={districts}
            thanas={thanas}
            postal_codes={postal_codes}
            onClose={closeModal}
          />
        </Modal>
      )}

      {openEditModal && (
        <Modal title="Update Branch" width={800} closeModal={closeEditModal}>
          <BranchForm
            onSubmit={handleEdit}
            loading={editBranchLoading}
            divisions={divisions}
            districts={districts}
            thanas={thanas}
            postal_codes={postal_codes}
            defaultValues={selectedItem!}
            isEdit={true}
            onClose={closeEditModal}
          />
        </Modal>
      )}

      {openFileUplaodModal && (
        <Modal title="Upload File" closeModal={closeFileUploadModal}>
          <FileUpload
            onLoad={onLoad}
            uploadFileToServer={uploadFileToServer}
            loading={uploadloading}
          />
        </Modal>
      )}
    </div>
  );
};

export default BranchSection;
