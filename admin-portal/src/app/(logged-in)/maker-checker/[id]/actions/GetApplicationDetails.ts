"use server";

import { adminApi } from "@/api/ApiClient";
import { ApplicationDetailsRoot } from "../types/ApplicationDetailsType";

export default async function getApplication(id:string): Promise<ApplicationDetailsRoot> {
  const response = await adminApi.get<ApplicationDetailsRoot>(`/applications/${id}`);

  return response;
}