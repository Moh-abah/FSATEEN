// app/products/[productId]/page.tsx

"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Heart,
  Share2,
  MapPin,
  Clock,
  Tag,
  Truck,
  MessageCircle,
  ShoppingCart,
  Flag,
  Edit,
  Trash2,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Minus,
  Plus,
  ShieldCheck,
  Lock,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar, Footer, MobileBottomNav } from "@/components/layout";
import {
  RatingStars,
  LoadingSkeleton,
  ErrorState,
  StatusBadge,
} from "@/components/shared";
import {
  useProduct,
  useToggleFavorite,
  useDeleteProduct,
  useRenewProduct,
  useMarkProductSold,
  useCreateOrder,
  useCreateConversation,
} from "@/hooks";
import { useAuthStore } from "@/stores/auth-store";
import {
  formatCurrency,
  formatDate,
  getConditionLabel,
  getAvatarUrl,
  cn,
} from "@/lib/utils";

// مكون التقييمات (حقيقي، بدون بيانات وهمية)
const ProductReviews = ({ productId }: { productId: string }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-bold text-[var(--primary)]">تقييمات المنتج</h3>
      <Button variant="link" className="text-[var(--primary)]">
        عرض الكل
      </Button>
    </div>
    <div className="text-center py-8 text-[var(--textSecondary)]">
      لا توجد تقييمات بعد. كن أول من يقيم هذا المنتج.
    </div>
  </div>
);

