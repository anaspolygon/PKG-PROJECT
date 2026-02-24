// /* eslint-disable @typescript-eslint/no-explicit-any */
// import "server-only";
// import { cookies } from "next/headers";
// // import { FilterPayload } from "@/app/(locale)/(main)/shop/types";

// const filterKey = "product_filters";

// // Default filter values
// // const defaultFilters = {
// //   sort: undefined as "asc" | "desc" | undefined,
// //   category: undefined,
// //   size: undefined,
// //   brand: undefined,
// //   type: undefined,
// //   search: undefined,
// // };
// const defaultFilters: {
//   sort: "asc" | "desc" | undefined;
//   category: string | undefined;
//   size: string | undefined;
//   brand: string | undefined;
//   type: string | undefined;
//   search: string | undefined;
// } = {
//   sort: undefined,
//   category: undefined,
//   size: undefined,
//   brand: undefined,
//   type: undefined,
//   search: undefined,
// };

// function parseJSON<T>(value: string | undefined, fallback: T): T {
//   try {
//     return value ? JSON.parse(value) : fallback;
//   } catch {
//     return fallback;
//   }
// }

// // async function saveFilters(filters: FilterPayload) {
// //   const existing = await getFilters();
// //   const updatedFilters = { ...existing, ...filters };
// //   (await cookies()).set(filterKey, JSON.stringify(updatedFilters));
// // }

// // async function setCategory(filters: FilterPayload) {
// //   (await cookies()).set(filterKey, JSON.stringify(filters));
// // }

// async function getFilters() {
//   const cookieValue = (await cookies()).get(filterKey)?.value;
//   return parseJSON(cookieValue, defaultFilters);
// }

// async function removeFilters() {
//   (await cookies()).delete(filterKey);
// }

// // async function resetAll() {
// //   await saveFilters(defaultFilters);
// // }

// // export const productFilterService = {
// //   setCategory: setCategory,
// //   save: saveFilters,
// //   get: getFilters,
// //   remove: removeFilters,
// //   reset: resetAll,
// // };
