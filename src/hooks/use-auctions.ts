// // Auctions hooks using React Query

// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import api from '@/lib/api';
// import { 
//   Auction, 
//   AuctionCreate, 
//   Bid, 
//   BidCreate,
//   PaginatedResponse,
// } from '@/types';

// // Fetch auctions list
// export function useAuctions(page = 1, pageSize = 20) {
//   return useQuery({
//     queryKey: ['auctions', page, pageSize],
//     queryFn: () => api.get<PaginatedResponse<Auction>>('/auctions', { 
//       params: { page, page_size: pageSize } 
//     }),
//   });
// }

// // Fetch single auction
// export function useAuction(auctionId: string) {
//   return useQuery({
//     queryKey: ['auction', auctionId],
//     queryFn: () => api.get<Auction>(`/auctions/${auctionId}`),
//     enabled: !!auctionId,
//   });
// }

// // Fetch auction bids
// export function useAuctionBids(auctionId: string, page = 1, pageSize = 20) {
//   return useQuery({
//     queryKey: ['auction-bids', auctionId, page, pageSize],
//     queryFn: () => api.get<PaginatedResponse<Bid>>(`/auctions/${auctionId}/bids`, { 
//       params: { page, page_size: pageSize } 
//     }),
//     enabled: !!auctionId,
//   });
// }

// // Create auction
// export function useCreateAuction() {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationFn: (data: AuctionCreate) => api.post<Auction>('/auctions', data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['auctions'] });
//     },
//   });
// }

// // Place bid
// export function usePlaceBid() {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationFn: ({ auctionId, data }: { auctionId: string; data: BidCreate }) => 
//       api.post<Bid>(`/auctions/${auctionId}/bid`, data),
//     onSuccess: (_, { auctionId }) => {
//       queryClient.invalidateQueries({ queryKey: ['auction', auctionId] });
//       queryClient.invalidateQueries({ queryKey: ['auction-bids', auctionId] });
//     },
//   });
// }
// // Auctions hooks using React Query + WebSocket

// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { useEffect, useRef, useState, useCallback } from 'react';
// import api from '@/lib/api';
// import { WebSocketClient, getAuctionWSUrl } from '@/lib/ws';
// import { tokenManager } from '@/lib/api';
// import {
//   Auction,
//   AuctionCreate,
//   Bid,
//   BidCreate,
//   AuctionWSMessage,
//   PaginatedResponse,
// } from '@/types';

// // Fetch auctions list
// export function useAuctions(page = 1, pageSize = 20) {
//   return useQuery({
//     queryKey: ['auctions', page, pageSize],
//     queryFn: () => api.get<PaginatedResponse<Auction>>('/auctions', {
//       params: { page, page_size: pageSize }
//     }),
//   });
// }

// // Fetch single auction
// export function useAuction(auctionId: string) {
//   return useQuery({
//     queryKey: ['auction', auctionId],
//     queryFn: () => api.get<Auction>(`/auctions/${auctionId}`),
//     enabled: !!auctionId,
//   });
// }

// // Fetch auction bids
// export function useAuctionBids(auctionId: string, page = 1, pageSize = 20) {
//   return useQuery({
//     queryKey: ['auction-bids', auctionId, page, pageSize],
//     queryFn: () => api.get<PaginatedResponse<Bid>>(`/auctions/${auctionId}/bids`, {
//       params: { page, page_size: pageSize }
//     }),
//     enabled: !!auctionId,
//   });
// }

// // Create auction
// export function useCreateAuction() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (data: AuctionCreate) => api.post<Auction>('/auctions', data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['auctions'] });
//     },
//   });
// }

// // Place bid via REST
// export function usePlaceBid() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({ auctionId, data }: { auctionId: string; data: BidCreate }) =>
//       api.post<Bid>(`/auctions/${auctionId}/bid`, data),
//     onSuccess: (_, { auctionId }) => {
//       queryClient.invalidateQueries({ queryKey: ['auction', auctionId] });
//       queryClient.invalidateQueries({ queryKey: ['auction-bids', auctionId] });
//     },
//   });
// }

