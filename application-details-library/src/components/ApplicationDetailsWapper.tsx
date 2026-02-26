"use client";
import { useEffect, useState } from "react";
import ApplicationDetails from "./ApplicationDetails";
import Loader from "./Loader";

interface ApplicationDetailsWrapperProps {
  url: string;
  apiKey: string;
  preloadKey?: string;
}

export default function ApplicationDetailsWapper({
  url,
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
