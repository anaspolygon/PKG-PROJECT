"use client";
import { useEffect, useState } from "react";
import ApplicationDetails from "./ApplicationDetails";
import Loader from "./Loader";

interface ApplicationDetailsWrapperProps {
  url: string;
  preloadUrl: string;
  apiKey: string;
  preloadKey?: string;
}

export default function ApplicationDetailsWapper({
  url,
  preloadUrl,
  apiKey,
  preloadKey,
}: ApplicationDetailsWrapperProps) {
  const [application, setApplication] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await fetch(url, {
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
    <ApplicationDetails
      application={application}
      preloadKey={preloadKey}
      title="Application Details"
      showTitle={false}
    />
  );
}
