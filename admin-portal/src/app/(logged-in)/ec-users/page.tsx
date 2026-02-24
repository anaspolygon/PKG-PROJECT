import { adminApi } from "@/api/ApiClient";
import UserSection from "./components/UserSection";
import { BranchList } from "./types/BranchTypes";

export default async function page() {
  const response = await adminApi.get<BranchList>("/branches/all");

  return (
    <div className="flex flex-col gap-8">
      <UserSection branchList={response ?? []} />
    </div>
  );
}
