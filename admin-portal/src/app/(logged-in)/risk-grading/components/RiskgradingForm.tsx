"use client";
import { Collapse } from "antd";
import { useRouter } from "next/navigation";
import type { CollapseProps } from "antd";
import { PossibleValue } from "../types/RiskgradingTypes";
import { useState } from "react";
import { toast } from "sonner";
import { updateRiskgradingAction } from "../actions/updateRiskgradingAction";
import { useGlobalState } from "@/components/layouts/GlobalContext";
import PrimaryBtn from "@/components/buttons/PrimaryBtn";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import useRiskgraing from "../hooks/useRiskgrading";
import Loader from "@/app/components/Loader";

export default function RiskgradingForm() {
  const [loading, setLoading] = useState(false);
  const [oldPayload, setOldPayload] = useState<
    Record<string, Record<string, number>>
  >({});
  const [payload, setPayload] = useState<
    Record<string, Record<string, number>>
  >({});
  const { fetchPendingCount } = useGlobalState();
  const info = useLocalStorage("info");
  const router = useRouter();
  const { data } = useRiskgraing();

  const getPanelValues = (
    possibleValues: Record<string, { label: string; risk_score: number }>,
  ) => {
    return Object.keys(possibleValues).reduce(
      (acc: Record<string, number>, item) => {
        acc[item] = possibleValues[item].risk_score;
        return acc;
      },
      {},
    );
  };

  const riskGrading: Record<string, Record<string, number>> = data?.data
    ? Object.entries(data?.data)
        .map(([panelKey, panelData]) => ({
          [panelKey]: getPanelValues(panelData.possible_values),
        }))
        .reduce<Record<string, Record<string, number>>>((acc, item) => {
          return { ...acc, ...item };
        }, {})
    : {};

  const handleInputChange = (
    panelKey: string,
    valueKey: string,
    value: number,
  ) => {
    setOldPayload({
      ...oldPayload,
      [panelKey]: {
        ...oldPayload[panelKey],
        [valueKey]: riskGrading[panelKey][valueKey],
      },
    });
    setPayload({
      ...payload,
      [panelKey]: { ...payload[panelKey], [valueKey]: value },
    });
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const res = await updateRiskgradingAction(payload);
      if (res.success) {
        toast.success(res.message);
        fetchPendingCount();
      } else {
        toast.error(res.message);
        if (res.code === 401) {
          router.push("/auth/login");
        }
      }
    } finally {
      setPayload({});
      setLoading(false);
    }
  };

  const disabled =
    Object.keys(payload).length === 0 ||
    JSON.stringify(oldPayload) === JSON.stringify(payload);

  if (!data?.data) return <Loader />;

  const items: CollapseProps["items"] =
    data?.data &&
    Object.entries(data?.data).map(([panel_key, panel_data], index) => ({
      key: index,
      label: (
        <div className="flex items-start gap-3">
          <div className="min-w-8 w-8 h-8 shrink-0 rounded-lg bg-primary flex items-center justify-center text-sm font-semibold text-white">
            {index + 1}
          </div>
          <span className="text-base font-semibold text-slate-800 leading-8">
            {panel_data.label}
          </span>
        </div>
      ),
      children: (
        <div className="grid grid-cols-3 gap-3">
          {panel_data.possible_values &&
            Object.entries(panel_data.possible_values).map(
              ([value_key, field]) => (
                <div
                  key={value_key}
                  className="flex items-center gap-4 p-4  rounded-lg hover:bg-blue-50 transition-all duration-200 border border-blue-100 hover:border-blue-200 hover:shadow-sm"
                >
                  <div className="flex-1">
                    <label className="text-sm font-medium text-slate-700">
                      {(field as PossibleValue).label}
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-blue-600 whitespace-nowrap">
                      Risk Score:
                    </span>
                    <input
                      type="number"
                      min={0}
                      defaultValue={(field as PossibleValue).risk_score}
                      onChange={(e) => {
                        handleInputChange(
                          panel_key,
                          value_key,
                          Number(e.target.value),
                        );
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "+" || e.key === "-" || e.key === "e") {
                          e.preventDefault();
                        }
                      }}
                      className="w-24 border border-blue-200 rounded-lg px-3 py-2 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none hover:border-blue-300 bg-white"
                    />
                  </div>
                </div>
              ),
            )}
        </div>
      ),
    }));

  if (!data) return null;

  return (
    <div className="w-full p-6">
      {/* Header Section */}
      <div className="mb-6 px-2">
        <div className="flex items-center gap-3 mb-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Risk Grading Configuration
            </h2>
            <p className="text-sm text-slate-600 mt-0.5">
              Configure risk scores for different assessment criteria
            </p>
          </div>
        </div>
      </div>

      {/* Accordion Section */}
      <div className="bg-white rounded-xl overflow-hidden px-2">
        <Collapse
          accordion
          items={items}
          className="risk-grading-collapse"
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
      </div>

      {info && info?.permissions.can_update_risk_config ? (
        <div className="flex items-center justify-end mt-6 pt-6 border-t border-blue-100">
          <PrimaryBtn
            onClick={handleUpdate}
            variant="primary"
            loadingAll={loading}
            content="Update Risk Grading"
            disabled={disabled}
            loadingContent="Updating..."
          />
        </div>
      ) : null}
    </div>
  );
}
