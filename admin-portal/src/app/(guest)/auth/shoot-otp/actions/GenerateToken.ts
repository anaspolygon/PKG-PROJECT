"use server";

import { primaryApi } from "@/api/ApiClient";
import { Token } from "../types/Types";

export default async function generateToken(): Promise<Token> {
  const response = await primaryApi.get<Token>(`/token/generate`);
  return response;
}