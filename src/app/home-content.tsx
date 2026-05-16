// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useState } from 'react';
// import {
//   Search,
//   Shield,
//   Truck,
//   Star,
//   ChevronLeft,
//   Sparkles,
//   TrendingUp,
//   Clock,
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Input } from '@/components/ui/input';
// import { Navbar, Footer, MobileBottomNav } from '@/components/layout';
// import { ProductCard, AuctionCard } from '@/components/cards';
// import { LoadingSkeleton, EmptyState } from '@/components/shared';
// import { useProducts, useAuctions, useCategories } from '@/hooks';

// // Trust badges data
// const TRUST_BADGES = [
//   {
//     icon: Shield,
//     title: 'دفع آمن',
//     description: 'معاملات محمية ومشفرة',
//   },
//   {
//     icon: Star,
//     title: 'بائعات موثوقات',
//     description: 'نظام توثيق وتقييم متكامل',
//   },
//   {
//     icon: Truck,
//     title: 'توصيل سريع',
//     description: 'توصيل لجميع مناطق المملكة',
//   },
// ];

// export function HomeContent() {
//   const [searchQuery, setSearchQuery] = useState('');

//   // Fetch data
//   const { data: productsData, isLoading: productsLoading } = useProducts({
//     page: 1,
//     page_size: 8,
//     sort_by: 'published_at',
//     sort_order: 'desc',
//   });

//   const { data: auctionsData, isLoading: auctionsLoading } = useAuctions(1, 4);

//   const { data: categoriesData } = useCategories();

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-[var(--background)]">
//       <Navbar />

//       <main className="flex-1">
//         {/* Hero Section */}
//         {/* Hero Section - Professional Design */}
//         <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden text-[var(--textInverse)]">
//           {/* Animated Gradient Background */}
//           <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] via-[var(--primaryDark)] to-[var(--primaryLight)] animate-gradient-slow" />

//           {/* Animated Orbs */}
//           <div className="absolute inset-0 overflow-hidden">
//             <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/20 rounded-full blur-3xl animate-pulse-slow" />
//             <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[var(--primaryLight)]/50 rounded-full blur-3xl animate-pulse-slow delay-1000" />
//             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--primaryDark)]/40 rounded-full blur-3xl animate-pulse-slow delay-700" />
//           </div>



//           <div className="container mx-auto px-4 relative z-10">
//             <div className="max-w-4xl mx-auto text-center">
//               {/* Badge */}
//               <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-white/30 shadow-sm animate-fade-up">
//                 <Sparkles className="h-4 w-4 text-yellow-300" />
//                 <span className="text-sm font-medium">تشكيلة مميزة بأسعار لا تُقاوم</span>
//               </div>

//               {/* Main Heading */}
//               <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-cairo mb-6 leading-tight animate-fade-up animation-delay-100">
//                 أناقة الفساتين
//                 <span className="block text-gradient-gold mt-2">بين يديكِ</span>
//               </h1>

//               {/* Description */}
//               <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto animate-fade-up animation-delay-200">
//                 اكتشفي تشكيلة رائعة من الفساتين الجديدة والمستعملة، بأسعار تناسب الجميع.
//                 تسوقي بأمان واستمتعي بتجربة فريدة.
//               </p>

//               {/* Search Bar - Enhanced */}
//               <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-8 animate-fade-up animation-delay-300">
//                 <div className="relative group">
//                   <Input
//                     type="search"
//                     placeholder="ابحثي عن فستان أحلامك..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="w-full h-14 pr-12 pl-28 text-lg bg-white/95 backdrop-blur-sm border-0 text-[var(--text)] placeholder:text-[var(--textTertiary)] rounded-full shadow-xl focus:ring-2 focus:ring-[var(--primary)] transition-all"
//                   />
//                   <Button
//                     type="submit"
//                     size="default"
//                     className="absolute left-2 top-1/2 -translate-y-1/2 h-10 px-6 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--primaryDark)] hover:shadow-lg text-white font-medium transition-all"
//                   >
//                     <Search className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </form>

