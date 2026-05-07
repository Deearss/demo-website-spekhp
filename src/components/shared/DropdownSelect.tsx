"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import clsx from "clsx";

type Option = {
  value: string;
  label: string;
};

type DropdownSelectProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export default function DropdownSelect({
  options,
  value,
  onChange,
  placeholder = "Pilih...",
  className,
}: DropdownSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedLabel =
    options.find((o) => o.value === value)?.label ?? placeholder;

  // Tutup kalau klik di luar
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className={clsx("relative", className)}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={clsx(
          "cursor-pointer flex items-center gap-2 bg-bg-2 border rounded-lg px-3 py-2 text-sm text-text transition-all outline-none min-w-32",
          open ? "border-gold" : "border-surface-2 hover:border-text-3",
        )}
      >
        <span
          className={clsx(
            "flex-1 text-left truncate",
            value ? "text-text" : "text-text-3",
          )}
        >
          {selectedLabel}
        </span>
        <ChevronDown
          size={14}
          className={clsx(
            "text-text-3 shrink-0 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div className="absolute left-0 top-full mt-1.5 z-50 min-w-full w-max max-h-60 overflow-y-auto bg-bg-2 border border-surface-2 rounded-xl shadow-2xl shadow-black/40 py-1">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={clsx(
                  "w-full flex items-center justify-between gap-3 px-4 py-2 text-sm text-left transition-colors",
                  isSelected
                    ? "text-gold bg-gold/5"
                    : "text-text-2 hover:text-text hover:bg-surface",
                )}
              >
                <span>{opt.label}</span>
                {isSelected && (
                  <Check size={14} className="text-gold shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
