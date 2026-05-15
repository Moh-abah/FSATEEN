// Auction types based on actual API response

export interface Auction {
  id: string;
  product_id: string;
  start_price: number;
  current_bid: number | null;           // بدلاً من current_price
  current_bidder_id: string | null;
  current_bidder_username: string | null;
  bid_count: number;                    // بدلاً من bids_count / total_bids
  end_time: string;                     // بصيغة ISO مع Z
  actual_end_time: string | null;
  status: 'active' | 'ended' | 'cancelled';
  winner_selection: 'auto' | 'manual';
  winner_id: string | null;
  created_at: string;
  product_title?: string;
  product_image?: string;
  seller_username?: string;

  product: {
    id: string;
    title: string;
    description: string;
    price: number;                      // السعر الأصلي للمنتج
    primary_image: string;
    images: {
      url: string;
      thumbnail_url: string | null;
      is_primary: boolean;
      sort_order: number;
    }[];
    seller: {
      id: string;
      username: string;
      avatar_url: string;
      rating_avg: number;               // بدلاً من rating
      is_verified: boolean;
    };
  };
  // الحقول التالية غير موجودة في الـ API الفعلي ولكن قد نحتاجها للـ UI
  // نضعها كاختيارية أو نحذفها
  start_time?: never;                   // غير موجود في API
  total_bids?: never;
  bids_count?: never;
  winner?: never;                       // غير موجود في تفاصيل المزاد (ربما في حالة منفصلة)
}

export interface AuctionCreate {
  product_id: string;
  start_price: number;
  end_time: string;                     // يجب أن يكون بصيغة ISO
  winner_selection?: 'auto' | 'manual';
}

export interface Bid {
  id: string;
  auction_id: string;
  bidder_id: string;
  amount: number;
  created_at: string;
  // الحقول الإضافية حسب استجابة API العروض (غير موضحة في الـ curl لكن يمكن إضافتها لاحقاً)
  bidder?: {
    id: string;
    username?: string;
    avatar_url?: string;
  };
  is_winning?: boolean;
}

export interface BidCreate {
  amount: number;
}

// WebSocket events for auctions (تبدو متوافقة، نتركها كما هي)
export interface AuctionWSMessage {
  type: 'new_bid' | 'auction_ended' | 'ping' | 'pong' | 'auth' | 'auth_success';
  data?: {
    auction_id: string;
    bid?: Bid;
    winner_id?: string;
  };
}

// Auction stats (لم تظهر في الـ curl، نبقها كما هي)
export interface AuctionStats {
  total_auctions: number;
  active_auctions: number;
  total_bids: number;
  total_revenue: number;
}