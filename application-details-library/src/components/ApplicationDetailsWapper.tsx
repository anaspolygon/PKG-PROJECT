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
              Authorization:
                "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vb25ib2FyZGluZy1hcGkvYXBpL2FkbWluL2xvZ2luIiwiaWF0IjoxNzcxOTQxMzk4LCJleHAiOjE3NzE5NDMxOTgsIm5iZiI6MTc3MTk0MTM5OCwianRpIjoiY0t2R1dDcE1NczlCSXhrdSIsInN1YiI6IjMiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwibmFtZSI6IkFsIEFuYXMiLCJlbXBsb3llZV9pZCI6IkVNUC1BTkFTIiwicm9sZSI6bnVsbCwicGVybWlzc2lvbnMiOnsiaGFzX3N1cGVyX2FkbWluX3Blcm1pc3Npb24iOnRydWUsImNhbl9yZWFkX3JvbGUiOnRydWUsImNhbl9jcmVhdGVfcm9sZSI6dHJ1ZSwiY2FuX3VwZGF0ZV9yb2xlIjp0cnVlLCJjYW5fcmVhZF91c2VyIjp0cnVlLCJjYW5fY3JlYXRlX3VzZXIiOnRydWUsImNhbl91cGRhdGVfdXNlciI6dHJ1ZSwiY2FuX3JlYWRfbWFrZXJfY2hlY2tlciI6dHJ1ZSwiY2FuX2FwcHJvdmVfbWFrZXJfY2hlY2tlciI6dHJ1ZSwiY2FuX3JlYWRfYnJhbmNoIjp0cnVlLCJjYW5fY3JlYXRlX2JyYW5jaCI6dHJ1ZSwiY2FuX3VwZGF0ZV9icmFuY2giOnRydWUsImNhbl9kZWxldGVfYnJhbmNoIjp0cnVlLCJjYW5fZG93bmxvYWRfYnJhbmNoX2V4Y2VsIjp0cnVlLCJjYW5fdXBsb2FkX2JyYW5jaF9leGNlbCI6dHJ1ZSwiY2FuX3JlYWRfYXBpIjp0cnVlLCJjYW5fY3JlYXRlX2FwaSI6dHJ1ZSwiY2FuX3VwZGF0ZV9hcGkiOnRydWUsImNhbl9yZWFkX2FwayI6dHJ1ZSwiY2FuX2NyZWF0ZV9hcGsiOnRydWUsImNhbl91cGRhdGVfYXBrIjp0cnVlLCJjYW5fZGVsZXRlX2FwayI6dHJ1ZSwiY2FuX3BlcmNlbnRhZ2VfcmVhZCI6dHJ1ZSwiY2FuX3BlcmNlbnRhZ2VfdXBkYXRlIjp0cnVlLCJjYW5fcmVhZF9hdWRpdF9sb2dzIjp0cnVlLCJjYW5fcmVhZF9yaXNrX2NvbmZpZyI6dHJ1ZSwiY2FuX3VwZGF0ZV9yaXNrX2NvbmZpZyI6dHJ1ZSwiY2FuX3JlYWRfc2ltcGxpZmllZF9wcm9mZXNzaW9uIjp0cnVlLCJjYW5fY3JlYXRlX3NpbXBsaWZpZWRfcHJvZmVzc2lvbiI6dHJ1ZSwiY2FuX3VwZGF0ZV9zaW1wbGlmaWVkX3Byb2Zlc3Npb24iOnRydWUsImNhbl9yZWFkX3JlZ3VsYXJfcHJvZmVzc2lvbiI6dHJ1ZSwiY2FuX2NyZWF0ZV9yZWd1bGFyX3Byb2Zlc3Npb24iOnRydWUsImNhbl91cGRhdGVfcmVndWxhcl9wcm9mZXNzaW9uIjp0cnVlLCJjYW5fcmVhZF9idXNpbmVzcyI6dHJ1ZSwiY2FuX2NyZWF0ZV9idXNpbmVzcyI6dHJ1ZSwiY2FuX3VwZGF0ZV9idXNpbmVzcyI6dHJ1ZSwiY2FuX3JlYWRfYXBwbGljYXRpb24iOnRydWUsImNhbl9kb3dubG9hZF9hcHBsaWNhdGlvbnNfbGlzdCI6dHJ1ZSwiY2FuX3JlYWRfYXBwX2NvbmZpZ3VyYXRpb24iOnRydWUsImNhbl91cGRhdGVfYXBwX2NvbmZpZ3VyYXRpb24iOnRydWUsImNhbl9yZWFkX2ZhaWxlZF9hcGlfbGlzdCI6dHJ1ZSwiY2FuX3JldHJ5X2ZhaWxlZF9hcGlfbGlzdCI6dHJ1ZX0sInR5cGUiOiJicmFuY2hfdXNlciJ9.nbc1BkZP5O42JOOCSxIzqK1R0gQNb3WrFN64I1cC2bE",
            },
          },
        );
        const data = await res.json();
        console.log("Fetched application data:", data);
        setApplication(data);
      } catch (error) {
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