//               {/* CTA Buttons */}
//               <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-up animation-delay-400">
//                 <Button
//                   size="lg"
//                   className="bg-white text-[var(--primaryDark)] hover:bg-white/90 shadow-lg px-8 font-bold rounded-tr-2xl rounded-bl-2xl"
//                   asChild
//                 >
//                   <Link href="/products">
//                     تسوقي الآن
//                     <ChevronLeft className="h-4 w-4 mr-2" />
//                   </Link>
//                 </Button>
//                 <Button
//                   size="lg"
//                   variant="outline"
//                   className="border-white/40 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-tr-2xl rounded-bl-2xl"
//                   asChild
//                 >
//                   <Link href="/auctions">
//                     <TrendingUp className="h-4 w-4 ml-2" />
//                     استكشفي المزادات
//                   </Link>
//                 </Button>
//               </div>


//             </div>
//           </div>

//           {/* Scroll Indicator */}
//           <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
//             <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
//               <div className="w-1 h-2 bg-white/70 rounded-full mt-2 animate-scroll" />
//             </div>
//           </div>
//         </section>
//         {/* Categories Section */}
//         {categoriesData && categoriesData.length > 0 && (
//           <section className="py-12 bg-[var(--surface)]">
//             <div className="container mx-auto px-4">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-2xl font-bold text-[var(--text)] font-cairo">
//                   تصنيفات الفساتين
//                 </h2>
//                 <Button variant="link" asChild className="text-[var(--primary)]">
//                   <Link href="/products" className="flex items-center">
//                     عرض الكل
//                     <ChevronLeft className="h-4 w-4 mr-1" />
//                   </Link>
//                 </Button>
//               </div>

//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
//                 {categoriesData.slice(0, 6).map((category) => (
//                   <Link
//                     key={category.id}
//                     href={`/products?category=${category.slug}`}
//                     className="group"
//                   >
//                     <Card className="overflow-hidden border border-[var(--border)] hover:border-[var(--primary)] transition-all duration-300 hover:shadow-md text-center">
//                       <CardContent className="p-4">
//                         <div
//                           className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
//                           style={{ backgroundImage: 'var(--gradient-warm)' }}
//                         >
//                           <span className="text-2xl">
//                             {category.icon || '👗'}
//                           </span>
//                         </div>
//                         <span className="text-sm font-medium text-[var(--text)]">
//                           {category.name}
//                         </span>
//                       </CardContent>
//                     </Card>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </section>
//         )}

//         {/* Latest Products Section */}
//         <section className="py-12 bg-[var(--surfaceMuted)]">
          
//                     <div className="container mx-auto px-4">
//             <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-2xl font-bold text-[var(--primary)] font-cairo">
//                 أحدث الفساتين
//               </h2>
//               <Button variant="link" asChild className="text-[var(--primary)]">
//                 <Link href="/products" className="flex items-center">
//                   عرض الكل
//                   <ChevronLeft className="h-4 w-4 mr-1" />
//                 </Link>
//               </Button>
//             </div>

//             {productsLoading ? (
//               <LoadingSkeleton type="card" count={8} />
//             ) : productsData?.items && productsData.items.length > 0 ? (
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                
//                 {productsData.items.map((product) => (
//                   <ProductCard key={product.id} product={product} />
//                 ))}
//               </div>
//             ) : (
//               <EmptyState
//                 title="لا توجد فساتين حالياً"
//                 description="كوني أول من يضيف فستان للبيع"
//                 actionLabel="أضيفي فستان"
//                 actionHref="/seller/products/new"
//               />
//             )}
//           </div>
//         </section>

//         {/* Active Auctions Section */}
//         <section className="py-12 bg-[var(--surface)]">
//           <div className="container mx-auto px-4">
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center gap-2">
//                 <TrendingUp className="h-6 w-6 text-[var(--primary)]" />
//                 <h2 className="text-2xl font-bold text-[var(--text)] font-cairo">
//                                     المزادات النشطة
//                 </h2>
//               </div>
//               <Button variant="link" asChild className="text-[var(--primary)]">
//                 <Link href="/auctions" className="flex items-center">
//                   عرض الكل
//                   <ChevronLeft className="h-4 w-4 mr-1" />
//                 </Link>
//               </Button>
//             </div>

