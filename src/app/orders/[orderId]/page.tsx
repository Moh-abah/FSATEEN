"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Package,
  MapPin,
  Calendar,
  MessageCircle,
  Star,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Truck,
  Clock,
  ShieldCheck,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Navbar, Footer, MobileBottomNav } from "@/components/layout";
import {
  StatusBadge,
  LoadingSkeleton,
  ErrorState,
  RatingStars,
} from "@/components/shared";
import { useOrder, useOrderActions } from "@/hooks";
import { useAuthStore } from "@/stores/auth-store";
import { formatCurrency, formatDate, getAvatarUrl } from "@/lib/utils";

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.orderId as string;

  const { user } = useAuthStore();
  const { data: order, isLoading, error, refetch } = useOrder(orderId);
  const actions = useOrderActions();

  const [showDisputeDialog, setShowDisputeDialog] = useState(false);
  const [showRateDialog, setShowRateDialog] = useState(false);
  const [disputeReason, setDisputeReason] = useState("");
  const [rating, setRating] = useState(5);
  const [ratingComment, setRatingComment] = useState("");

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--background)]">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-6">
          <LoadingSkeleton type="detail" />
        </main>
        <Footer />
        <MobileBottomNav />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--background)]">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-6">
          <ErrorState onRetry={() => refetch()} />
        </main>
        <Footer />
        <MobileBottomNav />
      </div>
    );
  }

  const isBuyer = user?.id === order.buyer_id;
  const isSeller = user?.id === order.seller_id;

  const handleAction = async (
    action: "accept" | "deliver" | "receive" | "cancel",
  ) => {
    switch (action) {
      case "accept":
        await actions.acceptOrder.mutateAsync(orderId);
        break;
      case "deliver":
        await actions.deliverOrder.mutateAsync(orderId);
        break;
      case "receive":
        await actions.receiveOrder.mutateAsync(orderId);
        break;
      case "cancel":
        await actions.cancelOrder.mutateAsync(orderId);
        break;
    }
    refetch();
  };

  const handleDispute = async () => {
    if (!disputeReason.trim()) return;
    await actions.disputeOrder.mutateAsync({
      orderId,
      data: { reason: disputeReason },
    });
    setShowDisputeDialog(false);
    refetch();
  };

  const handleRate = async () => {
    await actions.rateOrder.mutateAsync({
      orderId,
      data: { score: rating, comment: ratingComment },
    });
    setShowRateDialog(false);
    refetch();
  };

  const statusSteps = [
    { key: "requested", label: "تم الطلب" },
    { key: "accepted", label: "تم القبول" },
    { key: "delivered", label: "تم الشحن" },
    { key: "completed", label: "مكتمل" },
  ];
  const currentStepIndex = statusSteps.findIndex(
    (step) => step.key === order.status,
  );

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />

      {/* ✨ Back Button */}
      <div className="container mx-auto px-4 py-3 max-w-7xl">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="text-[var(--textSecondary)] hover:text-[var(--primary)] font-cairo gap-2 p-0"
        >
          <ChevronLeft className="w-4 h-4" />
          العودة
        </Button>
      </div>

      <main className="flex-1 py-4 pb-24">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* ✨ Two-Column Elegant Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            {/* 🖼️ Product Image Section - Left Side (RTL) */}
            <div className="order-2 lg:order-1">
              <Card className="border-0 bg-transparent shadow-none overflow-visible">
                <CardContent className="p-0">
                  {/* Main Image with Elegant Frame */}
                  <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-[var(--surfaceMuted)] group">
                    <img
                      src={
                        order.product?.images?.[0]?.url ||
                        "/placeholder-dress.png"
                      }
                      alt={order.product?.title || "منتج"}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Elegant Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Status Badge on Image */}
                    <div className="absolute top-4 left-4">
                      <StatusBadge
                        status={order.status}
                        // className="shadow-lg"
                      />
                    </div>

                    {/* Price Tag */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl">
                        <div className="flex items-baseline justify-between">
                          <span className="text-2xl font-bold text-[var(--primary)] font-cairo">
                            {formatCurrency(order.total_price)}
                          </span>
                          {order.total_price &&
                            order.total_price > order.total_price && (
                              <span className="text-sm text-[var(--textTertiary)] line-through">
                              {formatCurrency(order.total_price)}
                              </span>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Image Thumbnails */}
                  {order.product?.images?.length > 1 && (
                    <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                      {order.product.images.slice(0, 4).map((img, idx) => (
                        <button
                          key={idx}
                          className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 ring-2 ring-transparent hover:ring-[var(--primary)] transition-all"
                        >
                          <img
                            src={img.url}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* 📋 Order Details Section - Right Side (RTL) */}
            <div className="order-1 lg:order-2 space-y-5">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-[var(--primary)] font-cairo tracking-tight">
                    تفاصيل الطلب
                  </h1>
                  <p className="text-sm text-[var(--textSecondary)] mt-1 font-cairo font-mono">
                    #{orderId.slice(-8).toUpperCase()}
                  </p>
                </div>
              </div>

              {/* Product Title & Info */}
              <Card className="border border-[var(--border)] bg-[var(--surface)]">
                <CardContent className="p-5">
                  <Link
                    href={`/products/${order.product_id}`}
                    className="font-semibold text-lg text-[var(--text)] hover:text-[var(--primary)] transition-colors font-cairo line-clamp-2"
                  >
                    {order.product?.title}
                  </Link>

                </CardContent>
              </Card>

              {/* Status Tracker - Horizontal */}
              <Card className="border border-[var(--border)] bg-[var(--surface)]">
                <CardContent className="p-5">
                  <p className="text-sm font-medium text-[var(--textSecondary)] mb-4 font-cairo">
                    حالة الطلب
                  </p>
                  <div className="flex items-center justify-between">
                    {statusSteps.map((step, index) => {
                      const isActive = index <= currentStepIndex;
                      return (
                        <div
                          key={step.key}
                          className="flex flex-col items-center flex-1"
                        >
                          <div
                            className={`
                            w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                            ${isActive
                                ? "bg-[var(--primary)] text-[var(--textInverse)] shadow-md"
                                : "bg-[var(--surfaceMuted)] text-[var(--textTertiary)]"
                              }
                          `}
                          >
                            {index + 1}
                          </div>
                          <span
                            className={`
                            text-xs mt-2 text-center font-cairo
                            ${isActive ? "text-[var(--primary)] font-medium" : "text-[var(--textTertiary)]"}
                          `}
                          >
                            {step.label}
                          </span>
                          {index < statusSteps.length - 1 && (
                            <div
                              className={`
                              absolute w-full h-0.5 top-4 transition-colors
                              ${index < currentStepIndex ? "bg-[var(--primary)]" : "bg-[var(--border)]"}
                            `}
                              style={{
                                width: "calc(100% - 2rem)",
                                marginRight: "1rem",
                              }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Order Info Grid */}
              <Card className="border border-[var(--border)] bg-[var(--surface)]">
                <CardContent className="p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--surfaceMuted)]/50">
                      <Calendar className="h-4 w-4 text-[var(--primary)] shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs text-[var(--textSecondary)] font-cairo">
                          تاريخ الطلب
                        </p>
                        <p className="text-sm font-medium text-[var(--text)] font-cairo truncate">
                          {formatDate(order.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--surfaceMuted)]/50">
                      {order.delivery_method === "meetup" ? (
                        <MapPin className="h-4 w-4 text-[var(--primary)] shrink-0" />
                      ) : (
                        <Truck className="h-4 w-4 text-[var(--primary)] shrink-0" />
                      )}
                      <div className="min-w-0">
                        <p className="text-xs text-[var(--textSecondary)] font-cairo">
                          التسليم
                        </p>
                        <p className="text-sm font-medium text-[var(--text)] font-cairo truncate">
                          {order.delivery_method === "meetup" ? "شخصي" : "شحن"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {order.delivery_address &&
                    order.delivery_method !== "meetup" && (
                      <div className="flex items-start gap-3 p-3 rounded-xl bg-[var(--surfaceMuted)]/50">
                        <MapPin className="h-4 w-4 text-[var(--primary)] shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <p className="text-xs text-[var(--textSecondary)] font-cairo">
                            العنوان
                          </p>
                          <p className="text-sm font-medium text-[var(--text)] font-cairo">
                            {order.delivery_address}
                          </p>
                        </div>
                      </div>
                    )}
                </CardContent>
              </Card>

              {/* Other Party Card */}
              <Card className="border border-[var(--border)] bg-[var(--surface)]">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 border-2 border-[var(--primary)]">
                        <AvatarImage
                          src={getAvatarUrl(
                            isBuyer
                              ? order.seller?.avatar_url
                              : order.buyer?.avatar_url,
                            isBuyer
                              ? order.seller?.full_name
                              : order.buyer?.full_name,
                          )}
                        />
                        <AvatarFallback className="bg-[var(--primary)] text-[var(--textInverse)] font-cairo">
                          {(isBuyer
                            ? order.seller?.full_name
                            : order.buyer?.full_name
                          )?.charAt(0) || "م"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm text-[var(--textSecondary)] font-cairo">
                          {isBuyer ? "البائعة" : "المشترية"}
                        </p>
                        <p className="font-medium text-[var(--text)] font-cairo">
                          {isBuyer
                            ? order.seller?.full_name
                            : order.buyer?.full_name}
                        </p>
                        <RatingStars
                          rating={
                            isBuyer
                              ? order.seller?.rating || 0
                              : order.buyer?.rating || 0
                          }
                          size="sm"
                        />
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors font-cairo"
                    >
                      <Link
                        href={`/chats?userId=${isBuyer ? order.seller_id : order.buyer_id}`}
                      >
                        <MessageCircle className="h-4 w-4 ml-1" />
                        محادثة
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Actions Card */}
              <Card className="border border-[var(--border)] bg-[var(--surface)] shadow-sm">
                <CardContent className="p-5 space-y-3">
                  {isSeller && order.status === "requested" && (
                    <div className="flex gap-2">
                      <Button
                        className="flex-1 bg-[var(--success)] hover:bg-[var(--successDark)] text-white font-cairo"
                        onClick={() => handleAction("accept")}
                        disabled={actions.acceptOrder.isPending}
                      >
                        <CheckCircle className="h-4 w-4 ml-1" /> قبول
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 text-[var(--error)] border-[var(--error)]/30 hover:bg-[var(--error)]/10 font-cairo"
                        onClick={() => handleAction("cancel")}
                        disabled={actions.cancelOrder.isPending}
                      >
                        <XCircle className="h-4 w-4 ml-1" /> رفض
                      </Button>
                    </div>
                  )}
                  {isSeller && order.status === "accepted" && (
                    <Button
                      className="w-full bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-[var(--textInverse)] font-cairo"
                      onClick={() => handleAction("deliver")}
                      disabled={actions.deliverOrder.isPending}
                    >
                      <Truck className="h-4 w-4 ml-1" /> تأكيد الشحن
                    </Button>
                  )}
                  {isBuyer && order.status === "requested" && (
                    <Button
                      variant="outline"
                      className="w-full text-[var(--error)] border-[var(--error)]/30 hover:bg-[var(--error)]/10 font-cairo"
                      onClick={() => handleAction("cancel")}
                      disabled={actions.cancelOrder.isPending}
                    >
                      <XCircle className="h-4 w-4 ml-1" /> إلغاء الطلب
                    </Button>
                  )}
                  {isBuyer && order.status === "delivered" && (
                    <Button
                      className="w-full bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-[var(--textInverse)] font-cairo"
                      onClick={() => handleAction("receive")}
                      disabled={actions.receiveOrder.isPending}
                    >
                      <CheckCircle className="h-4 w-4 ml-1" /> تأكيد الاستلام
                    </Button>
                  )}
                  {order.status === "completed" && !order.rating && (
                    <Button
                      variant="outline"
                      className="w-full border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--textInverse)] font-cairo"
                      onClick={() => setShowRateDialog(true)}
                    >
                      <Star className="h-4 w-4 ml-1 fill-current" /> تقييم
                    </Button>
                  )}
                  {!["completed", "cancelled", "disputed"].includes(
                    order.status,
                  ) && (
                      <Button
                        variant="ghost"
                        className="w-full text-[var(--error)] hover:bg-[var(--error)]/10 font-cairo"
                        onClick={() => setShowDisputeDialog(true)}
                      >
                        <AlertTriangle className="h-4 w-4 ml-1" /> فتح نزاع
                      </Button>
                    )}
                </CardContent>
              </Card>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[var(--success)]/10 border border-[var(--success)]/20">
                <ShieldCheck className="h-4 w-4 text-[var(--success)]" />
                <span className="text-xs text-[var(--textSecondary)] font-cairo">
                  محمية بضمان فساتيني
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Dialogs - Same as before but with refined styling */}
      <Dialog open={showDisputeDialog} onOpenChange={setShowDisputeDialog}>
        <DialogContent className="bg-[var(--surface)] border-[var(--border)] rounded-2xl">
          <DialogHeader className="text-center">
            <DialogTitle className="text-[var(--primary)] font-cairo">
              فتح نزاع
            </DialogTitle>
            <DialogDescription className="text-[var(--textSecondary)] font-cairo">
              يرجى توضيح سبب النزاع
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={disputeReason}
            onChange={(e) => setDisputeReason(e.target.value)}
            placeholder="اكتبي سبب النزاع..."
            rows={4}
            className="bg-[var(--surfaceMuted)] border-[var(--border)] font-cairo"
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDisputeDialog(false)}
              className="font-cairo"
            >
              إلغاء
            </Button>
            <Button
              variant="destructive"
              onClick={handleDispute}
              disabled={!disputeReason.trim()}
              className="font-cairo"
            >
              إرسال
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showRateDialog} onOpenChange={setShowRateDialog}>
        <DialogContent className="bg-[var(--surface)] border-[var(--border)] rounded-2xl">
          <DialogHeader className="text-center">
            <DialogTitle className="text-[var(--primary)] font-cairo">
              تقييم
            </DialogTitle>
            <DialogDescription className="text-[var(--textSecondary)] font-cairo">
              قومي بتقييم تجربتك
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-center">
              <RatingStars
                rating={rating}
                size="lg"
                interactive
                onChange={setRating}
              />
            </div>
            <Textarea
              value={ratingComment}
              onChange={(e) => setRatingComment(e.target.value)}
              placeholder="تعليقكِ (اختياري)..."
              rows={3}
              className="bg-[var(--surfaceMuted)] border-[var(--border)] font-cairo"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowRateDialog(false)}
              className="font-cairo"
            >
              لاحقاً
            </Button>
            <Button
              className="bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-[var(--textInverse)] font-cairo"
              onClick={handleRate}
            >
              إرسال ✨
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}