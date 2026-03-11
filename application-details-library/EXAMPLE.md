## Application Details component

```tsx
"use client";
import { ApplicationDetails } from "@polygontgech/application-details";
import "@polygontgech/application-details/dist/index.css";

export default function ApplicationPage() {
  return (
    <ApplicationDetails
      id="123"
      baseUrl="https://api.example.com"
      apiKey="your-api-key"
      showActionsBtn={true}
    />
  );
}
```
