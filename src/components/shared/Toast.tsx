"use client";

import { useToastStore } from "@/store/useToastStore";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";
import { useEffect, useRef } from "react";
import clsx from "clsx";

export default function Toast() {
  const { message, type, hideToast } = useToastStore();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!message) return;
    const el = ref.current;
    if (!el) return;
    // Force reflow biar animasi mulai dari awal setiap toast baru
    el.style.animation = "none";
    void el.offsetHeight;
    el.style.animation = "";
  }, [message]);

  if (!message) return null;

  return (
    <div
      ref={ref}
      className={clsx(
        "fixed top-4 right-4 z-100 flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl border",
        "animate-[toast-in_0.3s_ease-out_forwards]",
        type === "success" && "bg-green-500/10 border-green-500/20",
        type === "error" && "bg-red-500/10 border-red-500/20",
        type === "info" && "bg-blue-500/10 border-blue-500/20",
      )}
    >
      {type === "success" && (
        <CheckCircle2 size={20} className="text-green-500 shrink-0" />
      )}
      {type === "error" && (
        <XCircle size={20} className="text-red-500 shrink-0" />
      )}
      {type === "info" && <Info size={20} className="text-blue-500 shrink-0" />}
      <p className="font-medium text-sm text-text">{message}</p>
      <button
        onClick={hideToast}
        className="text-text-3 hover:text-text transition-colors ml-2 shrink-0"
      >
        <X size={16} />
      </button>
    </div>
  );
}
