// hooks/use-user-products.ts
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Product, PaginatedResponse } from '@/types';

export function useUserProducts(userId: string, page = 1, pageSize = 10) {
 return useQuery({
  queryKey: ['user-products', userId, page, pageSize],
  queryFn: () => api.get<PaginatedResponse<Product>>(`/users/${userId}/products`, {
   params: { page, page_size: pageSize }
  }),
  enabled: !!userId, // لا يتم التنفيذ إلا إذا كان userId موجوداً
 });
}