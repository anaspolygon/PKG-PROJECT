"use client";

import React, { useState } from "react";
import Select from "react-select";
import { toast } from "sonner";
import changeStatus from "../actions/ChangeStatus";
import { useGlobalState } from "@/components/layouts/GlobalContext";
import { User } from "../types/UserTypes";


interface UserStatusChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: number;
  currentStatus?: string;
  onUserUpdated: () => void;
  selectedUser: User;
}

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "locked", label: "Locked" },
  { value: "closed", label: "Closed" },
];

const StatusChangeModal: React.FC<UserStatusChangeModalProps> = ({
  isOpen,
  onClose,
  userId,
  currentStatus,
  onUserUpdated,
  // selectedUser
}) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [comments, setComments] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { fetchPendingCount } = useGlobalState();

  const [selectedStatus, setSelectedStatus] = useState<{
    value: string;
    label: string;
  } | null>(null);

  if (!isOpen || userId === undefined || currentStatus === undefined)
    return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStatus) return;
    try {
      setIsPending(true);
      const res = await changeStatus(userId, selectedStatus.value, comments);
      onUserUpdated();
      if (res.success) {
        fetchPendingCount();
        toast.success(res.message || "Status updated successfully!");
        onClose();
      }
      if(!res.success) {
        toast.error(res.message || "Something went wrong.");
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
          <h2 className="text-xl font-medium mb-3">Change User Status</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Select Status <span className="text-red-500 font-bold">*</span>
              </label>
              <Select
                name="status"
                value={selectedStatus}
                onChange={(option) => setSelectedStatus(option)}
                options={statusOptions}
                placeholder="Select status"
                isClearable
                className="mt-1"
                classNamePrefix="react-select"
                components={{
                  IndicatorSeparator: () => null,
                }}
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: 42,
                    height: 42,
                    borderRadius: 8,
                  }),
                  input: (base) => ({
                    ...base,
                    margin: 0,
                    padding: 0,
                  }),
                  menu: (base) => ({
                    ...base,
                    maxHeight: 150,
                    overflowY: "auto",
                  }),
                  menuList: (base) => ({
                    ...base,
                    paddingTop: 0,
                    paddingBottom: 0,
                    maxHeight: 150,
                  }),
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Reason <span className="text-red-500 font-bold">*</span>
              </label>
              <textarea
                rows={5}
                name="comments"
                value={comments}
                onChange={(e) => {
                  if (e.target.value.length > 250) {
                    setError(
                      "The comments field must not be greater than 250 characters."
                    );
                    return;
                  }
                  setError(null);
                  setComments(e.target.value);
                }}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write Reason"
              />
              {error ? <p className="text-red-600 text-sm">{error}</p> : null}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  isPending ||
                  comments === "" ||
                  !selectedStatus ||
                  error !== null
                }
                className="px-4 py-2 bg-[#003970] text-white rounded-lg hover:bg-blue-800 disabled:opacity-50 cursor-pointer font-medium"
              >
                {isPending ? "Submitting..." : "Submit"}
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
