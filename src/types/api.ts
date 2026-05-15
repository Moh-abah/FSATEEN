// Generic API response wrapper
export interface APIResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  pages?: number;
}

export interface APIError {
  detail: Array<{
    loc: (string | number)[];
    msg: string;
    type: string;
  }>;
}

// Common types
export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface MessageResponse {
  success: boolean;
  message: string;
}

// Query parameters for pagination
export interface PaginationParams {
  page?: number;
  page_size?: number;
}

// Sort parameters
export interface SortParams {
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

// Filter parameters for products
export interface ProductFilters extends PaginationParams, SortParams {
  search?: string;
  category?: string;
  sub_category?: string;
  city?: string;
  condition?: string;
  min_price?: number;
  max_price?: number;
  seller_id?: string;
}
