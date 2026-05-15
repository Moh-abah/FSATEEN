// // Utility functions for Fusateen

// import { type ClassValue, clsx } from 'clsx';
// import { twMerge } from 'tailwind-merge';

// // Merge Tailwind classes
// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

// // Format currency (SAR)
// export function formatCurrency(amount: number): string {
//   return new Intl.NumberFormat('ar-SA', {
//     style: 'currency',
//     currency: 'SAR',
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0,
//   }).format(amount);
// }

// // Format number with Arabic locale
// export function formatNumber(num: number): string {
//   return new Intl.NumberFormat('ar-SA').format(num);
// }

// // Format date in Arabic
// export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
//   const d = typeof date === 'string' ? new Date(date) : date;
//   return new Intl.DateTimeFormat('ar-SA', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//     ...options,
//   }).format(d);
// }

// // Format relative time (e.g., "منذ 5 دقائق")
// export function formatRelativeTime(date: string | Date): string {
//   const d = typeof date === 'string' ? new Date(date) : date;
//   const now = new Date();
//   const diff = now.getTime() - d.getTime();
  
//   const seconds = Math.floor(diff / 1000);
//   const minutes = Math.floor(seconds / 60);
//   const hours = Math.floor(minutes / 60);
//   const days = Math.floor(hours / 24);
  
//   if (seconds < 60) {
//     return 'الآن';
//   } else if (minutes < 60) {
//     return `منذ ${minutes} ${minutes === 1 ? 'دقيقة' : 'دقائق'}`;
//   } else if (hours < 24) {
//     return `منذ ${hours} ${hours === 1 ? 'ساعة' : 'ساعات'}`;
//   } else if (days < 7) {
//     return `منذ ${days} ${days === 1 ? 'يوم' : 'أيام'}`;
//   } else {
//     return formatDate(d);
//   }
// }

// // Format time remaining for auctions
// export function formatTimeRemaining(endTime: string | Date): string {
//   const end = typeof endTime === 'string' ? new Date(endTime) : endTime;
//   const now = new Date();
//   const diff = end.getTime() - now.getTime();
  
//   if (diff <= 0) {
//     return 'انتهى';
//   }
  
//   const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//   const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
//   const parts: string[] = [];
  
//   if (days > 0) {
//     parts.push(`${days} ${days === 1 ? 'يوم' : 'أيام'}`);
//   }
//   if (hours > 0 || days > 0) {
//     parts.push(`${hours} ${hours === 1 ? 'ساعة' : 'ساعات'}`);
//   }
//   if (minutes > 0 || hours > 0 || days > 0) {
//     parts.push(`${minutes} ${minutes === 1 ? 'دقيقة' : 'دقائق'}`);
//   }
//   if (seconds > 0 && days === 0) {
//     parts.push(`${seconds} ${seconds === 1 ? 'ثانية' : 'ثواني'}`);
//   }
  
//   return parts.join(' و ');
// }

// // Truncate text
// export function truncate(text: string, maxLength: number): string {
//   if (text.length <= maxLength) return text;
//   return text.slice(0, maxLength - 3) + '...';
// }

// // Generate a unique ID
// export function generateId(): string {
//   return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
// }

// // Validate phone number (Saudi format)
// export function isValidSaudiPhone(phone: string): boolean {
//   const saudiPhoneRegex = /^\+966[0-9]{9}$/;
//   return saudiPhoneRegex.test(phone.replace(/\s/g, ''));
// }

// // Format phone number for display
// export function formatPhone(phone: string): string {
//   const cleaned = phone.replace(/\D/g, '');
//   if (cleaned.startsWith('966')) {
//     return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`;
//   }
//   return phone;
// }

// // Debounce function
// export function debounce<T extends (...args: unknown[]) => unknown>(
//   func: T,
//   wait: number
// ): (...args: Parameters<T>) => void {
//   let timeout: NodeJS.Timeout | null = null;
  
//   return (...args: Parameters<T>) => {
//     if (timeout) {
//       clearTimeout(timeout);
//     }
//     timeout = setTimeout(() => {
//       func(...args);
//     }, wait);
//   };
// }

// // Get image URL with fallback
// export function getImageUrl(url?: string | null, fallback = '/placeholder-dress.png'): string {
//   if (!url) return fallback;
//   if (url.startsWith('http')) return url;
//   return url;
// }

// // Get avatar URL with fallback
// export function getAvatarUrl(url?: string | null, name?: string | null): string {
//   if (url) return url;
  
//   // Generate avatar from name
//   const initial = name?.charAt(0) || 'م';
//   return `https://ui-avatars.com/api/?name=${encodeURIComponent(initial)}&background=D4AF37&color=fff&size=128`;
// }

// // Calculate average rating
// export function calculateAverageRating(ratings: number[]): number {
//   if (ratings.length === 0) return 0;
//   const sum = ratings.reduce((acc, rating) => acc + rating, 0);
//   return Math.round((sum / ratings.length) * 10) / 10;
// }

// // Check if user owns a resource
// export function isOwner(userId: string, resourceOwnerId: string): boolean {
//   return userId === resourceOwnerId;
// }

// // Get order status label in Arabic
// export function getOrderStatusLabel(status: string): string {
//   const labels: Record<string, string> = {
//     requested: 'قيد الطلب',
//     accepted: 'مقبول',
//     delivered: 'تم التسليم',
//     received: 'تم الاستلام',
//     completed: 'مكتمل',
//     disputed: 'في نزاع',
//     cancelled: 'ملغي',
//   };
//   return labels[status] || status;
// }

