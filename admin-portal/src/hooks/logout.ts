"use server";
import { TokenManager } from "@/api/TokenManager";
import { redirect } from "next/navigation";

export const logout = async () => {
  await TokenManager.remove();
  redirect("/auth/login");
};
