"use client";
import React from "react";
import { getNidNo } from "../helpers/ApplicationDetailsHelper";
import CollapsibleSectionsContainer from "./CollapsibleSection";
import { ApplicationDetailsRoot } from "../types/ApplicationDetailsType";
import { AddressData } from "./Address";

export interface ApplicationDetailsProps {
  application: ApplicationDetailsRoot;
  preloadKey?: string;
  title?: string;
  showTitle?: boolean;
}

const ApplicationDetails: React.FC<ApplicationDetailsProps> = ({
  application,
  preloadKey,
  title = "Application Details",
  showTitle = true,
}) => {
  const nidNo = getNidNo(application?.application_data);

  return (
    <div>
      {showTitle && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
          <hr className="text-gray-300 py-2" />
        </>
      )}
      <div className="flex flex-col gap-4">
        <CollapsibleSectionsContainer
          application={application}
          nidNo={nidNo}
          preloadKey={preloadKey}
        />
      </div>
    </div>
  );
};

export default ApplicationDetails;
