import { useItemsStore } from "@/store/useUserstore";
import { toBanglaDigits } from "../helpers/ecVerify";

interface Option {
  l: string;
  v: string;
  p?: string;
  d?: string;
}

type PreloadType = {
  divisions: Option[];
  districts: Option[];
  post_offices: Option[];
  thanas: Option[];
};

const getPostalCodes = (postOffices: Option[]): Option[] => {
  return postOffices.map((item) => {
    return {
      l: item.v.split("#")[1],
      v: item.v,
      p: item.p,
    };
  });
};

const convertToLabelValue = (options: Option[] = []) => {
  return options.map((item) => ({
    label: item.l,
    value: item.v,
    parent: item.p || null,
  }));
};

const useAdminPreload = () => {
  const { preload_bangla } = useItemsStore().items as {
    preload_bangla?: PreloadType;
  };

  const divisions = preload_bangla?.divisions || [];
  const districts = preload_bangla?.districts || [];
  const thanas = preload_bangla?.thanas || [];
  const postOffices = preload_bangla?.post_offices || [];
  const postalCodes = getPostalCodes(postOffices) || [];

  return {
    divisions: convertToLabelValue(divisions),
    districts: convertToLabelValue(districts),
    thanas: convertToLabelValue(thanas),
    postOffices: convertToLabelValue(postOffices),
    postalCodes: convertToLabelValue(postalCodes).map((item) => ({
      label: toBanglaDigits(item.label),
      value: item.value,
      parent: item.parent,
    })),
  };
};

export default useAdminPreload;
