"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export interface Order {
  id: string;
  date: string;
  status: "Processing" | "Shipped" | "Delivered";
  items: { id: string; name: string; price: number; quantity: number; variant?: string }[];
  total: number;
  shipping: { fullName: string; email: string; address: string; city: string; postalCode: string; phone: string };
  paymentMethod: string;
  tracking?: string;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("bodrin-orders");
    if (saved) {
      try { return JSON.parse(saved); } catch { return []; }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("bodrin-orders", JSON.stringify(orders));
  }, [orders]);

  const addOrder = useCallback((order: Order) => {
    setOrders((prev) => [order, ...prev]);
  }, []);

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
}
