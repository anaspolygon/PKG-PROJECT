'use client';

import React, { useState } from 'react';
import changeStatus from '../actions/ChangeStatus';
import { toast } from 'sonner';

interface UserStatusChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: number;
  currentStatus?: number;
  onUserUpdated: () => void;
}

const StatusChangeModal: React.FC<UserStatusChangeModalProps> = ({
  isOpen,
  onClose,
  userId,
  currentStatus,
  onUserUpdated,
}) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  if (!isOpen || userId === undefined || currentStatus === undefined) return null;


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      setIsPending(true);
      const newStatus = currentStatus === 1 ? 0 : 1;
      const res = await changeStatus(userId, newStatus);
      onUserUpdated();
      if (res.success) {
        toast.success(res.message || "Status updated successfully!");
        onClose();
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred.";
      toast.error(message);
    }
    setIsPending(false);
  };

  return (
    <div className="overflow-y-auto max-h-screen">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
          <h2 className="text-xl font-semibold mb-3">Change User Status</h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to {currentStatus === 1 ? 'deactivate' : 'activate'} this user?
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                No
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="px-4 py-2 bg-[#003970] text-white rounded-lg hover:bg-blue-800 disabled:opacity-50"
              >
                {isPending ? 'Changing..' : 'Yes' }
              </button>
            </div>
          </form>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusChangeModal;
