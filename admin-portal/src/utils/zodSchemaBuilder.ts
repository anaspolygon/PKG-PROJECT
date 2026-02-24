/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

export function buildZodSchemaFromFields(fields: any[]) {
  const shape: Record<string, any> = {};

  fields.forEach((field) => {
    const { slug, input_type, rules } = field;
    let schema: any;

    if (input_type === "file") {
      schema = z
        .any()
        .refine(
          (files) => {
            if (rules?.is_required?.value) {
              return files !== null && files !== undefined && files.length > 0;
            }
            return true;
          },
          {
            message: rules?.is_required?.message || "File is required",
          }
        )
        // Separate refine for max count validation
        .refine(
          (files) => {
            if (!files || files.length === 0) return true;
            if (
              rules?.max_count?.value &&
              files.length > rules.max_count.value
            ) {
              return false;
            }
            return true;
          },
          {
            message:
              rules?.max_count?.message || "Exceeded maximum number of files",
          }
        )
        // Separate refine for file size validation
        .refine(
          (files) => {
            if (!files || files.length === 0) return true;
            return files.every((file: File) => {
              if (typeof file === "string") return true;
              const sizeValid =
                !rules?.size?.value || file.size <= rules.size.value;
              return sizeValid;
            });
          },
          {
            message:
              rules?.size?.message || "File size is not in allowed range",
          }
        )
        // Separate refine for file extension validation
        .refine(
          (files) => {
            if (!files || files.length === 0) return true;
            return files.every((file: File) => {
              if (typeof file === "string") return true;
              if (rules?.allowed_extensions?.value) {
                const extension = file.name?.split(".").pop()?.toLowerCase();
                return rules.allowed_extensions.value.includes(extension);
              }
              return true;
            });
          },
          {
            message: rules?.allowed_extensions?.message || "Invalid file type",
          }
        );
    } else if (input_type === "dropdown") {
      schema = z.any().refine(
        (val) => {
          if (rules?.is_required?.value) {
            if (val === null || val === undefined) return false;
            if (typeof val === "object" && val !== null) {
              const actualValue = val.value;
              return (
                actualValue !== null &&
                actualValue !== undefined &&
                actualValue !== ""
              );
            }
            if (typeof val === "string") {
              return val.trim() !== "";
            }
          }
          return true;
        },
        {
          message:
            rules?.is_required?.message || `${field.label || slug} is required`,
        }
      );
    } else if (input_type === "string") {
      schema = z.string();
      if (rules?.is_required?.value) {
        schema = schema.refine((val: any) => val.trim() !== "", {
          message:
            rules?.is_required?.message || `${field.label || slug} is required`,
        });
      }
      if (rules?.is_alpha_supported?.value === false) {
        schema = schema.refine((val: any) => /^[^a-zA-Z]*$/.test(val), {
          message:
            rules?.is_alpha_supported?.message ||
            "Alpha values are not supported",
        });
      }
      if (rules?.is_special_character_supported?.value === false) {
        schema = schema.refine(
          (val: any) => /^[^!@#$%^&*(),.?":{}|<>]*$/.test(val),
          {
            message:
              rules?.is_special_character_supported?.message ||
              "Special characters are not supported",
          }
        );
      }
    } else {
      schema = z.any();
    }

    shape[slug] = schema;
  });

  return z.object(shape);
}