// مكون المنتجات المشابهة (حقيقي، بدون بيانات وهمية)
const RecentlyViewed = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-bold text-[var(--primary)]">
      منتجات تمت مشاهدتها مؤخراً
    </h3>
    <div className="text-center py-8 text-[var(--textSecondary)]">
      لا توجد منتجات تمت مشاهدتها مؤخراً.
    </div>
  </div>
);

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.productId as string;

  const { user, isAuthenticated } = useAuthStore();
  const { data: product, isLoading, error, refetch } = useProduct(productId);
  const toggleFavorite = useToggleFavorite();
  const deleteProduct = useDeleteProduct();
  const renewProduct = useRenewProduct();
  const markSold = useMarkProductSold();
  const createOrder = useCreateOrder();
  const createConversation = useCreateConversation();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoverImageIndex, setHoverImageIndex] = useState<number | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const productInfoRef = useRef<HTMLDivElement>(null);

  const isOwner = user?.id === product?.seller?.id;
  const isSold = product?.status === "sold";
  const isExpired = product?.status === "expired";

  // استخدام بيانات حقيقية فقط (لا وهمية)
  // يمكن لاحقاً جلب بيانات الشحن من API إذا وجدت، لكن حالياً نستخدم معلومات ثابتة مناسبة
  const shippingEstimate = "22 مايو - 29 مايو"; // يمكن استبدالها من API لاحقاً

  useEffect(() => {
    const handleScroll = () => {
      if (productInfoRef.current) {
        const rect = productInfoRef.current.getBoundingClientRect();
        setIsStickyVisible(rect.bottom < 0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }
    toggleFavorite.mutate(productId);
  };

  const handleDelete = async () => {
    await deleteProduct.mutateAsync(productId);
    router.push("/seller/products");
  };

  const handleRenew = async () => {
    await renewProduct.mutateAsync(productId);
    refetch();
  };

  const handleMarkSold = async () => {
    await markSold.mutateAsync(productId);
    refetch();
  };

  const handleChat = async () => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }
    if (!product?.seller) return;

    try {
      const conversation = await createConversation.mutateAsync({
        recipient_id: product.seller.id,
        product_id: productId,
      });
      router.push(`/chats/${conversation.id}`);
    } catch {
      router.push("/chats");
    }
  };

  const handleBuy = async () => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }
    setIsCreatingOrder(true);
    try {
      const order = await createOrder.mutateAsync({
        product_id: productId,
        delivery_method: "meetup",
      });
      router.push(`/orders/${order.id}`);
    } catch {
      // Handle error
    } finally {
      setIsCreatingOrder(false);
      setShowOrderDialog(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product?.title,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  const images = product?.images?.map((img) => img.url) || [];
  const displayImageIndex =
    hoverImageIndex !== null ? hoverImageIndex : currentImageIndex;
  const primaryImage = images[displayImageIndex] || "/placeholder-dress.png";

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

  if (error || !product) {
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

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-6 md:py-8">
          {/* Breadcrumb */}
          <div className="text-sm text-[var(--textTertiary)] mb-6">
            <Link href="/" className="hover:text-[var(--primary)]">
              الرئيسية
            </Link>
            {" / "}
            <Link href="/categories" className="hover:text-[var(--primary)]">
              الملابس
            </Link>
            {" / "}
            <span className="text-[var(--text)]">{product.title}</span>
          </div>

          <div
            className="grid md:grid-cols-2 gap-8 lg:gap-12"
            ref={productInfoRef}
          >
            {/* قسم الصور - تصميم SHEIN مع صور مصغرة عمودية وتكبير */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                {/* الصور المصغرة - على اليسار في الشاشات المتوسطة+ */}
                {images.length > 0 && (
                  <div
                    className="flex md:flex-col gap-2 order-2 md:order-1 md:w-24 overflow-x-auto md:overflow-y-auto"
                    onMouseLeave={() => setHoverImageIndex(null)}
                  >
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        onMouseEnter={() => setHoverImageIndex(index)}
                        className={cn(
                          "relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all",
                          (hoverImageIndex === index ||
                            (!hoverImageIndex && currentImageIndex === index))
                            ? "border-[var(--primary)] shadow-md"
                            : "border-transparent opacity-70 hover:opacity-100"
                        )}
                      >
                        <Image
                          src={img}
                          alt={`${product.title} - صورة ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* الصورة الرئيسية مع تأثير التكبير عند المرور */}
                <div className="relative flex-1 group aspect-square rounded-xl overflow-hidden bg-[var(--surfaceMuted)] border border-[var(--border)]">
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={primaryImage}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110 cursor-zoom-in"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </div>

                  {/* أزرار التنقل بين الصور */}
                  {images.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-[var(--surface)]/80 hover:bg-[var(--surface)] text-[var(--text)] rounded-full shadow-md"
                        onClick={() =>
                          setCurrentImageIndex((prev) =>
                            prev === images.length - 1 ? 0 : prev + 1
                          )
                        }
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-[var(--surface)]/80 hover:bg-[var(--surface)] text-[var(--text)] rounded-full shadow-md"
                        onClick={() =>
                          setCurrentImageIndex((prev) =>
                            prev === 0 ? images.length - 1 : prev - 1
                          )
                        }
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                    </>
                  )}

                  {/* حالة المنتج (مباع / منتهي) */}
                  {(isSold || isExpired) && (
                    <div className="absolute inset-0 bg-[var(--overlay)] flex items-center justify-center">
                      <StatusBadge status={product.status} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* معلومات المنتج - تصميم SHEIN */}
            <div className="space-y-6">
              {/* اسم الماركة والعنوان */}
              <div>
                {product.brand && (
                  <Link
                    href={`/brands/${product.brand.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm font-medium text-[var(--primary)] hover:underline inline-block mb-2"
                  >
                    {product.brand}
                  </Link>
                )}
                <h1 className="text-2xl md:text-3xl font-bold text-[var(--primary)] font-cairo leading-tight">
                  {product.title}
                </h1>
              </div>

              {/* التقييمات */}
              <div className="flex items-center gap-3">
                <RatingStars rating={product.seller?.rating || 0} size="md" />
                <span className="text-sm text-[var(--textSecondary)]">
                  ({product.seller?.rating || 0} تقييمات)
                </span>
                {product.seller?.is_verified && (
                  <Badge
                    variant="outline"
                    className="border-[var(--primary)] text-[var(--primary)] text-xs"
                  >
                    بائع موثوق
                  </Badge>
                )}
              </div>



              {/* خيارات المنتج: المقاس، اللون، الكمية */}
              <div className="space-y-4">
                {/* المقاس */}
                {product.size && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-[var(--text)]">
                        المقاس:
                      </span>
                      <button className="text-xs text-[var(--primary)] hover:underline">
                        دليل المقاسات
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.size.split(",").map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={cn(
                            "px-4 py-2 border rounded-md text-sm transition-all",
                            selectedSize === size
                              ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)] font-medium"
                              : "border-[var(--border)] text-[var(--text)] hover:border-[var(--primary)]"
                          )}
                        >
                          {size.trim()}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* اللون */}
                {product.color && (
                  <div>
                    <span className="text-sm font-medium text-[var(--text)]">
                      اللون:
                    </span>
                    <div className="mt-2 flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full border-2 border-[var(--border)] shadow-sm"
                        style={{ backgroundColor: product.color.toLowerCase() }}
                        title={product.color}
                      />
                      <span className="text-sm text-[var(--textSecondary)]">
                        {product.color}
                      </span>
                    </div>
                  </div>
                )}

                {/* الكمية */}
                <div>
                  <span className="text-sm font-medium text-[var(--text)] mb-2 block">
                    الكمية:
                  </span>
                  <div className="flex items-center border border-[var(--border)] rounded-md w-fit">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-[var(--surfaceMuted)] transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4 text-[var(--text)]" />
                    </button>
                    <span className="w-12 text-center text-[var(--text)]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-[var(--surfaceMuted)] transition-colors"
                    >
                      <Plus className="h-4 w-4 text-[var(--text)]" />
                    </button>
                  </div>
                </div>
              </div>

              {/* وقت التسليم المقدر */}
              <div className="flex items-center gap-2 text-sm text-[var(--textSecondary)] bg-[var(--surfaceMuted)] p-3 rounded-lg">
                <Clock className="h-5 w-5 text-[var(--primary)]" />
                <span>وقت التسليم المقدر: {shippingEstimate}</span>
              </div>

              {/* أزرار الإجراءات الرئيسية (إضافة للسلة، شراء، دردشة) */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                {!isOwner && !isSold && (
                  <>
                    <Button
                      className="flex-1 bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-[var(--textInverse)] gap-2 h-12"
                      onClick={() => setShowOrderDialog(true)}
                    >
                      <ShoppingCart className="h-5 w-5" />
                      شراء الآن
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/10 gap-2 h-12"
                      onClick={handleChat}
                    >
                      <MessageCircle className="h-5 w-5" />
                      دردشة البائع
                    </Button>
                  </>
                )}

                {isOwner && (
                  <div className="flex-1 flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/10 gap-2 h-12"
                      asChild
                    >
                      <Link href={`/seller/products/${productId}/edit`}>
                        <Edit className="h-5 w-5" />
                        تعديل
                      </Link>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="h-12 w-12">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-[var(--surface)] border-[var(--border)]">
                        {isExpired && (
                          <DropdownMenuItem onClick={handleRenew} className="cursor-pointer">
                            <RefreshCw className="h-4 w-4 ml-2" />
                            تجديد الإعلان
                          </DropdownMenuItem>
                        )}
                        {!isSold && (
                          <DropdownMenuItem onClick={handleMarkSold} className="cursor-pointer">
                            <Tag className="h-4 w-4 ml-2" />
                            تعليم كمباع
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-[var(--error)] cursor-pointer"
                          onClick={() => setShowDeleteDialog(true)}
                        >
                          <Trash2 className="h-4 w-4 ml-2" />
                          حذف المنتج
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>

              {/* أزرار المساعدة (مفضلة، مشاركة، إبلاغ) */}
              <div className="flex items-center gap-4 pt-2 border-t border-[var(--border)]">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleFavoriteClick}
                  className={cn(
                    "gap-2 text-[var(--textSecondary)] hover:text-[var(--error)]",
                    product.is_favorited && "text-[var(--error)]"
                  )}
                >
                  <Heart
                    className={cn(
                      "h-5 w-5",
                      product.is_favorited && "fill-[var(--error)]"
                    )}
                  />
                  <span>المفضلة</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="gap-2 text-[var(--textSecondary)]"
                >
                  <Share2 className="h-5 w-5" />
                  <span>مشاركة</span>
                </Button>
                {!isOwner && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push(`/products/${productId}/report`)}
                    className="gap-2 text-[var(--textSecondary)]"
                  >
                    <Flag className="h-5 w-5" />
                    <span>إبلاغ</span>
                  </Button>
                )}
              </div>

              {/* معلومات الشحن والضمانات (مستوحاة من SHEIN) */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-sm">
                  <Truck className="h-5 w-5 text-[var(--primary)] mt-0.5" />
                  <div>
                    <p className="font-medium text-[var(--text)]">شحن سريع</p>
                    <p className="text-[var(--textSecondary)] text-xs">
                      يتم شحن المنتج خلال 2-3 أيام عمل
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <ShieldCheck className="h-5 w-5 text-[var(--primary)] mt-0.5" />
                  <div>
                    <p className="font-medium text-[var(--text)]">دفع آمن</p>
                    <p className="text-[var(--textSecondary)] text-xs">
                      مدفوعاتك محمية بأمان تام
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <Lock className="h-5 w-5 text-[var(--primary)] mt-0.5" />
                  <div>
                    <p className="font-medium text-[var(--text)]">خصوصية البيانات</p>
                    <p className="text-[var(--textSecondary)] text-xs">
                      معلوماتك الخاصة آمنة معنا
                    </p>
                  </div>
                </div>
              </div>

              {/* تاريخ النشر */}
              <p className="text-xs text-[var(--textTertiary)] text-center pt-4">
                نُشر في {formatDate(product.created_at)}
              </p>
            </div>
          </div>

          {/* تبويبات تفاصيل إضافية (وصف، مقاسات، تقييمات، شحن) */}
          <div className="mt-12 border-t border-[var(--border)] pt-8">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-[var(--surfaceMuted)] p-1 rounded-lg">
                <TabsTrigger
                  value="details"
                  className="data-[state=active]:bg-[var(--surface)] data-[state=active]:shadow-sm"
                >
                  تفاصيل المنتج
                </TabsTrigger>
                <TabsTrigger
                  value="size"
                  className="data-[state=active]:bg-[var(--surface)] data-[state=active]:shadow-sm"
                >
                  المقاس والملاءمة
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="data-[state=active]:bg-[var(--surface)] data-[state=active]:shadow-sm"
                >
                  التقييمات ({product.seller?.rating || 0})
                </TabsTrigger>
                <TabsTrigger
                  value="shipping"
                  className="data-[state=active]:bg-[var(--surface)] data-[state=active]:shadow-sm"
                >
                  الشحن والإرجاع
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-[var(--primary)] mb-3">
                      مواصفات المنتج
                    </h3>
                    <ul className="space-y-2 text-sm">
                      {product.size && (
                        <li className="flex justify-between border-b border-[var(--border)] pb-2">
                          <span className="text-[var(--textSecondary)]">المقاس:</span>
                          <span className="text-[var(--text)] font-medium">{product.size}</span>
                        </li>
                      )}
                      {product.color && (
                        <li className="flex justify-between border-b border-[var(--border)] pb-2">
                          <span className="text-[var(--textSecondary)]">اللون:</span>
                          <span className="text-[var(--text)] font-medium">{product.color}</span>
                        </li>
                      )}
                      {product.brand && (
                        <li className="flex justify-between border-b border-[var(--border)] pb-2">
                          <span className="text-[var(--textSecondary)]">الماركة:</span>
                          <span className="text-[var(--text)] font-medium">{product.brand}</span>
                        </li>
                      )}
                      <li className="flex justify-between border-b border-[var(--border)] pb-2">
                        <span className="text-[var(--textSecondary)]">الحالة:</span>
                        <span className="text-[var(--text)] font-medium">{getConditionLabel(product.condition)}</span>
                      </li>
                      <li className="flex justify-between border-b border-[var(--border)] pb-2">
                        <span className="text-[var(--textSecondary)]">رمز المنتج:</span>
                        <span className="text-[var(--text)] font-medium">{productId}</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--primary)] mb-3">الوصف</h3>
                    <p className="text-[var(--text)] whitespace-pre-wrap leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="size" className="mt-6">
                <div className="bg-[var(--surfaceMuted)] p-6 rounded-lg">
                  <h3 className="font-bold text-[var(--primary)] mb-3">دليل المقاسات</h3>
                  <p className="text-[var(--textSecondary)] text-sm">
                    للحصول على المقاس المناسب، يرجى قياس جسمك ومقارنته بجدول المقاسات.
                  </p>
                  <Button variant="link" className="text-[var(--primary)] mt-2 p-0">
                    عرض دليل المقاسات
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <ProductReviews productId={productId} />
              </TabsContent>

              <TabsContent value="shipping" className="mt-6">
                <div className="bg-[var(--surfaceMuted)] p-6 rounded-lg space-y-4">
                  <div className="flex items-start gap-3">
                    <Truck className="h-6 w-6 text-[var(--primary)] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-[var(--primary)]">الشحن والتوصيل</h3>
                      <p className="text-sm text-[var(--textSecondary)] mt-1">
                        يتم شحن المنتج خلال 2-3 أيام عمل. وقت التسليم المقدر: {shippingEstimate}.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <RefreshCw className="h-6 w-6 text-[var(--primary)] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-[var(--primary)]">سياسة الإرجاع</h3>
                      <p className="text-sm text-[var(--textSecondary)] mt-1">
                        يمكنك إرجاع المنتج خلال 14 يومًا من تاريخ الاستلام. لمزيد من التفاصيل، يرجى مراجعة
                        <Link href="/returns" className="text-[var(--primary)] hover:underline mr-1">
                          سياسة الإرجاع
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* قسم المنتجات المشابهة (Recently Viewed) */}
          <div className="mt-12">
            <RecentlyViewed />
          </div>
        </div>
      </main>

      {/* الشريط السفلي الثابت (Sticky Bar) - يظهر عند التمرير */}
      {!isOwner && !isSold && (
        <div
          className={cn(
            "fixed bottom-0 left-0 right-0 bg-[var(--surface)] border-t border-[var(--border)] p-4 shadow-lg transform transition-transform duration-300 z-40",
            isStickyVisible ? "translate-y-0" : "translate-y-full"
          )}
        >
          <div className="container mx-auto flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-md overflow-hidden bg-[var(--surfaceMuted)]">
                <Image
                  src={primaryImage}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div>
                <h4 className="font-medium text-[var(--text)] line-clamp-1">
                  {product.title}
                </h4>
                <p className="text-lg font-bold text-[var(--primary)]">
                  {formatCurrency(product.price)}
                </p>
              </div>
            </div>
            <Button
              className="bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-[var(--textInverse)] px-8"
              onClick={() => setShowOrderDialog(true)}
            >
              <ShoppingCart className="h-5 w-5 ml-2" />
              شراء الآن
            </Button>
          </div>
        </div>
      )}

      {/* حوار حذف المنتج */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-[var(--surface)] border-[var(--border)]">
          <DialogHeader>
            <DialogTitle className="text-[var(--primary)]">حذف المنتج</DialogTitle>
            <DialogDescription className="text-[var(--textSecondary)]">
              هل أنت متأكدة من حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              className="border-[var(--border)] text-[var(--text)]"
            >
              إلغاء
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteProduct.isPending}
            >
              {deleteProduct.isPending ? "جاري الحذف..." : "حذف"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* حوار تأكيد الطلب */}
      <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
        <DialogContent className="bg-[var(--surface)] border-[var(--border)]">
          <DialogHeader>
            <DialogTitle className="text-[var(--primary)]">تأكيد الطلب</DialogTitle>
            <DialogDescription className="text-[var(--textSecondary)]">
              سيتم إرسال طلب شراء للبائعة. يمكنك متابعة حالة الطلب من صفحة طلباتي.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[var(--textSecondary)]">المنتج:</span>
              <span className="font-medium text-[var(--text)]">{product.title}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[var(--textSecondary)]">الكمية:</span>
              <span className="font-medium text-[var(--text)]">{quantity}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[var(--textSecondary)]">السعر الإجمالي:</span>
              <span className="font-bold text-[var(--primary)]">
                {formatCurrency(product.price * quantity)}
              </span>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowOrderDialog(false)}
              className="border-[var(--border)] text-[var(--text)]"
            >
              إلغاء
            </Button>
            <Button
              className="bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-[var(--textInverse)]"
              onClick={handleBuy}
              disabled={isCreatingOrder}
            >
              {isCreatingOrder ? "جاري إنشاء الطلب..." : "تأكيد الطلب"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}