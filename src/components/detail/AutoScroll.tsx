"use client";

import { useEffect } from "react";

export default function AutoScroll() {
  useEffect(() => {
    // Next.js App Router sometimes maintains scroll position between navigations
    // or scrolls to elements incorrectly. This forces the page to start at the absolute top.
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 10);
    
    return () => clearTimeout(timer);
  }, []);

  return null;
}
