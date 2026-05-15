

// src/app/profile/edit/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  User, 
  Save, 
  Loader2, 
  Camera, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  FileText,
  Sparkles,
  X,
  Shield,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Navbar, Footer, MobileBottomNav } from '@/components/layout';
import { LoadingSkeleton } from '@/components/shared';
import { useAuthStore } from '@/stores/auth-store';
import api from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { UserProfileUpdate, ProfileDetailsUpdate } from '@/types';
import {  useUploadAvatarImage } from '@/hooks';

// ✨ Schema with enhanced validation
const profileSchema = z.object({
  full_name: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل').max(50, 'الاسم طويل جداً'),
  username: z.string().min(3, 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل').max(30, 'اسم المستخدم طويل جداً').optional(),
  bio: z.string().max(200, 'الوصف يجب أن يكون أقل من 200 حرف').optional(),
  city: z.string().min(2, 'المدينة مطلوبة').optional(),
  address_line: z.string().optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  avatar_url: z.string().optional(),
 cover_url: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

// ✨ Premium Central Orb Component
function InteractiveProfileOrb({ 
  avatarUrl, 
  userName, 
  isDirty, 
  isSaving,
  isSaved,
  onAvatarClick 
}: { 
  avatarUrl: string; 
  userName: string; 
  isDirty: boolean;
  isSaving: boolean;
  isSaved: boolean;
  onAvatarClick: () => void;
}) {
  const getInitial = () => userName?.[0]?.toUpperCase() || 'م';

  // Determine status for visual feedback
  const getStatusConfig = () => {
    if (isSaved) return { color: 'var(--success)', label: 'تم الحفظ ✓', pulse: false };
    if (isSaving) return { color: 'var(--warning)', label: 'جاري الحفظ...', pulse: true };
    if (isDirty) return { color: 'var(--primary)', label: 'تغييرات غير محفوظة', pulse: true };
    return { color: 'var(--success)', label: 'كل شيء محدث ✓', pulse: false };
  };

  const status = getStatusConfig();

  return (
    <div className="sticky top-24 flex flex-col items-center">
      
      {/* ✨ Animated Orb Container */}
      <div className="relative group">
        {/* Glow Effect - Pulses based on status */}
        <div className={`
          absolute inset-0 rounded-full blur-2xl transition-all duration-500
          ${status.pulse ? 'animate-pulse' : ''}
          ${isSaved 
            ? 'bg-[var(--success)]/30 scale-125' 
            : isSaving 
              ? 'bg-[var(--warning)]/30 scale-115'
              : isDirty 
                ? 'bg-[var(--primary)]/30 scale-120'
                : 'bg-[var(--success)]/20 scale-100'
          }
        `} />
        
        {/* Main Avatar Circle */}
        <div className={`
          relative w-32 h-32 sm:w-40 sm:h-40 rounded-full 
          flex items-center justify-center overflow-hidden
          ring-4 ring-[var(--background)] 
          shadow-2xl transition-all duration-300 cursor-pointer
          ${isSaving ? 'scale-95 opacity-80' : 'hover:scale-105'}
        `}
        onClick={onAvatarClick}
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={userName}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-4xl font-bold text-[var(--textInverse)] font-cairo">
              {getInitial()}
            </span>
          )}
          
          {/* Success Checkmark Overlay */}
          {isSaved && (
            <div className="absolute inset-0 bg-[var(--success)]/90 flex items-center justify-center animate-fadeInUp">
              <CheckCircle2 className="w-16 h-16 text-white" />
            </div>
          )}
          
          {/* Camera Icon Overlay on Hover */}
          {!isSaved && !isSaving && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Camera className="w-8 h-8 text-white" />
            </div>
          )}
        </div>

        {/* ✨ Status Indicator Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
          {/* Background Ring */}
          <circle
            cx="50" cy="50" r="46"
            fill="none"
            stroke="var(--border)"
            strokeWidth="3"
            className="opacity-50"
          />
          {/* Progress Ring - Animated */}
          <circle
            cx="50" cy="50" r="46"
            fill="none"
            stroke={status.color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="289"
            strokeDashoffset={isDirty || isSaving ? "100" : "0"}
            className="transition-all duration-500"
          />
        </svg>

        {/* ✨ Upload Button */}
        <button
          type="button"
          onClick={onAvatarClick}
          disabled={isSaving}
          className={`
            absolute -bottom-2 left-1/2 -translate-x-1/2
            w-12 h-12 rounded-full 
            flex items-center justify-center
            shadow-lg transition-all duration-200
            ${isSaving 
              ? 'bg-[var(--warning)]/80 cursor-wait' 
              : 'bg-gradient-to-r from-[var(--primary)] to-[var(--primaryDark)] hover:scale-110 active:scale-95'
            }
          `}
          title={isSaving ? 'جاري الرفع...' : 'تغيير الصورة'}
        >
          {isSaving ? (
            <Loader2 className="w-5 h-5 text-[var(--textInverse)] animate-spin" />
          ) : (
            <Camera className="w-5 h-5 text-[var(--textInverse)]" />
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={() => {}}
          />
        </button>
      </div>

      {/* ✨ Status Text */}
      <div className="mt-6 text-center space-y-2">
        <p className="font-bold text-[var(--text)] font-cairo text-lg">
          {userName || 'مستخدمة'}
        </p>
        
        {/* Dynamic Status Message */}
        <div className={`
          inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-cairo
          transition-all duration-300
          ${isSaving 
            ? 'bg-[var(--warning)]/10 text-[var(--warning)]' 
            : isDirty 
              ? 'bg-[var(--primary)]/10 text-[var(--primary)] animate-pulse' 
              : 'bg-[var(--success)]/10 text-[var(--success)]'
          }
        `}>
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{status.label}</span>
            </>
          ) : isDirty ? (
            <>
              <Sparkles className="w-4 h-4" />
              <span>{status.label}</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>{status.label}</span>
            </>
          )}
        </div>
      </div>

      {/* ✨ Decorative Particles */}
      {(isDirty || isSaved) && !isSaving && (
        <div className="absolute -inset-8 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full animate-float"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${Math.random() * 100}%`,
                backgroundColor: isSaved ? 'var(--success)' : 'var(--primary)',
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${2 + Math.random()}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ✨ Premium Form Field Component
function PremiumFormField({ 
  label, 
  name, 
  register, 
  errors, 
  icon: Icon, 
  placeholder, 
  type = 'text',
  multiline = false,
  maxLength,
  helperText,
  value,
  onChange,
}: any) {
  const [charCount, setCharCount] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (maxLength) {
      setCharCount(e.target.value.length);
    }
    if (onChange) onChange(e);
    if (register?.onChange) register.onChange(e);
  };

  const FieldComponent = multiline ? Textarea : Input;
  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="space-y-2">
      <Label 
        htmlFor={name} 
        className="flex items-center gap-2 text-[var(--text)] font-cairo font-medium"
      >
        {Icon && <Icon className="w-4 h-4 text-[var(--primary)]" />}
        {label}
      </Label>
      
      <div className="relative">
        <FieldComponent
          id={name}
          {...(register ? register(name) : {})}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          type={inputType}
          rows={multiline ? 4 : undefined}
          maxLength={maxLength}
          className={`
            w-full bg-[var(--surface)] border-[var(--border)] 
            text-[var(--text)] placeholder:text-[var(--textTertiary)] 
            focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 
            transition-all duration-200 font-cairo pr-10
            ${errors?.[name] ? 'border-[var(--error)] focus:border-[var(--error)] focus:ring-[var(--error)]/20' : ''}
            ${multiline ? 'min-h-[100px] resize-y' : ''}
          `}
        />
        
        {/* Password Toggle */}
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--textTertiary)] hover:text-[var(--text)] transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
        
        {/* Character Counter */}
        {maxLength && multiline && (
          <span className={`
            absolute bottom-3 left-3 text-xs font-cairo
            ${charCount > maxLength * 0.9 ? 'text-[var(--warning)]' : 'text-[var(--textTertiary)]'}
          `}>
            {charCount}/{maxLength}
          </span>
        )}
      </div>
      
      {/* Error Message */}
      {errors?.[name] && (
        <p className="text-[var(--error)] text-sm font-cairo flex items-center gap-1 animate-fadeInUp">
          <span className="w-1 h-1 rounded-full bg-[var(--error)]" />
          {errors[name].message}
        </p>
      )}
      
      {/* Helper Text */}
      {helperText && !errors?.[name] && (
        <p className="text-[var(--textTertiary)] text-xs font-cairo">
          {helperText}
        </p>
      )}
    </div>
  );
}

// ✨ Gender Selection Component
function GenderSelection({ register, errors, currentValue, onChange }: any) {
  const options = [
    { value: 'female', label: 'أنثى', icon: '👩' },
    { value: 'male', label: 'ذكر', icon: '👨' },
    { value: 'other', label: 'أفضل عدم الإفصاح', icon: '🤫' },
  ];

  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2 text-[var(--text)] font-cairo font-medium">
        <User className="w-4 h-4 text-[var(--primary)]" />
        النوع
      </Label>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {options.map((option) => (
          <label
            key={option.value}
            className={`
              relative flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer
              transition-all duration-200 font-cairo
              ${currentValue === option.value 
                ? 'border-[var(--primary)] bg-[var(--primary)]/5 shadow-sm' 
                : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/50'
              }
            `}
          >
            <input
              type="radio"
              name="gender"
              value={option.value}
              checked={currentValue === option.value}
              onChange={(e) => {
                if (register?.onChange) register.onChange(e);
                if (onChange) onChange(option.value);
              }}
              className="sr-only"
            />
            <span className="text-2xl">{option.icon}</span>
            <span className={`
              text-sm font-medium
              ${currentValue === option.value ? 'text-[var(--primary)]' : 'text-[var(--text)]'}
            `}>
              {option.label}
            </span>
            
            {/* Checkmark Indicator */}
            {currentValue === option.value && (
              <CheckCircle2 className="absolute top-2 left-2 w-5 h-5 text-[var(--primary)]" />
            )}
          </label>
        ))}
      </div>
      
      {errors?.gender && (
        <p className="text-[var(--error)] text-sm font-cairo">
          {errors.gender.message}
        </p>
      )}
    </div>
  );
}

// ✨ Success Animation Component
function SaveSuccessAnimation({ show }: { show: boolean }) {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="animate-fadeInUp">
        <div className="
          flex items-center gap-3 px-6 py-4 rounded-2xl 
          bg-[var(--success)] text-[var(--textInverse)] 
          shadow-2xl shadow-[var(--success)]/30 font-cairo
        ">
          <CheckCircle2 className="w-6 h-6" />
          <span className="font-medium">تم حفظ التغييرات بنجاح! ✨</span>
        </div>
      </div>
    </div>
  );
}

export default function EditProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, updateUser } = useAuthStore();
  
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

 const coverInputRef = useRef<HTMLInputElement>(null);
 const { mutate: uploadAvatar, isPending: isUploadingAvatar } = useUploadAvatarImage();
 const [isUploading, setIsUploading] = useState(false);


  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
    defaultValues: {
      full_name: '',
      username: '',
      bio: '',
      city: '',
      address_line: '',
      gender: undefined,
      avatar_url: '',
     cover_url: '',
    },
  });

  const watchedValues = watch();
  const watchedGender = watch('gender');

  // ✨ Load user data on mount
  useEffect(() => {
    if (user) {
      reset({
        full_name: user.full_name || '',
        username: user.username || '',
        bio: user.bio || '',
        city: user.city || '',
        address_line: user.address_line || '',
        gender: user.gender || undefined,
        avatar_url: user.avatar_url || '',
       cover_url: '',
        
      });

     setAvatarPreview(user.avatar_url || '');
    }
  }, [user, reset]);

  // ✨ Handle avatar file selection
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

 const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // التحقق من صحة الملف (نفس الكود)
  if (!file.type.startsWith('image/')) {
   toast({ title: 'نوع ملف غير مدعوم', description: 'يرجى اختيار صورة (JPG, PNG, WebP)', variant: 'destructive' });   return;
  }
  if (file.size > 5 * 1024 * 1024) {
   toast({ title: 'حجم الملف كبير جداً', description: 'يجب أن يكون أقل من 5 ميجابايت', variant: 'destructive' });
   return;
  }

  // 1. معاينة فورية
  const previewUrl = URL.createObjectURL(file);
  setAvatarPreview(previewUrl);
  setValue('avatar_url', previewUrl);

  // 2. رفع الصورة باستخدام الهوك
  uploadAvatar(file, {
   onSuccess: (imageUrl) => {
    const finalImageUrl = `${imageUrl}?t=${Date.now()}`;
    setValue('avatar_url', finalImageUrl);
    setAvatarPreview(finalImageUrl);
    updateUser({ ...user, avatar_url: finalImageUrl });
    toast({ title: 'تم رفع الصورة الشخصية بنجاح' });
   },
   onError: (error: Error) => {
    const oldImageUrl = user?.avatar_url || '';
    setAvatarPreview(oldImageUrl);
    setValue('avatar_url', oldImageUrl);
    toast({ title: 'فشل رفع الصورة', description: error.message, variant: 'destructive' });
   },
   onSettled: () => {
    URL.revokeObjectURL(previewUrl);
   }
  });
 };




 useEffect(() => {
  setIsUploading(isUploadingAvatar);
 }, [isUploadingAvatar]);



  // ✨ Form submission
  const onSubmit = async (data: ProfileFormData) => {
    if (!isDirty && !avatarPreview) {
      toast({
        title: 'لا توجد تغييرات',
        description: 'قومي بتعديل البيانات أولاً',
        variant: 'default',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Update profile info
      const profileData: UserProfileUpdate = {
        full_name: data.full_name,
        city: data.city,
        address_line: data.address_line,
        gender: data.gender,
      };
      await api.patch('/auth/me', profileData);

      // Update profile details
      const detailsData: ProfileDetailsUpdate = {
        username: data.username,
        bio: data.bio,
        avatar_url: data.avatar_url,
      };
      await api.patch('/auth/profile-details', detailsData);

      // Update local store
      updateUser({
        ...user,
        full_name: data.full_name,
        username: data.username,
        bio: data.bio,
        city: data.city,
        address_line: data.address_line,
        gender: data.gender === 'other' ? undefined : data.gender,

        avatar_url: data.avatar_url,
      });

      // Show success
      setShowSuccess(true);
      toast({
        title: 'تم تحديث الملف الشخصي ✨',
        description: 'تم حفظ جميع التغييرات بنجاح',
      });

      // Hide success after 2 seconds
      setTimeout(() => setShowSuccess(false), 2000);
      
      // Reset dirty state
      reset(data, { keepValues: true });
      
    } catch (error: any) {
      console.error('Profile update error:', error);
      toast({
        title: 'حدث خطأ',
        description: error?.response?.data?.message || 'لم نتمكن من حفظ التغييرات. حاولي مرة أخرى',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✨ Loading state
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--background)]">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-6">
          <div className="max-w-5xl mx-auto">
            <LoadingSkeleton type="card" count={4} />
          </div>
        </main>
        <Footer />
        <MobileBottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />

      <main className="flex-1 py-6 pb-24">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* ✨ Premium Header */}
          <header className="mb-8 text-center lg:text-right">
            <h1 className="text-2xl font-bold text-[var(--primary)] font-cairo">
              تعديل الملف الشخصي
            </h1>
            <p className="text-sm text-[var(--textSecondary)] font-cairo mt-1">
              حدّثي معلوماتكِ الشخصية بسهولة وأناقة
            </p>
          </header>

          {/* ✨ Success Animation */}
          <SaveSuccessAnimation show={showSuccess} />

          {/* ✨ Split Layout with Central Orb */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px_1fr] gap-6 lg:gap-8 items-start">
            
            {/* Left Column: Personal Info */}
            <Card className="
              border border-[var(--border)] bg-[var(--surface)]
              hover:shadow-lg hover:shadow-[var(--primary)]/5 transition-shadow duration-300
              lg:order-1
            ">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-[var(--primary)]" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-[var(--text)] font-cairo">
                      المعلومات الشخصية
                    </CardTitle>
                    <CardDescription className="text-[var(--textSecondary)] font-cairo">
                      البيانات التي تظهر في ملفكِ العام
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <Separator className="bg-[var(--border)]" />
              <CardContent className="pt-6 space-y-5">
                
                <PremiumFormField
                  label="الاسم الكامل"
                  name="full_name"
                  register={register}
                  errors={errors}
                  icon={User}
                  placeholder="أدخلي اسمكِ الكامل"
                  helperText="سيظهر هذا الاسم في ملفكِ العام"
                  value={watchedValues.full_name}
                  onChange={(e: any) => setValue('full_name', e.target.value)}
                />

                <PremiumFormField
                  label="اسم المستخدم"
                  name="username"
                  register={register}
                  errors={errors}
                  icon={Sparkles}
                  placeholder="اختاري اسم مستخدم مميز"
                  helperText="@{username} - يمكن تغييره لاحقاً"
                  value={watchedValues.username}
                  onChange={(e: any) => setValue('username', e.target.value)}
                />

                <PremiumFormField
                  label="نبذة عني"
                  name="bio"
                  register={register}
                  errors={errors}
                  icon={FileText}
                  placeholder="اكتبي نبذة مختصرة عنكِ..."
                  multiline
                  maxLength={200}
                  helperText="وصف قصير يعرّف عنكِ وعن ذوقكِ"
                  value={watchedValues.bio}
                  onChange={(e: any) => setValue('bio', e.target.value)}
                />

              </CardContent>
            </Card>

            {/* Center: Interactive Orb */}
            <div className="lg:order-2 flex justify-center">
              <InteractiveProfileOrb
                avatarUrl={avatarPreview}
                userName={watchedValues.full_name || user?.full_name || ''}
                isDirty={isDirty || !!avatarPreview}
                isSaving={isSubmitting || isUploading}
                isSaved={showSuccess}
                onAvatarClick={handleAvatarClick}
              />
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </div>

            {/* Right Column: Location & Settings */}
            <Card className="
              border border-[var(--border)] bg-[var(--surface)]
              hover:shadow-lg hover:shadow-[var(--primary)]/5 transition-shadow duration-300
              lg:order-3
            ">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--info)]/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[var(--info)]" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-[var(--text)] font-cairo">
                      الموقع والتفضيلات
                    </CardTitle>
                    <CardDescription className="text-[var(--textSecondary)] font-cairo">
                      لتسهيل عملية التوصيل والاستلام
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <Separator className="bg-[var(--border)]" />
              <CardContent className="pt-6 space-y-5">
                
                <PremiumFormField
                  label="المدينة"
                  name="city"
                  register={register}
                  errors={errors}
                  icon={MapPin}
                  placeholder="الرياض"
                  helperText="مدينتكِ الرئيسية"
                  value={watchedValues.city}
                  onChange={(e: any) => setValue('city', e.target.value)}
                />

                <PremiumFormField
                  label="العنوان التفصيلي"
                  name="address_line"
                  register={register}
                  errors={errors}
                  icon={MapPin}
                  placeholder="الحي، الشارع، رقم المبنى"
                  helperText="لأغراض التوصيل فقط - غير مرئي للعامة"
                  value={watchedValues.address_line}
                  onChange={(e: any) => setValue('address_line', e.target.value)}
                />

                <GenderSelection 
                  register={register} 
                  errors={errors} 
                  currentValue={watchedGender}
                  onChange={(value: string) => setValue('gender', value as "male" | "female" | "other")}
                />

              </CardContent>
            </Card>
            
          </div>

          {/* ✨ Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="
                flex-1 sm:flex-none border-[var(--border)] text-[var(--text)] 
                hover:bg-[var(--surfaceMuted)] font-cairo gap-2
              "
            >
              <ArrowRight className="w-4 h-4" />
              إلغاء
            </Button>
            
            <Button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="
                flex-1 sm:flex-none bg-gradient-to-r from-[var(--primary)] to-[var(--primaryDark)] 
                hover:from-[var(--primaryDark)] hover:to-[var(--primary)] 
                text-[var(--textInverse)] shadow-lg shadow-[var(--primary)]/25 
                hover:shadow-xl hover:shadow-[var(--primary)]/30 
                font-cairo gap-2 transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
              "
              disabled={(!isDirty && !avatarPreview) || isSubmitting || !isValid}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  حفظ التغييرات
                </>
              )}
            </Button>
          </div>

          {/* ✨ Helper Note */}
          <div className="mt-6 p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-[var(--primary)] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[var(--text)] font-cairo">
                  أمان بياناتكِ أولويتنا
                </p>
                <p className="text-xs text-[var(--textSecondary)] font-cairo mt-1">
                  جميع معلوماتكِ مشفرة ومحمية وفق أعلى معايير الأمان. 
                  لن نشارك بياناتكِ مع أي طرف ثالث دون موافقتكِ.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}