// // Full auction hook with WebSocket support for real-time bidding
// export function useAuctionLive(auctionId: string) {
//   const queryClient = useQueryClient();
//   const [isConnected, setIsConnected] = useState(false);
//   const [latestBid, setLatestBid] = useState<Bid | null>(null);
//   const wsRef = useRef<WebSocketClient | null>(null);

//   const { data: auction, isLoading, error, refetch } = useAuction(auctionId);
//   const { data: bidsData } = useAuctionBids(auctionId);

//   // Initialize WebSocket
//   useEffect(() => {
//     if (!auctionId) return;

//     const token = tokenManager.getAccessToken();
//     if (!token) return;

//     const ws = new WebSocketClient({
//       url: getAuctionWSUrl(auctionId),
//       onMessage: (message: AuctionWSMessage) => {
//         switch (message.type) {
//           case 'new_bid':
//             if (message.data?.bid) {
//               setLatestBid(message.data.bid);
//               // Invalidate to refetch latest data
//               queryClient.invalidateQueries({ queryKey: ['auction', auctionId] });
//               queryClient.invalidateQueries({ queryKey: ['auction-bids', auctionId] });
//             }
//             break;
//           case 'auction_ended':
//             if (message.data?.winner_id) {
//               queryClient.invalidateQueries({ queryKey: ['auction', auctionId] });
//             }
//             break;
//         }
//       },
//       onConnectionChange: setIsConnected,
//     });

//     ws.connect(token);
//     wsRef.current = ws;

//     // Keep-alive ping
//     const pingInterval = setInterval(() => {
//       ws.ping();
//     }, 30000);

//     return () => {
//       clearInterval(pingInterval);
//       ws.disconnect();
//       wsRef.current = null;
//     };
//   }, [auctionId, queryClient]);

//   // Place bid via WebSocket
//   const placeBid = useCallback((amount: number) => {
//     if (!wsRef.current || !isConnected) {
//       // Fallback to REST
//       return api.post<Bid>(`/auctions/${auctionId}/bid`, { amount });
//     }

//     // Send via WebSocket
//     wsRef.current.send({
//       type: 'bid',
//       amount,
//     });

//     // Also send via REST as backup
//     return api.post<Bid>(`/auctions/${auctionId}/bid`, { amount });
//   }, [auctionId, isConnected]);

//   return {
//     auction,
//     bids: bidsData?.items || [],
//     isLoading,
//     error,
//     isConnected,
//     latestBid,
//     placeBid,
//     refetch,
//   };
// }

// // Seller's auctions list
// export function useSellerAuctions(page = 1, pageSize = 20) {
//   return useQuery({
//     queryKey: ['seller-auctions', page, pageSize],
//     queryFn: () => api.get<PaginatedResponse<Auction>>('/seller/auctions', {
//       params: { page, page_size: pageSize }
//     }),
//   });
// }





// Auctions hooks using React Query + WebSocket

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState, useCallback } from 'react';
import api from '@/lib/api';
import { WebSocketClient, getAuctionWSUrl } from '@/lib/ws';
import { tokenManager } from '@/lib/api';
import {
  Auction,
  AuctionCreate,
  Bid,
  BidCreate,
  AuctionWSMessage,
  PaginatedResponse,
} from '@/types';

// Fetch auctions list
export function useAuctions(page = 1, pageSize = 20) {
  return useQuery({
    queryKey: ['auctions', page, pageSize],
    queryFn: () => api.get<PaginatedResponse<Auction>>('/auctions', {
      params: { page, page_size: pageSize }
    }),
  });
}

// Fetch single auction
export function useAuction(auctionId: string) {
  return useQuery({
    queryKey: ['auction', auctionId],
    queryFn: () => api.get<Auction>(`/auctions/${auctionId}`),
    enabled: !!auctionId,
  });
}

