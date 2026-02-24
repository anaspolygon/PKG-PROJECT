import FailedAPISection from "./components/FailedAPISection";

export default async function page() {
  return (
    <div className="flex flex-col gap-8">
      <FailedAPISection />
    </div>
  );
}
