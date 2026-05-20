"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/contexts/wishlist-context";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/contexts/toast-context";

export function SideWishlist({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();
  const toast = useToast();

  const handleMoveToCart = (item: (typeof items)[number]) => {
    addToCart({ id: item.id, name: item.name, price: item.price, variant: item.variant });
    removeItem(item.id);
    toast(`${item.name} moved to cart`, "success");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto"
            style={{ backgroundColor: "#0c0a08" }}
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b p-6" style={{ borderColor: "rgba(212, 175, 136, 0.2)" }}>
                <h2 className="font-display text-2xl flex items-center gap-2" style={{ color: "#f5ede4" }}>
                  <Heart size={20} strokeWidth={1.5} className="text-gold" />
                  Wishlist
                </h2>
                <button
                  onClick={onClose}
                  className="flex h-10 w-10 items-center justify-center rounded-full transition-all hover:scale-110"
                  style={{ backgroundColor: "rgba(212, 175, 136, 0.1)", color: "#d4af88" }}
                  aria-label="Close wishlist"
                >
                  <X size={20} strokeWidth={1.6} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <Heart size={48} strokeWidth={1} style={{ color: "rgba(212, 175, 136, 0.3)" }} />
                    <p className="mt-4 text-lg" style={{ color: "rgba(245, 237, 228, 0.5)" }}>
                      Your wishlist is empty
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
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleMoveToCart(item)}
                            className="flex h-8 w-8 items-center justify-center rounded-full transition-all hover:scale-110"
                            style={{ backgroundColor: "rgba(212, 175, 136, 0.1)", color: "#d4af88" }}
                            aria-label="Move to cart"
                          >
                            <ShoppingBag size={14} strokeWidth={1.6} />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-full transition-all hover:scale-110"
                            style={{ backgroundColor: "rgba(255, 255, 255, 0.05)", color: "rgba(245, 237, 228, 0.5)" }}
                            aria-label="Remove from wishlist"
                          >
                            <X size={14} strokeWidth={1.6} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t p-6" style={{ borderColor: "rgba(212, 175, 136, 0.2)" }}>
                  <button
                    onClick={clearWishlist}
                    className="w-full rounded-full border px-6 py-3 text-sm transition-all hover:scale-105"
                    style={{
                      borderColor: "rgba(212, 175, 136, 0.3)",
                      color: "rgba(245, 237, 228, 0.6)"
                    }}
                  >
                    Clear Wishlist
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
