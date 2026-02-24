"use client";
import { useRouter } from "next/navigation";
import Layout from "./components/Layout";
import { User } from "./components/Types";
import { useEffect } from "react";

interface Props {
  user: User;
  setPasswordKey: string | undefined;
  error: string;
  token?: string;
  type?: string;
}

const RootPage = ({ user, setPasswordKey, error,token,type }: Props) => {
  const router = useRouter();
  useEffect(() => {
    if (user.value && setPasswordKey && token && type) {
      localStorage.setItem("user", JSON.stringify(user));
      router.push(`/user/otp?key=${setPasswordKey}&token=${token}&type=${type}`);
    }
  }, [user, setPasswordKey, router,token,type]);
  return (
    <Layout title="Error" className="w-[500px]">
      <p className="text-center text-red-500">{error}</p>
    </Layout>
  );
};

export default RootPage;
