import { NextResponse } from "next/server";
import getApplication from "@/app/(logged-in)/applications/[id]/actions/GetApplicationDetails";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const data = await getApplication(params.id);

  const status =
    typeof data?.code === "number" && data.code >= 400 ? data.code : 200;

  return NextResponse.json(data, { status });
}

