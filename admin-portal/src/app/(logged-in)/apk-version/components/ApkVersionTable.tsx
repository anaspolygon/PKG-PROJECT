/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { ApkVersion } from "../types/ApkVersionTypes";
import { formatDateWithTime } from "@/utils/date";
import { ApkVersionFormData } from "./ApkVersionForm";
import Table from "@/components/ui/table";
import ActionBtn from "@/components/buttons/ActionBtn";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import ViewModal from "../../components/ViewModal";
interface ApkVersionTableProps {
  apkVersions: ApkVersion[];
  openEditModal: () => void;
  setSelectedItem: (item: ApkVersionFormData) => void;
  setSelectedItemId: (id: number) => void;
  handleDelete: (id: number) => void;
}

const ApkVersionTable = ({
  apkVersions,
  openEditModal,
  setSelectedItem,
  setSelectedItemId,
  handleDelete,
}: ApkVersionTableProps) => {
  const info = useLocalStorage("info");
  const [releaseNotes, setReleaseNotes] = useState("");
  const [openViewModal, setOpenViewModal] = useState(false);
  const columns = [
    { title: "Version", key: "version" as keyof ApkVersion },
    { title: "Download URL", key: "download_url" as keyof ApkVersion },
    {
      title: "Force Download",
      key: "is_mandatory" as keyof ApkVersion,
      render: (_: any, apk: ApkVersion) =>
        apk.force_download ? (
          <>
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-red-500 to-red-500 text-white shadow-sm">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              Yes
            </span>
          </>
        ) : (
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-400 text-white shadow-sm">
            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            No
          </span>
        ),
    },
    { title: "Created At", key: "created_at" as keyof ApkVersion },
    { title: "Updated At", key: "updated_at" as keyof ApkVersion },
    ...(info &&
    (info?.permissions.can_update_apk || info?.permissions.can_delete_apk)
      ? [
          {
            title: "Actions",
            key: "actions" as keyof ApkVersion,
            render: (_: any, apk: ApkVersion) => (
              <div className="flex justify-start items-center gap-2">
                {info && info?.permissions.can_update_apk ? (
                  <ActionBtn
                    onClick={() => {
                      openEditModal();
                      setSelectedItem({
                        version: apk.version,
                        downloadUrl: apk.download_url,
                        force_download: apk.force_download,
                        releaseNotes: apk.release_notes || "",
                      });
                      setSelectedItemId(apk.id);
                    }}
                    type="edit"
                  />
                ) : null}
                {info && info?.permissions.can_delete_apk ? (
                  <ActionBtn
                    onClick={() => handleDelete(apk.id)}
                    type="delete"
                  />
                ) : null}

                {apk.release_notes ? (
                  <ActionBtn
                    type="note"
                    onClick={() => {
                      setOpenViewModal(true);
                      setReleaseNotes(apk.release_notes!);
                    }}
                  />
                ) : null}
              </div>
            ),
          },
        ]
      : []),
  ];

  const apkVersionsData = (apkVersions ?? []).map((item) => ({
    ...item,
    created_at: formatDateWithTime(item.created_at),
    updated_at: formatDateWithTime(item.updated_at),
  }));

  return (
    <div>
      <Table columns={columns} dataSource={apkVersionsData} />
      {openViewModal && (
        <ViewModal
          label="Release Notes"
          value={releaseNotes}
          onClose={() => setOpenViewModal(false)}
        />
      )}
    </div>
  );
};

export default ApkVersionTable;
