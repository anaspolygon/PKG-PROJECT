"use client";
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/classnames/index.js
var require_classnames = __commonJS({
  "node_modules/classnames/index.js"(exports2, module2) {
    "use strict";
    (function() {
      "use strict";
      var hasOwn = {}.hasOwnProperty;
      function classNames2() {
        var classes = "";
        for (var i = 0; i < arguments.length; i++) {
          var arg = arguments[i];
          if (arg) {
            classes = appendClass(classes, parseValue(arg));
          }
        }
        return classes;
      }
      function parseValue(arg) {
        if (typeof arg === "string" || typeof arg === "number") {
          return arg;
        }
        if (typeof arg !== "object") {
          return "";
        }
        if (Array.isArray(arg)) {
          return classNames2.apply(null, arg);
        }
        if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes("[native code]")) {
          return arg.toString();
        }
        var classes = "";
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes = appendClass(classes, key);
          }
        }
        return classes;
      }
      function appendClass(value, newClass) {
        if (!newClass) {
          return value;
        }
        if (value) {
          return value + " " + newClass;
        }
        return value + newClass;
      }
      if (typeof module2 !== "undefined" && module2.exports) {
        classNames2.default = classNames2;
        module2.exports = classNames2;
      } else if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
        define("classnames", [], function() {
          return classNames2;
        });
      } else {
        window.classNames = classNames2;
      }
    })();
  }
});

// src/index.ts
var index_exports = {};
__export(index_exports, {
  ApplicationDetails: () => ApplicationDetails,
  ApplicationSection: () => ApplicationSection_default
});
module.exports = __toCommonJS(index_exports);

// src/components/ApplicationDetails.tsx
var import_sonner2 = require("sonner");
var import_react2 = require("react");

// src/components/Loader.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Loader = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full h-[calc(100vh-290px)] flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-lg border border-gray-200", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-col items-center justify-center space-y-6", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col items-center space-y-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-lg font-medium text-gray-800 animate-pulse", children: "Loading" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex space-x-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          className: "h-2 w-2 bg-primary rounded-full animate-bounce",
          style: { animationDelay: "0ms" }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          className: "h-2 w-2 bg-primary rounded-full animate-bounce",
          style: { animationDelay: "150ms" }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          className: "h-2 w-2 bg-primary rounded-full animate-bounce",
          style: { animationDelay: "300ms" }
        }
      )
    ] })
  ] }) }) });
};
var Loader_default = Loader;

// src/components/PrimaryBtn.tsx
var import_lucide_react = require("lucide-react");
var import_classnames = __toESM(require_classnames());
var import_jsx_runtime2 = require("react/jsx-runtime");
var PrimaryBtn = ({
  onClick,
  loadingAll,
  icon,
  content,
  loadingContent,
  variant,
  type,
  disabled
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    "button",
    {
      type: type || "button",
      onClick: type !== "submit" ? onClick : void 0,
      disabled: loadingAll || disabled,
      className: (0, import_classnames.default)(
        "flex sm:text-sm items-center gap-2 text-center justify-center sm:px-2 sm:py-2 md:px-3 md:py-2 lg:px-3 lg:py-2 rounded-sm font-medium transition-all duration-300 ease-in-out",
        {
          // Secondary variant - enabled
          "border border-[#ed1c24] text-[#ed1c24] hover:text-white bg-white hover:bg-[#ed1c24] cursor-pointer": variant === "secondary" && !loadingAll && !disabled,
          // Secondary variant - disabled/loading
          "border border-[#d1d5db] text-[#9ca3af] bg-[#f3f4f6] cursor-not-allowed": variant === "secondary" && (loadingAll || disabled),
          // Success variant - enabled
          "text-[#22c55e] bg-[#dcfce7] hover:bg-[#22c55e] hover:text-white cursor-pointer": variant === "success" && !loadingAll && !disabled,
          // Success variant - disabled/loading
          "text-[#22c55e] bg-[#dcfce7] cursor-not-allowed opacity-60": variant === "success" && (loadingAll || disabled),
          // Primary variant - enabled
          "text-white bg-[#ed1c24] hover:bg-[#c0141b] cursor-pointer": (variant === "primary" || !variant) && !loadingAll && !disabled,
          // Primary variant - disabled/loading
          "text-white bg-[#9ca3af] cursor-not-allowed": (variant === "primary" || !variant) && (loadingAll || disabled),
          // Danger variant - enabled
          "text-[#ef4444] bg-[#fee2e2] hover:bg-[#ef4444] hover:text-white cursor-pointer": variant === "danger" && !loadingAll && !disabled,
          // Danger variant - disabled
          "text-[#ef4444] bg-[#fee2e2] cursor-not-allowed opacity-60": variant === "danger" && (loadingAll || disabled)
        }
      ),
      title: content,
      children: [
        loadingAll && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("svg", { className: "w-4 h-4 animate-spin", fill: "none", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "circle",
            {
              className: "opacity-25",
              cx: "12",
              cy: "12",
              r: "10",
              stroke: "currentColor",
              strokeWidth: "4"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "path",
            {
              className: "opacity-75",
              fill: "currentColor",
              d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            }
          )
        ] }),
        !loadingAll && icon === "download" && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_lucide_react.Download, { size: 16 }),
        !loadingAll && icon === "plus" && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_lucide_react.Plus, { size: 16 }),
        !loadingAll && icon === "upload" && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_lucide_react.Upload, { size: 16 }),
        !loadingAll && icon === "retry" && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_lucide_react.RefreshCw, { className: "w-4 h-4" }),
        loadingAll ? loadingContent : content
      ]
    }
  );
};
var PrimaryBtn_default = PrimaryBtn;

// src/helpers/ApplicationDetailsHelper.ts
var getSectionSlug = (applicationData, sectionSlug) => {
  if (!Array.isArray(applicationData) || typeof sectionSlug !== "string") {
    console.error(
      "Invalid input: applicationData must be an array and sectionSlug must be a string"
    );
    return null;
  }
  const section = applicationData.find(
    (section2) => section2.section_slug === sectionSlug
  );
  return section;
};
var getNidNo = (applicationData) => {
  if (!applicationData) return "";
  const section = getSectionSlug(applicationData, "personal_info");
  if (section?.pages || Array.isArray(section?.pages)) {
    for (const page of section.pages) {
      if (page.fields || Array.isArray(page.fields)) {
        for (const field of page.fields) {
          if (field.slug === "nid_number") {
            return field.value;
          }
        }
      }
    }
  }
  return "";
};

// src/components/CollapsibleSection.tsx
var import_antd2 = require("antd");
var import_clsx = __toESM(require("clsx"));

