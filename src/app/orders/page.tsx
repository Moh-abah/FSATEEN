"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Grid3X3,
  List,
  Search,
  ChevronDown,
  ArrowUpDown,
  Package,
  Clock,
  CheckCircle,
  Truck,
  Star,
  Eye,
  X,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Navbar, Footer, MobileBottomNav } from "@/components/layout";
import { LoadingSkeleton, EmptyState, ErrorState } from "@/components/shared";
import { useOrders } from "@/hooks";
import { Order, OrderStatus } from "@/types"; 
import { formatCurrency, formatDate } from "@/lib/utils";

// ✨ Configuration Constants
const STATUS_FILTERS = [
  { value: "all", label: "الكل", icon: Package, color: "var(--primary)" },
  {
    value: "requested",
    label: "قيد الطلب",
    icon: Clock,
    color: "var(--warning)",
  },
  {
    value: "accepted",
    label: "مقبول",
    icon: CheckCircle,
    color: "var(--info)",
  },
  {
    value: "delivered",
    label: "تم الشحن",
    icon: Truck,
    color: "var(--success)",
  },
  { value: "completed", label: "مكتمل", icon: Star, color: "var(--primary)" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "الأحدث أولاً" },
  { value: "oldest", label: "الأقدم أولاً" },
  { value: "highest", label: "الأعلى سعراً" },
  { value: "lowest", label: "الأقل سعراً" },
];

