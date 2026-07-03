# @sebastian_sultz/ui

A modern, highly-polished React UI component library built with TypeScript, Tailwind CSS v4, and Radix UI.

## Installation

Install the library and its peer dependencies:

```bash
npm install @sebastian_sultz/ui
```

Make sure you have React and React DOM (v18+) installed in your project.

## Usage

### 1. Import the Styles

You must import the compiled Tailwind CSS styles once at the entry point of your application (e.g., `src/main.tsx`, `src/index.tsx`, or `app/layout.tsx`):

```tsx
import "@sebastian_sultz/ui/styles.css";
```

### 2. Import Components

Now you can import and use any of the components in your React application:

```tsx
import React from "react";
import { Button } from "@sebastian_sultz/ui";

function App() {
  return (
    <div className="p-6">
      <Button variant="contained" color="primary">
        Click Me
      </Button>
    </div>
  );
}

export default App;
```

## Available Components

This library exports a wide range of UI components, including:
* **Buttons & Inputs**: `Button`, `Input`, `Checkbox`, `RadioGroup`, `Switch`, `Toggle`, `InputOTP`
* **Feedback**: `Spinner`, `ProgressBar`, `Progress`, `Skeleton`, `Sonner` (Toaster)
* **Data Display**: `Table`, `TableComponent`, `DealsCard`, `StatsBar`, `Calendar`, `CalendarCard`, `Chip`, `Badge`
* **Navigation**: `Pagination`, `PaginationLinks`, `Breadcrumb`, `Tabs`, `Sidebar`
* **Overlays**: `Dialog`, `Popover`, `Sheet`, `Tooltip`, `VerificationCodeModal`
* **Utilities**: `ArrowLineSeparator`, `LineDivider`, `NoteBox`, `UnitCounter`, `DocumentUpload`
