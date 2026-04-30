"use client";

import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isMac, setIsMac] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  // Sync external value changes (e.g., clear from parent)
  useEffect(() => {
    const timer = setTimeout(() => setLocalValue(value), 0);
    return () => clearTimeout(timer);
  }, [value]);

  // Debounce user typing
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, 300); // 300ms debounce
    return () => clearTimeout(timer);
  }, [localValue, onChange]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMac(
        typeof navigator !== "undefined" &&
          /Mac|iPod|iPhone|iPad/.test(navigator.platform),
      );
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Shortcut to focus search: Ctrl+K or Cmd+K or /
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === "/" && document.activeElement !== inputRef.current) {
        // Prevent triggering if user is typing in another input/textarea
        if (
          ["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName || "")
        )
          return;
        e.preventDefault();
        inputRef.current?.focus();
      } else if (
        e.key === "Escape" &&
        document.activeElement === inputRef.current
      ) {
        e.preventDefault();
        inputRef.current?.blur();
        setLocalValue("");
        onChange("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onChange]);

  return (
    <div className="relative w-full max-w-2xl mx-auto group">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transall"
        style={{ color: "var(--gold)" }}
      />

      <input
        ref={inputRef}
        type="text"
        placeholder="Cari nama HP, brand, atau chipset..."
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="w-full h-13 pl-11 pr-11 sm:pr-24 rounded-xl text-sm font-medium outline-none transall"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          color: "var(--text)",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--gold)";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,168,76,0.12)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.boxShadow = "none";
        }}
      />

      {/* Action Area: Clear Button or Shortcut Hint */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
        {localValue ? (
          <button
            onClick={() => {
              setLocalValue("");
              onChange("");
              inputRef.current?.focus();
            }}
            className="p-1.5 rounded-lg transall hover:bg-white/5"
            style={{ color: "var(--text-3)" }}
            aria-label="Clear search (Esc)"
            title="Bersihkan pencarian (Esc)"
          >
            <X size={16} />
          </button>
        ) : (
          <div
            className="hidden sm:flex items-center gap-0.5 px-2 py-1 rounded-md text-[10px] font-bold pointer-events-none select-none transall"
            style={{
              background: "var(--bg-2)",
              border: "1px solid var(--border)",
              color: "var(--text-3)",
            }}
            title="Gunakan pintasan Ctrl+K atau garis miring (/) untuk mencari"
          >
            <span className="text-[11px] font-sans">
              {isMac ? "⌘" : "Ctrl"}
            </span>
            <span className="leading-none">+</span>
            <span className="leading-none">K</span>
          </div>
        )}
      </div>
    </div>
  );
}