// ✨ Premium Grid Order Card - The Star Component
function GridOrderCard({
  order,
  role,
}: {
    order: Order;
  role: "buyer" | "seller";
}) {
  const isBuyer = role === "buyer";
  const otherParty = isBuyer ? order.seller : order.buyer;

  const statusConfig: Record<
    string,
    { bg: string; text: string; label: string; dot: string }
  > = {
    requested: {
      bg: "bg-[var(--warning)]/10",
      text: "text-[var(--warning)]",
      label: "قيد الطلب",
      dot: "bg-[var(--warning)]",
    },
    accepted: {
      bg: "bg-[var(--info)]/10",
      text: "text-[var(--info)]",
      label: "مقبول",
      dot: "bg-[var(--info)]",
    },
    delivered: {
      bg: "bg-[var(--success)]/10",
      text: "text-[var(--success)]",
      label: "تم الشحن",
      dot: "bg-[var(--success)]",
    },
    completed: {
      bg: "bg-[var(--primary)]/10",
      text: "text-[var(--primary)]",
      label: "مكتمل",
      dot: "bg-[var(--primary)]",
    },
    cancelled: {
      bg: "bg-[var(--destructive)]/10",
      text: "text-[var(--destructive)]",
      label: "ملغي",
      dot: "bg-[var(--destructive)]",
    },
    disputed: {
      bg: "bg-[var(--error)]/10",
      text: "text-[var(--error)]",
      label: "نزاع",
      dot: "bg-[var(--error)]",
    },
  };

  const currentStatus = statusConfig[order.status] || statusConfig.requested;

  return (
    <Link
      href={`/orders/${order.id}`}
      className="group relative block focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 rounded-2xl"
    >
      <Card
        className="
        overflow-hidden border border-[var(--border)] bg-[var(--surface)] 
        hover:shadow-2xl hover:shadow-[var(--primary)]/15 hover:border-[var(--primary)]/40
        transition-all duration-300 h-full flex flex-col cursor-pointer
        active:scale-[0.99]
      "
      >
        {/* ✨ Product Image Section - Visual Hero */}
        <div className="relative aspect-square overflow-hidden bg-[var(--surfaceMuted)]">
          {/* Main Image with Zoom Effect */}
          <img
            src={order.product?.primary_image}
            alt={order.product?.title || "منتج"}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            loading="lazy"
          />

          {/* Elegant Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

          {/* Status Badge - Floating Pill */}
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`
              inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold font-cairo
              ${currentStatus.bg} ${currentStatus.text} backdrop-blur-md border border-current/20
              shadow-sm group-hover:shadow-md transition-shadow duration-300
            `}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${currentStatus.dot} animate-pulse`}
              />
              {currentStatus.label}
            </span>
          </div>

          {/* Quick Actions - Reveal on Hover */}
          <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-3 group-hover:translate-y-0">
            <Button
              size="sm"
              className="w-full bg-white/95 backdrop-blur-md text-[var(--text)] hover:bg-white font-cairo font-medium shadow-xl border border-white/20"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Eye className="w-4 h-4 ml-1.5" />
              عرض التفاصيل
            </Button>
          </div>

          {/* Price Badge - Elegant Floating Tag */}
          <div className="absolute bottom-3 right-3 z-10">
            <span
              className="
              px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md text-sm font-bold text-[var(--primary)] font-cairo 
              shadow-lg border border-white/30 min-w-[80px] text-center
            "
            >
              {formatCurrency(order.product.price)}
            </span>
          </div>


        </div>

        {/* ✨ Order Info Section - Clean & Organized */}
        <CardContent className="p-4 flex-1 flex flex-col">
          {/* Product Title */}
          <h3
            className="font-semibold text-[var(--text)] font-cairo line-clamp-2 mb-2 
            group-hover:text-[var(--primary)] transition-colors duration-200 leading-tight"
          >
            {order.product?.title}
          </h3>

          {/* Other Party - Subtle Info */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-[var(--textTertiary)] font-cairo">
              {isBuyer ? "البائعة:" : "المشترية:"}
            </span>
            <span className="text-xs font-medium text-[var(--text)] font-cairo truncate max-w-[120px]">
              {otherParty?.full_name || "مستخدم"}
            </span>
          </div>

          {/* Meta Info - Date & Quantity */}
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-[var(--border)]/60">
            <div className="flex items-center gap-1.5 text-xs text-[var(--textTertiary)] font-cairo">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">
                {formatDate(order.created_at, { dateStyle: "short" })}
              </span>
            </div>

          </div>
        </CardContent>

        {/* ✨ Bottom Accent Line - Premium Touch */}
        <div
          className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[var(--primary)] via-[var(--primaryDark)] to-[var(--primary)] 
          scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right"
        />
      </Card>
    </Link>
  );
}

// ✨ List View Card - Alternative Compact Design
function ListOrderCard({
  order,
  role,
}: {
    order: Order;
  role: "buyer" | "seller";
}) {
  const isBuyer = role === "buyer";
  const otherParty = isBuyer ? order.seller : order.buyer;

  const statusConfig: Record<
    string,
    { bg: string; text: string; label: string }
  > = {
    requested: {
      bg: "bg-[var(--warning)]/10",
      text: "text-[var(--warning)]",
      label: "قيد الطلب",
    },
    accepted: {
      bg: "bg-[var(--info)]/10",
      text: "text-[var(--info)]",
      label: "مقبول",
    },
    delivered: {
      bg: "bg-[var(--success)]/10",
      text: "text-[var(--success)]",
      label: "تم الشحن",
    },
    completed: {
      bg: "bg-[var(--primary)]/10",
      text: "text-[var(--primary)]",
      label: "مكتمل",
    },
    cancelled: {
      bg: "bg-[var(--destructive)]/10",
      text: "text-[var(--destructive)]",
      label: "ملغي",
    },
    disputed: {
      bg: "bg-[var(--error)]/10",
      text: "text-[var(--error)]",
      label: "نزاع",
    },
  };

  const currentStatus = statusConfig[order.status] || statusConfig.requested;

  return (
    <Link
      href={`/orders/${order.id}`}
      className="group block focus:outline-none focus:ring-2 focus:ring-[var(--primary)] rounded-2xl"
    >
      <Card
        className="
        overflow-hidden border border-[var(--border)] bg-[var(--surface)] 
        hover:shadow-xl hover:shadow-[var(--primary)]/8 hover:border-[var(--primary)]/30
        transition-all duration-300 cursor-pointer active:scale-[0.995]
      "
      >
        <CardContent className="p-4">
          <div className="flex gap-4">
            {/* Product Thumbnail */}
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-[var(--surfaceMuted)] shrink-0 ring-1 ring-[var(--border)] group-hover:ring-[var(--primary)]/30 transition-all">
              <img
                src={
                  order.product?.primary_image
                }
                alt={order.product?.title || "منتج"}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                loading="lazy"
              />
              {/* Status Dot */}
              <span
                className={`absolute top-2 left-2 w-2.5 h-2.5 rounded-full ${currentStatus.text.replace("text-", "bg-")} ring-2 ring-[var(--surface)]`}
              />
            </div>

            {/* Content Area */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold text-[var(--text)] font-cairo line-clamp-1 group-hover:text-[var(--primary)] transition-colors">
                  {order.product?.title}
                </h3>
                <span
                  className={`
                  px-3 py-1 rounded-full text-xs font-semibold font-cairo shrink-0
                  ${currentStatus.bg} ${currentStatus.text} border border-current/20
                `}
                >
                  {currentStatus.label}
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <span className="text-[var(--textTertiary)] font-cairo">
                  {isBuyer ? "من:" : "إلى:"}{" "}
                  <span className="text-[var(--text)] font-medium">
                    {otherParty?.full_name || "مستخدم"}
                  </span>
                </span>

              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-[var(--textTertiary)] font-cairo">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatDate(order.created_at, { dateStyle: "short" })}</span>
                </div>
                <span className="font-bold text-lg text-[var(--primary)] font-cairo">
                  {formatCurrency(order.product_price)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// ✨ Premium Skeleton Loader for Grid
function GridSkeleton() {
  return (
    <Card className="overflow-hidden border border-[var(--border)] bg-[var(--surface)] h-full animate-pulse">
      <Skeleton className="aspect-square bg-[var(--surfaceMuted)] rounded-none" />
      <CardContent className="p-4 space-y-3">
        <Skeleton className="h-5 w-full bg-[var(--surfaceMuted)] rounded-lg" />
        <Skeleton className="h-4 w-2/3 bg-[var(--surfaceMuted)] rounded-lg" />
        <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]/50">
          <Skeleton className="h-4 w-16 bg-[var(--surfaceMuted)] rounded" />
          <Skeleton className="h-6 w-12 rounded-full bg-[var(--surfaceMuted)]" />
        </div>
      </CardContent>
    </Card>
  );
}

// ✨ Premium Empty State - Inspirational Design
function GridEmptyState({
  role,
  onBrowse,
}: {
  role: "buyer" | "seller";
  onBrowse?: () => void;
}) {
  const isBuyer = role === "buyer";

  return (
    <Card className="border-2 border-dashed border-[var(--border)] bg-gradient-to-br from-[var(--surface)] to-[var(--surfaceMuted)]/30">
      <CardContent className="py-16 px-6 text-center">
        {/* Decorative Icon Container */}
        <div className="relative mx-auto mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/20 to-[var(--primary)]/5 rounded-3xl blur-2xl" />
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--primary)]/15 to-[var(--primary)]/5 flex items-center justify-center ring-1 ring-[var(--primary)]/30">
            <ShoppingBag className="w-10 h-10 text-[var(--primary)]" />
          </div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-[var(--text)] font-cairo mb-2">
          {isBuyer ? "رحلتكِ تبدأ هنا ✨" : "ابدئي بعرض فساتينكِ 🎀"}
        </h3>
        <p className="text-[var(--textSecondary)] font-cairo mb-6 max-w-sm mx-auto leading-relaxed">
          {isBuyer
            ? "لم تقومي بأي طلبات بعد. تصفحي مجموعتنا واكتشفي فستان أحلامكِ"
            : "لا توجد طلبات على منتجاتك حالياً. استمري في الترويج لمتجركِ"}
        </p>

        {/* Action Button */}
        {isBuyer && (
          <Button
            onClick={onBrowse}
            asChild
            className="bg-gradient-to-r from-[var(--primary)] to-[var(--primaryDark)] hover:from-[var(--primaryDark)] hover:to-[var(--primary)] text-[var(--textInverse)] shadow-lg shadow-[var(--primary)]/30 hover:shadow-xl hover:shadow-[var(--primary)]/40 font-cairo font-medium transition-all duration-300"
          >
            <Link href="/products" className="flex items-center">
              <ShoppingBag className="w-4 h-4 ml-2" />
              تصفحي الفساتين
            </Link>
          </Button>
        )}

        {/* Decorative Elements */}
        <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-[var(--primary)]/5 blur-xl" />
        <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-[var(--success)]/5 blur-lg" />
      </CardContent>
    </Card>
  );
}

// ✨ Stats Card Component
function StatsCard({
  label,
  value,
  color,
  icon: Icon,
}: {
  label: string;
  value: number;
  color: string;
  icon: any;
}) {
  return (
    <Card className="border border-[var(--border)] bg-[var(--surface)] hover:shadow-md hover:shadow-[var(--primary)]/5 transition-shadow duration-200">
      <CardContent className="p-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Icon className="w-4 h-4" style={{ color }} />
          <p className="text-2xl font-bold font-cairo" style={{ color }}>
            {value}
          </p>
        </div>
        <p className="text-xs text-[var(--textSecondary)] font-cairo">
          {label}
        </p>
      </CardContent>
    </Card>
  );
}

export default function OrdersPage() {
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const [status, setStatus] = useState<OrderStatus | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading, error, refetch } = useOrders({ role, status });

  const handleStatusChange = (value: string) => {
    setStatus(value === "all" ? undefined : (value as OrderStatus));
  };

  // ✨ Client-side filtering & sorting (visual enhancement)
  const filteredOrders = useMemo(() => {
    if (!data?.items) return [];
    let items = [...data.items];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        (order) =>
          order.product?.title?.toLowerCase().includes(query) 
        
      );
    }

    // Sort
    items.sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        case "highest":
          return (b.product_price || 0) - (a.product_price || 0);
        case "lowest":
          return (a.product_price || 0) - (b.product_price || 0);
        default:
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
      }
    });

    return items;
  }, [data, searchQuery, sortBy]);

  // ✨ Stats calculation
  const stats = useMemo(() => {
    if (!data?.items) return null;
    return {
      total: data.items.length,
      pending: data.items.filter((o) => o.status === "requested").length,
      completed: data.items.filter((o) => o.status === "completed").length,
    };
  }, [data]);




  const handleBrowse = () => {
    window.location.href = "/products";
  };


  const hasMore = data ? data.page * data.page_size < data.total : false;


  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />

      <main className="flex-1 py-6 pb-24">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* ✨ Premium Header Section */}
          <header className="mb-8">
            {/* Title & Role Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--primaryDark)] rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--primaryDark)] flex items-center justify-center shadow-xl shadow-[var(--primary)]/30">
                    <ShoppingBag className="h-7 w-7 text-[var(--textInverse)]" />
                  </div>

                  {stats && (stats.pending ?? 0) > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 min-w-[22px] h-5.5 px-1.5 bg-[var(--warning)] text-white text-xs font-bold rounded-full flex items-center justify-center ring-2 ring-[var(--background)] animate-bounce">
                      {stats.pending}
                    </span>
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[var(--primary)] font-cairo tracking-tight">
                    طلباتي
                  </h1>
                  <p className="text-sm text-[var(--textSecondary)] font-cairo mt-0.5">
                    {role === "buyer" ? "إدارة مشترياتكِ" : "إدارة مبيعاتكِ"}
                  </p>
                </div>
              </div>

              {/* ✨ Role Toggle - Premium Segmented Control */}
              <div className="flex items-center gap-1 p-1.5 rounded-xl bg-[var(--surfaceMuted)] border border-[var(--border)] self-start sm:self-auto shadow-sm">
                {(["buyer", "seller"] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className={`
                      px-5 py-2.5 rounded-lg text-sm font-semibold font-cairo transition-all duration-200
                      ${
                        role === r
                          ? "bg-gradient-to-r from-[var(--primary)] to-[var(--primaryDark)] text-[var(--textInverse)] shadow-md"
                          : "text-[var(--textSecondary)] hover:text-[var(--text)] hover:bg-[var(--surface)]"
                      }
                    `}
                  >
                    {r === "buyer" ? "مشترياتي" : "مبيعاتي"}
                  </button>
                ))}
              </div>
            </div>

            {/* ✨ Stats Dashboard */}
            {stats && (
              <div className="grid grid-cols-3 gap-3 mb-6">
                <StatsCard
                  label="الإجمالي"
                  value={stats.total}
                  color="var(--primary)"
                  icon={Package}
                />
                <StatsCard
                  label="قيد الانتظار"
                  value={stats.pending}
                  color="var(--warning)"
                  icon={Clock}
                />
                <StatsCard
                  label="مكتملة"
                  value={stats.completed}
                  color="var(--success)"
                  icon={CheckCircle}
                />
              </div>
            )}

            {/* ✨ Toolbar: Search + Sort + View Toggle + Mobile Filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-[var(--textTertiary)]" />
                <Input
                  placeholder="ابحثي عن طلب أو منتج..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10 bg-[var(--surface)] border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 font-cairo placeholder:text-[var(--textTertiary)] transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-1 text-[var(--textTertiary)] hover:text-[var(--text)]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-[var(--border)] text-[var(--text)] hover:bg-[var(--surfaceMuted)] font-cairo gap-2 min-w-[110px]"
                  >
                    <ArrowUpDown className="h-4 w-4" />
                    ترتيب
                    <ChevronDown className="h-3 w-3 opacity-60" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-[var(--surface)] border-[var(--border)] font-cairo w-52"
                >
                  <DropdownMenuLabel className="text-xs text-[var(--textTertiary)] px-3 py-2">
                    ترتيب حسب
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-[var(--border)]" />
                  {SORT_OPTIONS.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      className={`
                        cursor-pointer justify-between px-3 py-2.5 hover:bg-[var(--surfaceMuted)] focus:bg-[var(--surfaceMuted)]
                        ${sortBy === option.value ? "text-[var(--primary)] font-semibold" : "text-[var(--text)]"}
                      `}
                    >
                      {option.label}
                      {sortBy === option.value && (
                        <CheckCircle className="w-4 h-4 text-[var(--primary)]" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--surfaceMuted)] border border-[var(--border)] shadow-sm">
                {[
                  { value: "grid", icon: Grid3X3, label: "شبكة" },
                  { value: "list", icon: List, label: "قائمة" },
                ].map((mode) => {
                  const Icon = mode.icon;
                  return (
                    <button
                      key={mode.value}
                      onClick={() => setViewMode(mode.value as "grid" | "list")}
                      className={`
                        p-2.5 rounded-lg transition-all duration-200
                        ${
                          viewMode === mode.value
                            ? "bg-gradient-to-r from-[var(--primary)] to-[var(--primaryDark)] text-[var(--textInverse)] shadow-md"
                            : "text-[var(--textTertiary)] hover:text-[var(--text)] hover:bg-[var(--surface)]"
                        }
                      `}
                      title={mode.label}
                    >
                      <Icon className="w-4.5 h-4.5" />
                    </button>
                  );
                })}
              </div>

              {/* Mobile Filter Button */}
              <Button
                variant="outline"
                className="sm:hidden border-[var(--border)] font-cairo gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4" />
                فلاتر
              </Button>
            </div>

            {/* ✨ Status Filter Tabs - Horizontal Scroll with Fade Edges */}
            <div
              className={`transition-all duration-300 ${showFilters ? "max-h-40 opacity-100" : "max-h-0 opacity-0 sm:max-h-40 sm:opacity-100"} overflow-hidden`}
            >
              <div className="relative">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                  {STATUS_FILTERS.map((filter) => {
                    const Icon = filter.icon;
                    const isActive = (status || "all") === filter.value;
                    const count =
                      data?.items?.filter(
                        (o) =>
                          filter.value === "all" || o.status === filter.value,
                      ).length || 0;

                    return (
                      <button
                        key={filter.value}
                        onClick={() => handleStatusChange(filter.value)}
                        className={`
                          flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold font-cairo shrink-0
                          transition-all duration-200 whitespace-nowrap
                          ${
                            isActive
                              ? "border-[var(--primary)] bg-gradient-to-r from-[var(--primary)]/15 to-[var(--primary)]/5 text-[var(--primary)] shadow-sm"
                              : "border-[var(--border)] bg-[var(--surface)] text-[var(--textSecondary)] hover:border-[var(--primary)]/50 hover:text-[var(--text)] hover:bg-[var(--surfaceMuted)]/50"
                          }
                        `}
                      >
                        <Icon
                          className={`w-4 h-4 ${isActive ? "text-[var(--primary)]" : "text-[var(--textTertiary)]"}`}
                        />
                        <span>{filter.label}</span>
                        {filter.value !== "all" && count > 0 && (
                          <span
                            className={`
                            px-2 py-0.5 rounded-full text-xs font-bold transition-colors
                            ${isActive ? "bg-[var(--primary)] text-[var(--textInverse)]" : "bg-[var(--surfaceMuted)] text-[var(--textTertiary)]"}
                          `}
                          >
                            {count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                {/* Fade edges for horizontal scroll - Mobile only */}
                <div className="absolute right-0 top-0 bottom-2 w-10 bg-gradient-to-l from-[var(--background)] to-transparent pointer-events-none sm:hidden" />
                <div className="absolute left-0 top-0 bottom-2 w-10 bg-gradient-to-r from-[var(--background)] to-transparent pointer-events-none sm:hidden" />
              </div>
            </div>
          </header>

          {/* ✨ Orders Grid/List Section */}
          {/* ✨ Orders Grid/List Section */}
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                : "space-y-4"
            }
          >
            {isLoading ? (
              <>
                {[...Array(viewMode === "grid" ? 10 : 5)].map((_, i) =>
                  viewMode === "grid" ? (
                    <GridSkeleton key={i} />
                  ) : (
                    <GridSkeleton key={i} />
                  ),
                )}
              </>
            ) : error ? (
              <div className="col-span-full">
                <ErrorState
                  onRetry={() => refetch()}
                  title="عذراً، حدث خطأ"
                    message="لم نتمكن من تحميل طلباتكِ. حاولي مرة أخرى"
              
                />
              </div>
            ) : filteredOrders && filteredOrders.length > 0 ? (
              filteredOrders.map((order) =>
                viewMode === "grid" ? (
                  <GridOrderCard key={order.id} order={order} role={role} />
                ) : (
                  <ListOrderCard key={order.id} order={order} role={role} />
                )
              )
            ) : (
              <div className="col-span-full">
                <GridEmptyState role={role} onBrowse={handleBrowse} />
              </div>
            )}
          </div>

          {/* ✨ Load More / Pagination */}
          {hasMore && !isLoading && filteredOrders?.length > 0 && (
            <div className="text-center mt-10">
              <Button
                variant="outline"
                className="border-[var(--border)] text-[var(--text)] hover:border-[var(--primary)] hover:text-[var(--primary)] font-cairo font-medium px-8 py-2.5 transition-all"
                onClick={() => {
                  /* Load more logic */
                }}
              >
                تحميل المزيد
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}