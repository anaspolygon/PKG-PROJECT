import Profession from "../components/Profession";

export default async function page() {
  const listURL = "/admin/professions/regular";
  const createURL = "/admin/professions/regular";
  const updateURL = "/admin/professions/regular";
  return (
    <div className="flex flex-col gap-8">
      <Profession
        pageTitle="Regular Professions List"
        pageName="regular-profession"
        listURL={listURL}
        createURL={createURL}
        updateURL={updateURL}
      />
    </div>
  );
}
