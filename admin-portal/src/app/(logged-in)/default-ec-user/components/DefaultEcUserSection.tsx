"use client";

import Loader from "@/app/components/Loader";
import useGetDefaultEcUser from "../hooks/useGetDefaultEcUser";
import DefaultEcUserTable from "./DefaultEcUserTable";

const DefaultEcUserSection = () => {
  const { defaultEcUser, loading, error, fetchDefaultEcUser } =
    useGetDefaultEcUser();

  return (
    <div className="flex flex-col  gap-6 bg-white shadow rounded-xl p-6 w-full sm:mt-8 md:mt-8 lg:mt-0">
      <div className="flex justify-between items-center">
        <h1 className="sm:text-lg lg:text-2xl font-medium">EC User</h1>
      </div>

      <hr className="text-gray-300" />

      {loading && <Loader />}

      {error && (
        <div className="py-8 text-center">
          <p className="text-red-500 font-medium">
            Failed to load default ec user.
          </p>
          <p className="text-gray-500 mt-1">
            Please try again later or contact support.
          </p>
        </div>
      )}

      {!loading && !error && defaultEcUser && (
        <DefaultEcUserTable
          user={defaultEcUser}
          onUserUpdated={fetchDefaultEcUser}
        />
      )}
    </div>
  );
};

export default DefaultEcUserSection;
