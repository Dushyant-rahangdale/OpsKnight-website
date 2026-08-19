import { DEFAULT_DOC_VERSION } from "@/lib/docs/versions";

export function DocsVersionBanner({ version }: { version: string }) {
  if (version === DEFAULT_DOC_VERSION) return null;
  return (
    <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-sm text-amber-950">
      You are on {version} docs. Latest documented release is{" "}
      <a href={`/docs/${DEFAULT_DOC_VERSION}/`} className="font-medium text-[#2563eb] underline-offset-2 hover:underline">
        {DEFAULT_DOC_VERSION}
      </a>
      .
    </div>
  );
}
