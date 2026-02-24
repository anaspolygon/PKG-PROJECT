import UserSection from "./components/UserSection";

export default async function page() {

  return (
    <div className="flex flex-col gap-8">
      <UserSection />
    </div>
  )
}