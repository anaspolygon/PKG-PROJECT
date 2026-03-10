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
    <>
      <button
        type={type || "button"}
        onClick={type !== "submit" ? onClick : undefined}
        disabled={loadingAll || disabled}
        className={classNames(
          "flex sm:text-sm  items-center gap-2 text-center  justify-center",
          {
            // Secondary variant - enabled
            "border border-primary text-primary hover:text-white bg-white hover:bg-primary cursor-pointer":
              variant === "secondary" && !loadingAll && !disabled,
            // Secondary variant - disabled/loading
            "border border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed":
              variant === "secondary" && (loadingAll || disabled),
            // Success variant - enabled
            "text-green-500 bg-green-100 hover:bg-green-500 hover:text-white  transform cursor-pointer transition-all duration-300 ease-in-out":
              variant === "success" && !loadingAll && !disabled,
            // Success variant - disabled/loading
            "text-green-500 bg-green-100 cursor-not-allowed":
              variant === "success" && (loadingAll || disabled),
            // Primary variant - enabled
            "text-white bg-primary hover:bg-red-700 cursor-pointer":
              (variant === "primary" || !variant) && !loadingAll && !disabled,
            // Primary variant - disabled/loading
            "text-white bg-gray-400 cursor-not-allowed":
              (variant === "primary" || !variant) && (loadingAll || disabled),
            "text-red-500 bg-red-100 hover:bg-red-500 hover:text-white  transform cursor-pointer transition-all duration-300 ease-in-out":
              (variant === "danger" || !variant) && !loadingAll && !disabled,
            "text-red-500 bg-red-100 transform cursor-not-allowed":
              (variant === "danger" || !variant) && !loadingAll && disabled,
          },
          "sm:px-2 sm:py-2 md:px-3 md:py-2 lg:px-3 lg:py-2 rounded-sm font-medium transition-all duration-300 ease-in-out",
        )}
        title={content}
      >
        {icon === "download" && <Download size={16} />}
        {icon === "plus" && <Plus size={16} />}
        {icon === "upload" && <Upload size={16} />}
        {icon === "retry" && (
          <RefreshCw
            className={`w-4 h-4 ${loadingAll ? "animate-spin" : ""}`}
          />
        )}
        {loadingAll ? loadingContent : content}
      </button>
    </>
  );
};

export default PrimaryBtn;
