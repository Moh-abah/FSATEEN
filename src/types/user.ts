// User types based on OpenAPI spec

export interface User {
  id: string;
  phone: string;
  username?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
  bio?: string | null;
  city?: string | null;
  address_line?: string | null;
  gender?: 'male' | 'female' | null;
  is_verified: boolean;
  is_professional_seller: boolean;
  account_type: 'user' | 'seller' | 'moderator' | 'admin';
  rating_avg: number;
  rating_count: number;
  created_at: string;
  products_count: number;
  sales_count: number;
  updated_at: string;
}

export interface UserProfileUpdate {
  full_name?: string;
  city?: string;
  address_line?: string;
  gender?: string;
}

export interface ProfileDetailsUpdate {
  username?: string;
  avatar_url?: string;
  bio?: string;
  full_name?: string;
}

export interface PrivacySettings {
  show_phone: boolean;
  show_city: boolean;
  show_rating: boolean;
  show_active_listings: boolean;
}

export interface PrivacySettingsUpdate {
  show_phone?: boolean;
  show_city?: boolean;
  show_rating?: boolean;
  show_active_listings?: boolean;
}

export interface VerificationRequest {
  full_name: string;
  id_type: 'national_id' | 'passport' | 'drivers_license' | 'other';
  id_number: string;
  id_document_url: string;
  selfie_url?: string;
  address?: string;
  reason?: string;
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}

export interface SetPasswordRequest {
  password: string;
}

// Auth tokens
export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type?: string;
}

// Login request
export interface LoginRequest {
  identifier: string;
  password: string;
}

// OTP requests
export interface RequestOTPRequest {
  phone: string;
}

export interface VerifyOTPRequest {
  phone: string;
  otp: string;
}

// Public user profile (with privacy settings applied)
export interface PublicUserProfile {
  id: string;
  username?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
  city?: string | null;
  bio?: string | null;
  account_type?: string | null;
  rating_avg: number;
  rating_count: number;
  is_verified: boolean;
  is_professional_seller: boolean;
  products_count?: number;
}

// Report user
export interface ReportUserRequest {
  reason: string;
  description?: string;
}