//             {auctionsLoading ? (
//               <LoadingSkeleton type="card" count={4} />
//             ) : auctionsData?.items && auctionsData.items.length > 0 ? (
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                 {auctionsData.items.map((auction) => (
//                   <AuctionCard key={auction.id} auction={auction} />
//                 ))}
//               </div>
//             ) : (
//               <EmptyState
//                 icon={Clock}
//                 title="لا توجد مزادات نشطة"
//                 description="تابعينا للحصول على تحديثات المزادات القادمة"
//               />
//             )}
//           </div>
//         </section>

//         {/* Trust Badges Section */}
//         <section
//           className="py-12"
//           style={{
//             backgroundImage: `linear-gradient(to bottom, var(--surfaceMuted), var(--background))`,
//           }}
//         >
//           <div className="container mx-auto px-4">
//             <h2 className="text-2xl font-bold text-[var(--text)] font-cairo text-center mb-8">

//               لماذا تثقين بفساتين؟
//             </h2>

//             <div className="grid md:grid-cols-3 gap-6">
//               {TRUST_BADGES.map((badge, index) => (
//                 <Card
//                   key={index}
//                   className="border border-[var(--border)] hover:border-[var(--primary)] transition-colors text-center"
//                 >
//                   <CardContent className="p-6">
//                     <div
//                       className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
//                       style={{ backgroundImage: 'var(--gradient-rose)' }}
//                     >
//                       <badge.icon className="h-8 w-8 text-white" />
//                     </div>
//                     <h3 className="text-lg font-bold text-[var(--text)] mb-2">

//                       {badge.title}
//                     </h3>
//                     <p className="text-sm text-[var(--textSecondary)]">
//                       {badge.description}
//                     </p>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="py-16 bg-[var(--primaryDark)] text-[var(--textInverse)]">
//           <div className="container mx-auto px-4 text-center">
//             <h2 className="text-2xl md:text-3xl font-bold font-cairo mb-4">
//               هل لديك فساتين تريدين بيعها؟
//             </h2>
//             <p className="text-[var(--textInverse)]/80 mb-6 max-w-xl mx-auto">
//               انضمي إلى مجتمع فساتين وابدأي ببيع فساتينك المستعملة أو الجديدة بسهولة وأمان
//             </p>
//             <Button
//               size="lg"
//               className="bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-white px-8"
//               asChild
//             >
//               <Link href="/seller/products/new">
//                 ابدأي البيع الآن
//               </Link>
//             </Button>
//           </div>
//         </section>
//       </main>

//       <Footer />
//       <MobileBottomNav />
//     </div>
//   );
// }







// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Shield,
  Truck,
  Star,
  ChevronLeft,
  Sparkles,
  TrendingUp,
  Clock,
  Heart,
  ArrowRight,
  Play,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Navbar, Footer, MobileBottomNav } from "@/components/layout";
import { ProductCard, AuctionCard } from "@/components/cards";
import { LoadingSkeleton, EmptyState } from "@/components/shared";
import { useProducts, useAuctions, useCategories } from "@/hooks";
import { Auction } from "@/types";


// ✨ Featured categories with icons
const FEATURED_CATEGORIES = [
  { name: "سهرة", icon: "✨", slug: "evening", color: "var(--primary)" },
  { name: "زفاف", icon: "👰", slug: "wedding", color: "var(--warm500)" },
  { name: "كاجوال", icon: "🌸", slug: "casual", color: "var(--success)" },
  { name: "عمل", icon: "💼", slug: "work", color: "var(--info)" },
  { name: "صيفي", icon: "☀️", slug: "summer", color: "var(--warning)" },
  { name: "شتوي", icon: "❄️", slug: "winter", color: "var(--primaryDark)" },
];



// ✨ Premium Hero Section Component
function PremiumHero({
  searchQuery,
  onSearch,
}: {
  searchQuery: string;
  onSearch: (query: string) => void;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
      {/* ✨ Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] via-[var(--primaryDark)] to-[var(--primary-900)] animate-gradient-slow" />

      {/* ✨ Floating Orbs - Premium Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[var(--primary-light)]/20 rounded-full blur-3xl animate-float-slow delay-1000" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[var(--warm500)]/10 rounded-full blur-2xl animate-pulse-slow" />

        {/* ✨ Sparkle Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full animate-sparkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* ✨ Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* ✨ Premium Badge */}
          <div
            className={`
            inline-flex items-center gap-2.5 px-5 py-2.5 
            bg-white/15 backdrop-blur-md rounded-full 
            border border-white/25 shadow-lg
            transition-all duration-700
            ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
          >
            <Sparkles className="h-4.5 w-4.5 text-yellow-300 animate-pulse" />
            <span className="text-sm font-medium text-white/95 font-cairo">
              تشكيلة حصرية بأسعار استثنائية ✨
            </span>
          </div>

          {/* ✨ Main Heading - Cinematic */}
          <h1
            className={`
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-cairo 
            text-white mb-6 leading-tight tracking-tight
            transition-all duration-700 delay-100
            ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
          >
            أناقة الفساتين
            <span className="block mt-3">
              <span className="bg-gradient-to-r from-white via-[var(--primary-light)] to-white bg-clip-text text-transparent">
                بين يديكِ
              </span>
            </span>
          </h1>

          {/* ✨ Description */}
          <p
            className={`
            text-lg sm:text-xl text-white/85 mb-10 max-w-2xl mx-auto 
            font-cairo leading-relaxed
            transition-all duration-700 delay-200
            ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
          >
            اكتشفي تشكيلة فاخرة من الفساتين الجديدة والمستعملة بعناية. تسوقي
            بأمان، واطلبي بثقة، واستمتعي بتجربة تسوق لا تُضاهى.
          </p>

          {/* ✨ Premium Search Bar - FIXED & PERFECTLY ALIGNED */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSearch(searchQuery);
            }}
            className={`
    relative max-w-2xl mx-auto mb-10
    transition-all duration-700 delay-300
    ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
  `}
          >
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--primary)] via-[var(--primary-light)] to-[var(--primary)] rounded-full opacity-30 blur-lg group-hover:opacity-50 transition-opacity duration-300 pointer-events-none" />

              <div className="relative flex items-center">
                {/* Search Input - With proper padding for filters */}
                <Input
                  type="search"
                  placeholder="ابحثي عن فستان أحلامكِ..."
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                  className="
          w-full h-14 sm:h-16 
          pr-4 pl-36 sm:pl-44  /* ✨ مساحة كافية للأزرار + زر البحث */
          text-base sm:text-lg 
          bg-white/95 backdrop-blur-md border-0 
          text-[var(--text)] placeholder:text-[var(--textTertiary)] 
          rounded-full shadow-2xl 
          focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 
          transition-all duration-300 font-cairo
          hover:shadow-[var(--primary)]/20
        "
                />

                {/* ✨ Quick Filter Buttons - Perfectly Positioned */}
                <div className="absolute left-16 sm:left-24 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                  {["جديد", "مستعمل", "سهرة"].map((filter, index) => (
                    <button
                      key={filter}
                      type="button"
                      className="
              px-2.5 py-1 text-[10px] sm:text-xs rounded-full 
              bg-[var(--surface)]/90 backdrop-blur-sm 
              text-[var(--textSecondary)] font-cairo font-medium
              border border-[var(--border)]
              hover:bg-[var(--primary)] hover:text-[var(--textInverse)] hover:border-[var(--primary)]
              active:scale-95
              transition-all duration-200
              whitespace-nowrap
            "
                      onClick={() => {
                        // Optional: Add filter logic here
                        console.log(`Filter selected: ${filter}`);
                      }}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                {/* Search Button - Fixed Position */}
                <Button
                  type="submit"
                  size="default"
                  className="
          absolute left-2 top-1/2 -translate-y-1/2 
          h-10 sm:h-12 px-5 sm:px-7 rounded-full 
          bg-gradient-to-r from-[var(--primary)] to-[var(--primaryDark)] 
          hover:from-[var(--primaryDark)] hover:to-[var(--primary-800)]
          shadow-lg hover:shadow-xl 
          text-[var(--textInverse)] font-medium font-cairo
          transition-all duration-300
          hover:scale-105 active:scale-95
          z-10
        "
                >
                  <Search className="h-4.5 w-4.5" />
                </Button>
              </div>
            </div>

            {/* ✨ Mobile: Filter Chips Below Search */}
            <div className="flex sm:hidden items-center justify-center gap-2 mt-3">
              {["جديد", "مستعمل", "سهرة", "كاجوال"].map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className="
          px-3 py-1.5 text-xs rounded-full 
          bg-[var(--surface)] border border-[var(--border)]
          text-[var(--textSecondary)] font-cairo
          hover:bg-[var(--primary)] hover:text-[var(--textInverse)] hover:border-[var(--primary)]
          transition-all duration-200
        "
                >
                  {filter}
                </button>
              ))}
            </div>
          </form>

          {/* ✨ CTA Buttons */}
          <div
            className={`
            flex flex-wrap justify-center gap-4 mb-16
            transition-all duration-700 delay-400
            ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
          >
            <Button
              size="lg"
              className="
                bg-white text-[var(--primaryDark)] 
                hover:bg-white/95 shadow-xl shadow-[var(--primary)]/25 
                px-8 py-6 font-bold font-cairo rounded-2xl
                transition-all duration-300
                hover:scale-105 hover:shadow-2xl
                group
              "
              asChild
            >
              <Link href="/products" className="flex items-center gap-2">
                تسوقي الآن
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="
                border-white/30 bg-white/10 backdrop-blur-md 
                hover:bg-white/20 text-white 
                px-8 py-6 font-cairo rounded-2xl
                transition-all duration-300
                hover:scale-105 hover:border-white/50
                group
              "
              asChild
            >
              <Link href="/auctions" className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 transition-transform group-hover:scale-110" />
                استكشفي المزادات
              </Link>
            </Button>
          </div>

          {/* ✨ Trust Indicators */}
          <div
            className={`
            flex flex-wrap justify-center items-center gap-6 text-white/70 text-sm font-cairo
            transition-all duration-700 delay-500
            ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
          >

          </div>
        </div>
      </div>

      {/* ✨ Scroll Indicator - Elegant */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce-slow">
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs font-cairo">اكتشفي المزيد</span>
          <div className="w-7 h-11 border-2 border-white/40 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-white/60 rounded-full mt-2 animate-scroll-indicator" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ✨ Premium Category Card
function CategoryCard({
  category,
}: {
  category: (typeof FEATURED_CATEGORIES)[0];
}) {
  return (
    <Link href={`/products?category=${category.slug}`} className="group block">
      <Card
        className="
        overflow-hidden border border-[var(--border)] bg-[var(--surface)]
        hover:shadow-xl hover:shadow-[var(--primary)]/10 hover:border-[var(--primary)]/40
        transition-all duration-300 text-center
        active:scale-[0.98]
      "
      >
        <CardContent className="p-5">
          {/* Icon Container */}
          <div
            className={`
            relative w-16 h-16 mx-auto rounded-2xl 
            flex items-center justify-center mb-4
            bg-gradient-to-br ${category.color}/10 to-transparent
            group-hover:scale-110 transition-transform duration-300
            ring-2 ring-transparent group-hover:ring-[var(--primary)]/30
          `}
          >
            <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
              {category.icon}
            </span>

            {/* Glow on hover */}
            <div className="absolute inset-0 rounded-2xl bg-[var(--primary)]/0 group-hover:bg-[var(--primary)]/10 transition-colors duration-300" />
          </div>

          {/* Category Name */}
          <span
            className="
            text-sm font-semibold text-[var(--text)] font-cairo
            group-hover:text-[var(--primary)] transition-colors
          "
          >
            {category.name}
          </span>

          {/* Subtle underline on hover */}
          <div
            className="
            h-0.5 mx-auto mt-3 rounded-full bg-[var(--primary)]
            scale-x-0 group-hover:scale-x-100 transition-transform duration-300
            origin-center
          "
          />
        </CardContent>
      </Card>
    </Link>
  );
}

// ✨ Main Home Content Component
export function HomeContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("hero");

  // Fetch data
  const { data: productsData, isLoading: productsLoading } = useProducts({
    page: 1,
    page_size: 8,
    sort_by: "published_at",
    sort_order: "desc",
  });

  const { data: auctionsData, isLoading: auctionsLoading } = useAuctions(1, 4);
  const { data: categoriesData } = useCategories();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(query)}`;
    }
  };

  // ✨ Scroll spy for active section highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "categories", "products", "auctions", "trust"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const normalizeAuction = (auction: Auction): Auction => ({
    ...auction,
    current_bid: typeof auction.current_bid === 'number' ? auction.current_bid : auction.start_price,
    start_price: typeof auction.start_price === 'number' ? auction.start_price : 0,
    product: auction.product || {
      id: auction.product_id,
      title: 'منتج غير متوفر',
      images: [{ url: '/placeholder-dress.png' }],
      city: 'غير محدد',
    },
  });

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />

      <main className="flex-1">
        {/* ✨ Hero Section */}
        <div id="hero">
          <PremiumHero searchQuery={searchQuery} onSearch={handleSearch} />
        </div>

        {/* ✨ Categories Section */}



        {/* ✨ Latest Products Section */}
        <section id="products" className="py-16 bg-[var(--background)]">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primaryDark)] flex items-center justify-center shadow-lg shadow-[var(--primary)]/25">
                  <Sparkles className="h-5 w-5 text-[var(--textInverse)]" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] font-cairo">
                    وصل حديثاً
                  </h2>
                  <p className="text-sm text-[var(--textSecondary)] font-cairo">
                    أحدث الإضافات لتشكيلتنا الفاخرة
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                asChild
                className="text-[var(--primary)] font-cairo gap-1.5 group"
              >
                <Link href="/products" className="flex items-center">
                  تصفحي الكل
                  <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                </Link>
              </Button>
            </div>

            {/* Products Grid */}
            {productsLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[3/4] rounded-2xl bg-[var(--surfaceMuted)]" />
                  </div>
                ))}
              </div>
            ) : productsData?.items && productsData.items.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {productsData.items.map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-fadeInUp"
                    style={{ animationDelay: `${Math.min(index * 60, 300)}ms` }}
                  >
                    <ProductCard
                      product={product}
                      showActions={true}
              
                    />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Heart}
                title="لا توجد فساتين حالياً"
                description="كوني أول من يضيف فستان مميز للتشكيلة"
                actionLabel="أضيفي فستانكِ"
                actionHref="/seller/products/new"
              />
            )}
          </div>
        </section>

        {/* ✨ Active Auctions Section */}
        <section id="auctions" className="py-16 bg-[var(--surface)]">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--warning)] to-[var(--warningLight)] flex items-center justify-center shadow-lg shadow-[var(--warning)]/25">
                  <TrendingUp className="h-5 w-5 text-[var(--textInverse)]" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] font-cairo">
                    المزادات الحية 🔥
                  </h2>
                  <p className="text-sm text-[var(--textSecondary)] font-cairo">
                    فرص حصرية لا تتكرر - سارعي قبل فوات الأوان
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                asChild
                className="text-[var(--warning)] font-cairo gap-1.5 group"
              >
                <Link href="/auctions" className="flex items-center">
                  كل المزادات
                  <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                </Link>
              </Button>
            </div>

            {/* Auctions Grid */}
            {auctionsLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[3/4] rounded-2xl bg-[var(--surfaceMuted)]" />
                  </div>
                ))}
              </div>
            ) : auctionsData?.items && auctionsData.items.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {auctionsData.items.map((auction, index) => (
                  <div
                    key={auction.id}
                    className="animate-fadeInUp"
                    style={{
                      animationDelay: `${Math.min(index * 100, 300)}ms`,
                    }}
                  >
                    <AuctionCard auction={normalizeAuction(auction)} />

                    
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Clock}
                title="لا توجد مزادات نشطة حالياً"
                description="تابعينا لتصلك إشعارات بالمزادات القادمة"
                actionLabel="فعلي الإشعارات"
                onAction={() => { }}
              />
            )}
          </div>
        </section>

        {/* ✨ Trust & Security Section */}
        <section
          id="trust"
          className="py-20 bg-gradient-to-b from-[var(--surfaceMuted)] to-[var(--background)]"
        >
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-cairo text-sm mb-4">
                <Shield className="w-4 h-4" />
                <span>ثقتكِ أولويتنا</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] font-cairo mb-4">
                لماذا تختارين فساتيني؟
              </h2>
              <p className="text-[var(--textSecondary)] font-cairo leading-relaxed">
                نلتزم بتقديم أفضل تجربة تسوق آمنة وموثوقة، مع ضمانات تحمي حقوقكِ
                في كل خطوة
              </p>
            </div>

            {/* Additional Trust Indicators */}
            <div className="mt-16 pt-10 border-t border-[var(--border)]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  { value: "99.9%", label: "رضا العملاء" },
                  { value: "24/7", label: "دعم فني" },
                  { value: "100%", label: "حماية البيانات" },
                  { value: "4.9★", label: "تقييم المتجر" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="animate-fadeInUp"
                    style={{ animationDelay: `${400 + i * 100}ms` }}
                  >
                    <p className="text-2xl md:text-3xl font-bold text-[var(--primary)] font-cairo">
                      {stat.value}
                    </p>
                    <p className="text-sm text-[var(--textSecondary)] font-cairo mt-1">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ✨ Premium CTA Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-900)] via-[var(--primaryDark)] to-[var(--primary)]" />

          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[var(--primary-light)]/20 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              {/* Icon */}
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center mb-6 ring-2 ring-white/20">
                <Heart className="h-8 w-8 text-white" />
              </div>

              {/* Heading */}
              <h2 className="text-2xl md:text-4xl font-bold text-white font-cairo mb-4">
                هل لديكِ فساتين تريدين بيعها؟
              </h2>

              {/* Description */}
              <p className="text-lg text-white/85 mb-8 font-cairo leading-relaxed">
                انضمي لمجتمع فساتيني وابدأي رحلة بيع فساتينكِ بسهولة. نوفر لكِ
                أدوات احترافية، وصول لآلاف المشترين، وحماية كاملة لمعاملاتكِ.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  className="
                    bg-white text-[var(--primaryDark)] 
                    hover:bg-white/95 shadow-xl 
                    px-8 py-6 font-bold font-cairo rounded-2xl
                    transition-all duration-300
                    hover:scale-105 hover:shadow-2xl
                    group
                  "
                  asChild
                >
                  <Link
                    href="/seller/products/new"
                    className="flex items-center gap-2"
                  >
                    ابدأي البيع مجاناً
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="
                    border-white/30 bg-white/10 backdrop-blur-md 
                    hover:bg-white/20 text-white 
                    px-8 py-6 font-cairo rounded-2xl
                    transition-all duration-300
                    hover:scale-105 hover:border-white/50
                  "
                  asChild
                >
                  <Link href="/seller/guide">
                    <Play className="h-5 w-5 ml-2" />
                    شاهدي الدليل
                  </Link>
                </Button>
              </div>

              {/* Trust Note */}
              <p className="mt-8 text-sm text-white/60 font-cairo">
                ✓ لا توجد رسوم خفية • ✓ دفع آمن • ✓ دعم على مدار الساعة
              </p>
            </div>
          </div>
        </section>

        {/* ✨ Newsletter Section (Optional Premium Touch) */}
        <section className="py-12 bg-[var(--surface)] border-y border-[var(--border)]">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-xl font-bold text-[var(--text)] font-cairo mb-3">
                كوني أول من يعلم بالوصلات الجديدة 🎀
              </h3>
              <p className="text-[var(--textSecondary)] font-cairo mb-6">
                اشتركي في نشرتنا وحصّلي على عروض حصرية وإشعارات بالفساتين
                الجديدة
              </p>

              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="أدخلي بريدكِ الإلكتروني"
                  className="flex-1 bg-[var(--background)] border-[var(--border)] focus:border-[var(--primary)] font-cairo"
                />
                <Button
                  type="submit"
                  className="bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-[var(--textInverse)] font-cairo px-6"
                >
                  اشتركي
                </Button>
              </form>

              <p className="mt-4 text-xs text-[var(--textTertiary)] font-cairo">
                نحمي بريدكِ • إلغاء الاشتراك في أي وقت
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}