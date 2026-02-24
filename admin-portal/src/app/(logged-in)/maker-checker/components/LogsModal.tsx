/* eslint-disable @typescript-eslint/no-explicit-any */
import { flattenObjectLastKey, formatFieldName } from "@/utils/objectUtils";
import Modal from "../../components/Modal";
import { Logs } from "../types/CheckerMakerTypes";
import { Database } from "lucide-react";
import PermissionBadges from "./PermissionBadges";
import PrimaryBtn from "@/components/buttons/PrimaryBtn";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type OptionMap = Record<string, number>;
type RiskGradingBody = Record<string, OptionMap>;

type RiskRow = {
  fieldName: string;
  options: string[];
  newData: OptionMap;
  oldData: OptionMap;
};

interface LogsModalProps {
  label: string | null;
  logs: Logs;
  divisions?: LabelValue[];
  districts?: LabelValue[];
  thanas?: LabelValue[];
  postal_codes?: LabelValue[];
  isMakerChecker: boolean;
  closeModal: () => void;

  actionId?: number | null;
  setActionId?: (actionId: number) => void;
  handleApproved?: (actionId: number) => void;
  loading?: boolean;
  setOpenRejectionModal?: (open: boolean) => void;
  closeLogsModal?: () => void;
  actionStatus?: string | null;
}

