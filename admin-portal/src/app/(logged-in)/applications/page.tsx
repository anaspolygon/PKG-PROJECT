import React from "react";
import ApplicationSection from "./components/ApplicationSection";

const page = () => {
  const key = Math.random().toString();
  return (
    <div className="flex flex-col gap-8">
      <ApplicationSection key={key} />
    </div>
  );
};

export default page;
