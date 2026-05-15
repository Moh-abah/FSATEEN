// Product types based on OpenAPI spec

export interface ProductImage {
  id: string;
  url: string;
  is_primary?: boolean;
  order?: number;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  condition: 'new' | 'like_new' | 'good' | 'fair';
  size?: string | null;
  color?: string | null;
  brand?: string | null;
  city: string;
  category?: string | null;
  sub_category?: string | null;
  delivery_available: boolean;
  delivery_price?: number | null;
  purchase_price?: number | null;
  images: ProductImage[];
  status: 'active' | 'sold' | 'expired' | 'hidden';
  views_count: number;
  favorites_count: number;
  published_at?: string;
  expires_at?: string;
  created_at: string;
  updated_at: string;
  seller: {
    id: string;
    username?: string;
    full_name?: string;
    avatar_url?: string;
    rating: number;
    is_verified: boolean;
    is_professional_seller: boolean;
    store_slug?: string;
  };
  is_favorited?: boolean;
}

export interface ProductCreate {
  title: string;
  description: string;
  price: number;
  condition?: 'new' | 'like_new' | 'good' | 'fair';
  size?: string;
  color?: string;
  brand?: string;
  city?: string;
  category?: string;
  sub_category?: string;
  delivery_available?: boolean;
  delivery_price?: number;
  images: string[];
  duration_days?: number;
  purchase_price?: number;
}

export interface ProductUpdate {
  title?: string;
  description?: string;
  price?: number;
  condition?: string;
  size?: string;
  color?: string;
  brand?: string;
  city?: string;
  category?: string;
  sub_category?: string;
  delivery_available?: boolean;
  delivery_price?: number;
  images?: string[];
  purchase_price?: number;
}

// Category and City
export interface Category {
  id: string;
  name: string;
  name_ar?: string;
  slug: string;
  icon?: string;
  sub_categories?: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  name_ar?: string;
  slug: string;
  parent_id: string;
}

export interface City {
  id: string;
  name: string;
  name_ar?: string;
  region?: string;
}

// Report product
export interface ReportProductRequest {
  reason: string;
  description?: string;
}

// Favorite response
export interface FavoriteToggleResponse {
  is_favorited: boolean;
  message: string;
}


// أضفه في نهاية الملف أو بجانب FavoriteToggleResponse
export interface Favorite {
  id: string;           // معرف علاقة المفضلة
  product: Product;     // المنتج الكامل
  added_at: string;     // تاريخ الإضافة (استخدمه في الترتيب)
}
