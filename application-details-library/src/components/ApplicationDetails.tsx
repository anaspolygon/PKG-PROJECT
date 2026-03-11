"use client";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import PrimaryBtn from "./PrimaryBtn";
import ApplicationDetailsContainer from "./ApplicationDetailsContainer";
import { ApplicationDetailsProvider } from "./ApplicationDetailsProvider";

interface ApplicationDetailsProps {
  id: string | number;
  baseUrl: string;
  showActionsBtn?: boolean;
  apiKey: string;
}

export default function ApplicationDetails({
  id,
  baseUrl,
  showActionsBtn,
  apiKey,
}: ApplicationDetailsProps) {
  const [application, setApplication] = useState({});
  const [loading, setLoading] = useState(true);
  const [pdfDownloadloading, setPdfDownloadLoading] = useState(false);
  const [documentsDownloadLoading, setDocumentsDownloadLoading] =
    useState(false);
  const [approveloading, setApproveLoading] = useState(false);
  const [rejectloading, setRejectLoading] = useState(false);

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
        if (res.status === 401) {
          window.location.reload();
          return;
        }
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
        if (res.status === 401) {
          window.location.reload();
          return;
        }
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

  const handlePdfDownload = async () => {
    try {
      setPdfDownloadLoading(true);

      const pdfDownloadUrl = `${baseUrl}/api/admin/applications/${id}/pdf`;
      const res = await fetch(pdfDownloadUrl, {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
        },
        body: null,
      });

      if (res.status === 202) {
        const data = await res.json();
        toast.success(data.message);
        return;
      }

      if (res.status == 401) {
        window.location.reload();
        return;
      }

      if (!res.ok) {
        const errorText = await res.text();
        console.error("PDF download error:", errorText);
        return;
      }

      const pdfBlob = await res.blob();
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `application-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e: any) {
      console.error("PDF fetch error:", e);
    } finally {
      setPdfDownloadLoading(false);
    }
  };

  const handleDocumentsDownload = async () => {
    try {
      setDocumentsDownloadLoading(true);
      const downloadUrl = `${baseUrl}/api/admin/applications/${id}/documents/download`;
      const res = await fetch(downloadUrl, {
        method: "GET",
        headers: {
          "x-api-key": apiKey,
        },
        cache: "no-store",
      });

      if (res.status == 401) {
        window.location.reload();
        return;
      }

      if (!res.ok) {
        const text = await res.text();
        return;
      }
      const zipBlob = await res.blob();
      const url = window.URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `documents-${id}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e: any) {
      console.error("ZIP fetch error:", e);
    } finally {
      setDocumentsDownloadLoading(false);
    }
  };

  const handleApprove = async () => {
    try {
      setApproveLoading(true);
      const approveUrl = `${baseUrl}/api/admin/applications/${id}/approve`;
      const res = await fetch(approveUrl, {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
        },
        cache: "no-store",
      });

      if (res.status == 401) {
        window.location.reload();
        return;
      }
      if (res.ok) {
        const data = await res.json();
        toast.success(data.message);
      }

      if (!res.ok) {
        const text = await res.text();
        toast.error(text);
        return;
      }
    } catch (e: any) {
      console.error("error:", e);
    } finally {
      setApproveLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setRejectLoading(true);
      const approveUrl = `${baseUrl}/api/admin/applications/${id}/reject`;
      const res = await fetch(approveUrl, {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
        },
        cache: "no-store",
      });

      if (res.status == 401) {
        window.location.reload();
        return;
      }
      if (res.ok) {
        const data = await res.json();
        toast.success(data.message);
      }

      if (!res.ok) {
        const text = await res.text();
        toast.error(text);
        return;
      }
    } catch (e: any) {
      console.error("error:", e);
    } finally {
      setRejectLoading(false);
    }
  };

  if (loading) return <Loader />;
  return (
    <>
      <ApplicationDetailsProvider />
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-2xl font-bold">Application Details</h1>
        <div className="flex items-center gap-4">
          <>
            <PrimaryBtn
              variant="secondary"
              type="button"
              onClick={handlePdfDownload}
              loadingAll={pdfDownloadloading}
              icon="download"
              content="Download PDF"
              loadingContent="Downloading..."
            />

            <PrimaryBtn
              variant="primary"
              type="button"
              onClick={handleDocumentsDownload}
              loadingAll={documentsDownloadLoading}
              icon="download"
              content="Download Documents"
              loadingContent="Downloading..."
            />
          </>
        </div>
      </div>
      <ApplicationDetailsContainer
        application={application}
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
              loadingAll={approveloading}
              loadingContent={"Approving..."}
            />
            <PrimaryBtn
              onClick={handleReject}
              variant="danger"
              content="Reject"
              loadingAll={rejectloading}
              loadingContent={"Rejecting..."}
            />
          </>
        ) : null}
      </div>
    </>
  );
}
