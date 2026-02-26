import { ApplicationSection } from "@your-org/application-details";

const page = () => {
  return (
    <div className="flex flex-col gap-8">
      <ApplicationSection
        url={`${process.env.NEXT_API_ADMIN_BASE_URL}/api/admin/applications`}
        apiKey={process.env.NEXT_API_KEY as string}
      />
    </div>
  );
};

export default page;
