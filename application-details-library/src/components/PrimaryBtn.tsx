import { Download, Plus, RefreshCw, Upload } from "lucide-react";
import classNames from "classnames";

interface PrimaryBtnProps {
  onClick?: () => void;
  loadingAll?: boolean;
  icon?: "download" | "plus" | "upload" | "retry";
  content?: string;
  loadingContent?: string;
  variant?: "primary" | "secondary" | "success" | "danger";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const PrimaryBtn = ({
  onClick,
  loadingAll = false,
  icon,
  content,
  loadingContent = "Loading...",
  variant = "primary",
  type = "button",
  disabled = false,
}: PrimaryBtnProps) => {
  const isDisabled = loadingAll || disabled;

  return (
    <button
      type={type}
      onClick={type !== "submit" ? onClick : undefined}
      disabled={isDisabled}
      className={classNames(
        "flex! items-center! justify-center! gap-2 rounded-sm font-medium transition-all duration-300 ease-in-out sm:text-sm sm:px-2 sm:py-2 md:px-3 md:py-2 lg:px-3 lg:py-2",
        {
          // Secondary
          "border! border-[#ed1c24]! text-[#ed1c24]! bg-white! hover:bg-[#ed1c24]! hover:text-white! cursor-pointer!":
            variant === "secondary" && !isDisabled,
          "border! border-gray-300! text-gray-400! bg-gray-100! cursor-not-allowed!":
            variant === "secondary" && isDisabled,

          // Success
          "text-[#22c55e]! bg-[#dcfce7]! hover:bg-[#22c55e]! hover:text-white! cursor-pointer!":
            variant === "success" && !isDisabled,
          "text-[#22c55e]! bg-[#dcfce7]! opacity-60! cursor-not-allowed!":
            variant === "success" && isDisabled,

          // Primary
          "text-white! bg-[#ed1c24]! hover:bg-[#c0141b]! cursor-pointer!":
            variant === "primary" && !isDisabled,
          "text-white! bg-gray-400! cursor-not-allowed!":
            variant === "primary" && isDisabled,

          // Danger
          "text-[#ef4444]! bg-[#fee2e2]! hover:bg-[#ef4444]! hover:text-white! cursor-pointer!":
            variant === "danger" && !isDisabled,
          "text-[#ef4444]! bg-[#fee2e2]! opacity-60! cursor-not-allowed!":
            variant === "danger" && isDisabled,
        },
      )}
      title={content}
    >
      {loadingAll && (
        <svg className="w-4 h-4 animate-spin!" fill="none" viewBox="0 0 24 24">
          <circle
            className="opacity-25!"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75!"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}

      {!loadingAll && icon === "download" && <Download size={16} />}
      {!loadingAll && icon === "plus" && <Plus size={16} />}
      {!loadingAll && icon === "upload" && <Upload size={16} />}
      {!loadingAll && icon === "retry" && <RefreshCw className="w-4 h-4" />}

      {loadingAll ? loadingContent : content}
    </button>
  );
};

export default PrimaryBtn;
