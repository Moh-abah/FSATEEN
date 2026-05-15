// Seller hooks using React Query

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { 
  SellerStore, 
  SellerStoreUpdate, 
  SellerUpgradeRequest,
  SellerDashboard,
  PublicStore,
  PaginatedResponse,
  Product,
  Order,
} from '@/types';

// Get seller store settings
export function useSellerStore() {
  return useQuery({
    queryKey: ['seller-store'],
    queryFn: () => api.get<SellerStore>('/seller/store'),
  });
}

// Update seller store
export function useUpdateSellerStore() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: SellerStoreUpdate) => 
      api.put<SellerStore>('/seller/store', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seller-store'] });
    },
  });
}

// Get seller dashboard
export function useSellerDashboard() {
  return useQuery({
    queryKey: ['seller-dashboard'],
    queryFn: () => api.get<SellerDashboard>('/seller/dashboard'),
  });
}

// Get seller products
export function useSellerProducts(page = 1, pageSize = 20) {
  return useQuery({
    queryKey: ['seller-products', page, pageSize],
    queryFn: () => api.get<PaginatedResponse<Product>>('/seller/products', { 
      params: { page, page_size: pageSize } 
    }),
  });
}

// Create seller product
// export function useCreateSellerProduct() {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationFn: (data: Record<string, unknown>) => 
//       api.post<Product>('/seller/products', data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['seller-products'] });
//     },
//   });
// }



export function useCreateSellerProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      api.post<Product>('/products', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seller-products'] });
    },
  });
}




// Update seller product
export function useUpdateSellerProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ productId, data }: { productId: string; data: Record<string, unknown> }) => 
      api.patch<Product>(`/seller/products/${productId}`, data),
    onSuccess: (_, { productId }) => {
      queryClient.invalidateQueries({ queryKey: ['seller-products'] });
      queryClient.invalidateQueries({ queryKey: ['product', productId] });
    },
  });
}

// Delete seller product
export function useDeleteSellerProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (productId: string) => api.delete(`/seller/products/${productId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seller-products'] });
    },
  });
}

// Request seller upgrade
export function useRequestSellerUpgrade() {
  return useMutation({
    mutationFn: (data: SellerUpgradeRequest) => 
      api.post('/seller/upgrade-request', data),
  });
}

// Get public store
export function usePublicStore(storeSlug: string) {
  return useQuery({
    queryKey: ['public-store', storeSlug],
    queryFn: () => api.get<PublicStore>(`/store/${storeSlug}`),
    enabled: !!storeSlug,
  });
}

// Get store products
export function useStoreProducts(storeSlug: string, page = 1, pageSize = 20, search?: string) {
  return useQuery({
    queryKey: ['store-products', storeSlug, page, pageSize, search],
    queryFn: () => api.get<PaginatedResponse<Product>>(`/store/${storeSlug}/products`, { 
      params: { page, page_size: pageSize, search } 
    }),
    enabled: !!storeSlug,
  });
}
