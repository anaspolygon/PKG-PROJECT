import { logout } from "@/hooks/logout";
import { NextResponse } from "next/server";
export async function POST() {
  try {
    await logout();
    return NextResponse.json({ success: true });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
