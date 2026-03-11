"use client";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import PrimaryBtn from "./PrimaryBtn";
import ApplicationDetailsContainer from "./ApplicationDetailsContainer";

interface ApplicationDetailsProps {
  id: string | number;
  baseUrl: string;
  preloadKey?: string;
  showActionsBtn?: boolean;
  loadingApprove?: boolean;
  loadingReject?: boolean;
  handleApprove?: () => void;
  handleReject?: () => void;
  apiKey: string;
}

export default function ApplicationDetails({
  id,
  baseUrl,
  preloadKey,
  showActionsBtn,
  loadingApprove,
  loadingReject,
  handleApprove,
  handleReject,
  apiKey,
}: ApplicationDetailsProps) {
  const [application, setApplication] = useState({});
  const [loading, setLoading] = useState(true);

  const detailsUrl = `${baseUrl}/api/application/${id}`;
  const preloadUrl = `${baseUrl}/api/preload-data`;

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await fetch(detailsUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
          },
        });
        const data = await res.json();
        setApplication(data);
      } catch (error) {
        console.error("Error fetching application:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplication();
  }, [detailsUrl, apiKey]);

  useEffect(() => {
    const callPreloadApi = async () => {
      try {
        const res = await fetch(preloadUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
          },
        });
        const preload = await res.json();
        const localPreload = JSON.parse(
          localStorage.getItem("preload") as string,
        );

        if (localPreload && localPreload.version !== preload.version) {
          localStorage.removeItem("preload");
          localStorage.setItem("preload", JSON.stringify(preload));
        }
        if (!localPreload) {
          localStorage.setItem("preload", JSON.stringify(preload));
        }
      } catch (error) {
        console.error("Error fetching application:", error);
      }
    };
    callPreloadApi();
  }, [preloadUrl, apiKey]);

  if (loading) return <Loader />;
  return (
    <>
      <ApplicationDetailsContainer
        application={application}
        preloadKey={preloadKey}
        title="Application Details"
        showTitle={false}
      />
      <div className="flex mt-5 justify-end items-center gap-2">
        {showActionsBtn ? (
          <>
            <PrimaryBtn
              onClick={handleApprove}
              variant="success"
              content="Approve"
              loadingAll={loadingApprove as boolean}
              loadingContent={"Approving..."}
            />
            <PrimaryBtn
              onClick={handleReject}
              variant="danger"
              content="Reject"
              loadingAll={loadingReject as boolean}
              loadingContent={"Rejecting..."}
            />
          </>
        ) : null}
      </div>
    </>
  );
}
