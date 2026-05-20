"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";

type Toast = {
  id: number;
  message: string;
  type?: "success" | "error" | "info";
};

interface ToastContextType {
  toast: (message: string, type?: "success" | "error" | "info") => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let nextId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: "success" | "error" | "info" = "success") => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3" aria-live="polite">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 rounded-2xl px-5 py-3.5 shadow-2xl backdrop-blur-xl"
              style={{
                backgroundColor: "rgba(12,10,8,0.92)",
                border: "1px solid rgba(212,175,136,0.2)",
                color: "#f5ede4",
              }}
            >
              {t.type === "success" && <Check size={16} strokeWidth={2} className="text-gold" />}
              {t.type === "error" && <X size={16} strokeWidth={2} className="text-red-400" />}
              <span className="text-sm tracking-wide">{t.message}</span>
              <button
                onClick={() => dismiss(t.id)}
                className="ml-2 rounded-full p-1 transition-colors hover:bg-white/10"
                aria-label="Dismiss"
              >
                <X size={12} strokeWidth={2} className="text-cream/50" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx.toast;
}
