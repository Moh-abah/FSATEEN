// // // Products hooks using React Query

// // import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// // import api from '@/lib/api';
// // import { 
// //   Product, 
// //   ProductCreate, 
// //   ProductUpdate, 
// //   ProductFilters,
// //   PaginatedResponse,
// //   FavoriteToggleResponse,
// //   Category,
// //   City,
// // } from '@/types';

// // // Fetch products list
// // export function useProducts(filters: ProductFilters = {}) {
// //   return useQuery({
// //     queryKey: ['products', filters],
// //     queryFn: () => api.get<PaginatedResponse<Product>>('/products', { params: filters }),
// //   });
// // }

// // // Fetch single product
// // export function useProduct(productId: string) {
// //   return useQuery({
// //     queryKey: ['product', productId],
// //     queryFn: () => api.get<Product>(`/products/${productId}`),
// //     enabled: !!productId,
// //   });
// // }

// // // Fetch my products (seller)
// // export function useMyProducts(page = 1, pageSize = 20) {
// //   return useQuery({
// //     queryKey: ['my-products', page, pageSize],
// //     queryFn: () => api.get<PaginatedResponse<Product>>('/products/my', { 
// //       params: { page, page_size: pageSize } 
// //     }),
// //   });
// // }

// // // Fetch favorites
// // export function useFavorites(page = 1, pageSize = 20) {
// //   return useQuery({
// //     queryKey: ['favorites', page, pageSize],
// //     queryFn: () => api.get<PaginatedResponse<Product>>('/products/favorites', { 
// //       params: { page, page_size: pageSize } 
// //     }),
// //   });
// // }

// // // Create product
// // export function useCreateProduct() {
// //   const queryClient = useQueryClient();
  
// //   return useMutation({
// //     mutationFn: (data: ProductCreate) => api.post<Product>('/products', data),
// //     onSuccess: () => {
// //       queryClient.invalidateQueries({ queryKey: ['products'] });
// //       queryClient.invalidateQueries({ queryKey: ['my-products'] });
// //     },
// //   });
// // }

// // // Update product
// // export function useUpdateProduct(productId: string) {
// //   const queryClient = useQueryClient();
  
// //   return useMutation({
// //     mutationFn: (data: ProductUpdate) => api.patch<Product>(`/products/${productId}`, data),
// //     onSuccess: () => {
// //       queryClient.invalidateQueries({ queryKey: ['product', productId] });
// //       queryClient.invalidateQueries({ queryKey: ['my-products'] });
// //     },
// //   });
// // }

// // // Delete product
// // export function useDeleteProduct() {
// //   const queryClient = useQueryClient();
  
// //   return useMutation({
// //     mutationFn: (productId: string) => api.delete(`/products/${productId}`),
// //     onSuccess: () => {
// //       queryClient.invalidateQueries({ queryKey: ['products'] });
// //       queryClient.invalidateQueries({ queryKey: ['my-products'] });
// //     },
// //   });
// // }

// // // Toggle favorite
// // export function useToggleFavorite() {
// //   const queryClient = useQueryClient();
  
// //   return useMutation({
// //     mutationFn: (productId: string) => 
// //       api.post<FavoriteToggleResponse>(`/products/${productId}/favorite`),
// //     onSuccess: (_, productId) => {
// //       queryClient.invalidateQueries({ queryKey: ['product', productId] });
// //       queryClient.invalidateQueries({ queryKey: ['favorites'] });
// //     },
// //   });
// // }

// // // Renew product
// // export function useRenewProduct() {
// //   const queryClient = useQueryClient();
  
// //   return useMutation({
// //     mutationFn: (productId: string) => 
// //       api.post<Product>(`/products/${productId}/renew`),
// //     onSuccess: (_, productId) => {
// //       queryClient.invalidateQueries({ queryKey: ['product', productId] });
// //       queryClient.invalidateQueries({ queryKey: ['my-products'] });
// //     },
// //   });
// // }

// // // Mark product as sold
// // export function useMarkProductSold() {
// //   const queryClient = useQueryClient();
  
// //   return useMutation({
// //     mutationFn: (productId: string) => 
// //       api.post<Product>(`/products/${productId}/mark-sold`),
// //     onSuccess: (_, productId) => {
// //       queryClient.invalidateQueries({ queryKey: ['product', productId] });
// //       queryClient.invalidateQueries({ queryKey: ['my-products'] });
// //     },
// //   });
// // }

