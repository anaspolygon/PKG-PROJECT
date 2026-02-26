import React from "react";
import { ApplicationDetailsWapper } from "@your-org/application-details";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const url = `${process.env.NEXT_API_ADMIN_BASE_URL}/api/application/${id}`;
  return (
    <ApplicationDetailsWapper
      url={url}
      apiKey={process.env.NEXT_API_KEY as string}
    />
  );
};

export default Page;
