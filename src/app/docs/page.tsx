import { redirect } from "next/navigation";
import { DEFAULT_DOC_VERSION } from "@/lib/docs/versions";
import { docsHref } from "@/lib/docs/paths";

export default function DocsIndexPage() {
  redirect(docsHref(DEFAULT_DOC_VERSION));
}
