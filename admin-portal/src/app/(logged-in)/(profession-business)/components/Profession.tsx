"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Loader from "@/app/components/Loader";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Modal from "../../components/Modal";
import useProfessionList from "../hooks/useProfessionList";
import ProfessionTable from "./ProfessionTable";
import ProfessionForm, { FormData } from "./ProfessionForm";
import { addAction } from "../actions/addAction";
import { updateAction } from "../actions/updateAction";
import PrimaryBtn from "@/components/buttons/PrimaryBtn";
import {
  checkPermission,
  getAddContext,
  getBtnText,
  getUpdateContext,
  isRegularBusinessOrProfession,
  PageName,
} from "../types/ProfessionTypes";
import { useGlobalState } from "@/components/layouts/GlobalContext";

interface Props {
  pageTitle: string;
  pageName: PageName;
  listURL: string;
  createURL: string;
  updateURL: string;
}

const Profession = ({
  pageTitle,
  pageName,
  listURL,
  createURL,
  updateURL,
}: Props) => {
  const [currentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const router = useRouter();
  const info = useLocalStorage("info");
  const { fetchPendingCount } = useGlobalState();
  const { professions, professionsLoading, error } = useProfessionList(
    listURL,
    currentPage,
  );

  const showModal = () => {
    setOpen(true);
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

  const handleAdd = async (data: FormData) => {
    try {
      setLoading(true);
      const res = await addAction(createURL, data);
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

  const handleEdit = async (data: FormData) => {
    try {
      setEditLoading(true);
      const payload = {
        label: data.label,
        value: selectedItem?.value,
        ababil_sbs_code: data.ababil_sbs_code,
        finacle_sbs_code: data.finacle_sbs_code,
        ...(isRegularBusinessOrProfession(pageName)
          ? { risk_score: data?.risk_score, category_code: data?.category_code }
          : {}),
      };
      const res = await updateAction(updateURL, payload);
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
      setEditLoading(false);
      closeEditModal();
    }
  };

  const showAddBtn = checkPermission(pageName, info);

  if (professionsLoading) return <Loader />;

  console.log("Professions:", professions);
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="sm:text-lg lg:text-2xl font-medium">{pageTitle}</h1>
        <div>
          {showAddBtn ? (
            <PrimaryBtn
              type="button"
              variant="primary"
              loadingAll={loading}
              content={getBtnText(pageName)}
              onClick={showModal}
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

      {!loading && !error && professions?.data && (
        <>
          {(professions.data ?? []).length > 0 ? (
            <>
              <ProfessionTable
                data={professions.data}
                pageName={pageName}
                openModal={showEditModal}
                setSelectedItem={setSelectedItem}
              />
            </>
          ) : (
            <div className="py-8 text-center text-gray-500">No data found.</div>
          )}
        </>
      )}

      {open && (
        <Modal title={getAddContext(pageName)} closeModal={closeModal}>
          <ProfessionForm
            pageName={pageName}
            loading={loading}
            onSubmit={handleAdd}
            closeModal={closeModal}
          />
        </Modal>
      )}

      {openEditModal && (
        <Modal title={getUpdateContext(pageName)} closeModal={closeEditModal}>
          <ProfessionForm
            pageName={pageName}
            loading={editLoading}
            onSubmit={handleEdit}
            defaultValues={selectedItem!}
            closeModal={closeEditModal}
            isEdit={true}
          />
        </Modal>
      )}
    </div>
  );
};

export default Profession;
