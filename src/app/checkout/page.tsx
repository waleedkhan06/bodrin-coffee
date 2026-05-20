"use client";

import { useState } from "react";
import { useCart } from "@/contexts/cart-context";
import { useOrders } from "@/contexts/order-context";
import { useUser, SignInButton } from "@clerk/nextjs";
import { Navigation } from "@/components/nav/navigation";
import { Footer } from "@/components/sections/footer";
import { Minus, Plus, Trash2 } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useToast } from "@/contexts/toast-context";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { isSignedIn, isLoaded } = useUser();
  const { items, updateQuantity, removeItem, clearCart, total } = useCart();
  const { addOrder } = useOrders();
  const toast = useToast();
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    paymentMethod: "card",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = "Full name is required";
    if (!formData.email.trim() || !formData.email.includes("@")) errs.email = "Valid email is required";
    if (!formData.address.trim()) errs.address = "Address is required";
    if (!formData.city.trim()) errs.city = "City is required";
    if (!formData.postalCode.trim()) errs.postalCode = "Postal code is required";
    if (!formData.phone.trim()) errs.phone = "Phone number is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast("Please fix the errors in the form", "error");
      return;
    }
    const orderId = `BDR-${Date.now().toString(36).toUpperCase()}`;
    addOrder({
      id: orderId,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "Processing",
      items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity, variant: i.variant })),
      total,
      shipping: { ...formData },
      paymentMethod: formData.paymentMethod,
    });
    clearCart();
    router.push(`/order-confirmed?id=${orderId}`);
  };

  if (!isLoaded) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen w-full" style={{ backgroundColor: "#0c0a08", color: "#f5ede4" }}>
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!isSignedIn) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen w-full" style={{ backgroundColor: "#0c0a08", color: "#f5ede4" }}>
          <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6">
            <h1 className="font-display text-balance text-center text-4xl leading-[0.95] tracking-tight md:text-5xl" style={{ color: "#f5ede4" }}>
              Sign In to Checkout
            </h1>
            <p className="mt-4 text-center" style={{ color: "rgba(245, 237, 228, 0.6)" }}>
              Please sign in to your account to complete your purchase.
            </p>
            <SignInButton>
              <div className="mt-8">
                <MagneticButton variant="gold">Sign In</MagneticButton>
              </div>
            </SignInButton>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen w-full" style={{ backgroundColor: "#0c0a08", color: "#f5ede4" }}>
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 md:px-10 md:py-40 lg:px-12">
          <header className="mb-10 md:mb-16">
            <h1 className="font-display text-balance text-4xl leading-[0.95] tracking-tight md:text-5xl lg:text-7xl" style={{ color: "#f5ede4" }}>
              Checkout
            </h1>
            <p className="mt-3 text-sm md:text-base" style={{ color: "rgba(245, 237, 228, 0.6)" }}>
              {items.length === 0 ? "Your cart is empty" : `${items.length} item${items.length !== 1 ? "s" : ""}`}
            </p>
          </header>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-xl" style={{ color: "rgba(245, 237, 228, 0.5)" }}>
                No items in cart
              </p>
              <Link href="/">
                <MagneticButton variant="gold" className="mt-8">
                  Continue Shopping
                </MagneticButton>
              </Link>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
              {/* Left column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Cart Items */}
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-wrap items-center gap-4 rounded-[20px] p-4 sm:p-6"
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-lg sm:text-xl truncate" style={{ color: "#f5ede4" }}>
                          {item.name}
                        </h3>
                        {item.variant && (
                          <p className="text-xs sm:text-sm truncate" style={{ color: "rgba(245, 237, 228, 0.5)" }}>
                            {item.variant}
                          </p>
                        )}
                        <p className="mt-1 font-display text-base sm:text-lg" style={{ color: "#d4af88" }}>
                          €{item.price}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-9 w-9 items-center justify-center rounded-full transition-all hover:scale-110"
                          style={{ backgroundColor: "rgba(212, 175, 136, 0.1)", color: "#d4af88" }}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} strokeWidth={1.6} />
                        </button>
                        <span className="w-7 text-center text-sm" style={{ color: "#f5ede4" }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-9 w-9 items-center justify-center rounded-full transition-all hover:scale-110"
                          style={{ backgroundColor: "rgba(212, 175, 136, 0.1)", color: "#d4af88" }}
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} strokeWidth={1.6} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-full transition-all hover:scale-110"
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.05)", color: "rgba(245, 237, 228, 0.5)" }}
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} strokeWidth={1.6} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Checkout Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div
                    className="rounded-[20px] p-5 sm:p-8 space-y-5 sm:space-y-6"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                  >
                    <h2 className="font-display text-xl sm:text-2xl" style={{ color: "#f5ede4" }}>
                      Shipping Information
                    </h2>

                    <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
                      <FormField
                        label="Full Name"
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        error={errors.fullName}
                      />
                      <FormField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        error={errors.email}
                      />
                      <div className="sm:col-span-2">
                        <FormField
                          label="Address"
                          name="address"
                          type="text"
                          value={formData.address}
                          onChange={handleInputChange}
                          error={errors.address}
                        />
                      </div>
                      <FormField
                        label="City"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleInputChange}
                        error={errors.city}
                      />
                      <FormField
                        label="Postal Code"
                        name="postalCode"
                        type="text"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        error={errors.postalCode}
                      />
                      <div className="sm:col-span-2">
                        <FormField
                          label="Phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          error={errors.phone}
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className="rounded-[20px] p-5 sm:p-8 space-y-4 sm:space-y-6"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                  >
                    <h2 className="font-display text-xl sm:text-2xl" style={{ color: "#f5ede4" }}>
                      Payment Method
                    </h2>

                    <div className="space-y-3">
                      {(["card", "paypal", "bank"] as const).map((method) => (
                        <label key={method} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method}
                            checked={formData.paymentMethod === method}
                            onChange={handleInputChange}
                            className="accent-[#d4af88]"
                          />
                          <span style={{ color: "#f5ede4" }}>
                            {method === "card" ? "Credit Card" : method === "paypal" ? "PayPal" : "Bank Transfer"}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-gradient-to-b from-gold-bright via-gold to-gold-deep px-8 py-4 text-sm font-medium tracking-wide text-espresso shadow-[0_8px_30px_rgba(212,175,136,0.25)] transition-all hover:shadow-[0_12px_44px_rgba(212,175,136,0.45)] hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Place Order — €{total.toFixed(2)}
                  </button>
                </form>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div
                  className="rounded-[20px] p-5 sm:p-8 space-y-6 lg:sticky lg:top-28"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                >
                  <h2 className="font-display text-xl sm:text-2xl" style={{ color: "#f5ede4" }}>
                    Order Summary
                  </h2>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span style={{ color: "rgba(245, 237, 228, 0.6)" }}>Subtotal</span>
                      <span style={{ color: "#f5ede4" }}>€{total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: "rgba(245, 237, 228, 0.6)" }}>Shipping</span>
                      <span style={{ color: "#f5ede4" }}>Free</span>
                    </div>
                    <div className="h-px" style={{ backgroundColor: "rgba(212, 175, 136, 0.2)" }} />
                    <div className="flex justify-between text-lg sm:text-xl">
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

                  <div className="space-y-3 pt-4">
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
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function FormField({
  label,
  name,
  type,
  value,
  onChange,
  error,
}: {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm" style={{ color: "rgba(245, 237, 228, 0.6)" }}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        required
        value={value}
        onChange={onChange}
        className="w-full rounded-full border px-4 py-3 bg-transparent outline-none transition-colors focus:border-gold text-sm sm:text-base"
        style={{
          borderColor: error ? "rgba(239,68,68,0.5)" : "rgba(212, 175, 136, 0.3)",
          color: "#f5ede4"
        }}
      />
      {error && (
        <p className="text-xs" style={{ color: "#ef4444" }}>
          {error}
        </p>
      )}
    </div>
  );
}
