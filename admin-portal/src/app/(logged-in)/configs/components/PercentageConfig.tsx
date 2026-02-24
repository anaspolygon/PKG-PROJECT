"use client";

import React from "react";
import PercentageList from "./PercentageList";
import usePercentageList from "../hooks/usePercentageList";
import Loader from "@/app/components/Loader";

const PercentageConfig = () => {
  const { percentageConfigs, loading, error } = usePercentageList();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="sm:text-lg lg:text-2xl font-medium">Percentage Config</h1>
      </div>

      <hr className="text-gray-300 py-2" />
      {loading && !error && <Loader />}

      {error && (
        <div className="py-8 text-center">
          <p className="text-red-500 font-medium">Failed to load configs.</p>
          <p className="text-gray-500 mt-1">
            Please try again later or contact support.
          </p>
        </div>
      )}

      {!loading && !error && percentageConfigs?.data && (
        <>
          {percentageConfigs.data.length > 0 ? (
            <>
              <PercentageList configs={percentageConfigs.data} />
            </>
          ) : (
            <div className="py-8 text-center text-gray-500">
              No config found.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PercentageConfig;
