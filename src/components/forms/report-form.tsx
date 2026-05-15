// Report form component (reusable for products and users)

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Flag, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const reportSchema = z.object({
  reason: z.string().min(1, 'يرجى اختيار سبب البلاغ'),
  description: z.string().min(10, 'الوصف يجب أن يكون 10 أحرف على الأقل'),
});

type ReportFormData = z.infer<typeof reportSchema>;

interface ReportFormProps {
  type: 'product' | 'user';
  targetId: string;
  targetName?: string;
  onSubmit: (data: ReportFormData) => Promise<void>;
  trigger?: React.ReactNode;
}

const reportReasons = {
  product: [
    { value: 'inappropriate', label: 'محتوى غير لائق' },
    { value: 'fake', label: 'منتج مقلد/مزيف' },
    { value: 'scam', label: 'محاولة احتيال' },
    { value: 'wrong_category', label: 'تصنيف خاطئ' },
    { value: 'duplicate', label: 'إعلان مكرر' },
    { value: 'other', label: 'سبب آخر' },
  ],
  user: [
    { value: 'scam', label: 'محاولة احتيال' },
    { value: 'harassment', label: 'تحرش' },
    { value: 'fake_profile', label: 'حساب مزيف' },
    { value: 'inappropriate_behavior', label: 'سلوك غير لائق' },
    { value: 'other', label: 'سبب آخر' },
  ],
};

export function ReportForm({
  type,
  targetId,
  targetName,
  onSubmit,
  trigger,
}: ReportFormProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
  });

  const reasons = reportReasons[type];

  const handleFormSubmit = async (data: ReportFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      setSubmitted(true);
      setTimeout(() => {
        setOpen(false);
        reset();
        setSubmitted(false);
      }, 2000);
    } catch (error) {
      console.error('Report submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    reset();
    setSubmitted(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="border-[var(--border)] text-[var(--text)] hover:bg-[var(--surfaceMuted)]">
            <Flag className="h-4 w-4 ml-2" />
            إبلاغ
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md bg-[var(--surface)] border-[var(--border)]">
        <DialogHeader>
          <DialogTitle className="text-[var(--primary)]">
            {submitted ? 'تم إرسال البلاغ' : 'إبلاغ'}
          </DialogTitle>
          <DialogDescription className="text-[var(--textSecondary)]">
            {submitted
              ? 'شكراً لك، سيتم مراجعة بلاغك'
              : `الإبلاغ عن ${type === 'product' ? 'المنتج' : 'المستخدم'} ${targetName || ''}`}
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-[var(--successLight)] flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="h-6 w-6 text-[var(--success)]" />
            </div>
            <p className="text-[var(--textSecondary)]">
              سيتم مراجعة البلاغ واتخاذ الإجراء المناسب
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="reason" className="text-[var(--text)]">سبب البلاغ</Label>
              <select
                id="reason"
                {...register('reason')}
                className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
              >
                <option value="">اختر السبب</option>
                {reasons.map((reason) => (
                  <option key={reason.value} value={reason.value}>
                    {reason.label}
                  </option>
                ))}
              </select>
              {errors.reason && (
                <p className="text-[var(--error)] text-sm mt-1">{errors.reason.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="description" className="text-[var(--text)]">تفاصيل البلاغ</Label>
              <Textarea
                id="description"
                {...register('description')}
                placeholder="اشرحي المشكلة بالتفصيل..."
                rows={4}
                className="mt-1 bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
              />
              {errors.description && (
                <p className="text-[var(--error)] text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-[var(--border)] text-[var(--text)] hover:bg-[var(--surfaceMuted)]"
                onClick={handleClose}
              >
                إلغاء
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-[var(--textInverse)]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                    جاري الإرسال...
                  </>
                ) : (
                  'إرسال البلاغ'
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}