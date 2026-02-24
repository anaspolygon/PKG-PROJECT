import { toast } from "sonner";
import { DefaultFormActionResult } from "@/types";

interface Params {
  result: DefaultFormActionResult;
  onSuccessCallback?: () => void;
  onFailureCallback?: () => void;
  hideSuccessMsg?: boolean;
  hideErrorMsg?: boolean;
}
export const handleFormResponse = ({
  result,
  onFailureCallback,
  onSuccessCallback,
  hideSuccessMsg = false,
  hideErrorMsg = false,
}: Params) => {
  const { message, success } = result;
  if (message && typeof success === "boolean" && success) {
    if (!hideSuccessMsg) toast.success(message);
    onSuccessCallback?.();
  } else if (
    message &&
    typeof success === "boolean" &&
    !success &&
    !hideErrorMsg
  ) {
    if (!hideErrorMsg) toast.error(message);
    onFailureCallback?.();
  }
};

