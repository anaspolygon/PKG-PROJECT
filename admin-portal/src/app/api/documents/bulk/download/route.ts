import { TokenManager } from "@/api/TokenManager";
import config from "@/types/Config";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ids = searchParams.get("ids");

  if (!ids) {
    return new Response("Missing ids", { status: 400 });
  }
  const uri = `/admin/applications/documents/download?ids=${ids}`;
  const res = await fetch(config.makeApiUrl("admin", uri), {
    method: "GET",
    headers: {
      Accept: "application/zip",
      Authorization: `Bearer ${await TokenManager.get()}`,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    return new Response("Download failed", { status: res.status });
  }

  const arrayBuffer = await res.arrayBuffer();

  return new Response(arrayBuffer, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": 'attachment; filename="documents.zip"',
      "Content-Length": arrayBuffer.byteLength.toString(),
    },
  });
}