// // // Fetch categories
// // export function useCategories() {
// //   return useQuery({
// //     queryKey: ['categories'],
// //     queryFn: () => api.get<Category[]>('/system/categories'),
// //     staleTime: Infinity, // Categories don't change often
// //   });
// // }

// // // Fetch cities
// // export function useCities() {
// //   return useQuery({
// //     queryKey: ['cities'],
// //     queryFn: () => api.get<City[]>('/system/cities'),
// //     staleTime: Infinity, // Cities don't change often
// //   });
// // }

// // // Upload product image
// // export function useUploadProductImage() {
// //   return useMutation({
// //     mutationFn: async (file: File) => {
// //       const formData = new FormData();
// //       formData.append('file', file);
      
// //       const response = await fetch(
// //         `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1'}/uploads/product-image`,
// //         {
// //           method: 'POST',
// //           headers: {
// //             Authorization: `Bearer ${localStorage.getItem('fusateen_access_token')}`,
// //           },
// //           body: formData,
// //         }
// //       );
      
// //       if (!response.ok) {
// //         throw new Error('Failed to upload image');
// //       }
      
// //       const data = await response.json();
// //       return data as string; // Returns image URL
// //     },
// //   });
// // }



// // Products hooks using React Query

// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import api from '@/lib/api';
// import {
//   Product,
//   ProductCreate,
//   ProductUpdate,
//   ProductFilters,
//   PaginatedResponse,
//   FavoriteToggleResponse,
// } from '@/types';

// // Fetch products list
// export function useProducts(filters: ProductFilters = {}) {
//   return useQuery({
//     queryKey: ['products', filters],
//     queryFn: () => api.get<PaginatedResponse<Product>>('/products', {
//       params: filters as Record<string, string | number | boolean | undefined>
//     }),
//   });
// }

// // Fetch single product
// export function useProduct(productId: string) {
//   return useQuery({
//     queryKey: ['product', productId],
//     queryFn: () => api.get<Product>(`/products/${productId}`),
//     enabled: !!productId,
//   });
// }

// // Fetch my products (seller)
// export function useMyProducts(page = 1, pageSize = 20) {
//   return useQuery({
//     queryKey: ['my-products', page, pageSize],
//     queryFn: () => api.get<PaginatedResponse<Product>>('/products/my', {
//       params: { page, page_size: pageSize }
//     }),
//   });
// }

// // Fetch favorites
// export function useFavorites(page = 1, pageSize = 20) {
//   return useQuery({
//     queryKey: ['favorites', page, pageSize],
//     queryFn: () => api.get<PaginatedResponse<Product>>('/products/favorites', {
//       params: { page, page_size: pageSize }
//     }),
//   });
// }

// // Create product
// export function useCreateProduct() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (data: ProductCreate) => api.post<Product>('/products', data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['products'] });
//       queryClient.invalidateQueries({ queryKey: ['my-products'] });
//     },
//   });
// }

// // Update product
// export function useUpdateProduct(productId: string) {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (data: ProductUpdate) => api.patch<Product>(`/products/${productId}`, data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['product', productId] });
//       queryClient.invalidateQueries({ queryKey: ['my-products'] });
//     },
//   });
// }

// // Delete product
// export function useDeleteProduct() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (productId: string) => api.delete(`/products/${productId}`),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['products'] });
//       queryClient.invalidateQueries({ queryKey: ['my-products'] });
//     },
//   });
// }

// // Toggle favorite
// export function useToggleFavorite() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (productId: string) =>
//       api.post<FavoriteToggleResponse>(`/products/${productId}/favorite`),
//     onSuccess: (_, productId) => {
//       queryClient.invalidateQueries({ queryKey: ['product', productId] });
//       queryClient.invalidateQueries({ queryKey: ['favorites'] });
//     },
//   });
// }

// // Renew product
// export function useRenewProduct() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (productId: string) =>
//       api.post<Product>(`/products/${productId}/renew`),
//     onSuccess: (_, productId) => {
//       queryClient.invalidateQueries({ queryKey: ['product', productId] });
//       queryClient.invalidateQueries({ queryKey: ['my-products'] });
//     },
//   });
// }

// // Mark product as sold
// export function useMarkProductSold() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (productId: string) =>
//       api.post<Product>(`/products/${productId}/mark-sold`),
//     onSuccess: (_, productId) => {
//       queryClient.invalidateQueries({ queryKey: ['product', productId] });
//       queryClient.invalidateQueries({ queryKey: ['my-products'] });
//     },
//   });
// }

