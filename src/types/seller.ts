// Seller and Store types based on OpenAPI spec

export interface SellerStore {
  id: string;
  user_id: string;
  store_name: string;
  store_slug: string;
  store_logo_url?: string | null;
  store_banner_url?: string | null;
  store_description?: string | null;
  contact_phone?: string | null;
  contact_email?: string | null;
  contact_whatsapp?: string | null;
  social_instagram?: string | null;
  social_twitter?: string | null;
  social_snapchat?: string | null;
  business_license?: string | null;
  store_address?: string | null;
  store_phone?: string | null;
  store_settings?: Record<string, unknown>;
  is_store_active?: boolean;
  is_active?: boolean;
  city?: string | null;
  rating?: number;
  total_ratings?: number;
  is_verified?: boolean;
  created_at: string;
  updated_at: string;
}

export interface SellerStoreUpdate {
  store_name?: string;
  store_slug?: string;
  store_description?: string;
  store_logo_url?: string;
  store_banner_url?: string;
  contact_phone?: string;
  contact_email?: string;
  contact_whatsapp?: string;
  social_instagram?: string;
  social_twitter?: string;
  social_snapchat?: string;
  is_store_active?: boolean;
  business_license?: string;
  store_address?: string;
  store_phone?: string;
  store_settings?: Record<string, unknown>;
}

export interface SellerUpgradeRequest {
  business_name: string;
  business_type: string;
  commercial_register?: string;
  description: string;
  documents?: string[];
}

export interface SellerDashboard {
  total_sales: number;
  total_revenue: number;
  total_orders: number;
  active_products: number;
  total_products: number;
  total_views: number;
  total_favorites: number;
  rating: number;
  total_ratings: number;
  pending_orders: number;
  completed_orders: number;
  recent_orders?: Array<{
    id: string;
    product_title: string;
    total_price: number;
    status: string;
    created_at: string;
  }>;
}

// Public store page
export interface PublicStore {
  id: string;
  store_name: string;
  store_slug: string;
  store_logo_url?: string | null;
  store_banner_url?: string | null;
  store_description?: string | null;
  store_address?: string | null;
  store_phone?: string | null;
  contact_phone?: string | null;
  contact_email?: string | null;
  contact_whatsapp?: string | null;
  social_instagram?: string | null;
  social_twitter?: string | null;
  social_snapchat?: string | null;
  city?: string | null;
  is_verified?: boolean;
  rating?: number;
  total_ratings?: number;
  products_count?: number;
  seller: {
    id: string;
    username?: string;
    full_name?: string;
    avatar_url?: string;
    rating: number;
    total_ratings: number;
    is_verified: boolean;
  };
  products: Array<{
    id: string;
    title: string;
    price: number;
    images: { url: string }[];
    city: string;
    status: string;
  }>;
  total_products: number;
}
