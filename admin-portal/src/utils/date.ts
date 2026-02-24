/* eslint-disable @typescript-eslint/no-explicit-any */
export const formatDate = (d: string) => {
  const date = new Date(d);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-GB", options);
};

export function formatDateWithTime(dateString: string): string {
  if (!dateString) return "Not submitted yet";
  const date = new Date(dateString?.replace(" ", "T"));

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  return new Intl.DateTimeFormat("en-US", options)?.format(date);
}

export const handlePdfDownload = (blob: any, phoneNumber: unknown) => {
  const url = window.URL.createObjectURL(blob.blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Account_${phoneNumber}.pdf`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
export const normalizeMobile = (value: string): string => {
  return value
    .replace(/^\+880/, "0")
    .replace(/[^\d]/g, "")
    .slice(0, 11);
};

export const relationOptions = [
  { label: "Brother", value: "Brother" },
  { label: "Brother-in-law", value: "Brother-in-law" },
  { label: "Cousin", value: "Cousin" },
  { label: "Daughter", value: "Daughter" },
  { label: "Daughter-in-law", value: "Daughter-in-law" },
  { label: "Father", value: "Father" },
  { label: "Father-in-law", value: "Father-in-law" },
  { label: "Granddaughter", value: "Granddaughter" },
  { label: "Grandfather", value: "Grandfather" },
  { label: "Grandmother", value: "Grandmother" },
  { label: "Grandson", value: "Grandson" },
  { label: "Husband", value: "Husband" },
  { label: "Mother", value: "Mother" },
  { label: "Mother-in-law", value: "Mother-in-law" },
  { label: "Nephew", value: "Nephew" },
  { label: "Niece", value: "Niece" },
  { label: "Other", value: "Other" },
  { label: "Sister", value: "Sister" },
  { label: "Sister-in-law", value: "Sister-in-law" },
  { label: "Son", value: "Son" },
  { label: "Son-in-law", value: "Son-in-law" },
  { label: "Uncle", value: "Uncle" },
  { label: "Wife", value: "Wife" },
];
export const documentType = [
  { label: "NID", value: "nid" },
  { label: "Birth Certificate", value: "birth_certificate" },
  { label: "Passport", value: "passport" },
  { label: "Driving License", value: "driving_license" },
];
export const guardianDocumentType = [
  { label: "Birth Certificate", value: "birth_certificate" },
  { label: "Passport", value: "passport" },
];

export function convertToBanglaNumber(num: number): string {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .split("")
    .map((digit) => banglaDigits[parseInt(digit)])
    .join("");
}
