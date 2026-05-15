// Orders hooks using React Query

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { 
  Order, 
  OrderCreate, 
  OrderFilters,
  OrderStatus,
  DisputeRequest,
  RatingCreate,
  PaginatedResponse,
} from '@/types';

// Fetch orders list
export function useOrders(filters: OrderFilters = {}) {


  const cleanParams = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => v !== undefined)
  );
  return useQuery({
    queryKey: ['orders', filters],
    queryFn: () => api.get<PaginatedResponse<Order>>('/orders', { params: cleanParams }),
  });
}

// Fetch single order
export function useOrder(orderId: string) {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: () => api.get<Order>(`/orders/${orderId}`),
    enabled: !!orderId,
  });
}

// Create order
export function useCreateOrder() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: OrderCreate) => api.post<Order>('/orders', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

// Order actions
export function useOrderActions() {
  const queryClient = useQueryClient();
  
  const acceptOrder = useMutation({
    mutationFn: (orderId: string) => api.post<Order>(`/orders/${orderId}/accept`),
    onSuccess: (_, orderId) => {
      queryClient.invalidateQueries({ queryKey: ['order', orderId] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
  
  const deliverOrder = useMutation({
    mutationFn: (orderId: string) => api.post<Order>(`/orders/${orderId}/deliver`),
    onSuccess: (_, orderId) => {
      queryClient.invalidateQueries({ queryKey: ['order', orderId] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
  
  const receiveOrder = useMutation({
    mutationFn: (orderId: string) => api.post<Order>(`/orders/${orderId}/receive`),
    onSuccess: (_, orderId) => {
      queryClient.invalidateQueries({ queryKey: ['order', orderId] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
  
  const cancelOrder = useMutation({
    mutationFn: (orderId: string) => api.post<Order>(`/orders/${orderId}/cancel`),
    onSuccess: (_, orderId) => {
      queryClient.invalidateQueries({ queryKey: ['order', orderId] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
  
  const disputeOrder = useMutation({
    mutationFn: ({ orderId, data }: { orderId: string; data: DisputeRequest }) => 
      api.post<Order>(`/orders/${orderId}/dispute`, data),
    onSuccess: (_, { orderId }) => {
      queryClient.invalidateQueries({ queryKey: ['order', orderId] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
  
  const rateOrder = useMutation({
    mutationFn: ({ orderId, data }: { orderId: string; data: RatingCreate }) => 
      api.post<Order>(`/orders/${orderId}/rate`, data),
    onSuccess: (_, { orderId }) => {
      queryClient.invalidateQueries({ queryKey: ['order', orderId] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
  
  return {
    acceptOrder,
    deliverOrder,
    receiveOrder,
    cancelOrder,
    disputeOrder,
    rateOrder,
  };
}

// Seller orders
export function useSellerOrders(status?: OrderStatus, page = 1, pageSize = 20) {
  return useQuery({
    queryKey: ['seller-orders', status, page, pageSize],
    queryFn: () => api.get<PaginatedResponse<Order>>('/seller/orders', { 
      params: { status, page, page_size: pageSize } 
    }),
  });
}

// Seller order detail
export function useSellerOrder(orderId: string) {
  return useQuery({
    queryKey: ['seller-order', orderId],
    queryFn: () => api.get<Order>(`/seller/orders/${orderId}`),
    enabled: !!orderId,
  });
}
