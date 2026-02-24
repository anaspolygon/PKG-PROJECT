/* eslint-disable @typescript-eslint/no-explicit-any */
export const formatFieldName = (field: string) => {
  return field
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const flattenObjectLastKey = (obj: any, result: any = {}) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        flattenObjectLastKey(value, result);
      } else {
        result[key] = value;
      }
    }
  }
  return result;
};
