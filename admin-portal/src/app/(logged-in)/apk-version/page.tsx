import ApkVersionSection from "./components/ApkVersionSection";

export default async function page() {
  return (
    <div className="flex flex-col gap-8">
      <ApkVersionSection />
    </div>
  );
}
