"use client";

import { useToastStore } from "@/store/useToastStore";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";
import { useEffect, useState } from "react";
import clsx from "clsx";

export default function Toast() {
  const { message, type, hideToast } = useToastStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 2700); // Mulai animasi keluar sebelum hapus dari store
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [message]);

  if (!message) return null;

  return (
    <div
      className={clsx(
        "fixed top-4 right-4 z-100 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border transition-all duration-300 ease-in-out",
        isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0",
        type === "success" &&
          "bg-green-500/10 border-green-500/20 text-green-500",
        type === "error" && "bg-red-500/10 border-red-500/20 text-red-500",
        type === "info" && "bg-blue-500/10 border-blue-500/20 text-blue-500",
      )}
    >
      {type === "success" && <CheckCircle2 size={20} />}
      {type === "error" && <XCircle size={20} />}
      {type === "info" && <Info size={20} />}
      <p className="font-medium text-sm text-text">{message}</p>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(hideToast, 300);
        }}
        className="text-text-3 hover:text-text transition-colors ml-2"
      >
        <X size={16} />
      </button>
    </div>
  );
}
