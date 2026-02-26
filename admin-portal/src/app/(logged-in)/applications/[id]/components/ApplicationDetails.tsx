import { ApplicationDetailsWapper } from "@your-org/application-details";

export default async function ApplicationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const url = `${process.env.NEXT_API_ADMIN_BASE_URL}/api/application/${id}`;
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Application Details</h1>
      </div>
      <hr className="text-gray-300 py-2" />
      <div className="flex flex-col gap-4">
        <ApplicationDetailsWapper
          url={url}
          apiKey={process.env.NEXT_API_KEY as string}
        />
      </div>
    </div>
  );
}
