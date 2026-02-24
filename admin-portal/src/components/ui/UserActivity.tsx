"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
interface Props {
  sectionSlug: string;
  sessionTime: number;
}
const UserActivity = ({ sectionSlug, sessionTime }: Props) => {
  const router = useRouter();
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (sectionSlug && sessionTime) {
      timeout = setTimeout(() => {
        localStorage.removeItem(sectionSlug);
        router.push("/onboarding");
      }, sessionTime * 1000);
    }
    return () => clearTimeout(timeout as NodeJS.Timeout);
  }, [sectionSlug, sessionTime]);
  return null;
};

export default UserActivity;
