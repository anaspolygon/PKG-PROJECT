"use server";
import AuthManager from "@/services/AuthManager";

export const chekLoggedIn = async () => {
  return await AuthManager.isLoggedIn();
};
