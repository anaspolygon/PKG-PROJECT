# Usage Example

## Basic Example

```tsx
"use client";
import { ApplicationDetails } from "@your-org/application-details";
import "@your-org/application-details/dist/accordion.css";

export default function ApplicationPage() {
  const applicationData = {
    application_data: [
      {
        type: "form_section",
        section_slug: "personal_info",
        pages: [
          {
            label: "Personal Information",
            fields: [
              {
                slug: "name",
                label: "Full Name",
                value: "John Doe",
                input_type: "text",
                type: "string",
                // ... other field properties
              },
            ],
          },
        ],
      },
    ],
    additional_info: {
      application_display_id: "APP-12345",
      name: "John Doe",
      mobile: "01712345678",
      nid_no: "1234567890",
      gender: "male",
      dob: "1990-01-01",
      user_image: "https://example.com/user.jpg",
      ec_user_image: "https://example.com/ec.jpg",
      face_match_percentage: "95",
      application_status: "submitted",
      first_submitted_at: "2024-01-01",
      branch_name: "Main Branch",
      banking_type: "islamic",
      product_type: "savings_account",
      ocr_data: {
        applicant_name_ben: "জন ডো",
        applicant_name_eng: "John Doe",
        father_name: "Father Name",
        mother_name: "Mother Name",
        spouse_name: null,
        nid_no: "1234567890",
        dob: "1990-01-01",
        address: "123 Main St, Dhaka",
      },
      ec_data: {
        fieldVerificationResult: {
          nameEn: true,
          dateOfBirth: true,
          father: true,
          mother: true,
        },
      },
    },
  };

  return <ApplicationDetails application={applicationData} />;
}
```

## With Address Data

```tsx
"use client";
import { ApplicationDetails } from "@your-org/application-details";
import "@your-org/application-details/dist/accordion.css";

export default function ApplicationPage() {
  const applicationData = { /* ... */ };

  const addressData = {
    divisions: [
      { label: "Dhaka", value: "dhaka" },
      { label: "Chittagong", value: "chittagong" },
    ],
    districts: [
      { label: "Dhaka District", value: "dhaka_district" },
      { label: "Gazipur", value: "gazipur" },
    ],
    thanas: [
      { label: "Dhanmondi", value: "dhanmondi" },
      { label: "Gulshan", value: "gulshan" },
    ],
    postal_codes: [
      { label: "1205", value: "1205" },
      { label: "1212", value: "1212" },
    ],
  };

  return (
    <ApplicationDetails 
      application={applicationData}
      addressData={addressData}
      title="Application Information"
    />
  );
}
```

## Custom Implementation

```tsx
"use client";
import { 
  CollapsibleSectionsContainer,
  FormSection 
} from "@your-org/application-details";
import "@your-org/application-details/dist/accordion.css";

export default function CustomPage() {
  const applicationData = { /* ... */ };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Custom Layout</h1>
      <CollapsibleSectionsContainer 
        application={applicationData}
      />
    </div>
  );
}
```
