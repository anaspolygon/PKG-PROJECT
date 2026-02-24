import { adminApi } from "@/api/ApiClient";
import RootPage from "./RootPage";
import { User } from "./components/Types";

interface PageProps {
  searchParams: Promise<{ key?: string; token?: string; type?: string }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const { key, token, type } = await searchParams;
  let res: User = {
    mobile:"",
    email: "",
    api_token: "",
    otp_response: { success: false, message: "", retry_after: 0 },
    value: false,
  };
  let error = "";
  try {
    const apiRes = await adminApi.post<User>("/validate-user-token", {
      key,
      token,
      type,
    });
    res = apiRes;
  } catch (err) {
    if (err instanceof Error) {
      error = err.message;
    }
    if (typeof err === "string") {
      error = err;
    }
  }
  return <RootPage user={res} setPasswordKey={key} token={token} type={type} error={error} />;
};

export default Page;
