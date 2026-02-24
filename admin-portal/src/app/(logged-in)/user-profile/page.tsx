import { adminApi } from "@/api/ApiClient";
import UserProfile from "./UserProfile";
import { User } from "./Types";

const Page = async () => {
  const res = await adminApi.get<User>("/profile");
  return (
    <div className="bg-white shadow rounded-xl p-6 sm:mt-8 md:mt-8 lg:mt-0">
      <h1 className="text-2xl font-medium mb-4">User Profile</h1>
      <UserProfile user={res} />
    </div>
  );
};

export default Page;
