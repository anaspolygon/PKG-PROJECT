"use server";
import { adminApi } from "@/api/ApiClient";

const getPendingCount = async () => {
  return await adminApi.get<number>("/admin/maker-checker/pending-count");
};

export default getPendingCount;
