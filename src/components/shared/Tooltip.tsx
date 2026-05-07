"use client";

import { useState } from "react";
import clsx from "clsx";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export default function Tooltip({
  content,
  children,
  position = "top",
  className,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}

      {isVisible && (
        <div
          className={clsx(
            "absolute z-100 whitespace-nowrap px-2.5 py-1.5 rounded-lg text-[11px] font-bold shadow-2xl",
            "bg-surface-2/95 backdrop-blur-md border border-surface-2 text-text pointer-events-none",
            "animate-in fade-in zoom-in-95 duration-75",
            positionClasses[position],
            className,
          )}
        >
          {content}
          {/* Arrow kecil (opsional tapi nambah estetik) */}
          <div
            className={clsx(
              "absolute w-2 h-2 bg-surface-2 border-surface-2 rotate-45",
              position === "top" &&
                "-bottom-1 left-1/2 -translate-x-1/2 border-b border-r",
              position === "bottom" &&
                "-top-1 left-1/2 -translate-x-1/2 border-t border-l",
              position === "left" &&
                "-right-1 top-1/2 -translate-y-1/2 border-t border-r",
              position === "right" &&
                "-left-1 top-1/2 -translate-y-1/2 border-b border-l",
            )}
          />
        </div>
      )}
    </div>
  );
}
