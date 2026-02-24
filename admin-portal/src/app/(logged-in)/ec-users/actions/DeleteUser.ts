"use server";
import { adminApi } from "@/api/ApiClient";
import { DefaultFormActionResult } from "@/types/Form";

export default async function deleteEcUser(
  userId: number
): Promise<DefaultFormActionResult> {
  try {
    await adminApi.del(`/ec-users/${userId}`);
    return { success: true, message: "User deleted successfully!" };
  } catch {
    return { success: false, message: "Failed to delete user." };
  }
}
