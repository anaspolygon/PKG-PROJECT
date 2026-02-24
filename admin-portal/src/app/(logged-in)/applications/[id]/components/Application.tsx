"use client";

import { ApplicationDetailsServer } from "@your-org/application-details";

const APPLICATION_DETAILS_ENDPOINT = "/api/applications";

interface ApplicationDetailsPageProps {
  id: string;
}

export default  function ApplicationDetailsPage({
  id,
}: ApplicationDetailsPageProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Application Details</h1>
      </div>
      <hr className="text-gray-300 py-2" />
      <div className="flex flex-col gap-4">
        <ApplicationDetailsServer
          endpoint={APPLICATION_DETAILS_ENDPOINT}
          id={id}
          addressData={undefined}
          title={undefined}
          showTitle={false}
        />
      </div>
    </div>
  );
}

