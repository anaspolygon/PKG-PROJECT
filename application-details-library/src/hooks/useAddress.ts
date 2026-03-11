/* eslint-disable @typescript-eslint/no-explicit-any */

import { useLocalStorage } from "./useLocalStorage";

export function useAddress() {
  const preload = useLocalStorage("preload");
  const districts =
    preload?.districts.map((item: any) => ({
      label: item.l,
      value: item.v,
    })) ?? [];
  const divisions =
    preload?.divisions.map((item: any) => ({
      label: item.l,
      value: item.v,
    })) ?? [];
  const thanas =
    preload?.thanas.map((item: any) => ({
      label: item.l,
      value: item.v,
    })) ?? [];
  const postal_codes =
    preload?.postal_codes.map((item: any) => ({
      label: item.l,
      value: item.v,
    })) ?? [];

  return {
    divisions,
    districts,
    thanas,
    postal_codes,
  };
}
