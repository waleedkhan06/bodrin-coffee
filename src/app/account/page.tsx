"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Package,
  Heart,
  Settings,
  LogOut,
  Mail,
  Phone,
  Calendar,
  ChevronRight,
  Truck,
  Clock,
  CreditCard,
  Edit2,
  Eye,
  MapPin,
  ShoppingBag,
} from "lucide-react";
import { useUser, SignInButton, useClerk } from "@clerk/nextjs";
import { Navigation } from "@/components/nav/navigation";
import { Footer } from "@/components/sections/footer";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useWishlist } from "@/contexts/wishlist-context";
import { useOrders } from "@/contexts/order-context";
import { ClerkErrorBoundary } from "@/components/providers/clerk-error-boundary";
import Link from "next/link";

type Tab = "profile" | "orders" | "wishlist" | "settings";

function AccountContent() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const { items: wishlistItems } = useWishlist();
  const { orders } = useOrders();
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  if (!isLoaded) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6">
        <h1 className="font-display text-balance text-center text-3xl leading-[0.95] tracking-tight sm:text-4xl md:text-5xl" style={{ color: "#f5ede4" }}>
          Sign In to Your Account
        </h1>
        <p className="mt-4 text-center text-sm sm:text-base" style={{ color: "rgba(245, 237, 228, 0.6)" }}>
          Access your orders, wishlist, and preferences.
        </p>
        <SignInButton>
          <div className="mt-8">
            <MagneticButton variant="gold">Sign In</MagneticButton>
          </div>
        </SignInButton>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "profile", label: "Profile", icon: <User size={16} strokeWidth={1.6} /> },
    { id: "orders", label: "Orders", icon: <Package size={16} strokeWidth={1.6} /> },
    { id: "wishlist", label: "Wishlist", icon: <Heart size={16} strokeWidth={1.6} /> },
    { id: "settings", label: "Settings", icon: <Settings size={16} strokeWidth={1.6} /> },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 md:px-10 md:py-32 lg:px-12">
      {/* Header */}
      <div className="mb-8 sm:mb-12">
        <p className="text-[10px] uppercase tracking-[0.4em]" style={{ color: "#a8845e" }}>
          My Account
        </p>
        <h1 className="mt-2 font-display text-balance text-3xl leading-[0.95] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl" style={{ color: "#f5ede4" }}>
          Welcome back, {user.firstName || user.username || "Member"}
        </h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Sidebar tabs */}
        <div className="lg:col-span-3">
          <nav className="grid grid-cols-2 gap-2 lg:flex lg:flex-col lg:gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm transition-all duration-300 lg:justify-start ${
                  activeTab === tab.id
                    ? "glass-gold text-cream"
                    : "text-cream/60 hover:text-cream hover:bg-white/5"
                }`}
              >
                {tab.icon}
                <span className="truncate">{tab.label}</span>
                {tab.id === "wishlist" && wishlistItems.length > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold shrink-0" style={{ backgroundColor: "#d4af88", color: "#0c0a08" }}>
                    {wishlistItems.length}
                  </span>
                )}
                {tab.id === "orders" && orders.length > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold shrink-0" style={{ backgroundColor: "#d4af88", color: "#0c0a08" }}>
                    {orders.length}
                  </span>
                )}
              </button>
            ))}

            {/* Sign out */}
            <button
              onClick={() => signOut()}
              className="col-span-2 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm text-cream/40 transition-colors hover:text-red-400 lg:col-span-1 lg:mt-2 lg:justify-start"
            >
              <LogOut size={16} strokeWidth={1.6} />
              <span>Sign Out</span>
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-9 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {activeTab === "profile" && <ProfileTab user={user} />}
              {activeTab === "orders" && <OrdersTab />}
              {activeTab === "wishlist" && <WishlistTab />}
              {activeTab === "settings" && <SettingsTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen" style={{ backgroundColor: "#0c0a08", color: "#f5ede4" }}>
        <ClerkErrorBoundary fallback={
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
          </div>
        }>
          <AccountContent />
        </ClerkErrorBoundary>
      </main>
      <Footer />
    </>
  );
}

function ProfileTab({ user }: { user: ReturnType<typeof useUser>["user"] }) {
  const { orders } = useOrders();
  const { items: wishlistItems } = useWishlist();

  if (!user) return null;

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "Recently";

  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Profile card */}
      <div
        className="rounded-[20px] sm:rounded-[24px] p-5 sm:p-8"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(212, 175, 136, 0.12)" }}
      >
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <div
            className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full text-xl sm:text-2xl font-display"
            style={{
              background: "linear-gradient(135deg, rgba(212,175,136,0.2) 0%, rgba(212,175,136,0.05) 100%)",
              border: "1px solid rgba(212, 175, 136, 0.3)",
              color: "#d4af88",
            }}
          >
            {user.firstName?.charAt(0) || user.username?.charAt(0) || "U"}
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl truncate" style={{ color: "#f5ede4" }}>
              {user.firstName} {user.lastName}
            </h2>
            <p className="mt-1 text-sm" style={{ color: "rgba(245, 237, 228, 0.5)" }}>
              BODRIN Atelier Member
            </p>
            <div className="mt-2 flex items-center gap-2 text-xs" style={{ color: "#a8845e" }}>
              <Calendar size={12} strokeWidth={1.6} />
              <span>Member since {memberSince}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact details */}
      <div
        className="rounded-[20px] sm:rounded-[24px] p-5 sm:p-8"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(212, 175, 136, 0.12)" }}
      >
        <h3 className="font-display text-lg sm:text-xl mb-4 sm:mb-6" style={{ color: "#f5ede4" }}>
          Contact Details
        </h3>
        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
          <DetailItem
            icon={<Mail size={16} strokeWidth={1.6} />}
            label="Email"
            value={user.primaryEmailAddress?.emailAddress || "Not set"}
          />
          <DetailItem
            icon={<Phone size={16} strokeWidth={1.6} />}
            label="Phone"
            value={user.primaryPhoneNumber?.phoneNumber || "Not set"}
          />
          <DetailItem
            icon={<MapPin size={16} strokeWidth={1.6} />}
            label="Address"
            value={orders.length > 0 ? orders[0].shipping.address : "No address saved"}
          />
          <DetailItem
            icon={<CreditCard size={16} strokeWidth={1.6} />}
            label="Payment"
            value={orders.length > 0 ? formatPayment(orders[0].paymentMethod) : "No payment saved"}
          />
        </div>
      </div>

      {/* Shipping info from last order */}
      {orders.length > 0 && (
        <div
          className="rounded-[20px] sm:rounded-[24px] p-5 sm:p-8"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(212, 175, 136, 0.12)" }}
        >
          <h3 className="font-display text-lg sm:text-xl mb-4 sm:mb-6" style={{ color: "#f5ede4" }}>
            Last Shipping Address
          </h3>
          <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
            <DetailItem icon={<User size={16} strokeWidth={1.6} />} label="Name" value={orders[0].shipping.fullName} />
            <DetailItem icon={<Mail size={16} strokeWidth={1.6} />} label="Email" value={orders[0].shipping.email} />
            <DetailItem icon={<Phone size={16} strokeWidth={1.6} />} label="Phone" value={orders[0].shipping.phone} />
            <DetailItem icon={<MapPin size={16} strokeWidth={1.6} />} label="City" value={`${orders[0].shipping.city}, ${orders[0].shipping.postalCode}`} />
            <div className="sm:col-span-2">
              <DetailItem icon={<MapPin size={16} strokeWidth={1.6} />} label="Full Address" value={orders[0].shipping.address} />
            </div>
          </div>
        </div>
      )}

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Orders", value: orders.length.toString() },
          { label: "Wishlist", value: wishlistItems.length.toString() },
          { label: "Spent", value: `€${totalSpent}` },
          { label: "Tier", value: totalSpent >= 240 ? "Reserve" : totalSpent >= 96 ? "Atelier" : "Essence" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-[16px] sm:rounded-[20px] p-4 sm:p-5 text-center"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(212, 175, 136, 0.08)" }}
          >
            <p className="font-display text-xl sm:text-2xl md:text-3xl text-gradient-gold">{stat.value}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.3em]" style={{ color: "#a8845e" }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatPayment(method: string): string {
  const map: Record<string, string> = { card: "Credit Card", paypal: "PayPal", bank: "Bank Transfer" };
  return map[method] || method;
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl p-3" style={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}>
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: "rgba(212, 175, 136, 0.1)", color: "#d4af88" }}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: "#a8845e" }}>
          {label}
        </p>
        <p className="truncate text-sm" style={{ color: "#f5ede4" }}>
          {value}
        </p>
      </div>
    </div>
  );
}

function OrdersTab() {
  const { orders } = useOrders();

  const statusColors: Record<string, string> = {
    Delivered: "rgba(34, 197, 94, 0.15)",
    Shipped: "rgba(59, 130, 246, 0.15)",
    Processing: "rgba(234, 179, 8, 0.15)",
  };
  const statusTextColors: Record<string, string> = {
    Delivered: "#22c55e",
    Shipped: "#3b82f6",
    Processing: "#eab308",
  };

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[20px] sm:rounded-[24px] py-16 sm:py-20" style={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}>
        <Package size={48} strokeWidth={1} style={{ color: "rgba(212, 175, 136, 0.3)" }} />
        <p className="mt-4 text-base sm:text-lg" style={{ color: "rgba(245, 237, 228, 0.5)" }}>
          No orders yet
        </p>
        <Link href="/#collection">
          <MagneticButton variant="outline" className="mt-6">
            Browse Collection
          </MagneticButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-display text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6" style={{ color: "#f5ede4" }}>
        Order History ({orders.length})
      </h3>

      {orders.map((order) => (
        <div
          key={order.id}
          className="rounded-[16px] sm:rounded-[20px] p-4 sm:p-6 transition-all hover:border-gold/20"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(212, 175, 136, 0.1)" }}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="font-mono text-xs sm:text-sm tracking-widest" style={{ color: "#d4af88" }}>
                  {order.id}
                </span>
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.3em]"
                  style={{ backgroundColor: statusColors[order.status], color: statusTextColors[order.status] }}
                >
                  {order.status}
                </span>
              </div>
              <p className="mt-1 text-xs" style={{ color: "rgba(245, 237, 228, 0.5)" }}>
                {order.date} · {order.items.length} item{order.items.length !== 1 ? "s" : ""}
              </p>
            </div>
            <p className="font-display text-lg sm:text-xl text-gradient-gold">€{order.total}</p>
          </div>

          <div className="mt-3 sm:mt-4 space-y-1">
            {order.items.map((item, i) => (
              <p key={i} className="text-xs sm:text-sm flex items-center gap-2" style={{ color: "rgba(245, 237, 228, 0.6)" }}>
                <ShoppingBag size={12} strokeWidth={1.6} className="shrink-0" />
                <span className="truncate">{item.name}{item.variant ? ` · ${item.variant}` : ""} × {item.quantity}</span>
              </p>
            ))}
          </div>

          <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-3">
            <button className="flex items-center gap-2 rounded-full border border-gold/30 px-3 sm:px-4 py-2 text-xs text-gold transition-colors hover:border-gold hover:text-gold-bright">
              <Eye size={12} strokeWidth={1.6} />
              View Details
            </button>
            {order.tracking && (
              <div className="flex items-center gap-2 text-xs" style={{ color: "rgba(245, 237, 228, 0.5)" }}>
                <Truck size={12} strokeWidth={1.6} />
                <span className="font-mono">{order.tracking}</span>
              </div>
            )}
            {order.status === "Delivered" && (
              <button className="ml-auto flex items-center gap-2 rounded-full px-3 sm:px-4 py-2 text-xs transition-colors hover:text-gold" style={{ color: "rgba(245, 237, 228, 0.5)" }}>
                <Clock size={12} strokeWidth={1.6} />
                Reorder
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function WishlistTab() {
  const { items, removeItem } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[20px] sm:rounded-[24px] py-16 sm:py-20" style={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}>
        <Heart size={48} strokeWidth={1} style={{ color: "rgba(212, 175, 136, 0.3)" }} />
        <p className="mt-4 text-base sm:text-lg" style={{ color: "rgba(245, 237, 228, 0.5)" }}>
          Your wishlist is empty
        </p>
        <Link href="/#collection">
          <MagneticButton variant="outline" className="mt-6">
            Browse Collection
          </MagneticButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-display text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6" style={{ color: "#f5ede4" }}>
        Saved Items ({items.length})
      </h3>

      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-[16px] sm:rounded-[20px] p-4 sm:p-5"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(212, 175, 136, 0.1)" }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h4 className="font-display text-base sm:text-lg truncate" style={{ color: "#f5ede4" }}>
                  {item.name}
                </h4>
                {item.variant && (
                  <p className="text-xs mt-1 truncate" style={{ color: "rgba(245, 237, 228, 0.5)" }}>
                    {item.variant}
                  </p>
                )}
                <p className="mt-2 font-display text-lg sm:text-xl text-gradient-gold">€{item.price}</p>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all hover:scale-110"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.05)", color: "rgba(245, 237, 228, 0.5)" }}
                aria-label="Remove from wishlist"
              >
                <Heart size={14} strokeWidth={1.6} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsTab() {
  const [notifications, setNotifications] = useState(true);
  const [newsletter, setNewsletter] = useState(true);

  return (
    <div className="space-y-6">
      <h3 className="font-display text-lg sm:text-xl md:text-2xl" style={{ color: "#f5ede4" }}>
        Settings
      </h3>

      <div
        className="rounded-[20px] sm:rounded-[24px] p-5 sm:p-8"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(212, 175, 136, 0.12)" }}
      >
        <h4 className="font-display text-lg mb-4" style={{ color: "#f5ede4" }}>
          Notifications
        </h4>
        <div className="space-y-4">
          <ToggleRow label="Order updates" description="Get notified about order status changes" checked={notifications} onChange={setNotifications} />
          <ToggleRow label="Newsletter" description="Receive letters from the roastery" checked={newsletter} onChange={setNewsletter} />
        </div>
      </div>

      <div
        className="rounded-[20px] sm:rounded-[24px] p-5 sm:p-8"
        style={{ backgroundColor: "rgba(239, 68, 68, 0.03)", border: "1px solid rgba(239, 68, 68, 0.12)" }}
      >
        <h4 className="font-display text-lg mb-2" style={{ color: "#ef4444" }}>
          Danger Zone
        </h4>
        <p className="text-sm mb-4" style={{ color: "rgba(245, 237, 228, 0.5)" }}>
          Once you delete your account, there is no going back.
        </p>
        <button className="rounded-full border border-red-500/30 px-6 py-2 text-xs text-red-400 transition-colors hover:border-red-500 hover:text-red-300">
          Delete Account
        </button>
      </div>
    </div>
  );
}

function ToggleRow({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm" style={{ color: "#f5ede4" }}>{label}</p>
        <p className="text-xs" style={{ color: "rgba(245, 237, 228, 0.5)" }}>{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className="relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300"
        style={{ backgroundColor: checked ? "#d4af88" : "rgba(255,255,255,0.1)" }}
        role="switch"
        aria-checked={checked}
      >
        <span
          className="absolute top-0.5 h-5 w-5 rounded-full bg-espresso shadow transition-transform duration-300"
          style={{ transform: checked ? "translateX(22px)" : "translateX(2px)" }}
        />
      </button>
    </div>
  );
}