interface Info {
  id: number | undefined;
  ip_address: string | undefined;
  created_at: string | undefined;
  performed_by: string | undefined;
  time_ago: string | undefined;
}

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export default function LogsModal({
  label,
  logs,
  divisions,
  districts,
  thanas,
  postal_codes,
  isMakerChecker,
  closeModal,
  actionId,
  setActionId,
  handleApproved,
  loading,
  setOpenRejectionModal,
  closeLogsModal,
  actionStatus,
}: LogsModalProps) {
  const info = useLocalStorage("info");
  const getValue = (key: string, value: any) => {
    if (value === null || value === undefined) return "N/A";

    if (key === "division")
      return (
        (divisions ?? []).find((item) => item.value === value)?.label ?? value
      );
    if (key === "district")
      return (
        (districts ?? []).find((item) => item.value === value)?.label ?? value
      );
    if (key === "thana")
      return (
        (thanas ?? []).find((item) => item.value === value)?.label ?? value
      );
    if (key === "postal_code")
      return (
        (postal_codes ?? []).find((item) => item.value === value)?.label ??
        value
      );
    if (key === "is_active")
      return value ? (
        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-sm">
          <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
          Active
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-rose-500 to-red-500 text-white shadow-sm">
          <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
          Inactive
        </span>
      );
    if (key === "permissions") {
      return <PermissionBadges value={value} />;
    }
    if (typeof value === "boolean")
      return value ? (
        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-sm">
          <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
          Yes
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-400 text-white shadow-sm">
          <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
          No
        </span>
      );
    if (typeof value === "object") return JSON.stringify(value, null, 2);
    if (key === "banking_type") return capitalize(value);
    return value;
  };

  const isBulk =
    logs.body &&
    logs.body.hasOwnProperty("new") &&
    logs.body.hasOwnProperty("old") &&
    logs.body.hasOwnProperty("update");
  const updatedBulkData =
    (logs.action_type === "bulk" || isBulk) &&
    (logs.body.update ?? []).map((item: any, index: number) => ({
      update: item.data,
      old: logs.body.old[index],
    }));

  const newLogs = flattenObjectLastKey(logs.body);
  const oldLogs = flattenObjectLastKey(logs.old_data);

  const additionalInfo = {
    id: logs.id,
    ip_address: logs.ip_address,
    performed_by: logs.performed_by,
    time_ago: logs.time_ago,
    created_at: logs.created_at,
  };

  if (
    logs.subject === "risk_score" ||
    logs.body?.subject_type === "risk_score"
  ) {
    const rows: RiskRow[] = Object.entries(logs.body as RiskGradingBody).map(
      ([fieldName, options]) => ({
        fieldName,
        options: typeof options === "string" ? options : Object.keys(options),
        newData: options,
        oldData: logs.old_data[fieldName],
      }),
    );
    return (
      <RiskgradingTable
        label={label as string}
        rows={rows}
        info={additionalInfo}
        isMakerChecker={isMakerChecker}
        closeModal={closeModal}
      />
    );
  }

  if (logs?.field_slug === "cheque_book_delivery_branch") {
    return (
      <BranchLogs
        label={logs.field_label as string}
        data={logs.body}
        info={additionalInfo}
        isMakerChecker={isMakerChecker}
        closeModal={closeModal}
      />
    );
  }

  return (
    <Modal title={label as string} width={900} closeModal={closeModal}>
      <div className="max-h-125 overflow-y-auto pr-2">
        {(logs.action_type === "bulk" || isBulk) && (
          <div>
            <div className="sticky top-0 z-10 flex gap-6 items-center mb-6 bg-white/90 backdrop-blur-sm border border-gray-200 py-4 px-6 rounded-xl shadow-lg">
              <div className="flex-1 text-center">
                <div className="text-xs text-gray-500 mb-1">
                  Updated Information
                </div>
                <div className="text-sm text-gray-800 font-bold uppercase tracking-wider">
                  New Data
                </div>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div className="flex-1 text-center">
                <div className="text-xs text-gray-500 mb-1">
                  Previous Information
                </div>
                <div className="text-sm text-gray-800 font-bold uppercase tracking-wider">
                  Old Data
                </div>
              </div>
            </div>
            <div className="space-y-4 pb-4">
              <>
                {(logs.body.new ?? []).map((item: any, idx: number) => (
                  <div
                    className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                    key={`new_${idx}`}
                  >
                    <div className="bg-primary px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span className="text-sm font-bold text-white tracking-wide">
                          New Entry #{idx + 1}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-6 p-6">
                      <div className="flex-1 space-y-4">
                        {Object.entries(flattenObjectLastKey(item)).map(
                          ([key, value]: [string, any]) => (
                            <div
                              className="group flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                              key={key}
                            >
                              <div className="w-2/5 text-sm font-semibold text-gray-600 group-hover:text-gray-900 transition-colors">
                                {formatFieldName(key)}
                              </div>
                              <div className="w-3/5 text-sm text-gray-900 break-words font-medium">
                                {getValue(key, value)}
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                      <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center p-8">
                        <div className="text-center">
                          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-2xl text-gray-400">
                              <Database />
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 font-semibold">
                            No Previous Data
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {updatedBulkData.map((item: any, index: number) => (
                  <div
                    key={`bulk_update_${index}`}
                    className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="bg-primary px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span className="text-sm font-bold text-white tracking-wide">
                          Updated Entry #{index + 1}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-6 p-6">
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
                          <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Updated Values
                          </span>
                        </div>
                        {Object.entries(flattenObjectLastKey(item.update)).map(
                          ([key, value]: [string, any]) => (
                            <div
                              className="group flex items-start gap-4 p-3 rounded-lg hover:bg-blue-50 transition-colors"
                              key={key}
                            >
                              <div className="w-2/5 text-sm font-semibold text-gray-600 group-hover:text-blue-900 transition-colors">
                                {formatFieldName(key)}
                              </div>
                              <div className="w-3/5 text-sm text-gray-900 break-words font-medium">
                                {getValue(key, value)}
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-1 h-6 bg-gradient-to-b from-gray-400 to-gray-500 rounded-full"></div>
                          <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Previous Values
                          </span>
                        </div>
                        {Object.entries(flattenObjectLastKey(item.old)).map(
                          ([key, value]: [string, any]) => (
                            <div
                              className="group flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                              key={key}
                            >
                              <div className="w-2/5 text-sm font-semibold text-gray-600 group-hover:text-gray-900 transition-colors">
                                {formatFieldName(key)}
                              </div>
                              <div className="w-3/5 text-sm text-gray-900 break-words font-medium">
                                {getValue(key, value)}
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            </div>
          </div>
        )}
        {logs.action_type !== "bulk" && !isBulk && (
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <table className="min-w-full table-auto border-collapse">
                <thead className="bg-primary">
                  <tr>
                    {["Field Name", "New Data", "Old Data"].map(
                      (heading, index) => (
                        <th
                          key={index}
                          className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider"
                        >
                          {heading}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Object.entries(
                    Object.keys(newLogs).length > 0 ? newLogs : oldLogs,
                  ).map(([key, value]: [string, any], index: number) => {
                    const newValue = logs.body
                      ? (getValue(key, value) ?? "N/A")
                      : "N/A";
                    const oldValue = logs.old_data
                      ? (getValue(key, oldLogs[key]) ?? "N/A")
                      : "N/A";

                    return (
                      <tr
                        key={`${key}_${index}`}
                        className={`hover:bg-indigo-50/50 transition-all duration-200 ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                        }`}
                      >
                        <td className="px-6 py-4 text-sm font-semibold text-gray-700 w-[30%]">
                          {formatFieldName(key)}
                        </td>
                        <td
                          className={`px-6 py-4 text-sm w-[35%] break-all transition-all duration-200 text-gray-600`}
                        >
                          {newValue}
                        </td>
                        <td
                          className={`px-6 py-4 text-sm w-[35%] break-all transition-all duration-200 text-gray-600`}
                        >
                          {oldValue}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {isMakerChecker ? null : <AdditionalInfo info={additionalInfo} />}
      </div>

      {isMakerChecker &&
      actionStatus === "pending" &&
      info?.permissions?.can_approve_maker_checker ? (
        <div className="flex items-center gap-2 justify-end mt-4 mr-2">
          <PrimaryBtn
            variant="success"
            onClick={() => {
              handleApproved?.(actionId as number);
            }}
            content="Approve"
            loadingAll={loading as boolean}
            disabled={loading}
            loadingContent="Approving..."
          />
          <PrimaryBtn
            variant="danger"
            onClick={() => {
              setActionId?.(actionId as number);
              setOpenRejectionModal?.(true);
              closeLogsModal?.();
            }}
            content="Reject"
            loadingAll={false}
            disabled={loading}
          />
        </div>
      ) : null}
    </Modal>
  );
}

function RiskgradingTable({
  label,
  rows,
  info,
  isMakerChecker,
  closeModal,
}: {
  label: string;
  rows: RiskRow[];
  info: Info;
  isMakerChecker: boolean;
  closeModal: () => void;
}) {
  const newRows = rows.filter(
    (item) => !["subject_type", "action_type"].includes(item.fieldName),
  );
  return (
    <Modal title={label as string} width={900} closeModal={closeModal}>
      <div className="max-h-125 overflow-y-auto pr-2">
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-primary">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase w-[30%]">
                  Field Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase w-[30%]">
                  Options
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase w-[20%]">
                  Old Value
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase w-[20%]">
                  New Value
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {(newRows ?? []).map((row: RiskRow, rowIndex: number) => (
                <tr
                  key={row.fieldName}
                  className={`${
                    rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  } hover:bg-indigo-50/50 transition`}
                >
                  <td className="px-6 py-4 align-top font-semibold text-gray-700">
                    {formatFieldName(row.fieldName)}
                  </td>
                  <td className="px-6 py-4 space-y-3">
                    {typeof row.options === "string"
                      ? row.options
                      : row.options.map((opt: string) => (
                          <div key={opt} className="text-sm text-gray-600">
                            {formatFieldName(opt)}
                          </div>
                        ))}
                  </td>
                  <td className="px-6 py-4 space-y-3">
                    {typeof row.options === "string"
                      ? row.options
                      : row.options.map((opt: string) => (
                          <div key={opt} className="text-sm text-gray-600">
                            {row.oldData[opt] ?? "N/A"}
                          </div>
                        ))}
                  </td>
                  <td className="px-6 py-4 space-y-3">
                    {typeof row.options === "string"
                      ? row.options
                      : row.options.map((opt: string) => (
                          <div key={opt} className="text-sm text-gray-600">
                            {row.newData[opt] ?? "N/A"}
                          </div>
                        ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isMakerChecker ? null : <AdditionalInfo info={info} />}
    </Modal>
  );
}

interface LabelValue {
  label: string;
  value: string;
}

function BranchLogs({
  label,
  data,
  info,
  isMakerChecker,
  closeModal,
}: {
  label: string;
  data: { new_value: LabelValue; old_value: LabelValue }[];
  info: Info;
  isMakerChecker: boolean;
  closeModal: () => void;
}) {
  return (
    <Modal title={label as string} width={900} closeModal={closeModal}>
      <div className="max-h-125 overflow-y-auto pb-2">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 flex gap-6 items-center mb-6 bg-white/90 backdrop-blur-sm border border-gray-200 py-4 px-6 rounded-xl shadow-lg">
          <div className="flex-1 text-center">
            <div className="text-xs text-gray-500 mb-1">
              Updated Information
            </div>
            <div className="text-sm text-gray-800 font-bold uppercase tracking-wider">
              New Data
            </div>
          </div>

          <div className="w-px h-12 bg-gray-300"></div>

          <div className="flex-1 text-center">
            <div className="text-xs text-gray-500 mb-1">
              Previous Information
            </div>
            <div className="text-sm text-gray-800 font-bold uppercase tracking-wider">
              Old Data
            </div>
          </div>
        </div>

        {/* Data Rows */}
        <div className="space-y-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition"
            >
              <div className="flex gap-6">
                {/* New Data */}
                <div className="flex-1 space-y-3">
                  <div className="text-sm">
                    <span className="font-medium text-gray-500  tracking-wide">
                      Branch Name :
                    </span>{" "}
                    {item.new_value.label ? (
                      <span className="text-sm font-semibold text-gray-900">
                        {item.new_value.label}
                      </span>
                    ) : (
                      <span className="text-gray-400 italic">N/A</span>
                    )}
                  </div>

                  <div className="text-sm">
                    <span className="font-medium text-gray-500  tracking-wide">
                      Branch Code :
                    </span>{" "}
                    {item.new_value.value ? (
                      <span className="text-sm font-semibold text-gray-900">
                        {item.new_value.value}
                      </span>
                    ) : (
                      <span className="text-gray-400 italic">N/A</span>
                    )}
                  </div>
                </div>

                <div className="w-px bg-gray-300"></div>

                {/* Old Data */}
                <div className="flex-1 space-y-3">
                  <div className="text-sm">
                    <span className="font-medium text-gray-500  tracking-wide">
                      Branch Name :
                    </span>{" "}
                    {item.old_value?.label ? (
                      <span className="text-sm font-semibold text-gray-900">
                        {item.old_value.label}
                      </span>
                    ) : (
                      <span className="text-gray-400 italic">N/A</span>
                    )}
                  </div>

                  <div className="text-sm">
                    <span className="font-medium text-gray-500  tracking-wide">
                      Branch Code :
                    </span>{" "}
                    {item.old_value?.value ? (
                      <span className="text-sm font-semibold text-gray-900">
                        {item.old_value.value}
                      </span>
                    ) : (
                      <span className="text-gray-400 italic">N/A</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isMakerChecker ? null : <AdditionalInfo info={info} />}
    </Modal>
  );
}

function AdditionalInfo({ info }: { info: Info }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 my-3">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-medium  mb-4 pb-2 border-b border-gray-200">
            Additional Info
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex gap-2 items-center">
                <span className="text-sm font-medium text-gray-500  tracking-wide">
                  Id :
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {info.id ?? "N/A"}
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-sm font-medium text-gray-500  tracking-wide">
                  IP Address :
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {info.ip_address ?? "N/A"}
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-sm font-medium text-gray-500  tracking-wide">
                  Performed By :
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {info.performed_by ?? "N/A"}
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-sm font-medium text-gray-500  tracking-wide">
                  Created At :
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {info.created_at ?? "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
