import Profession from "../components/Profession";

export default async function page() {
  const listURL = "/admin/business/regular";
  const createURL = "/admin/business/regular";
  const updateURL = "/admin/business/regular";
  return (
    <div className="flex flex-col gap-8">
      <Profession
        pageTitle="Regular Business List"
        pageName="regular-business"
        listURL={listURL}
        createURL={createURL}
        updateURL={updateURL}
      />
    </div>
  );
}
