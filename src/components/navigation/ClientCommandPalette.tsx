"use client";

import dynamic from "next/dynamic";

const GlobalCommandPalette = dynamic(
  () =>
    import("@/components/navigation/GlobalCommandPalette").then(
      (mod) => mod.GlobalCommandPalette
    ),
  { ssr: false }
);

export function ClientCommandPalette() {
  return <GlobalCommandPalette />;
}
