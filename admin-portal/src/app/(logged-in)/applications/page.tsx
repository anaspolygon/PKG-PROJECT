import { ApplicationSection } from "@polygontech/application-details";

const page = () => {
  return (
    <div className="flex flex-col gap-8">
      <ApplicationSection apiKey={process.env.NEXT_API_KEY as string} />
    </div>
  );
};

export default page;
