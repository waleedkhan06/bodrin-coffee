"use client";

import { useCart } from "@/contexts/cart-context";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { MagneticButton } from "./magnetic-button";

export function SideCart({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, updateQuantity, removeItem, clearCart, total } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto"
            style={{ backgroundColor: "#0c0a08" }}
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b p-6" style={{ borderColor: "rgba(212, 175, 136, 0.2)" }}>
                <h2 className="font-display text-2xl" style={{ color: "#f5ede4" }}>
                  Your Cart
                </h2>
                <button
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center rounded-full transition-all hover:scale-110"
                  style={{ backgroundColor: "rgba(212, 175, 136, 0.1)", color: "#d4af88" }}
                  aria-label="Close cart"
                >
                  <X size={20} strokeWidth={1.6} />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <ShoppingBag size={48} strokeWidth={1} style={{ color: "rgba(212, 175, 136, 0.3)" }} />
                    <p className="mt-4 text-lg" style={{ color: "rgba(245, 237, 228, 0.5)" }}>
                      Your cart is empty
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-4 rounded-2xl p-4"
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                      >
                        <div className="flex-1">
                          <h3 className="font-display text-lg" style={{ color: "#f5ede4" }}>
                            {item.name}
                          </h3>
                          {item.variant && (
                            <p className="text-sm" style={{ color: "rgba(245, 237, 228, 0.5)" }}>
                              {item.variant}
                            </p>
                          )}
                          <p className="mt-1 font-display text-lg" style={{ color: "#d4af88" }}>
                            €{item.price}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-full transition-all hover:scale-110"
                            style={{ backgroundColor: "rgba(212, 175, 136, 0.1)", color: "#d4af88" }}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} strokeWidth={1.6} />
                          </button>
                          <span className="w-6 text-center" style={{ color: "#f5ede4" }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-full transition-all hover:scale-110"
                            style={{ backgroundColor: "rgba(212, 175, 136, 0.1)", color: "#d4af88" }}
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} strokeWidth={1.6} />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-full transition-all hover:scale-110"
                          style={{ backgroundColor: "rgba(255, 255, 255, 0.05)", color: "rgba(245, 237, 228, 0.5)" }}
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} strokeWidth={1.6} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t p-6" style={{ borderColor: "rgba(212, 175, 136, 0.2)" }}>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span style={{ color: "rgba(245, 237, 228, 0.6)" }}>Subtotal</span>
                      <span style={{ color: "#f5ede4" }}>€{total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: "rgba(245, 237, 228, 0.6)" }}>Shipping</span>
                      <span style={{ color: "#f5ede4" }}>Free</span>
                    </div>
                    <div className="h-px" style={{ backgroundColor: "rgba(212, 175, 136, 0.2)" }} />
                    <div className="flex justify-between text-xl">
                      <span className="font-display" style={{ color: "#f5ede4" }}>Total</span>
                      <span
                        className="font-display"
                        style={{
                          background: "linear-gradient(135deg, #d4af88 0%, #e6c8a3 50%, #d4af88 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text"
                        }}
                      >
                        €{total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <MagneticButton variant="gold" href="/checkout" className="w-full">
                      Proceed to Checkout
                    </MagneticButton>
                    <button
                      onClick={clearCart}
                      className="w-full rounded-full border px-6 py-3 text-sm transition-all hover:scale-105"
                      style={{
                        borderColor: "rgba(212, 175, 136, 0.3)",
                        color: "rgba(245, 237, 228, 0.6)"
                      }}
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
