import { Eye, Pencil, RefreshCw, StickyNote, Trash } from "lucide-react";
import classnames from "classnames";
interface ActionBtnProps {
  type?: string;
  isLoading?: boolean;
  disabled?:boolean
  onClick: () => void;
}
const ActionBtn = ({ type, isLoading, disabled = false, onClick }: ActionBtnProps) => {
  return (
    <>
      {/* <div className="flex gap-3 justify-center items-center"> */}
      <button
        disabled={disabled}
        className={classnames(
          "px-2 py-2 rounded-md shadow flex items-center transform transition-all duration-300 ease-in-out",
          {
            "bg-purple-100 text-purple-500 hover:bg-purple-400 hover:text-white cursor-pointer":
              type === "view" || type === "note",
            "bg-blue-100 text-blue-500 hover:bg-blue-400 hover:text-white cursor-pointer":
              (type === "edit" || type === "retry") && !disabled,
            "bg-red-100 text-red-500 hover:bg-red-400 hover:text-white cursor-pointer":
              type === "delete",
            "bg-gray-200 text-gray-400 cursor-not-allowed":
            type === "retry" && disabled,
          },
        )}
        title={
          type === "view"
            ? "View Details"
            : type === "delete"
              ? "Delete"
              : type === "retry"
                ? "Retry"
                : "Edit Details"
        }
        onClick={onClick}
      >
        {type === "view" ? (
          <Eye className="w-4 h-4" />
        ) : type === "delete" ? (
          <Trash className="w-4 h-4" />
        ) : type === "note" ? (
          <StickyNote className="w-4 h-4" />
        ) : type === "retry" ? (
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
        ) : (
          <Pencil className="w-4 h-4" />
        )}
      </button>
      {/* </div> */}
    </>
  );
};

export default ActionBtn;
