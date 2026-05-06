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
  const { isAltActive } = useShortcutStore();

  if (!isAltActive) return null;

  return (
    <span
      className={clsx(
        "absolute -top-2 -left-2 z-60 flex items-center justify-center min-w-[1.2rem] h-[1.2rem] px-1",
        "bg-gold text-bg font-mono text-[10px] font-bold rounded border border-bg-2 shadow-lg",
        "animate-in fade-in zoom-in duration-150",
        className,
      )}
    >
      {label.toUpperCase()}
    </span>
  );
}
