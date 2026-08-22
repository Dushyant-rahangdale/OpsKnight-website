"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function CopyCodeButton() {
  const pathname = usePathname();

  useEffect(() => {
    const frames = document.querySelectorAll<HTMLElement>(".docs-code");
    const cleanups: Array<() => void> = [];

    frames.forEach((frame) => {
      const btn = frame.querySelector<HTMLButtonElement>(".docs-code-copy");
      const code = frame.querySelector("pre code");
      if (!btn || !code) return;

      const onClick = async () => {
        await navigator.clipboard.writeText(code.textContent || "");
        const previous = btn.textContent;
        btn.textContent = "Copied";
        btn.dataset.copied = "true";
        window.setTimeout(() => {
          btn.textContent = previous || "Copy";
          delete btn.dataset.copied;
        }, 1600);
      };

      btn.addEventListener("click", onClick);
      cleanups.push(() => btn.removeEventListener("click", onClick));
    });

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
