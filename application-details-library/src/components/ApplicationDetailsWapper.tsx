"use client";
import { useEffect, useState } from "react";
import ApplicationDetails from "./ApplicationDetails";
import Loader from "./Loader";
import PrimaryBtn from "./PrimaryBtn";

interface ApplicationDetailsWrapperProps {
  id?: string | number;
  url?: string;
  preloadUrl?: string;
  preloadKey?: string;
  showActionsBtn?: boolean;
  loadingApprove?: boolean;
  loadingReject?: boolean;
  handleApprove?: () => void;
  handleReject?: () => void;
  apiKey: string;
}

export default function ApplicationDetailsWapper({
  id,
  url,
  preloadUrl,
  preloadKey,
  showActionsBtn,
  loadingApprove,
  loadingReject,
  handleApprove,
  handleReject,
  apiKey,
}: ApplicationDetailsWrapperProps) {
  const [application, setApplication] = useState({});
  const [loading, setLoading] = useState(true);

  const defaultUrl = `${process.env.NEXT_PUBLIC_API_ADMIN_BASE_URL}/api/application/${id}`;
  const defaultPreloadUrl = `${process.env.NEXT_PUBLIC_API_ADMIN_BASE_URL}/api/preload-data`;

  const apiUrl = url || defaultUrl;
  const apiPreload = preloadUrl || defaultPreloadUrl;

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await fetch(apiUrl, {
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
  }, [url, apiKey]);

  useEffect(() => {
    const callPreloadApi = async () => {
      try {
        const res = await fetch(apiPreload, {
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
        if (localPreload.version !== preload.version) {
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
      <ApplicationDetails
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
              loadingAll={loadingApprove as boolean}
              loadingContent={"Rejecting..."}
            />
          </>
        ) : null}
      </div>
    </>
  );
}
