/* eslint-disable @typescript-eslint/no-explicit-any */
export const formatTimer = (seconds: number) => {
  const min = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const sec = (seconds % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
};
export const changValue = (data: any) => {
  if (!data) return null;
  if (Array.isArray(data) && data.length > 0) {
    if (data[0] instanceof File) {
      return data;
    }
    if (typeof data[0] === "string") {
      return null;
    }
  }
  return null;
};
export function ensureStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .filter((item) => typeof item === "string") as string[];
  }
  return [];
}