"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  variant?: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  addItem: (item: Omit<WishlistItem, "quantity">) => void;
  removeItem: (id: string) => void;
  toggleItem: (item: Omit<WishlistItem, "quantity">) => boolean;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("wishlist");
    if (saved) {
      try { return JSON.parse(saved); } catch { return []; }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((item: Omit<WishlistItem, "quantity">) => {
    setItems((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const toggleItem = useCallback((item: Omit<WishlistItem, "quantity">) => {
    let wasAdded = false;
    setItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) return prev.filter((i) => i.id !== item.id);
      wasAdded = true;
      return [...prev, item];
    });
    return wasAdded;
  }, []);

  const isInWishlist = useCallback((id: string) => items.some((i) => i.id === id), [items]);

  const clearWishlist = useCallback(() => setItems([]), []);

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, toggleItem, isInWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