// // Upload product image
// export function useUploadProductImage() {
//   return useMutation({
//     mutationFn: async (file: File) => {
//       const formData = new FormData();
//       formData.append('file', file);

//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL || 'http://console.log("");:8000/api/v1'}/uploads/product-image`,
//         {
//           method: 'POST',
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('fusateen_access_token')}`,
//           },
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error('Failed to upload image');
//       }

//       const data = await response.json();
//       return data as string; // Returns image URL
//     },
//   });
// }











// Products hooks using React Query

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import {
  Product,
  ProductCreate,
  ProductUpdate,
  ProductFilters,
  PaginatedResponse,
  FavoriteToggleResponse,
  Favorite,
} from '@/types';

// Fetch products list
export function useProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => api.get<PaginatedResponse<Product>>('/products', {
      params: filters as Record<string, string | number | boolean | undefined>
    }),
  });
}

// Fetch single product
export function useProduct(productId: string) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => api.get<Product>(`/products/${productId}`),
    enabled: !!productId,
  });
}

// export function useProduct(productId: string) {
//   return useQuery({
//     queryKey: ['product', productId],
//     queryFn: () => api.get<Product>(/products/${ productId }),
//     enabled: !!productId,
//   });
// }


// Fetch my products (seller)
export function useMyProducts(page = 1, pageSize = 20) {
  return useQuery({
    queryKey: ['my-products', page, pageSize],
    queryFn: () => api.get<PaginatedResponse<Product>>('/products/my', {
      params: { page, page_size: pageSize }
    }),
  });
}



// Create product
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProductCreate) => api.post<Product>('/products', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['my-products'] });
    },
  });
}

// Update product
export function useUpdateProduct(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProductUpdate) => api.patch<Product>(`/products/${productId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product', productId] });
      queryClient.invalidateQueries({ queryKey: ['my-products'] });
    },
  });
}

// Delete product
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => api.delete(`/products/${productId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['my-products'] });
    },
  });
}

// // Toggle favorite
// export function useToggleFavorite() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (productId: string) =>
//       api.post<FavoriteToggleResponse>(`/products/${productId}/favorite`),
//     onSuccess: (_, productId) => {
//       queryClient.invalidateQueries({ queryKey: ['product', productId] });
//       queryClient.invalidateQueries({ queryKey: ['favorites'] });
//     },
//   });
// }











type FavoriteWithProduct = Favorite & { product: Product };




// Fetch favorites
export function useFavorites(page = 1, pageSize = 20) {
  return useQuery({
    queryKey: ['favorites', page, pageSize],
    queryFn: () => api.get<PaginatedResponse<FavoriteWithProduct>>('/products/favorites', {
      params: { page, page_size: pageSize }
    }),

  });
}




// export function useFavorites(page = 1, pageSize = 20) {
//   return useQuery({
//     queryKey: ['favorites', page, pageSize],
//     queryFn: () => api.get<PaginatedResponse<Favorite, Product>>('/products/favorites', {
//       params: { page, page_size: pageSize }
//     }),
//   });
// }


export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) =>
      api.post<FavoriteToggleResponse>(`/products/${productId}/favorite`),
    onSuccess: (_, productId) => {
      queryClient.invalidateQueries({ queryKey: ['product', productId] });
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },


  });
}

export function useRemoveFavorite() {
  const { mutate: toggleFavorite } = useToggleFavorite();

  const removeFavorite = (productId: string) => {
    toggleFavorite(productId);
  };

  return { mutate: removeFavorite };
}















// Renew product
export function useRenewProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) =>
      api.post<Product>(`/products/${productId}/renew`),
    onSuccess: (_, productId) => {
      queryClient.invalidateQueries({ queryKey: ['product', productId] });
      queryClient.invalidateQueries({ queryKey: ['my-products'] });
    },
  });
}

// Mark product as sold
export function useMarkProductSold() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) =>
      api.post<Product>(`/products/${productId}/mark-sold`),
    onSuccess: (_, productId) => {
      queryClient.invalidateQueries({ queryKey: ['product', productId] });
      queryClient.invalidateQueries({ queryKey: ['my-products'] });
    },
  });
}

// Upload product image
export function useUploadProductImage() {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      const token = localStorage.getItem('fusateen_access_token'); 

      const response = await fetch('/api/uploads/product-image', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })
      

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();


      return data.url as string; // Returns image URL
    },
  });
}
