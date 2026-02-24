# Setup Instructions

## For Publishing to NPM

1. **Update package.json**:
   - Change `@your-org/application-details` to your desired package name
   - Update author, license, and repository fields if needed

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build the library**:
   ```bash
   npm run build
   ```

4. **Test locally** (optional):
   ```bash
   npm link
   # In your test project:
   npm link @your-org/application-details
   ```

5. **Publish to NPM**:
   ```bash
   npm login
   npm publish
   ```

## For Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Watch mode** (for development):
   ```bash
   npm run dev
   ```

3. **Build**:
   ```bash
   npm run build
   ```

## Project Structure

```
application-details-library/
├── src/
│   ├── components/
│   │   ├── ApplicationDetails.tsx    # Main component
│   │   ├── CollapsibleSection.tsx    # Collapsible sections container
│   │   ├── FormSection.tsx           # Form fields display
│   │   └── Address.tsx                # Address component
│   ├── types/
│   │   ├── ApplicationDetailsType.ts # TypeScript types
│   │   └── constants.ts              # Constants and enums
│   ├── helpers/
│   │   └── ApplicationDetailsHelper.ts # Helper functions
│   ├── styles/
│   │   └── accordion.css             # Accordion styles
│   └── index.ts                      # Main export file
├── dist/                             # Build output (generated)
├── package.json
├── tsconfig.json
├── tsup.config.ts
├── README.md
└── EXAMPLE.md
```

## Next Steps

1. Test the component in a Next.js project
2. Customize styling if needed
3. Add any additional features
4. Update version number before publishing
5. Write tests (optional but recommended)
