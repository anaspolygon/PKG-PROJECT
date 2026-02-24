import { ApplicationData, Field } from "../types/ApplicationDetailsType";

export const getSectionSlug = (
  applicationData: ApplicationData[] | undefined,
  sectionSlug: string
) => {
  if (!Array.isArray(applicationData) || typeof sectionSlug !== "string") {
    console.error(
      "Invalid input: applicationData must be an array and sectionSlug must be a string"
    );
    return null;
  }

  const section = applicationData.find(
    (section) => section.section_slug === sectionSlug
  );

  return section;
};

export const getAddressFieldValues = (
  applicationData: ApplicationData[],
  sectionSlug: string
): { label: string; value: string }[] => {
  const result: { label: string; value: string }[] = [];

  const section = getSectionSlug(applicationData, sectionSlug);
  if (!section || !Array.isArray(section.pages)) {
    console.error(`Section '${sectionSlug}' not found or has no pages`);
    return result;
  }

  for (const page of section.pages) {
    if (!Array.isArray(page.fields)) continue;

    for (const field of page.fields) {
      if (field.type !== "group" && field.label) {
        result.push({
          label: field.label,
          value: field.value || "N/A",
        });
        if (field.slug === "nid_address_english") break;
      } else if (Array.isArray(field.children)) {
        for (const child of field.children) {
          result.push({
            label: child.label,
            value: child.value || "N/A",
          });
          if (child.slug === "nid_address_english") break;
        }
      }
    }
  }

  return result;
};

export const getFieldLabelsAndValues = (
  applicationData: ApplicationData[],
  sectionSlug: string
): { label: string; value: string }[] => {
  const result: { label: string; value: string }[] = [];

  // Get the section using getSectionSlug
  const section = getSectionSlug(applicationData, sectionSlug);
  if (!section) {
    console.error(`Section '${sectionSlug}' not found`);
    return result;
  }

  if (section.pages) {
    for (const page of section.pages) {
      if (!page.fields || !Array.isArray(page.fields)) continue;

      // Iterate through each field in the page
      for (const field of page.fields) {
        if (field.type !== "group" && field.label) {
          if (field.possible_values && Array.isArray(field.possible_values)) {
            const matched = field.possible_values.find(
              (option) => option.value === field.value
            );
            if (
              field.type === "radio" ||
              field.type === "string" ||
              field.type === "dropdown"
            )
              result.push({
                label: field.label,
                value: matched?.label || field.value || "N/A",
              });
          } else {
            result.push({
              label: field.label,
              value: field.value || "N/A",
            });
          }

          if (field.slug === "nid_address_english") break;
        } else if (Array.isArray(field.children)) {
          for (const child of field.children) {
            result.push({
              label: child.label,
              value: child.value || "N/A",
            });
            if (child.slug === "nid_address_english") break;
          }
        }
      }
    }
  }

  if (section.field) {
    if (
      section.field.possible_values &&
      Array.isArray(section.field.possible_values) &&
      section.field.label
    ) {
      const matched = section.field.possible_values.find(
        (option) => option.value === section.field?.value
      );
      result.push({
        label: section.field.label,
        value: matched?.label || section.field.value || "N/A",
      });
    }
  }
  return result;
};

export const getFieldSlug = (fields: Field[], fieldSlug: string) => {
  for (const field of fields) {
    if (field.slug === fieldSlug) return field;
  }
};

export const getFieldSlugValues = (
  field?: Field
): { label: string; value: string; key: string }[] => {
  const result: { label: string; value: string; key: string }[] = [];
  if (!field) return result;
  if (field.children) {
    for (const child of field.children) {
      result.push({
        label: child.label,
        value: child.value || "N/A",
        key: child.cached_key || "N/A",
      });
    }
  }
  return result;
};

export const getMultipleFieldSlugValues = (
  applicationData: ApplicationData[],
  sections: string[]
) => {
  const result = [];
  for (const sectionSlug of sections) {
    const section = getSectionSlug(applicationData, sectionSlug);
    if (
      section?.field?.possible_values &&
      Array.isArray(section.field.possible_values)
    ) {
      const matched = section.field.possible_values.find(
        (option) => option.value === section?.field?.value
      );
      result.push({
        label: section.label,
        value: matched?.label || section.field.value || "N/A",
      });
    }
    if (section?.pages) {
      for (const page of section.pages) {
        if (!page.fields || !Array.isArray(page.fields)) continue;

        // Iterate through each field in the page
        for (const field of page.fields) {
          if (field.type !== "group") {
            if (
              field.possible_values?.length &&
              Array.isArray(field.possible_values)
            ) {
              const matched = field.possible_values.find(
                (option) => option.value === field.value
              );
              result.push({
                label: field.type === "radio" ? page.label : field.label,
                value: matched?.label || field.value || "N/A",
              });
            } else if (field.type !== "file") {
              result.push({
                label: field.label,
                value: field.value || "N/A",
                key: field.cached_key || "N/A",
              });
            }
          }
        }
      }
    }
  }
  return result;
};

export const getNidNo = (applicationData: ApplicationData[] | undefined) => {
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
};

export const getBankDocuments = (
  applicationInfo: ApplicationData[],
  sectionSlug: string
) => {
  const section = getSectionSlug(applicationInfo, sectionSlug);
  let isDocumentsVisible = false;
  const images: { label: string; url: string }[] = [];

  if (Array.isArray(section?.pages)) {
    for (const page of section.pages) {
      if (Array.isArray(page.fields)) {
        for (const field of page.fields) {
          if (
            field.value === "greater_than_one_lakh" &&
            field.type === "radio"
          ) {
            isDocumentsVisible = true;
          }

          if (
            field.visible_if?.value === "greater_than_one_lakh" &&
            field.type === "file" &&
            field.label &&
            field.value
          ) {
            images.push({
              label: field.label,
              url: field.value,
            });
          }
        }
      }
    }
  }

  return {
    isDocumentsVisible,
    images,
  };
};

export enum Sections {
  LIVELINESS_IMAGES = "liveliness_images",
  NID = "nid",
  PERSONAL_INFO = "personal_info",
  BANKING_TYPE = "banking_type",
  PRODUCT_TYPE = "product_type",
  BRANCH = "branch",
  MONTHLY_TRANSACTION = "monthly_transaction",
  NOMINEE = "nominee",
  FATCA_QUENSTIONS = "fatca_questions",
  PEP = "pep",
}
