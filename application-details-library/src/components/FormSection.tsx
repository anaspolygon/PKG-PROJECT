/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Image } from "antd";
import { Field, Children } from "../types/ApplicationDetailsType";

export interface FormSectionProps {
  fields: Field[];
  isCreditRiskGrading?: boolean;
  riskScores?: Record<string, any>;
}

export default function FormSection({
  fields,
  isCreditRiskGrading,
  riskScores,
}: FormSectionProps) {
  const parentsWithChildren = (fields ?? []).filter(
    (f) => Array.isArray(f.children) && f.children.length > 0,
  );
  const isPDF = (url: string) => {
    if (!url) return false;
    return url.toLowerCase().includes(".pdf");
  };

  const renderValue = (field: Field | Children) => {
    if (
      ["signature_card", "file"].includes(field.input_type as string) &&
      field.value
    ) {
      const url = Array.isArray(field.value) ? field.value[0] : field.value;

      if (isPDF(url)) {
        return (
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-2 hover:bg-red-100 transition-colors">
            <svg
              className="w-5 h-5 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                clipRule="evenodd"
              />
            </svg>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-red-600 hover:text-red-700"
            >
              View PDF Document
            </a>
          </div>
        );
      }

      return (
        <Image
          width={120}
          height={120}
          src={url}
          alt={field.label || "Image"}
          className="rounded-lg border border-gray-200"
        />
      );
    }

    return (
      <span className="text-gray-900 font-medium">
        {field.value ? (
          field.value
        ) : (
          <span className="text-gray-400 italic">N/A</span>
        )}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="grid grid-cols-1 divide-y divide-gray-100">
        <div className="grid gap-4 p-4 bg-gray-100 border-b border-gray-200 font-semibold text-sm text-gray-700 grid-cols-12">
          <div className="col-span-12 md:col-span-4">Label</div>
          <div className="col-span-12 md:col-span-4">Value</div>
          {isCreditRiskGrading && (
            <div className="col-span-12 md:col-span-4">Risk Score</div>
          )}
        </div>

        {(fields ?? [])
          .filter((field) => {
            if (Array.isArray(field.children) && field.children.length > 0) {
              return false;
            }

            if (isCreditRiskGrading) {
              return (
                field.value ||
                riskScores?.risk_scores_with_label[field.slug]?.score
              );
            }

            return true;
          })
          .map((field, index) => (
            <div
              key={field.label || field.slug || index}
              className={`grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
              }`}
            >
              <div className="col-span-12 md:col-span-4 flex items-start">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                  <span className="text-sm font-medium text-gray-600">
                    {field.label}
                  </span>
                </div>
              </div>
              <div className="col-span-12 md:col-span-4 flex items-center">
                {renderValue(field)}
              </div>
              {riskScores && isCreditRiskGrading && (
                <div className="col-span-12 md:col-span-4 flex items-center">
                  {field.value ? (
                    riskScores?.risk_scores_with_label[field.slug]?.score ?? (
                      <span className="text-gray-400 italic font-medium">
                        N/A
                      </span>
                    )
                  ) : (
                    <span className="text-gray-400 italic font-medium">
                      N/A
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        {parentsWithChildren.length > 0 && (
          <div className="divide-y divide-gray-100">
            {parentsWithChildren.map((parent) => (
              <div key={`parent-${parent.slug}`} className="px-4 py-3">
                <div className="mb-2">
                  <div className="flex items-start justify-between">
                    <div className="text-sm text-gray-600 font-bold mb-2">
                      {parent.label}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  {(parent.children ?? []).map(
                    (child: Children, ci: number) => {
                      return (
                        <div
                          key={`${parent.slug}-child-${child.slug ?? ci}`}
                          className="grid grid-cols-12 gap-4 p-3 bg-white rounded-lg border border-gray-100"
                        >
                          <div className="col-span-12 md:col-span-4 flex items-start">
                            <div className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                              <span className="text-sm font-medium text-gray-600">
                                {child.label}
                              </span>
                            </div>
                          </div>
                          <div className="col-span-12 md:col-span-8 flex items-center">
                            {renderValue(child)}
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
