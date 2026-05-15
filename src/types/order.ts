// Order types based on OpenAPI spec

export type OrderStatus = 
  | 'requested' 
  | 'accepted' 
  | 'delivered' 
  | 'received' 
  | 'completed' 
  | 'disputed' 
  | 'cancelled';

export interface Order {
  id: string;
  product_id: string;
  buyer_id: string;
  seller_id: string;
  status: OrderStatus;
  delivery_method: 'meetup' | 'shipping';
  delivery_address?: string | null;
  delivery_notes?: string | null;
  delivery_price?: number | null;
  total_price: number;
  created_at: string;
  updated_at: string;
  product: {
    id: string;
    title: string;
    images: { url: string }[];
    price: number;
    city: string;
  };
  buyer: {
    id: string;
    username?: string;
    full_name?: string;
    avatar_url?: string;
    phone?: string;
    city?: string;
    rating: number;
  };
  seller: {
    id: string;
    username?: string;
    full_name?: string;
    avatar_url?: string;
    phone?: string;
    city?: string;
    rating: number;
    is_verified: boolean;
  };
  rating?: {
    score: number;
    comment?: string;
  } | null;
}

export interface OrderCreate {
  product_id: string;
  delivery_method?: 'meetup' | 'shipping';
  delivery_address?: string;
  delivery_notes?: string;
}

export interface DisputeRequest {
  reason: string;
}

export interface RatingCreate {
  score: number;
  comment?: string;
}

// Order list filters
export interface OrderFilters {
  role?: 'buyer' | 'seller';
  status?: OrderStatus;
  page?: number;
  page_size?: number;
}

// Status timeline for order detail
export interface StatusTimeline {
  status: OrderStatus;
  timestamp: string;
  note?: string;
}
