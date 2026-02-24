"use server";

import { adminApi } from "@/api/ApiClient";
import { DefaultEcUser } from "../types/DefaultEcUserTypes";

export default async function getDefaultEcUser(): Promise<DefaultEcUser> {
  const response = await adminApi.get<DefaultEcUser>(`/ec-users/default`);
  return response;
}