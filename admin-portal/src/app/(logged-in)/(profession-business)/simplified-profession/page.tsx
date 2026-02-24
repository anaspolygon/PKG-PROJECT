import Profession from "../components/Profession";

export default async function page() {
  const listURL = "/admin/professions/simplified";
  const createURL = "/admin/professions/simplified";
  const updateURL = "/admin/professions/simplified";
  return (
    <div className="flex flex-col gap-8">
      <Profession
        pageTitle="Simplified Profession List"
        pageName="simplified-profession"
        listURL={listURL}
        createURL={createURL}
        updateURL={updateURL}
      />
    </div>
  );
}
