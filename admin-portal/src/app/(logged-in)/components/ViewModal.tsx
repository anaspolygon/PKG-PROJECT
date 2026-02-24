/* eslint-disable @typescript-eslint/no-explicit-any */
import capitalizeFirst from "@/utils/capitalizeFirst";
import { flattenObjectLastKey } from "@/utils/objectUtils";

interface ViewModalProps {
  label: string;
  value: any;
  onClose: () => void;
}
function renderValue(value: any): any {
  if (value === null || value === undefined) return <span className="text-gray-400 italic">N/A</span>;
  if (typeof value === 'boolean') {
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
  }
  if (typeof value !== "object") {
    return <span className="text-gray-900 font-medium">{String(value)}</span>;
  }
  if (Array.isArray(value)) {
    return (
      <div className="space-y-2">
        {value.length === 0 && <p className="text-gray-400 italic">N/A</p>}
        {value.map((item, index) => (
          <div key={index} className="border border-gray-200 p-3 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm">
            {renderValue(item)}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-2">
      {Object.entries(value).map(([key, val]) => (
        <div
          key={key}
          className="flex items-start border-b border-gray-200 pb-3 pt-3 hover:bg-gray-50 rounded-lg px-2 transition-colors"
        >
          <span className="font-semibold text-gray-600 w-[40%] break-all pr-3">
            {capitalizeFirst(key)}
          </span>
          <span className="w-[60%] break-all border-l-2 border-indigo-200 pl-3">
            {renderValue(val)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function ViewModal({ label, value, onClose }: ViewModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative overflow-hidden">
        {/* Header with gradient */}
        <div className="px-6 py-5">
          <h2 className="text-xl font-bold text-gray-900 tracking-wide">{label}</h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-2xl transition-all duration-200 cursor-pointer"
          >
            &times;
          </button>
        </div>

        <div className="px-6 pb-6 max-h-[600px] overflow-y-auto">
          {typeof value === "object" && value !== null ? (
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-primary">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider w-1/3">
                      Field
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider w-2/3">
                      Value
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {Object.keys(value).length === 0 ? (
                    <tr>
                      <td colSpan={2} className="text-center py-8 text-gray-400">
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-4xl">📭</span>
                          <span className="text-sm font-medium">No data found</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    Object.entries(flattenObjectLastKey(value)).map(
                      ([key, val], index) => (
                        <tr 
                          key={key} 
                          className={`hover:bg-indigo-50/50 transition-all duration-200 ${
                            index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                          }`}
                        >
                          <td className="px-6 py-4 font-semibold text-gray-700">
                            {capitalizeFirst(key)}
                          </td>
                          <td className="px-6 py-4 break-all">
                            {renderValue(val)}
                          </td>
                        </tr>
                      )
                    )
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <p className="text-gray-900 font-medium">{value}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
