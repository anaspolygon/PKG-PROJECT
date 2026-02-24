import ApiManagementSection from "./components/ApiManagementSection";

export default async function page() {
  return (
    <div className="flex flex-col gap-8">
      <ApiManagementSection />
    </div>
  );
}
