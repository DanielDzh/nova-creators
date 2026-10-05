import { structuredData } from "@/lib/structured-data";

// Escapes "<" so the JSON can never close the script tag early.
const serialized = JSON.stringify(structuredData).replace(/</g, "\\u003c");

export const StructuredData = () => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serialized }} />
);
