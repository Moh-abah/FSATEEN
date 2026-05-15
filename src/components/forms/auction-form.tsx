// Auction form component

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Product } from '@/types';
import { formatCurrency } from '@/lib/utils';

const auctionSchema = z.object({
  product_id: z.string().min(1, 'يرجى اختيار منتج'),
  start_price: z.number().min(1, 'السعر الافتتاحي مطلوب'),
  end_time: z.string().min(1, 'تاريخ الانتهاء مطلوب'),
  winner_selection: z.enum(['auto', 'manual']),
});

type AuctionFormData = z.infer<typeof auctionSchema>;

interface AuctionFormProps {
  products: Product[];
  onSubmit: (data: AuctionFormData) => Promise<void>;
  isLoading?: boolean;
}

export function AuctionForm({ products, onSubmit, isLoading = false }: AuctionFormProps) {
  const [selectedProductId, setSelectedProductId] = useState<string>('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AuctionFormData>({
    resolver: zodResolver(auctionSchema),
    defaultValues: {
      winner_selection: 'auto',
    },
  });

  const selectedProduct = products.find(p => p.id === selectedProductId);

  // Generate end time options (next 7 days)
  const endTimeOptions = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    date.setHours(23, 59, 0, 0);
    return {
      value: date.toISOString(),
      label: date.toLocaleDateString('ar-SA', { weekday: 'long', month: 'long', day: 'numeric' }),
    };
  });

  const handleFormSubmit = async (data: AuctionFormData) => {
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Select Product */}
      <Card className="border border-[var(--border)] bg-[var(--surface)]">
        <CardHeader>
          <CardTitle className="text-lg text-[var(--primary)]">اختيار المنتج</CardTitle>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <p className="text-[var(--textSecondary)] text-center py-4">
              لا توجد منتجات متاحة للمزاد
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {products.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => {
                    setSelectedProductId(product.id);
                    setValue('product_id', product.id);
                  }}
                  className={`relative rounded-lg overflow-hidden border-2 transition-all ${selectedProductId === product.id
                      ? 'border-[var(--primary)] ring-2 ring-[var(--primary)]/20'
                      : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                    }`}
                >
                  <div className="aspect-square bg-[var(--surfaceMuted)]">
                    <img
                      src={product.images?.[0]?.url || '/placeholder-dress.png'}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2 bg-[var(--surface)]">
                    <p className="text-xs truncate text-[var(--text)]">{product.title}</p>
                    <p className="text-sm font-bold text-[var(--primary)]">
                      {formatCurrency(product.price)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
          {errors.product_id && (
            <p className="text-[var(--error)] text-sm mt-2">{errors.product_id.message}</p>
          )}
        </CardContent>
      </Card>

      {/* Auction Settings */}
      <Card className="border border-[var(--border)] bg-[var(--surface)]">
        <CardHeader>
          <CardTitle className="text-lg text-[var(--primary)]">إعدادات المزاد</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="start_price" className="text-[var(--text)]">السعر الافتتاحي (ريال)</Label>
            <Input
              id="start_price"
              type="number"
              {...register('start_price', { valueAsNumber: true })}
              placeholder="0"
              className="mt-1 bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--textTertiary)]"
            />
            {errors.start_price && (
              <p className="text-[var(--error)] text-sm mt-1">{errors.start_price.message}</p>
            )}
            {selectedProduct && (
              <p className="text-xs text-[var(--textSecondary)] mt-1">
                سعر المنتج الحالي: {formatCurrency(selectedProduct.price)}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="end_time" className="text-[var(--text)]">تاريخ الانتهاء</Label>
            <Select onValueChange={(value) => setValue('end_time', value)}>
              <SelectTrigger className="mt-1 bg-[var(--surface)] border-[var(--border)] text-[var(--text)]">
                <SelectValue placeholder="اختر تاريخ الانتهاء" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--surface)] border-[var(--border)]">
                {endTimeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.end_time && (
              <p className="text-[var(--error)] text-sm mt-1">{errors.end_time.message}</p>
            )}
          </div>

          <div>
            <Label className="text-[var(--text)]">طريقة اختيار الفائز</Label>
            <RadioGroup
              value={watch('winner_selection')}
              onValueChange={(value) => setValue('winner_selection', value as 'auto' | 'manual')}
              className="mt-2"
            >
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="auto" id="auto" />
                <Label htmlFor="auto" className="font-normal text-[var(--text)]">
                  تلقائي - أعلى مزايد يفوز تلقائياً
                </Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="manual" id="manual" />
                <Label htmlFor="manual" className="font-normal text-[var(--text)]">
                  يدوي - تختارين الفائز يدوياً
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full bg-[var(--primary)] hover:bg-[var(--primaryDark)] text-[var(--textInverse)]"
        disabled={isLoading || products.length === 0}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 ml-2 animate-spin" />
            جاري الإنشاء...
          </>
        ) : (
          'إنشاء المزاد'
        )}
      </Button>
    </form>
  );
}