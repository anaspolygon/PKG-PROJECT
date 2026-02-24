"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Collapse, Image } from "antd";
import clsx from "clsx";
import FormSection from "./FormSection";
import Address, { AddressData } from "./Address";
import { Field, ApplicationDetailsRoot } from "../types/ApplicationDetailsType";
import {
  ApplicationStatus,
  ApplicationStatusBgColors,
  ApplicationStatusTextColors,
  getApplicationStatus,
} from "../types/constants";
import { CircleCheckBig, CircleX } from "lucide-react";

export interface CollapsibleSectionsContainerProps {
  application: ApplicationDetailsRoot;
  nidNo?: string;
  addressData?: AddressData;
}

export function downloadDocument(name: string, blob: Blob) {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

const CollapsibleSectionsContainer: React.FC<
  CollapsibleSectionsContainerProps
> = ({ application, addressData }) => {
  const getValue = (field: Field) => {
    if (["dropdown", "radio"].includes(field.input_type as string)) {
      return field.possible_values?.find(
        (option) => option.value === field.value,
      )?.label;
    }
    return field.value;
  };

  const data = (application?.application_data || [])
    .filter((item: any) => item.section_slug !== "cif")
    .map((item: any) => {
      if (item.type === "form_section") {
        return {
          label: item.pages[0].label,
          section_slug: item.section_slug,
          fields: item.pages[0].fields.map((field: Field) => ({
            value: getValue(field),
            children: Array.isArray(field.children)
              ? field.children.map((child: any) => ({
                  ...child,
                  value: getValue(child),
                }))
              : field.children,
            label: field.label,
            slug: field.slug,
            input_type: field.input_type,
            possible_values: field.possible_values,
          })),
        };
      }
      if (item.type === "nid") {
        return {
          label: item.label,
          section_slug: item.section_slug,
          value: item.value,
        };
      }
      if (item.type === "survey") {
        return {
          label: item.label,
          section_slug: item.section_slug,
          fields: [
            {
              label: item.field.label,
              input_type: item.field.input_type,
              value: getValue(item.field),
              possible_values: item.field.possible_values,
            },
          ],
        };
      }
    });

  const items = data
    .filter((item: any) => item !== undefined)
    .map((item: any) => ({
      key: item?.label,
      label:
        item.section_slug === "credit_risk_grading" &&
        application.additional_info?.risk_grading_details
          ? `${item?.label} (Total score : ${application.additional_info.risk_grading_details?.risk_score?.score})`
          : item?.label,
      children:
        item.section_slug === "nid" ? (
          <Images images={item.value} />
        ) : item.section_slug === "address_information" ? (
          <Address fields={item.fields} addressData={addressData} />
        ) : (
          <FormSection
            fields={item.fields}
            isCreditRiskGrading={item.section_slug === "credit_risk_grading"}
            riskScores={application.additional_info?.risk_grading_details}
          />
        ),
    }));

  const formatValue = (value: string | null) => {
    return value
      ? value
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : null;
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-2">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="relative">
                  <Image
                    width={280}
                    height={280}
                    src={application.additional_info?.user_image}
                    alt="user image"
                    className="rounded-lg border-2 border-gray-100"
                  />

                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md border border-gray-200">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide text-center">
                  User Image
                </h2>
              </div>

              <div className="flex-shrink-0">
                <div className="relative">
                  <Image
                    width={280}
                    height={280}
                    src={application.additional_info?.ec_user_image}
                    alt="ec image"
                    className="rounded-lg border-2 border-gray-100"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md border border-gray-200">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide text-center">
                  Ec Image
                </h2>
              </div>
            </div>

            <div className="flex flex-col bg-gray-50 rounded-lg p-4 border border-gray-200">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                Face Match Score
              </span>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-blue-600 min-w-[45px]">
                  {application.additional_info?.face_match_percentage}%
                </span>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={clsx(
                        "h-2 rounded-full transition-all duration-300",
                        Number(
                          application.additional_info?.face_match_percentage,
                        ) >= 80
                          ? "bg-green-500"
                          : Number(
                                application.additional_info
                                  ?.face_match_percentage,
                              ) >= 60
                            ? "bg-yellow-500"
                            : "bg-red-500",
                      )}
                      style={{
                        width: `${application.additional_info?.face_match_percentage}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
              Application Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Application ID
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {application.additional_info?.application_display_id}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Name
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {application.additional_info?.name}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Gender
                  </span>
                  <span className="text-sm font-semibold text-gray-900 capitalize">
                    {application.additional_info?.gender}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Date of birth
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {application.additional_info?.dob}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Mobile
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {application.additional_info?.mobile}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    NID No
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {application.additional_info?.nid_no}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Branch Name
                  </span>
                  <span className="text-sm font-semibold text-gray-900 capitalize">
                    {application.additional_info?.branch_name ?? "N/A"}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Banking Type
                  </span>
                  <span className="text-sm font-semibold text-gray-900 capitalize">
                    {application.additional_info?.banking_type ?? "N/A"}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Product Type
                  </span>
                  <span className="text-sm font-semibold text-gray-900 capitalize">
                    {formatValue(
                      application.additional_info?.product_type ?? "N/A",
                    )}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Application Status
                  </span>
                  <div>
                    <span
                      className={clsx(
                        "inline-flex px-3 py-1 rounded-full text-xs font-semibold",
                        ApplicationStatusBgColors[
                          application.additional_info
                            ?.application_status as unknown as ApplicationStatus
                        ],
                        ApplicationStatusTextColors[
                          application.additional_info
                            ?.application_status as unknown as ApplicationStatus
                        ],
                      )}
                    >
                      {getApplicationStatus(
                        application.additional_info
                          ?.application_status as unknown as string,
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Submitted At
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {application.additional_info?.first_submitted_at ?? "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-2">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
              OCR Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Applicant name bangla
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {application.additional_info?.ocr_data?.applicant_name_ben}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Applicant name english
                  </span>
                  <span className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    {application?.additional_info?.ocr_data?.applicant_name_eng}
                    {application?.additional_info?.ec_data &&
                    application.additional_info?.ec_data
                      ?.fieldVerificationResult?.nameEn ? (
                      <EcVerified />
                    ) : (
                      <EcFailed />
                    )}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Date of birth
                  </span>
                  <span className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    {application.additional_info?.ocr_data?.dob}
                    {application.additional_info?.ec_data &&
                    application.additional_info?.ec_data
                      ?.fieldVerificationResult?.dateOfBirth ? (
                      <EcVerified />
                    ) : (
                      <EcFailed />
                    )}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Spouse name
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {application.additional_info?.ocr_data?.spouse_name ??
                      "N/A"}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Father Name
                  </span>
                  <span className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    {application.additional_info?.ocr_data?.father_name}
                    {application.additional_info?.ec_data &&
                    application.additional_info?.ec_data.fieldVerificationResult
                      ?.father ? (
                      <EcVerified />
                    ) : (
                      <EcFailed />
                    )}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Mother Name
                  </span>
                  <span className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    {application.additional_info?.ocr_data?.mother_name}
                    {application.additional_info?.ec_data &&
                    application.additional_info?.ec_data.fieldVerificationResult
                      ?.mother ? (
                      <EcVerified />
                    ) : (
                      <EcFailed />
                    )}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    NID No
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {application.additional_info?.ocr_data?.nid_no}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    Address
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {application.additional_info?.ocr_data?.address ?? "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Collapse
        items={items}
        expandIconPosition="end"
        expandIcon={({ isActive }) => (
          <div
            className={`transition-all duration-200 ${
              isActive ? "rotate-180" : "rotate-0"
            }`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              borderRadius: "32px",
              backgroundColor: isActive ? "#ed1c24" : "#fee2e2",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke={isActive ? "white" : "#dc2626"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      />
    </>
  );
};

export default CollapsibleSectionsContainer;

const Images = ({
  images,
}: {
  images: string[] | { front_image: string; back_image: string };
}) => {
  const isPDF = (url: string) => {
    if (!url) return false;
    return url.toLowerCase().includes(".pdf");
  };

  const renderMedia = (url: string, alt: string, label?: string) => {
    if (!url) return null;

    if (isPDF(url)) {
      return (
        <div className="flex flex-col items-center gap-3">
          {label && (
            <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              {label}
            </span>
          )}
          <div className="border-2 border-gray-200 rounded-xl p-8 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center w-full max-w-md h-[300px] transition-all hover:shadow-lg hover:border-red-300 group">
            <div className="bg-red-100 rounded-full p-4 mb-4 group-hover:bg-red-200 transition-colors">
              <svg
                className="w-16 h-16 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-800 mb-4">
              PDF Document
            </span>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              View PDF
            </a>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center gap-3">
        {label && (
          <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            {label}
          </span>
        )}
        <div className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 transition-all hover:shadow-lg">
          <Image
            src={url}
            width={400}
            height={300}
            alt={alt}
            className="object-cover"
          />
        </div>
      </div>
    );
  };

  if (typeof images === "object" && !Array.isArray(images)) {
    return (
      <div className="flex items-start gap-8 flex-wrap justify-center p-4">
        {renderMedia(images.front_image, "front_image", "Front Side")}
        {renderMedia(images.back_image, "back_image", "Back Side")}
      </div>
    );
  }

  if (Array.isArray(images)) {
    return (
      <div className="flex items-start gap-8 flex-wrap justify-center p-4">
        {images.map((img, index) =>
          renderMedia(img, `Media ${index + 1}`, `Document ${index + 1}`),
        )}
      </div>
    );
  }

  return null;
};

const EcVerified = () => {
  return (
    <p className="flex items-center gap-2 text-xs px-2 py-1 rounded-md bg-green-100 text-green-700 uppercase">
      <CircleCheckBig className="w-4 h-4" />
      EC Verified
    </p>
  );
};

const EcFailed = () => {
  return (
    <p className="flex items-center gap-2 text-xs px-2 py-1 rounded-md bg-red-100 text-red-700 uppercase">
      <CircleX className="w-4 h-4" />
      EC Failed
    </p>
  );
};
