// User and authentication hooks

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth-store';
import api from '@/lib/api';
import {
  User,
  UserProfileUpdate,
  ProfileDetailsUpdate,
  PrivacySettings,
  PrivacySettingsUpdate,
  VerificationRequest,
  ChangePasswordRequest,
  PublicUserProfile,
  PaginatedResponse,
  Product,
  ReportUserRequest,
} from '@/types';

// Get current user
export function useCurrentUser() {
  const { user, isLoading, isAuthenticated } = useAuthStore();
  return { user, isLoading, isAuthenticated };
}

// Update profile
export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { updateUser } = useAuthStore();

  return useMutation({
    mutationFn: (data: UserProfileUpdate) => api.patch<User>('/auth/me', data),
    onSuccess: (user) => {
      updateUser(user);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

// Update profile details
export function useUpdateProfileDetails() {
  const queryClient = useQueryClient();
  const { updateUser } = useAuthStore();

  return useMutation({
    mutationFn: (data: ProfileDetailsUpdate) =>
      api.patch<User>('/auth/profile-details', data),
    onSuccess: (user) => {
      updateUser(user);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

// Get privacy settings
export function usePrivacySettings() {
  return useQuery({
    queryKey: ['privacy-settings'],
    queryFn: () => api.get<PrivacySettings>('/auth/privacy'),
  });
}

// Update privacy settings
export function useUpdatePrivacySettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PrivacySettingsUpdate) =>
      api.put<PrivacySettings>('/auth/privacy', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['privacy-settings'] });
    },
  });
}

// Change password
export function useChangePassword() {
  return useMutation({
    mutationFn: (data: ChangePasswordRequest) =>
      api.patch('/auth/me/password', data),
  });
}

// Set password (for new users)
export function useSetPassword() {
  return useMutation({
    mutationFn: (password: string) =>
      api.post('/auth/set-password', { password }),
  });
}

// Request verification
export function useRequestVerification() {
  return useMutation({
    mutationFn: (data: VerificationRequest) =>
      api.post('/users/verify-request', data),
  });
}

// Get public user profile
export function usePublicUserProfile(userId: string) {
  return useQuery({
    queryKey: ['public-user', userId],
    queryFn: () => api.get<PublicUserProfile>(`/users/${userId}`),
    enabled: !!userId,
  });
}

// Alias for usePublicUserProfile for backwards compatibility
export function useUser(userId: string) {
  return useQuery({
    queryKey: ['user-profile', userId],
    queryFn: () => api.get<PublicUserProfile>(`/users/${userId}`),
    enabled: !!userId,
  });
}

// Get user products
export function useUserProducts(userId: string, page = 1, pageSize = 20) {
  return useQuery({
    queryKey: ['user-products', userId, page, pageSize],
    queryFn: () => api.get<PaginatedResponse<Product>>(`/users/${userId}/products`, {
      params: { page, page_size: pageSize }
    }),
    enabled: !!userId,
  });
}

// Report user
export function useReportUser(userId: string) {
  return useMutation({
    mutationFn: (data: ReportUserRequest) =>
      api.post(`/users/${userId}/report`, data),
  });
}

// Report product
export function useReportProduct(productId: string) {
  return useMutation({
    mutationFn: (data: { reason: string; description?: string }) =>
      api.post(`/products/${productId}/report`, data),
  });
}


