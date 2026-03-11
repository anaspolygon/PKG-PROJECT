import { ApplicationDetails } from "@polygontech/application-details";
import "@polygontech/application-details/dist/index.css";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <ApplicationDetails
      baseUrl={process.env.NEXT_API_ADMIN_BASE_URL as string}
      id={id}
      showActionsBtn
      apiKey={process.env.NEXT_API_KEY as string}
    />
  );
};

export default Page;
