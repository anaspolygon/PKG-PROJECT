import { Download, Plus, RefreshCw, Upload } from "lucide-react";
import classNames from "classnames";

interface PrimaryBtnProps {
  onClick?: () => void;
  loadingAll: boolean;
  icon?: string;
  content?: string;
  loadingContent?: string;
  variant?: "primary" | "secondary" | "success" | "danger";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const PrimaryBtn = ({
  onClick,
  loadingAll,
  icon,
  content,
  loadingContent,
  variant,
  type,
  disabled,
}: PrimaryBtnProps) => {
  return (
    <button
      type={type || "button"}
      onClick={type !== "submit" ? onClick : undefined}
      disabled={loadingAll || disabled}
      className={classNames(
        "flex sm:text-sm items-center gap-2 text-center justify-center sm:px-2 sm:py-2 md:px-3 md:py-2 lg:px-3 lg:py-2 rounded-sm font-medium transition-all duration-300 ease-in-out",
        {
          // Secondary variant - enabled
          "border border-[#ed1c24] text-[#ed1c24] hover:text-white bg-white hover:bg-[#ed1c24] cursor-pointer":
            variant === "secondary" && !loadingAll && !disabled,
          // Secondary variant - disabled/loading
          "border border-[#d1d5db] text-[#9ca3af] bg-[#f3f4f6] cursor-not-allowed":
            variant === "secondary" && (loadingAll || disabled),

          // Success variant - enabled
          "text-[#22c55e] bg-[#dcfce7] hover:bg-[#22c55e] hover:text-white cursor-pointer":
            variant === "success" && !loadingAll && !disabled,
          // Success variant - disabled/loading
          "text-[#22c55e] bg-[#dcfce7] cursor-not-allowed opacity-60":
            variant === "success" && (loadingAll || disabled),

          // Primary variant - enabled
          "text-white bg-[#ed1c24] hover:bg-[#c0141b] cursor-pointer":
            (variant === "primary" || !variant) && !loadingAll && !disabled,
          // Primary variant - disabled/loading
          "text-white bg-[#9ca3af] cursor-not-allowed":
            (variant === "primary" || !variant) && (loadingAll || disabled),

          // Danger variant - enabled
          "text-[#ef4444] bg-[#fee2e2] hover:bg-[#ef4444] hover:text-white cursor-pointer":
            variant === "danger" && !loadingAll && !disabled,
          // Danger variant - disabled
          "text-[#ef4444] bg-[#fee2e2] cursor-not-allowed opacity-60":
            variant === "danger" && (loadingAll || disabled),
        },
      )}
      title={content}
    >
      {/* Spinner shown during loading */}
      {loadingAll && (
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}

      {/* Icons shown when not loading */}
      {!loadingAll && icon === "download" && <Download size={16} />}
      {!loadingAll && icon === "plus" && <Plus size={16} />}
      {!loadingAll && icon === "upload" && <Upload size={16} />}
      {!loadingAll && icon === "retry" && <RefreshCw className="w-4 h-4" />}

      {loadingAll ? loadingContent : content}
    </button>
  );
};

export default PrimaryBtn;