// Fetch auction bids
export function useAuctionBids(auctionId: string, page = 1, pageSize = 20) {
  return useQuery({
    queryKey: ['auction-bids', auctionId, page, pageSize],
    queryFn: () => api.get<PaginatedResponse<Bid>>(`/auctions/${auctionId}/bids`, {
      params: { page, page_size: pageSize }
    }),
    enabled: !!auctionId,
  });
}

// Create auction
export function useCreateAuction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AuctionCreate) => api.post<Auction>('/auctions', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auctions'] });
    },
  });
}

// Place bid via REST
export function usePlaceBid() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ auctionId, data }: { auctionId: string; data: BidCreate }) =>
      api.post<Bid>(`/auctions/${auctionId}/bid`, data),
    onSuccess: (_, { auctionId }) => {
      queryClient.invalidateQueries({ queryKey: ['auction', auctionId] });
      queryClient.invalidateQueries({ queryKey: ['auction-bids', auctionId] });
    },
  });
}











// Full auction hook with WebSocket support for real-time bidding
export function useAuctionLive(auctionId: string) {
  const queryClient = useQueryClient();
  const [isConnected, setIsConnected] = useState(false);
  const [latestBid, setLatestBid] = useState<Bid | null>(null);
  const wsRef = useRef<WebSocketClient | null>(null);

  const { data: auction, isLoading, error, refetch } = useAuction(auctionId);
  const { data: bidsData } = useAuctionBids(auctionId);

  // Initialize WebSocket for receiving updates (no sending)
  useEffect(() => {
    if (!auctionId) return;

    const token = tokenManager.getAccessToken();
    if (!token) return;

    // ✅ استخدم 'endpoint' بدلاً من 'url' حسب تعريف WebSocketClient (أو أضف 'url' في الـ types)
    // سنستخدم 'as any' مؤقتاً لتجاوز خطأ الـ types
    const ws = new WebSocketClient({
      endpoint: getAuctionWSUrl(auctionId),   // تغيير من url إلى endpoint
      onMessage: (message) => {
        const auctionMessage = message as AuctionWSMessage;
        switch (auctionMessage.type) {
          case 'new_bid':
            if (auctionMessage.data?.bid) {
              setLatestBid(auctionMessage.data.bid);
              queryClient.invalidateQueries({ queryKey: ['auction', auctionId] });
              queryClient.invalidateQueries({ queryKey: ['auction-bids', auctionId] });
            }
            break;
          case 'auction_ended':
            if (auctionMessage.data?.winner_id) {
              queryClient.invalidateQueries({ queryKey: ['auction', auctionId] });
            }
            break;
        }
      },
      onConnectionChange: setIsConnected,
    } as any);  // ⬅️ مؤقتاً لتجاوز mismatch في الخيارات

    ws.connect(token);
    wsRef.current = ws;

    // Keep-alive ping (إذا كان الـ WebSocketClient يدعم ping)
    const pingInterval = setInterval(() => {
      ws.ping?.();   // تأكد من وجودها
    }, 30000);

    return () => {
      clearInterval(pingInterval);
      ws.disconnect();
      wsRef.current = null;
    };
  }, [auctionId, queryClient]);

  // ✅ Place bid only via REST (WebSocket is receive-only, no 'bid' message type)
  const placeBid = useCallback((amount: number) => {
    return api.post<Bid>(`/auctions/${auctionId}/bid`, { amount });
  }, [auctionId]);

  return {
    auction,
    bids: bidsData?.items || [],
    isLoading,
    error,
    isConnected,
    latestBid,
    placeBid,
    refetch,
  };
}

// Seller's auctions list
export function useSellerAuctions(page = 1, pageSize = 20) {
  return useQuery({
    queryKey: ['seller-auctions', page, pageSize],
    queryFn: () => api.get<PaginatedResponse<Auction>>('/seller/auctions', {
      params: { page, page_size: pageSize }
    }),
  });
}