import { ApplicationDetailsWapper } from "@your-org/application-details";

export default function ApplicationDetailsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Application Details</h1>
      </div>
      <hr className="text-gray-300 py-2" />
      <div className="flex flex-col gap-4">
        <ApplicationDetailsWapper />
      </div>
    </div>
  );
}
