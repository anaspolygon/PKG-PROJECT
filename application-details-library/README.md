# Application Details Component Library

A reusable React component library for displaying application details in Next.js applications. This library provides a comprehensive, customizable component for displaying application information with collapsible sections, form fields, address information, and more.

## Features

- 📋 **Comprehensive Application Display**: Shows application information, OCR data, and form sections
- 🎨 **Customizable Styling**: Built with Tailwind CSS and Ant Design
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🔄 **Collapsible Sections**: Organize information in expandable/collapsible sections
- 🏠 **Address Component**: Special handling for address fields with division/district/thana/postal code mapping
- 📄 **File Support**: Display images and PDF documents
- ✅ **EC Verification Status**: Visual indicators for EC verification results

## Installation

```bash
npm install @your-org/application-details
# or
yarn add @your-org/application-details
# or
pnpm add @your-org/application-details
```

## Peer Dependencies

This library requires the following peer dependencies to be installed in your project:

```bash
npm install react react-dom antd lucide-react clsx
```

## Usage

### Fetching Application Details with the Hook

You can fetch application details from any HTTP endpoint using the provided React hook:

```tsx
import { useApplicationDetailsFromEndpoint } from "@your-org/application-details";

const endpoint = "/api/applications";
const id = "your-application-id";

function MyComponent() {
  const { application, loading, error } = useApplicationDetailsFromEndpoint(
    endpoint,
    id,
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {String(error)}</div>;
  if (!application) return <div>No data</div>;

  return <pre>{JSON.stringify(application, null, 2)}</pre>;
}
```

function App() {
const applicationData = {
application_data: [...],
additional_info: {
application_display_id: "APP-12345",
name: "John Doe",
// ... other fields
}
};

return (
<ApplicationDetails application={applicationData} />
);
}

````

### With Address Data

If you need to display address information with proper labels (division, district, thana, postal code), provide the `addressData` prop:

```tsx
import { ApplicationDetails } from "@your-org/application-details";

function App() {
  const applicationData = { /* ... */ };

  const addressData = {
    divisions: [
      { label: "Dhaka", value: "dhaka" },
      // ... more divisions
    ],
    districts: [
      { label: "Dhaka District", value: "dhaka_district" },
      // ... more districts
    ],
    thanas: [
      { label: "Dhanmondi", value: "dhanmondi" },
      // ... more thanas
    ],
    postal_codes: [
      { label: "1205", value: "1205" },
      // ... more postal codes
    ],
  };

  return (
    <ApplicationDetails
      application={applicationData}
      addressData={addressData}
    />
  );
}
````

### Custom Title

```tsx
<ApplicationDetails
  application={applicationData}
  title="My Custom Title"
  showTitle={true}
/>
```

### Using Individual Components

You can also use the sub-components individually:

```tsx
import {
  CollapsibleSectionsContainer,
  FormSection,
  Address
} from "@your-org/application-details";

// Use CollapsibleSectionsContainer
<CollapsibleSectionsContainer
  application={applicationData}
  addressData={addressData}
/>

// Use FormSection
<FormSection
  fields={fields}
  isCreditRiskGrading={false}
/>

// Use Address component
<Address
  fields={addressFields}
  addressData={addressData}
/>
```

## TypeScript Support

This library is written in TypeScript and includes type definitions. Import types as needed:

```tsx
import type {
  ApplicationDetailsRoot,
  ApplicationData,
  AdditionalInfo,
  AddressData,
} from "@your-org/application-details";
```

## Data Structure

The component expects an `ApplicationDetailsRoot` object with the following structure:

```typescript
interface ApplicationDetailsRoot {
  application_data?: ApplicationData[];
  additional_info?: AdditionalInfo;
  success?: boolean;
  code?: number;
  message?: string;
}
```

### Application Data Structure

Each item in `application_data` can be:

- **form_section**: Contains pages with fields
- **nid**: Contains NID images
- **survey**: Contains survey questions

### Additional Info Structure

```typescript
interface AdditionalInfo {
  application_id: string;
  application_display_id: string;
  first_submitted_at: string;
  mobile: string;
  name: string;
  nid_no: string;
  user_image: string;
  ec_user_image?: string;
  face_match_percentage: string;
  application_status: string;
  ocr_data: {
    applicant_name_ben: string;
    applicant_name_eng: string;
    father_name: string;
    mother_name: string;
    spouse_name: string;
    nid_no: string;
    dob: string;
    address: string;
  };
  ec_data?: {
    fieldVerificationResult: {
      nameEn: boolean;
      dateOfBirth: boolean;
      father: boolean;
      mother: boolean;
      // ... more fields
    };
  };
  // ... more fields
}
```

## Styling

The component uses Tailwind CSS classes. Make sure you have Tailwind CSS configured in your Next.js project:

1. Install Tailwind CSS:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. Import the component styles in your app:

```tsx
import "@your-org/application-details/dist/styles.css";
```

Or import the accordion styles specifically:

```tsx
import "@your-org/application-details/dist/accordion.css";
```

## Props

### ApplicationDetails Props

| Prop          | Type                     | Required | Default                 | Description                             |
| ------------- | ------------------------ | -------- | ----------------------- | --------------------------------------- |
| `application` | `ApplicationDetailsRoot` | Yes      | -                       | The application data object             |
| `addressData` | `AddressData`            | No       | -                       | Address mapping data for proper display |
| `title`       | `string`                 | No       | `"Application Details"` | Title to display                        |
| `showTitle`   | `boolean`                | No       | `true`                  | Whether to show the title               |

### CollapsibleSectionsContainer Props

| Prop          | Type                     | Required | Default | Description                                 |
| ------------- | ------------------------ | -------- | ------- | ------------------------------------------- |
| `application` | `ApplicationDetailsRoot` | Yes      | -       | The application data object                 |
| `nidNo`       | `string`                 | No       | -       | NID number (auto-extracted if not provided) |
| `addressData` | `AddressData`            | No       | -       | Address mapping data                        |

### FormSection Props

| Prop                  | Type                  | Required | Default | Description                     |
| --------------------- | --------------------- | -------- | ------- | ------------------------------- |
| `fields`              | `Field[]`             | Yes      | -       | Array of form fields to display |
| `isCreditRiskGrading` | `boolean`             | No       | `false` | Whether to show risk scores     |
| `riskScores`          | `Record<string, any>` | No       | -       | Risk scoring data               |

### Address Props

| Prop          | Type          | Required | Default | Description          |
| ------------- | ------------- | -------- | ------- | -------------------- |
| `fields`      | `any[]`       | Yes      | -       | Address fields array |
| `addressData` | `AddressData` | No       | -       | Address mapping data |

## Development

To build the library:

```bash
npm run build
```

To watch for changes during development:

```bash
npm run dev
```

## License

MIT

## Support

For issues and feature requests, please open an issue on the GitHub repository.
