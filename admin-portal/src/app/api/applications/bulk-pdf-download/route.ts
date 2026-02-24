import { TokenManager } from "@/api/TokenManager";
import config from "@/types/Config";

export async function POST(req: Request) {
  const body = await req.json();
  const ids: number[] = body.ids;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return new Response("Missing ids", { status: 400 });
  }

  const uri = `/admin/applications/pdf-download-bulk`;

  const res = await fetch(config.makeApiUrl("admin", uri), {
    method: "POST",
    headers: {
      Accept: "application/zip",
      "Content-Type": "application/json",
      Authorization: `Bearer ${await TokenManager.get()}`,
    },
    body: JSON.stringify({ application_ids: ids }),
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
    },
  });
}
