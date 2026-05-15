// System hooks

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Category, City, StaticPage } from '@/types';

// Get categories
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => api.get<Category[]>('/system/categories'),
    staleTime: Infinity,
  });
}

// Get cities
export function useCities() {
  return useQuery({
    queryKey: ['cities'],
    queryFn: () => api.get<City[]>('/system/cities'),
    staleTime: Infinity,
  });
}

// Health check
export function useHealthCheck() {
  return useQuery({
    queryKey: ['health'],
    queryFn: () => api.get('/system/health'),
    staleTime: 30000,
    refetchInterval: 60000,
  });
}

// Get static page
export function useStaticPage(slug: string) {
  return useQuery({
    queryKey: ['static-page', slug],
    queryFn: () => api.get<StaticPage>(`/static/${slug}`),
    enabled: !!slug,
  });
}
