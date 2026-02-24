import { TokenManager } from "@/api/TokenManager";
import config from "@/types/Config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const uri = `/admin/applications/${id}/pdf`;

    const res = await fetch(config.makeApiUrl("admin", uri), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await TokenManager.get()}`,
      },
      body: null,
    });

    console.log("PDF download response:", res);

    if (!res.ok) {
      const errorText = await res.text();
      console.log("PDF download error:", errorText);
      return NextResponse.json(
        { message: errorText || "PDF download failed" },
        { status: res.status }
      );
    }


    const pdfBuffer = await res.arrayBuffer();

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="application-${id}.pdf"`,
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
