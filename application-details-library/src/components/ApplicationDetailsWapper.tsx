"use client";
import { useEffect, useState } from "react";
import ApplicationDetails from "./ApplicationDetails";

export default function ApplicationDetailsWapper() {
  const [application, setApplication] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await fetch(
          "https://city-api.dev-polygontech.xyz/api/application/1",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-api-key":
                "mangeD01axB3sBDM3HwRmh2MmO4hQ5aXyXpCLOwp8QRYKymrgyCaaFwJciTgWqzz",
            },
          },
        );
        const data = await res.json();
        console.log("Fetched application data:", data);
        setApplication(data);
      } catch (error) {
        console.log(
          "Error fetching application:",
          (error as any)?.message || error,
        );
        console.error("Error fetching application:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplication();
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <ApplicationDetails
      application={application}
      title="Application Details"
      showTitle={false}
    />
  );
}
