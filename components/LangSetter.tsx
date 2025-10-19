"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function LangSetter() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    const first = pathname.split("/").filter(Boolean)[0];
    const lang = first === "ru" ? "ru" : first === "ua" ? "uk" : "uk";
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [pathname]);

  return null;
}
