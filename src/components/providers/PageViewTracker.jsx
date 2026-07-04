"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/api/analytics";

export function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackPageView(pathname, document.referrer || undefined);
  }, [pathname]);

  return null;
}
