import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/components/layouts/GlobalContext";
import approveOrRejectAction from "../actions/approveOrRejectAction";
import PrimaryBtn from "@/components/buttons/PrimaryBtn";
interface Props {
  actionId: number | null;
  closeModal: () => void;
  fetchCheckerMaker: () => void;
  modalType: "reject" | "remake";
}

const RejectionModal = ({
  actionId,
  closeModal,
  fetchCheckerMaker,
  modalType,
}: Props) => {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const { fetchPendingCount } = useGlobalState();
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    const payload =
      modalType === "reject"
        ? {
            action_type: "rejected",
            rejection_reason: reason,
          }
        : {
            action_type: "remake",
            rejection_reason: reason,
          };

    const res = await approveOrRejectAction(actionId, "reject", payload);
    if (res.success) {
      toast.success(res.message);
      setReason("");
      fetchCheckerMaker();
      fetchPendingCount();
      closeModal();
    } else {
      if(res.code === 401){
        router.push("/auth/login");
      }
      toast.error(res.message);
      setReason("");
    }
    setLoading(false);
  };

  const modalConfig = {
    reject: {
      title: "Rejection reason",
      placeholder: "Enter rejection reason",
      buttonText: "Submit",
    },
    remake: {
      title: "Remake reason",
      placeholder: "Enter remake reason",
      buttonText: "Submit",
    },
  };

  const config = modalConfig[modalType];
  const MAX_LENGTH = 500;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={closeModal}
      />

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all">
          {/* Header */}
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {config.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Please provide a detailed reason
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-2xl transition-all duration-200 cursor-pointer"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="px-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <textarea
                rows={10}
                name={
                  modalType === "reject" ? "rejection_reason" : "remake_reason"
                }
                value={reason}
                onChange={(e) => {
                  if (e.target.value.length <= MAX_LENGTH) {
                    setReason(e.target.value);
                  }
                }}
                required
                maxLength={MAX_LENGTH}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder={config.placeholder}
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                {reason.length} characters
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 rounded-b-2xl flex items-center justify-end gap-3">
            <PrimaryBtn
              onClick={closeModal}
              variant="secondary"
              loadingAll={false}
              content="Cancel"
            />
            <PrimaryBtn
              onClick={handleSubmit}
              variant="primary"
              loadingAll={loading}
              content={config.buttonText}
              loadingContent="Submitting..."
              disabled={loading || reason.trim() === ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RejectionModal;
