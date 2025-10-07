"use client";

import { FloatingPortal } from "@floating-ui/react";
import { LucideInfo, LucideTriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  message: string;
  onClose: () => void;
  duration?: number;
};

export default function ErrorMessage({
  message,
  onClose,
  duration = 3000,
}: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) return;

    setMounted(true);
    setTimeout(() => {
      onClose();
    }, duration);
  }, []);

  return (
    <FloatingPortal>
      <div className="w-lg p-4 absolute left-1/2 bottom-6 -translate-x-1/2 flex items-center space-x-4 rounded-xl drop-shadow-xl bg-surface">
        <LucideTriangleAlert size={20} className="text-error" />
        <p className="text-error">{message}</p>
      </div>
    </FloatingPortal>
  );
}
