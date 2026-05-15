// Static content page

'use client';

import { useParams } from 'next/navigation';
import { ArrowRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Navbar, Footer, MobileBottomNav } from '@/components/layout';
import { LoadingSkeleton, ErrorState } from '@/components/shared';
import api from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import type { StaticPage as StaticPageType } from '@/types';

export default function StaticPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data: page, isLoading, error } = useQuery({
    queryKey: ['static-page', slug],
    queryFn: () => api.get<StaticPageType>(`/static/${slug}`),
    enabled: !!slug,
  });

  // Default pages if API doesn't have them
  const defaultPages: Record<string, { title: string; content: string }> = {
    'about': {
      title: 'من نحن',
      content: `
        <h2>فساتين - منصة بيع الفساتين في السعودية</h2>
        <p>فساتين هي المنصة الأولى لبيع وشراء الفساتين الجديدة والمستعملة في المملكة العربية السعودية. نهدف إلى تمكين المرأة السعودية من بيع وشراء الفساتين بسهولة وأمان.</p>
        
        <h3>رؤيتنا</h3>
        <p>أن نكون الوجهة الأولى للفساتين في السعودية، ونوفر تجربة تسوق مميزة وآمنة.</p>
        
        <h3>رسالتنا</h3>
        <p>نوفر منصة سهلة الاستخدام تربط بين البائعات والمشتريات، مع ضمان الجودة والأمان في كل معاملة.</p>
      `,
    },
    'terms': {
      title: 'الشروط والأحكام',
      content: `
        <h2>الشروط والأحكام</h2>
        <p>باستخدامك لمنصة فساتين، فإنك توافقين على الالتزام بالشروط التالية:</p>
        
        <h3>1. الاستخدام</h3>
        <p>يقتصر استخدام المنصة على النساء فقط. يجب أن يكون عمرك 18 عاماً أو أكثر لاستخدام المنصة.</p>
        
        <h3>2. المنتجات</h3>
        <p>يجب أن تكون المنتجات المعروضة للبيع فساتين أو ملابس نسائية فقط. يُحظر عرض أي منتجات مخالفة.</p>
        
        <h3>3. المعاملات</h3>
        <p>المنصة وسيط بين البائع والمشتري. نوصي بإتمام المعاملات عبر المنصة لضمان حقوق الطرفين.</p>
      `,
    },
    'privacy': {
      title: 'سياسة الخصوصية',
      content: `
        <h2>سياسة الخصوصية</h2>
        <p>نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية.</p>
        
        <h3>المعلومات التي نجمعها</h3>
        <ul>
          <li>معلومات التواصل (الاسم، رقم الهاتف، البريد الإلكتروني)</li>
          <li>معلومات الموقع (المدينة، العنوان)</li>
          <li>بيانات الاستخدام (الصفحات المزارة، البحث)</li>
        </ul>
        
        <h3>كيف نستخدم معلوماتك</h3>
        <p>نستخدم معلوماتك لتحسين تجربتك وتقديم خدمات أفضل. لا نشارك معلوماتك مع أطراف ثالثة بدون موافقتك.</p>
      `,
    },
    'contact': {
      title: 'تواصلي معنا',
      content: `
        <h2>تواصلي معنا</h2>
        <p>نحن هنا لمساعدتك! يمكنك التواصل معنا عبر:</p>
        
        <h3>معلومات التواصل</h3>
        <ul>
          <li><strong>البريد الإلكتروني:</strong> support@fusateen.com</li>
          <li><strong>الهاتف:</strong> 920000000</li>
          <li><strong>واتساب:</strong> +966 50 000 0000</li>
        </ul>
        
        <h3>ساعات العمل</h3>
        <p>الأحد - الخميس: 9 صباحاً - 6 مساءً</p>
      `,
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--background)]">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-6">
          <LoadingSkeleton type="card" count={2} />
        </main>
        <Footer />
        <MobileBottomNav />
      </div>
    );
  }

  // Use default page if API doesn't return content
  const pageContent = page || defaultPages[slug];
  const pageTitle = pageContent?.title || (slug === 'about' ? 'من نحن' : slug);

  if (error && !pageContent) {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--background)]">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-6">
          <ErrorState
            title="الصفحة غير موجودة"
            onRetry={() => window.location.reload()}
          />
        </main>
        <Footer />
        <MobileBottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />

      <main className="flex-1 py-6">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <Button variant="ghost" size="icon" onClick={() => window.history.back()} className="text-[var(--text)]">
              <ArrowRight className="h-5 w-5" />
            </Button>
            <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center">
              <FileText className="h-5 w-5 text-[var(--textInverse)]" />
            </div>
            <h1 className="text-2xl font-bold text-[var(--primary)] font-cairo">{pageTitle}</h1>
          </div>

          {/* Content */}
          <Card className="border border-[var(--border)] bg-[var(--surface)]">
            <CardContent className="p-6 prose prose-sm max-w-none">
              {pageContent?.content ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: typeof pageContent.content === 'string'
                      ? pageContent.content
                      : ''
                  }}
                  className="text-[var(--text)] [&_h2]:text-[var(--primary)] [&_h3]:text-[var(--primaryDark)] [&_p]:text-[var(--text)] [&_li]:text-[var(--textSecondary)] [&_strong]:text-[var(--primary)]"
                />
              ) : (
                <p className="text-[var(--textSecondary)]">لا يوجد محتوى</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}