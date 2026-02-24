/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

const banglaRegex =
  /^[\u0980-\u09FF\u09E6-\u09EF\u200C\u200B\s:,\-\/()."\'‘’“”।\{\}\[\]]+$/;
const englishRegex = /^[a-zA-Z0-9\s.,!?'"()\-\:;\/\\]+$/;

const optionalBanglaString = z
  .string()
  .optional()
  .refine((val) => !val || banglaRegex.test(val), {
    message: "Must be in Bangla",
  });

const optionalEnglishString = z
  .string()
  .nonempty("English name is required")
  .refine((val) => !val || englishRegex.test(val), {
    message: "Must be in English",
  });

const postalCodeRule = z
  .string()
  .optional()
  .refine((val) => !val || /^[০-৯]{4}$/.test(val), {
    message: "Must be a valid 4-digit postal code  (Bangla  digits only)",
  });

const optionalAddress = z
  .object({
    division: optionalBanglaString,
    district: optionalBanglaString,
    upozila: optionalBanglaString,
    unionOrWard: optionalBanglaString,
    postOffice: optionalBanglaString,
    postalCode: postalCodeRule,
    villageOrRoad: optionalBanglaString,
  })
  .optional();

export const formSchema = z.object({
  nid: z
    .string()
    .nonempty("National ID is required")
    .regex(
      /^\d{10}$|^\d{13}$|^\d{17}$/,
      "NID must be exactly 10, 13, or 17 digits"
    ),
  dateOfBirth: z.string().nonempty("Date of birth is required"),
  name: optionalBanglaString,
  nameEn: optionalEnglishString,
  // gender: z.enum(["male", "female"]).optional(),
  father: optionalBanglaString,
  mother: optionalBanglaString,
  spouse: optionalBanglaString,
  permanentAddress: optionalAddress,
  presentAddress: optionalAddress,
});

export function transformData(input: Record<string, any>) {
  const data = {
    // identify: {
    //   nid: input.nid,
    //   dateOfBirth: input.dateOfBirth,
    // },
    nid: input.nid,
    verify: {
      name: input.name,
      nameEn: input.nameEn,
      // gender: input.gender,
      father: input.father,
      mother: input.mother,
      spouse: input.spouse,
      dateOfBirth: input.dateOfBirth,
      permanentAddress: input.permanentAddress,
      presentAddress: input.presentAddress,
    },
  };
  return data;
  //   return convertToFormData(data);
}
