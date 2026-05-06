"use client";

import { useShortcutStore } from "@/store/useShortcutStore";
import clsx from "clsx";

export default function KeyTip({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const { isAltActive, activePrefix } = useShortcutStore();

  if (!isAltActive) return null;

  // Logic Hirarki ala Ribbon MS Word:
  // 1. Kalau gak ada prefix, tampilkan shortcut level 1 (label panjangnya 1)
  // 2. Kalau ada prefix (misal 'p'), tampilkan yang mulai dengan prefix itu (misal 'pn')
  const shouldShow = activePrefix
    ? label.startsWith(activePrefix) && label.length > activePrefix.length
    : label.length === 1;

  if (!shouldShow) return null;

  // Tampilkan sisa karakternya saja kalau sudah ada prefix (misal 'pn' jadi 'n')
  const displayLabel = activePrefix ? label.slice(activePrefix.length) : label;

  return (
    <span
      className={clsx(
        "absolute -top-2 -left-2 z-60 flex items-center justify-center min-w-[1.2rem] h-[1.2rem] px-1",
        "bg-gold text-bg font-mono text-[10px] font-bold rounded border border-bg-2 shadow-lg",
        "animate-in fade-in zoom-in duration-150",
        className,
      )}
    >
      {displayLabel.toUpperCase()}
    </span>
  );
}
