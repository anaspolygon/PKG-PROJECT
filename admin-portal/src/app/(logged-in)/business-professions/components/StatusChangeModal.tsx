"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import changeStatus from "../actions/ChangeStatus";
import { useRouter } from "next/navigation";

interface UserStatusChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  id?: number;
  currentStatus?: boolean | number;
  onUpdated: () => void;
  term?: string;
}

const StatusChangeModal: React.FC<UserStatusChangeModalProps> = ({
  isOpen,
  onClose,
  id,
  currentStatus,
  onUpdated,
  term,
}) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const router = useRouter();
  if (!isOpen || id === undefined || currentStatus === undefined) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsPending(true);
      const newStatus = !currentStatus;
      const res = await changeStatus(id, newStatus);
      onUpdated();
      if (res.success) {
        toast.success(res.message || "Status updated successfully!");
        onClose();
      } else {
        toast.error(res.message || "Failed to update branch.");
        if (res.code === 401) {
          router.push("/auth/login");
        }
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.";
      toast.error(message);
    }
    setIsPending(false);
  };

  return (
    <div className="overflow-y-auto max-h-screen">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
          <h2 className="text-xl font-medium mb-2">Change Status</h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to {currentStatus ? "deactivate" : "activate"}{" "}
            this {term}?
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 font-medium cursor-pointer"
              >
                No
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="px-4 py-2 bg-[#003970] text-white rounded-lg hover:bg-blue-800 disabled:opacity-50 font-medium cursor-pointer"
              >
                {isPending ? "Changing.." : "Yes"}
              </button>
            </div>
          </form>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl cursor-pointer"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusChangeModal;