// // Get product condition label in Arabic
// export function getConditionLabel(condition: string): string {
//   const labels: Record<string, string> = {
//     new: 'جديد',
//     like_new: 'كالجديد',
//     good: 'جيد',
//     fair: 'مقبول',
//   };
//   return labels[condition] || condition;
// }

// // Get order status color
// export function getOrderStatusColor(status: string): string {
//   const colors: Record<string, string> = {
//     requested: 'bg-yellow-500',
//     accepted: 'bg-blue-500',
//     delivered: 'bg-purple-500',
//     received: 'bg-indigo-500',
//     completed: 'bg-green-500',
//     disputed: 'bg-red-500',
//     cancelled: 'bg-gray-500',
//   };
//   return colors[status] || 'bg-gray-500';
// }




// Utility functions for Fusateen

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency (SAR)
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format number with Arabic locale
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('ar-SA').format(num);
}

// Format date in Arabic
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }).format(d);
}


// lib/utils.ts
export function formatDatechats(dateString: string) {
  return new Intl.DateTimeFormat('ar-EG', { month: 'short', day: 'numeric' }).format(new Date(dateString));
}


// Format relative time (e.g., "منذ 5 دقائق")
export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - d.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return 'الآن';
  } else if (minutes < 60) {
    return `منذ ${minutes} ${minutes === 1 ? 'دقيقة' : 'دقائق'}`;
  } else if (hours < 24) {
    return `منذ ${hours} ${hours === 1 ? 'ساعة' : 'ساعات'}`;
  } else if (days < 7) {
    return `منذ ${days} ${days === 1 ? 'يوم' : 'أيام'}`;
  } else {
    return formatDate(d);
  }
}

// Format time remaining for auctions
export function formatTimeRemaining(endTime: string | Date): string {
  const end = typeof endTime === 'string' ? new Date(endTime) : endTime;
  const now = new Date();
  const diff = end.getTime() - now.getTime();

  if (diff <= 0) {
    return 'انتهى';
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const parts: string[] = [];

  if (days > 0) {
    parts.push(`${days} ${days === 1 ? 'يوم' : 'أيام'}`);
  }
  if (hours > 0 || days > 0) {
    parts.push(`${hours} ${hours === 1 ? 'ساعة' : 'ساعات'}`);
  }
  if (minutes > 0 || hours > 0 || days > 0) {
    parts.push(`${minutes} ${minutes === 1 ? 'دقيقة' : 'دقائق'}`);
  }
  if (seconds > 0 && days === 0) {
    parts.push(`${seconds} ${seconds === 1 ? 'ثانية' : 'ثواني'}`);
  }

  return parts.join(' و ');
}

// Truncate text
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

// Generate a unique ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Validate phone number (Saudi format)
export function isValidSaudiPhone(phone: string): boolean {
  const saudiPhoneRegex = /^\+966[0-9]{9}$/;
  return saudiPhoneRegex.test(phone.replace(/\s/g, ''));
}

// Format phone number for display
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('966')) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`;
  }
  return phone;
}

// Debounce function
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

// Get image URL with fallback
export function getImageUrl(url?: string | null, fallback = '/placeholder-dress.png'): string {
  if (!url) return fallback;
  if (url.startsWith('http')) return url;
  return url;
}

// Get avatar URL with fallback
export function getAvatarUrl(url?: string | null, name?: string | null): string {
  if (url) return url;

  // Generate avatar from name
  const initial = name?.charAt(0) || 'م';
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initial)}&background=D4AF37&color=fff&size=128`;
}

// Calculate average rating
export function calculateAverageRating(ratings: number[]): number {
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return Math.round((sum / ratings.length) * 10) / 10;
}

// Check if user owns a resource
export function isOwner(userId: string, resourceOwnerId: string): boolean {
  return userId === resourceOwnerId;
}

// Get order status label in Arabic
export function getOrderStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    requested: 'قيد الطلب',
    accepted: 'مقبول',
    delivered: 'تم التسليم',
    received: 'تم الاستلام',
    completed: 'مكتمل',
    disputed: 'في نزاع',
    cancelled: 'ملغي',
  };
  return labels[status] || status;
}

// Get product condition label in Arabic
export function getConditionLabel(condition: string): string {
  const labels: Record<string, string> = {
    new: 'جديد',
    like_new: 'كالجديد',
    good: 'جيد',
    fair: 'مقبول',
  };
  return labels[condition] || condition;
}

// Get order status color
export function getOrderStatusColor(status: string): string {
  const colors: Record<string, string> = {
    requested: 'bg-yellow-500',
    accepted: 'bg-blue-500',
    delivered: 'bg-purple-500',
    received: 'bg-indigo-500',
    completed: 'bg-green-500',
    disputed: 'bg-red-500',
    cancelled: 'bg-gray-500',
  };
  return colors[status] || 'bg-gray-500';
}

// Format time (HH:MM)
export function formatTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('ar-SA', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(d);
}


export function formatCurrencymzad(value: number | string | undefined): string {
  const num = typeof value === 'number' ? value : parseFloat(String(value));
  if (isNaN(num)) return '0 ر.س.';
  return new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR' }).format(num);
}

// Alias for formatRelativeTime for backwards compatibility
export const formatDistanceToNow = formatRelativeTime;

// Alias for formatTimeRemaining for backwards compatibility
export const getTimeRemaining = formatTimeRemaining;