// src/components/FormSection.tsx
var import_antd = require("antd");
var import_jsx_runtime3 = require("react/jsx-runtime");
function FormSection({
  fields,
  isCreditRiskGrading,
  riskScores
}) {
  const parentsWithChildren = (fields ?? []).filter(
    (f) => Array.isArray(f.children) && f.children.length > 0
  );
  const isPDF = (url) => {
    if (!url) return false;
    return url.toLowerCase().includes(".pdf");
  };
  const renderValue = (field) => {
    if (["signature_card", "file"].includes(field.input_type) && field.value) {
      const url = Array.isArray(field.value) ? field.value[0] : field.value;
      if (isPDF(url)) {
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-2 hover:bg-red-100 transition-colors", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "svg",
            {
              className: "w-5 h-5 text-red-500",
              fill: "currentColor",
              viewBox: "0 0 20 20",
              children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "path",
                {
                  fillRule: "evenodd",
                  d: "M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z",
                  clipRule: "evenodd"
                }
              )
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "a",
            {
              href: url,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-sm font-medium text-red-600 hover:text-red-700",
              children: "View PDF Document"
            }
          )
        ] });
      }
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        import_antd.Image,
        {
          width: 120,
          height: 120,
          src: url,
          alt: field.label || "Image",
          className: "rounded-lg border border-gray-200"
        }
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "text-gray-900 font-medium", children: field.value ? field.value : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "text-gray-400 italic", children: "N/A" }) });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "bg-white rounded-lg border border-gray-200 overflow-hidden", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "grid grid-cols-1 divide-y divide-gray-100", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "grid gap-4 p-4 bg-gray-100 border-b border-gray-200 font-semibold text-sm text-gray-700 grid-cols-12", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "col-span-12 md:col-span-4", children: "Label" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "col-span-12 md:col-span-4", children: "Value" }),
      isCreditRiskGrading && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "col-span-12 md:col-span-4", children: "Risk Score" })
    ] }),
    (fields ?? []).filter((field) => {
      if (Array.isArray(field.children) && field.children.length > 0) {
        return false;
      }
      if (isCreditRiskGrading) {
        return field.value || riskScores?.risk_scores_with_label[field.slug]?.score;
      }
      return true;
    }).map((field, index) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
      "div",
      {
        className: `grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "col-span-12 md:col-span-4 flex items-start", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "text-sm font-medium text-gray-600", children: field.label })
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "col-span-12 md:col-span-4 flex items-center", children: renderValue(field) }),
          riskScores && isCreditRiskGrading && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "col-span-12 md:col-span-4 flex items-center", children: field.value ? riskScores?.risk_scores_with_label[field.slug]?.score ?? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "text-gray-400 italic font-medium", children: "N/A" }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "text-gray-400 italic font-medium", children: "N/A" }) })
        ]
      },
      field.label || field.slug || index
    )),
    parentsWithChildren.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "divide-y divide-gray-100", children: parentsWithChildren.map((parent) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "px-4 py-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "mb-2", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex items-start justify-between", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "text-sm text-gray-600 font-bold mb-2", children: parent.label }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "space-y-2", children: (parent.children ?? []).map(
        (child, ci) => {
          return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
            "div",
            {
              className: "grid grid-cols-12 gap-4 p-3 bg-white rounded-lg border border-gray-100",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "col-span-12 md:col-span-4 flex items-start", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" }),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "text-sm font-medium text-gray-600", children: child.label })
                ] }) }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "col-span-12 md:col-span-8 flex items-center", children: renderValue(child) })
              ]
            },
            `${parent.slug}-child-${child.slug ?? ci}`
          );
        }
      ) })
    ] }, `parent-${parent.slug}`)) })
  ] }) });
}

// src/hooks/useLocalStorage.ts
var import_react = require("react");
function useLocalStorage(key) {
  const [value, setValue] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        const parsed = JSON.parse(storedValue);
        setValue(parsed);
      }
    } catch (error) {
      console.error("Error reading localStorage:", error);
    }
  }, [key]);
  return value;
}

// src/hooks/useAddress.ts
function useAddress() {
  const preload = useLocalStorage("preload");
  const districts = preload?.districts.map((item) => ({
    label: item.l,
    value: item.v
  })) ?? [];
  const divisions = preload?.divisions.map((item) => ({
    label: item.l,
    value: item.v
  })) ?? [];
  const thanas = preload?.thanas.map((item) => ({
    label: item.l,
    value: item.v
  })) ?? [];
  const postal_codes = preload?.postal_codes.map((item) => ({
    label: item.l,
    value: item.v
  })) ?? [];
  return {
    divisions,
    districts,
    thanas,
    postal_codes
  };
}

// src/components/Address.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
function Address({ fields, addressData }) {
  const { divisions, districts, thanas, postal_codes } = useAddress();
  const getValue = (field) => {
    if (field.slug.includes("division")) {
      return divisions?.find(
        (option) => option.value === field.value
      )?.label || field.value;
    }
    if (field.slug.includes("district")) {
      return districts?.find(
        (option) => option.value === field.value
      )?.label || field.value;
    }
    if (field.slug.includes("thana")) {
      return thanas?.find((option) => option.value === field.value)?.label || field.value;
    }
    if (field.slug.includes("postal_code")) {
      return postal_codes?.find(
        (option) => option.value === field.value
      )?.label || field.value;
    }
    return field.value;
  };
  const permanentAddress = fields.find((field) => field.slug === "permanent_address")?.children || [];
  let permanentAddressFields = permanentAddress.map((item) => ({
    label: item.label,
    value: getValue(item)
  }));
  const presentAddress = fields.find((field) => field.slug === "present_address")?.children || [];
  const presentAddressFields = presentAddress.map((item) => ({
    label: item.label,
    value: getValue(item)
  }));
  const otherFields = fields.filter(
    (field) => ![
      "permanent_address",
      "present_address",
      "same_as_present_address"
    ].includes(field.slug)
  );
  const sameAsPresentAddressField = fields.find(
    (item) => item.slug === "same_as_present_address"
  );
  const sameAsPresentAddressFieldValue = sameAsPresentAddressField?.value;
  const isSameAsPresentAddress = (sameAsPresentAddressFieldValue ?? []).includes("true");
  if (isSameAsPresentAddress) {
    permanentAddressFields = [];
    permanentAddressFields.push({
      label: "Same as Present Address",
      value: "Yes"
    });
  } else {
    permanentAddressFields.unshift({
      label: "Same as Present Address",
      value: "No"
    });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "space-y-6", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "svg",
          {
            className: "w-5 h-5 text-blue-600",
            fill: "currentColor",
            viewBox: "0 0 20 20",
            children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "path",
              {
                fillRule: "evenodd",
                d: "M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z",
                clipRule: "evenodd"
              }
            )
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h2", { className: "text-lg font-bold text-gray-900", children: "Present Address" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(FormSection, { fields: presentAddressFields })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "svg",
          {
            className: "w-5 h-5 text-blue-600",
            fill: "currentColor",
            viewBox: "0 0 20 20",
            children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "path",
              {
                fillRule: "evenodd",
                d: "M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z",
                clipRule: "evenodd"
              }
            )
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h2", { className: "text-lg font-bold text-gray-900", children: "Permanent Address" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(FormSection, { fields: permanentAddressFields })
    ] }),
    otherFields.length > 0 && !isSameAsPresentAddress && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "svg",
          {
            className: "w-5 h-5 text-blue-600",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
              }
            )
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h2", { className: "text-lg font-bold text-gray-900", children: "Additional Information" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(FormSection, { fields: otherFields })
    ] }) })
  ] });
}

// src/types/constants.ts
var ApplicationStatusBgColors = {
  ["approved" /* APPROVED */]: "bg-green-100",
  ["in_progress" /* IN_PROGRESS */]: "bg-amber-100",
  ["initiated" /* INITIATED */]: "bg-sky-100",
  ["submitted" /* SUBMITTED */]: "bg-blue-100",
  ["rejected" /* REJECTED */]: "bg-red-100",
  ["resubmission_requested" /* RESUBMISSION_REQUESTED */]: "bg-orange-100",
  ["resubmitted" /* RESUBMITTED */]: "bg-cyan-100",
  ["mqc_rejected" /* MQC_REJECTED */]: "bg-rose-100",
  ["escalated" /* ESCALATED */]: "bg-purple-100",
  ["cbs_failed" /* CBS_FAILED */]: "bg-red-100"
};
var ApplicationStatusTextColors = {
  ["approved" /* APPROVED */]: "text-green-700",
  ["in_progress" /* IN_PROGRESS */]: "text-amber-700",
  ["initiated" /* INITIATED */]: "text-sky-700",
  ["submitted" /* SUBMITTED */]: "text-blue-700",
  ["rejected" /* REJECTED */]: "text-red-700",
  ["resubmission_requested" /* RESUBMISSION_REQUESTED */]: "text-orange-700",
  ["resubmitted" /* RESUBMITTED */]: "text-cyan-700",
  ["mqc_rejected" /* MQC_REJECTED */]: "text-rose-700",
  ["escalated" /* ESCALATED */]: "text-purple-700",
  ["cbs_failed" /* CBS_FAILED */]: "text-red-700"
};
var getApplicationStatus = (status) => {
  if (!status) return "N/A";
  if (status === "submitted") return "Submitted";
  if (status === "initiated") return "Initiated";
  if (status === "in_progress") return "In Progress";
  if (status === "cbs_failed") return "CBS Failed";
  if (status === "islamic") return "Islamic";
  if (status === "conventional") return "Conventional";
  return status;
};

// src/components/CollapsibleSection.tsx
var import_lucide_react2 = require("lucide-react");
var import_jsx_runtime5 = require("react/jsx-runtime");
var CollapsibleSectionsContainer = ({ application }) => {
  const getValue = (field) => {
    if (["dropdown", "radio"].includes(field.input_type) && (field.possible_values ?? []).length > 0) {
      return field.possible_values?.find(
        (option) => option.value === field.value
      )?.label;
    }
    return field.value;
  };
  const data = (application?.application_data || []).filter((item) => item.section_slug !== "cif").map((item) => {
    if (item.type === "form_section") {
      return {
        label: item.pages[0].label,
        section_slug: item.section_slug,
        fields: item.pages[0].fields.map((field) => ({
          value: getValue(field),
          children: Array.isArray(field.children) ? field.children.map((child) => ({
            ...child,
            value: getValue(child)
          })) : field.children,
          label: field.label,
          slug: field.slug,
          input_type: field.input_type,
          possible_values: field.possible_values
        }))
      };
    }
    if (item.type === "nid") {
      return {
        label: item.label,
        section_slug: item.section_slug,
        value: item.value
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
            possible_values: item.field.possible_values
          }
        ]
      };
    }
  });
  const items = data.filter((item) => item !== void 0).map((item) => ({
    key: item?.label,
    label: item.section_slug === "credit_risk_grading" && application.additional_info?.risk_grading_details ? `${item?.label} (Total score : ${application.additional_info.risk_grading_details?.risk_score?.score})` : item?.label,
    children: item.section_slug === "nid" ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Images, { images: item.value }) : item.section_slug === "address_information" ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Address, { fields: item.fields }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      FormSection,
      {
        fields: item.fields,
        isCreditRiskGrading: item.section_slug === "credit_risk_grading",
        riskScores: application.additional_info?.risk_grading_details
      }
    )
  }));
  const formatValue = (value) => {
    return value ? value.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") : null;
  };
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("hr", { className: "text-gray-300" }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 pt-6 pb-6 px-6 mb-2", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col 2xl:flex-row 2xl:gap-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col gap-4 2xl:w-auto 2xl:shrink-0", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-row gap-4 justify-center 2xl:justify-start", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "relative", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                import_antd2.Image,
                {
                  width: 280,
                  height: 280,
                  src: application.additional_info?.user_image,
                  alt: "user image",
                  className: "rounded-lg border-2 border-gray-100 w-35 h-35 sm:w-50 sm:h-50 2xl:w-70 2xl:h-70 object-cover"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md border border-gray-200", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                "svg",
                {
                  className: "w-5 h-5 text-blue-600",
                  fill: "currentColor",
                  viewBox: "0 0 20 20",
                  children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                    "path",
                    {
                      fillRule: "evenodd",
                      d: "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z",
                      clipRule: "evenodd"
                    }
                  )
                }
              ) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h2", { className: "text-sm font-semibold text-gray-700 uppercase tracking-wide text-center", children: "User Image" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "relative", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                import_antd2.Image,
                {
                  width: 280,
                  height: 280,
                  src: application.additional_info?.ec_user_image,
                  alt: "ec image",
                  className: "rounded-lg border-2 border-gray-100 w-35 h-35 sm:w-50 sm:h-50 2xl:w-70 2xl:h-70 object-cover"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md border border-gray-200", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                "svg",
                {
                  className: "w-5 h-5 text-blue-600",
                  fill: "currentColor",
                  viewBox: "0 0 20 20",
                  children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                    "path",
                    {
                      fillRule: "evenodd",
                      d: "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z",
                      clipRule: "evenodd"
                    }
                  )
                }
              ) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h2", { className: "text-sm font-semibold text-gray-700 uppercase tracking-wide text-center", children: "EC Image" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col bg-gray-50 rounded-lg p-4 border border-gray-200", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-xs font-medium text-gray-500 uppercase tracking-wide mb-2", children: "Face Match Score" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "text-sm font-bold text-blue-600 min-w-11.25", children: [
              application.additional_info?.face_match_percentage,
              "%"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "flex-1", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "w-full bg-gray-200 rounded-full h-2", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              "div",
              {
                className: (0, import_clsx.default)(
                  "h-2 rounded-full transition-all duration-300",
                  Number(
                    application.additional_info?.face_match_percentage
                  ) >= 80 ? "bg-green-500" : Number(
                    application.additional_info?.face_match_percentage
                  ) >= 60 ? "bg-yellow-500" : "bg-red-500"
                ),
                style: {
                  width: `${application.additional_info?.face_match_percentage}%`
                }
              }
            ) }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex-1 min-w-0 mt-6 2xl:mt-0", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h3", { className: "text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200", children: "Application Information" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "space-y-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-xs font-medium text-gray-500 uppercase tracking-wide mb-1", children: "Display ID" }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-sm font-semibold text-gray-900", children: application.additional_info?.application_display_id ?? "N/A" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-xs font-medium text-gray-500 uppercase tracking-wide mb-1", children: "Account No" }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-sm font-semibold text-gray-900", children: application.additional_info?.account_no ?? "N/A" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-xs font-medium text-gray-500 uppercase tracking-wide mb-1", children: "Name" }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-sm font-semibold text-gray-900", children: application.additional_info?.name ?? "N/A" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-xs font-medium text-gray-500 uppercase tracking-wide mb-1", children: "Gender" }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-sm font-semibold text-gray-900 capitalize", children: application.additional_info?.gender ?? "N/A" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-xs font-medium text-gray-500 uppercase tracking-wide mb-1", children: "Date of Birth" }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-sm font-semibold text-gray-900", children: application.additional_info?.dob ?? "N/A" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-xs font-medium text-gray-500 uppercase tracking-wide mb-1", children: "Mobile" }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-sm font-semibold text-gray-900", children: application.additional_info?.mobile ?? "N/A" })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "space-y-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-xs font-medium text-gray-500 uppercase tracking-wide mb-1", children: "NID No" }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-sm font-semibold text-gray-900", children: application.additional_info?.nid_no ?? "N/A" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-xs font-medium text-gray-500 uppercase tracking-wide mb-1", children: "Branch Name" }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-sm font-semibold text-gray-900 capitalize", children: application.additional_info?.branch_name ?? "N/A" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-xs font-medium text-gray-500 uppercase tracking-wide mb-1", children: "Banking Type" }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-sm font-semibold text-gray-900 capitalize", children: application.additional_info?.banking_type ?? "N/A" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-xs font-medium text-gray-500 uppercase tracking-wide mb-1", children: "Product Type" }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-sm font-semibold text-gray-900 capitalize", children: formatValue(
                application.additional_info?.product_type ?? "N/A"
              ) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-xs font-medium text-gray-500 uppercase tracking-wide mb-1", children: "Application Status" }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                "span",
                {
                  className: (0, import_clsx.default)(
                    "inline-flex px-3 py-1 rounded-full text-xs font-semibold",
                    ApplicationStatusBgColors[application.additional_info?.application_status],
                    ApplicationStatusTextColors[application.additional_info?.application_status]
                  ),
                  children: getApplicationStatus(
                    application.additional_info?.application_status
                  )
                }
              ) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-xs font-medium text-gray-500 uppercase tracking-wide mb-1", children: "Submitted At" }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-sm font-semibold text-gray-900", children: application.additional_info?.first_submitted_at ?? "N/A" })
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-2", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "flex flex-col lg:flex-row gap-6", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h3", { className: "text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200", children: "OCR Information" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "space-y-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-xs font-medium text-gray-500 uppercase tracking-wide mb-1", children: "Applicant name bangla" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-sm font-semibold text-gray-900", children: application.additional_info?.ocr_data?.applicant_name_ben })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-xs font-medium text-gray-500 uppercase tracking-wide mb-1", children: "Applicant name english" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "text-sm font-semibold text-gray-900 flex items-center gap-2", children: [
              application?.additional_info?.ocr_data?.applicant_name_eng,
              application?.additional_info?.ec_data && application.additional_info?.ec_data?.fieldVerificationResult?.nameEn ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(EcVerified, {}) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(EcFailed, {})
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-xs font-medium text-gray-500 uppercase tracking-wide mb-1", children: "Date of birth" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "text-sm font-semibold text-gray-900 flex items-center gap-2", children: [
              application.additional_info?.ocr_data?.dob,
              application.additional_info?.ec_data && application.additional_info?.ec_data?.fieldVerificationResult?.dateOfBirth ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(EcVerified, {}) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(EcFailed, {})
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-xs font-medium text-gray-500 uppercase tracking-wide mb-1", children: "Spouse name" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-sm font-semibold text-gray-900", children: application.additional_info?.ocr_data?.spouse_name ?? "N/A" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "space-y-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-xs font-medium text-gray-500 uppercase tracking-wide mb-1", children: "Father Name" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "text-sm font-semibold text-gray-900 flex items-center gap-2", children: [
              application.additional_info?.ocr_data?.father_name,
              application.additional_info?.ec_data && application.additional_info?.ec_data.fieldVerificationResult?.father ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(EcVerified, {}) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(EcFailed, {})
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-xs font-medium text-gray-500 uppercase tracking-wide mb-1", children: "Mother Name" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "text-sm font-semibold text-gray-900 flex items-center gap-2", children: [
              application.additional_info?.ocr_data?.mother_name,
              application.additional_info?.ec_data && application.additional_info?.ec_data.fieldVerificationResult?.mother ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(EcVerified, {}) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(EcFailed, {})
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-xs font-medium text-gray-500 uppercase tracking-wide mb-1", children: "NID No" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-sm font-semibold text-gray-900", children: application.additional_info?.ocr_data?.nid_no })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-xs font-medium text-gray-500 uppercase tracking-wide mb-1", children: "Address" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-sm font-semibold text-gray-900", children: application.additional_info?.ocr_data?.address ?? "N/A" })
          ] })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      import_antd2.Collapse,
      {
        items,
        expandIconPosition: "end",
        expandIcon: ({ isActive }) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          "div",
          {
            className: `transition-all duration-200 ${isActive ? "rotate-180" : "rotate-0"}`,
            style: {
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              borderRadius: "32px",
              backgroundColor: isActive ? "#ed1c24" : "#fee2e2"
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              "svg",
              {
                width: "16",
                height: "16",
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                  "path",
                  {
                    d: "M6 9L12 15L18 9",
                    stroke: isActive ? "white" : "#dc2626",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }
                )
              }
            )
          }
        )
      }
    )
  ] });
};
var CollapsibleSection_default = CollapsibleSectionsContainer;
var Images = ({
  images
}) => {
  const isPDF = (url) => {
    if (!url) return false;
    return url.toLowerCase().includes(".pdf");
  };
  const renderMedia = (url, alt, label) => {
    if (!url) return null;
    if (isPDF(url)) {
      return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col items-center gap-3", children: [
        label && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-sm font-semibold text-gray-700 uppercase tracking-wide", children: label }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "border-2 border-gray-200 rounded-xl p-8 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center w-full max-w-md h-[300px] transition-all hover:shadow-lg hover:border-red-300 group", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "bg-red-100 rounded-full p-4 mb-4 group-hover:bg-red-200 transition-colors", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            "svg",
            {
              className: "w-16 h-16 text-red-600",
              fill: "currentColor",
              viewBox: "0 0 20 20",
              children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                "path",
                {
                  fillRule: "evenodd",
                  d: "M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z",
                  clipRule: "evenodd"
                }
              )
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-lg font-bold text-gray-800 mb-4", children: "PDF Document" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            "a",
            {
              href: url,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "px-6 py-3 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5",
              children: "View PDF"
            }
          )
        ] })
      ] });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col items-center gap-3", children: [
      label && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-sm font-semibold text-gray-700 uppercase tracking-wide", children: label }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 transition-all hover:shadow-lg", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        import_antd2.Image,
        {
          src: url,
          width: 400,
          height: 300,
          alt,
          className: "object-cover"
        }
      ) })
    ] });
  };
  if (typeof images === "object" && !Array.isArray(images)) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-start gap-8 flex-wrap justify-center p-4", children: [
      renderMedia(images.front_image, "front_image", "Front Side"),
      renderMedia(images.back_image, "back_image", "Back Side")
    ] });
  }
  if (Array.isArray(images)) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "flex items-start gap-8 flex-wrap justify-center p-4", children: images.map(
      (img, index) => renderMedia(img, `Media ${index + 1}`, `Document ${index + 1}`)
    ) });
  }
  return null;
};
var EcVerified = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { className: "flex items-center gap-2 text-xs px-2 py-1 rounded-md bg-green-100 text-green-700 uppercase", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_lucide_react2.CircleCheckBig, { className: "w-4 h-4" }),
    "EC Verified"
  ] });
};
var EcFailed = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { className: "flex items-center gap-2 text-xs px-2 py-1 rounded-md bg-red-100 text-red-700 uppercase", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_lucide_react2.CircleX, { className: "w-4 h-4" }),
    "EC Failed"
  ] });
};

// src/components/ApplicationDetailsContainer.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var ApplicationDetailsContainer = ({
  application,
  title = "Application Details",
  showTitle = true
}) => {
  const nidNo = getNidNo(application?.application_data);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
    showTitle && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "flex justify-between items-center mb-6", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h1", { className: "text-2xl font-bold", children: title }) }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("hr", { className: "text-gray-300 py-2" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "flex flex-col gap-4", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      CollapsibleSection_default,
      {
        application,
        nidNo
      }
    ) })
  ] });
};
var ApplicationDetailsContainer_default = ApplicationDetailsContainer;

// src/components/ApplicationDetailsProvider.tsx
var import_sonner = require("sonner");
var import_jsx_runtime7 = require("react/jsx-runtime");
function ApplicationDetailsProvider() {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_sonner.Toaster, { richColors: true, position: "top-right" });
}

// src/components/ApplicationDetails.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
function ApplicationDetails({
  id,
  baseUrl,
  showActionsBtn,
  apiKey
}) {
  const [application, setApplication] = (0, import_react2.useState)({});
  const [loading, setLoading] = (0, import_react2.useState)(true);
  const [pdfDownloadloading, setPdfDownloadLoading] = (0, import_react2.useState)(false);
  const [documentsDownloadLoading, setDocumentsDownloadLoading] = (0, import_react2.useState)(false);
  const [approveloading, setApproveLoading] = (0, import_react2.useState)(false);
  const [rejectloading, setRejectLoading] = (0, import_react2.useState)(false);
  const detailsUrl = `${baseUrl}/api/application/${id}`;
  const preloadUrl = `${baseUrl}/api/preload-data`;
  (0, import_react2.useEffect)(() => {
    const fetchApplication = async () => {
      try {
        const res = await fetch(detailsUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey
          }
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
  (0, import_react2.useEffect)(() => {
    const callPreloadApi = async () => {
      try {
        const res = await fetch(preloadUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey
          }
        });
        if (res.status === 401) {
          window.location.reload();
          return;
        }
        const preload = await res.json();
        const localPreload = JSON.parse(
          localStorage.getItem("preload")
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
          "x-api-key": apiKey
        },
        body: null
      });
      if (res.status === 202) {
        const data = await res.json();
        import_sonner2.toast.success(data.message);
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
    } catch (e) {
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
          "x-api-key": apiKey
        },
        cache: "no-store"
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
    } catch (e) {
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
          "x-api-key": apiKey
        },
        cache: "no-store"
      });
      if (res.status == 401) {
        window.location.reload();
        return;
      }
      if (res.ok) {
        const data = await res.json();
        import_sonner2.toast.success(data.message);
      }
      if (!res.ok) {
        const text = await res.text();
        import_sonner2.toast.error(text);
        return;
      }
    } catch (e) {
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
          "x-api-key": apiKey
        },
        cache: "no-store"
      });
      if (res.status == 401) {
        window.location.reload();
        return;
      }
      if (res.ok) {
        const data = await res.json();
        import_sonner2.toast.success(data.message);
      }
      if (!res.ok) {
        const text = await res.text();
        import_sonner2.toast.error(text);
        return;
      }
    } catch (e) {
      console.error("error:", e);
    } finally {
      setRejectLoading(false);
    }
  };
  if (loading) return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Loader_default, {});
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(ApplicationDetailsProvider, {}),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex justify-between items-center pb-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h1", { className: "text-2xl font-bold", children: "Application Details" }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          PrimaryBtn_default,
          {
            variant: "secondary",
            type: "button",
            onClick: handlePdfDownload,
            loadingAll: pdfDownloadloading,
            icon: "download",
            content: "Download PDF",
            loadingContent: "Downloading..."
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          PrimaryBtn_default,
          {
            variant: "primary",
            type: "button",
            onClick: handleDocumentsDownload,
            loadingAll: documentsDownloadLoading,
            icon: "download",
            content: "Download Documents",
            loadingContent: "Downloading..."
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      ApplicationDetailsContainer_default,
      {
        application,
        title: "Application Details",
        showTitle: false
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "flex mt-5 justify-end items-center gap-2", children: showActionsBtn ? /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        PrimaryBtn_default,
        {
          onClick: handleApprove,
          variant: "success",
          content: "Approve",
          loadingAll: approveloading,
          loadingContent: "Approving..."
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        PrimaryBtn_default,
        {
          onClick: handleReject,
          variant: "danger",
          content: "Reject",
          loadingAll: rejectloading,
          loadingContent: "Rejecting..."
        }
      )
    ] }) : null })
  ] });
}

// src/components/ApplicationSection.tsx
var import_react6 = require("react");
var import_react_select2 = __toESM(require("react-select"));

// src/components/ApplicationTable.tsx
var import_clsx2 = __toESM(require("clsx"));
var import_antd3 = require("antd");
var import_lucide_react3 = require("lucide-react");

// src/components/table.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
var Table = ({ columns, dataSource }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_jsx_runtime9.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "overflow-auto h-[calc(100vh-285px)] border border-gray-200 rounded-lg", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("table", { className: "min-w-full table-auto border-collapse", children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("thead", { className: "text-gray-400 sticky top-0 bg-white z-10", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("tr", { children: columns.map((heading, index) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      "th",
      {
        className: "px-4 py-4 text-left text-sm font-medium text-gray-500 capitalize border-b border-gray-200",
        children: heading.title
      },
      index
    )) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("tbody", { children: dataSource.map((data, index) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      "tr",
      {
        className: "border-b border-gray-300 border-dashed hover:bg-gray-50 ",
        children: columns?.map((header, key) => {
          if (!header || !data) return null;
          const value = data[header.key];
          const hasRender = typeof header.render === "function";
          return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("td", { className: `px-4 py-4 text-sm text-gray-700`, children: hasRender ? header.render?.(value, data) : value !== null && value !== void 0 && value !== "" ? String(value) : "N/A" }, key);
        })
      },
      index
    )) })
  ] }) }) });
};
var table_default = Table;

// src/helpers/StringHelper.ts
var getBankingType = (type) => {
  if (type === "islamic") return "Islamic";
  if (type === "conventional") return "Conventional";
  return type;
};
var getApplicationStatus2 = (status) => {
  if (!status) return "N/A";
  if (status === "submitted") return "Submitted";
  if (status === "initiated") return "Initiated";
  if (status === "in_progress") return "In Progress";
  if (status === "cbs_failed") return "CBS Failed";
  return getBankingType(status);
};

// src/helpers/date.ts
function formatDateWithTime(dateString) {
  if (!dateString) return "Not submitted yet";
  const date = new Date(dateString?.replace(" ", "T"));
  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  };
  return new Intl.DateTimeFormat("en-US", options)?.format(date);
}

// src/constants/enums-with-colors.ts
var ApplicationStatusBgColors2 = {
  ["approved" /* APPROVED */]: "bg-green-100",
  // Light green background
  ["in_progress" /* IN_PROGRESS */]: "bg-amber-100",
  // Light amber background
  ["initiated" /* INITIATED */]: "bg-sky-100",
  // Light sky background
  ["submitted" /* SUBMITTED */]: "bg-blue-100",
  // Light blue background
  ["rejected" /* REJECTED */]: "bg-red-100",
  // Light red background
  ["resubmission_requested" /* RESUBMISSION_REQUESTED */]: "bg-orange-100",
  // Light orange background
  ["resubmitted" /* RESUBMITTED */]: "bg-cyan-100",
  // Light cyan background
  ["mqc_rejected" /* MQC_REJECTED */]: "bg-rose-100",
  // Light rose background
  ["escalated" /* ESCALATED */]: "bg-purple-100",
  // Light purple background
  ["cbs_failed" /* CBS_FAILED */]: "bg-red-100"
  // Light red background
};
var ApplicationStatusTextColors2 = {
  ["approved" /* APPROVED */]: "text-green-700",
  // Bold green text
  ["in_progress" /* IN_PROGRESS */]: "text-amber-700",
  // Bold amber text
  ["initiated" /* INITIATED */]: "text-sky-700",
  // Bold sky text
  ["submitted" /* SUBMITTED */]: "text-blue-700",
  // Bold blue text
  ["rejected" /* REJECTED */]: "text-red-700",
  // Bold red text
  ["resubmission_requested" /* RESUBMISSION_REQUESTED */]: "text-orange-700",
  // Bold orange text
  ["resubmitted" /* RESUBMITTED */]: "text-cyan-700",
  // Bold cyan text
  ["mqc_rejected" /* MQC_REJECTED */]: "text-rose-700",
  // Bold rose text
  ["escalated" /* ESCALATED */]: "text-purple-700",
  // Bold purple text
  ["cbs_failed" /* CBS_FAILED */]: "text-red-700"
  // Bold red text
};
var BankTypeBgColors = {
  ["islamic" /* ISLAMIC */]: "bg-emerald-100",
  // Light emerald background
  ["conventional" /* CONVENTIONAL */]: "bg-blue-100",
  // Light blue background
  ["both" /* BOTH */]: "bg-purple-100"
  // Light purple background
};
var BankTypeTextColors = {
  ["islamic" /* ISLAMIC */]: "text-emerald-700",
  // Bold emerald text
  ["conventional" /* CONVENTIONAL */]: "text-blue-700",
  // Bold blue text
  ["both" /* BOTH */]: "text-purple-700"
  // Bold purple text
};

// src/components/ApplicationTable.tsx
var import_jsx_runtime10 = require("react/jsx-runtime");
var ApplicationTable = ({ data }) => {
  const columns = [
    {
      title: "Display ID",
      key: "display_id"
    },
    {
      title: "Account No.",
      key: "account_number"
    },
    {
      title: "Name",
      key: "name"
    },
    {
      title: "Mobile",
      key: "identifier"
    },
    {
      title: "Gender",
      key: "gender",
      render: (_, record) => record.gender ? record.gender.charAt(0).toUpperCase() + record.gender.slice(1) : "N/A"
    },
    {
      title: "Banking Type",
      key: "banking_type",
      render: (_, record) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        "span",
        {
          className: (0, import_clsx2.default)(
            "px-2 py-1 rounded-md text-xs font-medium inline-block text-center",
            BankTypeBgColors[record.banking_type?.toLowerCase()],
            BankTypeTextColors[record.banking_type?.toLowerCase()]
          ),
          children: getBankingType(record.banking_type) ?? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "text-gray-700 text-sm font-normal", children: "N/A" })
        }
      )
    },
    {
      title: "Branch Code",
      key: "branch_code"
    },
    {
      title: "Product Type",
      key: "product_type",
      render: (_, record) => record.product_type ? record.product_type.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") : "N/A"
    },
    {
      title: "Application Status",
      key: "status",
      render: (_, record) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_antd3.Tooltip, { placement: "top", title: record.failed_reason, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        "span",
        {
          className: (0, import_clsx2.default)(
            "px-2 py-1 rounded-md text-xs font-medium inline-block text-center",
            ApplicationStatusBgColors2[record.status.toLowerCase()],
            ApplicationStatusTextColors2[record.status.toLowerCase()]
          ),
          children: getApplicationStatus2(record.status)
        }
      ) })
    },
    {
      title: "Submitted At",
      key: "last_submission_at",
      render: (value) => formatDateWithTime(value)
    },
    {
      title: "Actions",
      key: "id",
      render: (_, record) => {
        if (["submitted", "cbs_failed", "in_progress"].includes(
          record.status.toLowerCase()
        )) {
          return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "flex gap-3  items-center", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
            "a",
            {
              className: "px-2 py-2 bg-purple-100 text-purple-500 hover:bg-purple-400 hover:text-white rounded-md shadow flex items-center cursor-pointer transition-all duration-300 ease-in-out",
              href: `/applications/${record.id}`,
              children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
                "button",
                {
                  className: "transform cursor-pointer",
                  title: "Application Details",
                  children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_lucide_react3.Eye, { className: "w-4 h-4" })
                }
              )
            }
          ) });
        }
        return null;
      }
    }
  ];
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(table_default, { columns, dataSource: data });
};
var ApplicationTable_default = ApplicationTable;

// src/components/SearchBar.tsx
var import_react3 = require("react");
var import_antd4 = require("antd");
var import_lucide_react4 = require("lucide-react");
var import_jsx_runtime11 = require("react/jsx-runtime");
var SearchBar = ({
  searchValue,
  onSubmit,
  placeholder = "Enter mobile number",
  error,
  onChange
}) => {
  const [value, setValue] = (0, import_react3.useState)(searchValue);
  const [isLengthValid, setIsLengthValid] = (0, import_react3.useState)(value.length > 0);
  const [warning, setWarning] = (0, import_react3.useState)("");
  const handleChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    setIsLengthValid(inputValue.length > 0);
    setWarning("");
    onChange?.(inputValue);
  };
  const handleSubmit = () => {
    onSubmit(value);
  };
  const handleClear = () => {
    setValue("");
    setWarning("");
    setIsLengthValid(false);
    onSubmit("");
  };
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "flex flex-col gap-1 min-w-[250px] sm:text-[12px] lg:text-sm", children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "relative", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        import_antd4.Input,
        {
          value,
          onChange: handleChange,
          placeholder,
          className: "!border-gray-400 focus:!border-[#003970] hover:!border-[#003970] !text-gray-600 !rounded-md !px-3 !py-2 pr-16 sm:text-[12px] lg:text-base placeholder-text-base",
          onPressEnter: handleSubmit
        }
      ),
      value && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        "button",
        {
          onClick: handleClear,
          className: "absolute right-9 top-1/2 -translate-y-1/2 px-1 py-1 text-gray-500 hover:text-red-500 cursor-pointer sm:text-[12px] lg:text-sm",
          "aria-label": "Clear search",
          type: "button",
          children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_lucide_react4.X, { size: 16 })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        "button",
        {
          onClick: handleSubmit,
          className: `absolute right-1 top-1/2 -translate-y-1/2 px-2 py-1 focus:outline-none sm:text-[12px] lg:text-sm ${isLengthValid ? "text-[#003970] hover:text-blue-700 cursor-pointer" : "text-gray-400 cursor-not-allowed"}`,
          "aria-label": "Submit search",
          type: "button",
          disabled: !isLengthValid,
          children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_lucide_react4.Search, { size: 18 })
        }
      )
    ] }),
    warning && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "text-red-600 text-xs mt-1", children: warning }),
    error && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "text-red-600 text-sm", children: error })
  ] });
};
var SearchBar_default = SearchBar;

// src/components/DateFilter.tsx
var import_antd5 = require("antd");
var import_dayjs = __toESM(require("dayjs"));
var import_jsx_runtime12 = require("react/jsx-runtime");
var { RangePicker } = import_antd5.DatePicker;
var DateFilter = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange
}) => {
  const value = startDate && endDate ? [(0, import_dayjs.default)(startDate), (0, import_dayjs.default)(endDate)] : null;
  const disabledDate = (current) => {
    if (!current) return false;
    const sixMonthsAgo = (0, import_dayjs.default)().subtract(6, "month").startOf("day");
    return current.isBefore(sixMonthsAgo);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
    RangePicker,
    {
      value,
      disabledDate,
      onChange: (dates) => {
        onStartDateChange(dates?.[0]?.format("YYYY-MM-DD") || "");
        onEndDateChange(dates?.[1]?.format("YYYY-MM-DD") || "");
      },
      placeholder: ["Start Date", "End Date"],
      allowClear: false,
      className: "placeholder-text-sm sm:text-sm lg:text-sm !border !border-gray-400 focus:!border-[#003970] !text-gray-600 hover:!border-[#003970] rounded-md min-w-[150px] !px-3 !py-2 !cursor-pointer",
      style: {
        boxShadow: "none"
      }
    }
  );
};
var DateFilter_default = DateFilter;

// src/hooks/useProductList.ts
var import_react4 = require("react");
var import_navigation = require("next/navigation");
var useProductList = (page = 1) => {
  const [data, setData] = (0, import_react4.useState)(null);
  const [loading, setLoading] = (0, import_react4.useState)(true);
  const [error, setError] = (0, import_react4.useState)(null);
  const [searchTerm, setSearchTerm] = (0, import_react4.useState)("");
  const router = (0, import_navigation.useRouter)();
  const fetchProducts = (0, import_react4.useCallback)(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://city-api.dev-polygontech.xyz/api/admin/products-for-filter?",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "mangeD01axB3sBDM3HwRmh2MmO4hQ5aXyXpCLOwp8QRYKymrgyCaaFwJciTgWqzz"
          }
        }
      );
      const data2 = await res.json();
      setData(data2);
    } catch (err) {
      console.log("Error fetching product data:", err?.message || err);
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm, router]);
  (0, import_react4.useEffect)(() => {
    fetchProducts();
  }, [fetchProducts]);
  return {
    products: data?.data,
    loading,
    error,
    fetchProducts,
    searchTerm,
    setSearchTerm
  };
};
var useProductList_default = useProductList;

// src/components/pagination.tsx
var React3 = __toESM(require("react"));
var import_lucide_react5 = require("lucide-react");
var import_classnames3 = __toESM(require_classnames());

// src/components/button.tsx
var React2 = __toESM(require("react"));
var import_react_slot = require("@radix-ui/react-slot");
var import_class_variance_authority = require("class-variance-authority");
var import_classnames2 = __toESM(require_classnames());
var import_jsx_runtime13 = require("react/jsx-runtime");
var buttonVariants = (0, import_class_variance_authority.cva)(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Button = React2.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? import_react_slot.Slot : "button";
    return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
      Comp,
      {
        className: (0, import_classnames2.default)(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";

// src/components/pagination.tsx
var import_jsx_runtime14 = require("react/jsx-runtime");
var Pagination = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
  "nav",
  {
    role: "navigation",
    "aria-label": "pagination",
    className: (0, import_classnames3.default)("mx-auto flex w-full justify-center", className),
    ...props
  }
);
Pagination.displayName = "Pagination";
var PaginationContent = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
  "ul",
  {
    ref,
    className: (0, import_classnames3.default)("flex flex-row items-center gap-1", className),
    ...props
  }
));
PaginationContent.displayName = "PaginationContent";
var PaginationItem = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("li", { ref, className: (0, import_classnames3.default)("", className), ...props }));
PaginationItem.displayName = "PaginationItem";
var PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
  "a",
  {
    "aria-current": isActive ? "page" : void 0,
    className: (0, import_classnames3.default)(
      buttonVariants({
        variant: isActive ? "default" : "ghost",
        size
      }),
      isActive && "bg-primary text-white hover:bg-primary/90",
      "text-xs",
      className
    ),
    ...props
  }
);
PaginationLink.displayName = "PaginationLink";
var PaginationPrevious = ({
  className,
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
  PaginationLink,
  {
    "aria-label": "Go to previous page",
    size: "default",
    className: (0, import_classnames3.default)(
      "gap-1 pl-2.5 text-xs",
      "hover:-translate-y-0.5 hover:shadow-md transition-transform",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_lucide_react5.ChevronLeft, { className: "h-3.5 w-3.5" }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { children: "Previous" })
    ]
  }
);
PaginationPrevious.displayName = "PaginationPrevious";
var PaginationNext = ({
  className,
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
  PaginationLink,
  {
    "aria-label": "Go to next page",
    size: "default",
    className: (0, import_classnames3.default)(
      "gap-1 pr-2.5 text-xs",
      "hover:-translate-y-0.5 hover:shadow-md transition-transform",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { children: "Next" }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_lucide_react5.ChevronRight, { className: "h-3.5 w-3.5" })
    ]
  }
);
PaginationNext.displayName = "PaginationNext";
var PaginationEllipsis = ({
  className,
  ...props
}) => /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
  "span",
  {
    "aria-hidden": true,
    className: (0, import_classnames3.default)("flex h-9 w-9 items-center justify-center", className),
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_lucide_react5.MoreHorizontal, { className: "h-4 w-4" }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "sr-only", children: "More pages" })
    ]
  }
);
PaginationEllipsis.displayName = "PaginationEllipsis";

// src/components/PaginationWrapper.tsx
var import_jsx_runtime15 = require("react/jsx-runtime");
var PaginationWrapper = ({
  currentPage,
  lastPage,
  links,
  onPageChange
}) => {
  const pageLinks = links.slice(1, -1);
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "flex flex-col xl:flex-row items-center xl:justify-between px-4 py-3 sm:px-6 mt-4 gap-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "hidden xl:flex", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("p", { className: "text-sm text-gray-700 whitespace-nowrap", children: [
      "Showing page ",
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "font-medium", children: currentPage }),
      " of",
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "font-medium", children: lastPage }),
      " pages"
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Pagination, { className: "!justify-start xl:!justify-end", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(PaginationContent, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
        PaginationPrevious,
        {
          onClick: (e) => {
            e.preventDefault();
            if (currentPage > 1) onPageChange(currentPage - 1);
          },
          className: currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
        }
      ) }),
      pageLinks.map((link, index) => {
        const pageNumber = isNaN(Number(link.label)) ? null : Number(link.label);
        if (!pageNumber) {
          return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(PaginationEllipsis, {}) }, `ellipsis-${index}`);
        }
        return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
          PaginationLink,
          {
            onClick: (e) => {
              e.preventDefault();
              onPageChange(pageNumber);
            },
            isActive: link.active,
            className: !link.url ? "pointer-events-none opacity-50" : "cursor-pointer",
            children: link.label
          }
        ) }, link.label);
      }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
        PaginationNext,
        {
          onClick: (e) => {
            e.preventDefault();
            if (currentPage < lastPage) onPageChange(currentPage + 1);
          },
          className: currentPage === lastPage ? "pointer-events-none opacity-50" : "cursor-pointer"
        }
      ) })
    ] }) })
  ] });
};
var PaginationWrapper_default = PaginationWrapper;

// src/hooks/useGetApplicationList.ts
var import_react5 = require("react");
var import_navigation2 = require("next/navigation");
var import_dayjs2 = __toESM(require("dayjs"));
var useGetApplicationList = (page, apiKey, url) => {
  const today = (0, import_dayjs2.default)().format("YYYY-MM-DD");
  const sixMonthsAgo = (0, import_dayjs2.default)().subtract(6, "month").format("YYYY-MM-DD");
  const [data, setData] = (0, import_react5.useState)(null);
  const [loading, setLoading] = (0, import_react5.useState)(true);
  const [error, setError] = (0, import_react5.useState)(null);
  const [searchTerm, setSearchTerm] = (0, import_react5.useState)("");
  const [identifier, setIdentifier] = (0, import_react5.useState)("");
  const [startDate, setStartDate] = (0, import_react5.useState)(sixMonthsAgo);
  const [endDate, setEndDate] = (0, import_react5.useState)(today);
  const [bankingType, setBankingType] = (0, import_react5.useState)("");
  const [gender, setGender] = (0, import_react5.useState)("");
  const [productType, setProductType] = (0, import_react5.useState)("");
  const [onboardingType, setOnboardingType] = (0, import_react5.useState)("");
  const [status, setStatus] = (0, import_react5.useState)("");
  const router = (0, import_navigation2.useRouter)();
  (0, import_react5.useEffect)(() => {
    setIdentifier(searchTerm);
  }, [searchTerm]);
  const clearError = (0, import_react5.useCallback)(() => {
    setError(null);
  }, []);
  const fetchApplications = (0, import_react5.useCallback)(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: page.toString() });
    if (identifier) params.append("column", identifier);
    if (startDate) params.append("start_date", startDate);
    if (endDate) params.append("end_date", endDate);
    if (bankingType) params.append("banking_type", bankingType);
    if (status) params.append("status", status);
    if (gender) params.append("gender", gender);
    if (productType) params.append("product_type", productType);
    const defaultUrl = `${process.env.NEXT_PUBLIC_API_ADMIN_BASE_URL}/api/admin/applications`;
    const api = url ?? defaultUrl;
    try {
      const res = await fetch(api + "?" + params.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey
        }
      });
      const data2 = await res.json();
      setData(data2);
    } catch (error2) {
      console.error("Error fetching application:", error2);
    } finally {
      setLoading(false);
    }
  }, [
    page,
    identifier,
    startDate,
    endDate,
    bankingType,
    status,
    gender,
    productType,
    router,
    url,
    apiKey
  ]);
  const setSearchTermWithErrorClear = (0, import_react5.useCallback)(
    (term) => {
      setSearchTerm(term);
      if (term === "" && error) {
        setError(null);
      }
    },
    [error]
  );
  (0, import_react5.useEffect)(() => {
    fetchApplications();
  }, [fetchApplications]);
  const defaultOptions = [
    { value: "islamic", label: "Islamic" },
    { value: "conventional", label: "Conventional" }
  ];
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "others", label: "Others" }
  ];
  const allStatus = [
    { value: "submitted", label: "Submitted" },
    { value: "in_progress", label: "In Progress" }
  ];
  return {
    applications: data,
    loading,
    error,
    fetchApplications,
    searchTerm,
    setSearchTerm: setSearchTermWithErrorClear,
    startDate,
    endDate,
    bankingType,
    setStartDate,
    setEndDate,
    setBankingType,
    defaultOptions,
    onboardingType,
    setOnboardingType,
    clearError,
    allStatus,
    status,
    setStatus,
    genderOptions,
    gender,
    setGender,
    productType,
    setProductType
  };
};
var useGetApplicationList_default = useGetApplicationList;

// src/components/FormSelect.tsx
var import_react_select = __toESM(require("react-select"));
var import_jsx_runtime16 = require("react/jsx-runtime");
var selectStyles = {
  control: (base) => ({
    ...base,
    minHeight: "42px",
    height: "42px",
    borderRadius: "8px"
  }),
  valueContainer: (base) => ({
    ...base,
    height: "42px",
    padding: "0 8px"
  }),
  indicatorsContainer: (base) => ({
    ...base,
    height: "42px"
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 999999
  }),
  menu: (base) => ({
    ...base,
    zIndex: 999999
  }),
  menuList: (base) => ({
    ...base,
    zIndex: 999999
  })
};

// src/components/ApplicationSection.tsx
var import_jsx_runtime17 = require("react/jsx-runtime");
var ApplicationSection = ({ apiKey, url }) => {
  const [currentPage, setCurrentPage] = (0, import_react6.useState)(1);
  const {
    error,
    status,
    gender,
    endDate,
    loading,
    allStatus,
    startDate,
    searchTerm,
    productType,
    bankingType,
    applications,
    genderOptions,
    defaultOptions,
    setGender,
    setStatus,
    clearError,
    setEndDate,
    setStartDate,
    setSearchTerm,
    setProductType,
    setBankingType
  } = useGetApplicationList_default(currentPage, apiKey, url);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const info = useLocalStorage("info");
  const [searchError, setSearchError] = (0, import_react6.useState)(null);
  const { products } = useProductList_default();
  const productOptions = (products ?? []).map((item) => ({
    value: item.value,
    label: item.label
  }));
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("h1", { className: "sm:text-[16px] md:text-2xl font-medium mb-3", children: "Application List" }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "flex flex-col xl:flex-row justify-between md:items-end xl:items-center pb-2 gap-2" })
    ] }),
    !loading && applications?.data && info?.permissions.can_download_applications_list && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "mb-4", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "flex items-center justify-between gap-3 mb-4", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "flex items-center gap-2 flex-wrap justify-end flex-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
        import_react_select2.default,
        {
          className: "min-w-40",
          options: defaultOptions,
          isClearable: true,
          isSearchable: true,
          menuPosition: "fixed",
          components: { IndicatorSeparator: () => null },
          menuPortalTarget: typeof window !== "undefined" ? document.body : null,
          styles: selectStyles,
          value: defaultOptions.find((o) => o.value === bankingType) || null,
          onChange: (opt) => {
            setBankingType(opt?.value);
            setCurrentPage(1);
          },
          placeholder: "Banking Type"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
        import_react_select2.default,
        {
          className: "w-62.5",
          options: productOptions,
          isClearable: true,
          isSearchable: true,
          menuPosition: "fixed",
          components: { IndicatorSeparator: () => null },
          menuPortalTarget: typeof window !== "undefined" ? document.body : null,
          styles: selectStyles,
          value: productOptions.find((o) => o.value === productType) || null,
          onChange: (opt) => {
            setProductType(opt?.value);
            setCurrentPage(1);
          },
          placeholder: "Product Type"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
        import_react_select2.default,
        {
          className: "min-w-30",
          options: genderOptions,
          isClearable: true,
          isSearchable: true,
          menuPosition: "fixed",
          components: { IndicatorSeparator: () => null },
          menuPortalTarget: typeof window !== "undefined" ? document.body : null,
          styles: selectStyles,
          value: genderOptions.find((o) => o.value === gender) || null,
          onChange: (opt) => {
            setGender(opt?.value);
            setCurrentPage(1);
          },
          placeholder: "Gender"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
        import_react_select2.default,
        {
          className: "min-w-45",
          options: allStatus,
          isClearable: true,
          isSearchable: true,
          menuPosition: "fixed",
          components: { IndicatorSeparator: () => null },
          menuPortalTarget: typeof window !== "undefined" ? document.body : null,
          styles: selectStyles,
          value: allStatus.find((o) => o.value === status) || null,
          onChange: (opt) => {
            setStatus(opt?.value);
            setCurrentPage(1);
          },
          placeholder: "Application Status"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "min-w-55", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
        SearchBar_default,
        {
          searchValue: searchTerm,
          onSubmit: (val) => {
            setSearchTerm(val);
            setCurrentPage(1);
            setSearchError(null);
            if (val === "" && error) {
              clearError();
            }
          },
          placeholder: "Branch Code | Mobile No",
          label: "Identifier",
          error: searchError || error?.message,
          onChange: () => {
            setSearchError(null);
            if (error) {
              clearError();
            }
          }
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
        DateFilter_default,
        {
          startDate,
          endDate,
          onStartDateChange: (date) => {
            setStartDate(date);
            setCurrentPage(1);
          },
          onEndDateChange: (date) => {
            setEndDate(date);
            setCurrentPage(1);
          }
        }
      )
    ] }) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("hr", { className: "text-gray-300 py-2" }),
    loading && !error && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Loader_default, {}),
    error && /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "py-8 text-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("p", { className: "text-red-500 font-medium", children: "Failed to load applications." }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("p", { className: "text-gray-500 mt-1", children: "Please try again later or contact support." })
    ] }),
    !loading && !error && applications?.data && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_jsx_runtime17.Fragment, { children: (applications?.data ?? []).length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(import_jsx_runtime17.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
        ApplicationTable_default,
        {
          canDownloadPdf: info?.permissions.can_download_applications_list,
          data: applications.data
        }
      ),
      applications?.meta && applications.meta.last_page > 1 && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
        PaginationWrapper_default,
        {
          currentPage: applications.meta.current_page ?? 1,
          lastPage: applications.meta.last_page ?? 1,
          links: applications.meta.links ?? [],
          onPageChange: handlePageChange
        }
      )
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "py-8 text-center text-gray-500", children: "No application found." }) })
  ] });
};
var ApplicationSection_default = ApplicationSection;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ApplicationDetails,
  ApplicationSection
});
/*! Bundled license information:

classnames/index.js:
  (*!
  	Copyright (c) 2018 Jed Watson.
  	Licensed under the MIT License (MIT), see
  	http://jedwatson.github.io/classnames
  *)
*/
//# sourceMappingURL=index.js.map