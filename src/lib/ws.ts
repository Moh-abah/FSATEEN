// WebSocket client for Fusateen chat (Web version aligned with mobile)

import { WSMessage } from '@/types';

type MessageHandler = (message: WSMessage) => void;
type ConnectionHandler = (connected: boolean) => void;

interface WSClientOptions {
  conversationId: string;  // تغيير جوهري: نستخدم conversationId بدلاً من url
  onMessage?: MessageHandler;
  onConnectionChange?: ConnectionHandler;
  maxReconnectAttempts?: number;
  reconnectDelay?: number;
}



export class WebSocketClient {
  private ws: WebSocket | null = null;
  private conversationId: string;
  private onMessage?: MessageHandler;
  private onConnectionChange?: ConnectionHandler;
  private maxReconnectAttempts: number;
  private reconnectDelay: number;
  private reconnectAttempts = 0;
  private isIntentionallyClosed = false;
  private messageQueue: WSMessage[] = [];
  private isAuthenticated = false;
  private token: string | null = null;
  private state: 'CONNECTING' | 'OPEN' | 'CLOSING' | 'CLOSED' = 'CLOSED';
  private connectionSeq = 0;
  private reconnectTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(options: WSClientOptions) {
    this.conversationId = options.conversationId;
    this.onMessage = options.onMessage;
    this.onConnectionChange = options.onConnectionChange;
    this.maxReconnectAttempts = options.maxReconnectAttempts || 5;
    this.reconnectDelay = options.reconnectDelay || 1000;
  }

  private buildWsUrl(): string {
    const cleanConvId = this.conversationId.trim().replace(/\/+$/, '');
    // استخدم نفس عنوان الخادم الذي يعمل عليه الموبايل
    const host = 'fasateen.duckdns.org';
    const protocol = 'wss';
    return `${protocol}://${host}/ws/chat/${cleanConvId}`;
  }


  
  connect(token: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.ws?.readyState === WebSocket.OPEN && this.isAuthenticated) {
        resolve(true);
        return;
      }

      this.token = token;
      this.isIntentionallyClosed = false;
      this.reconnectAttempts = 0;
      this.state = 'CONNECTING';

      const seq = ++this.connectionSeq;
      const wsUrl = this.buildWsUrl();
      console.log('[WS] Connecting to:', wsUrl);


      console.log('[WS] connect() called with token:', token ? token.substring(0, 20) + '...' : 'null');

      try {
        const ws = new WebSocket(wsUrl);
        this.ws = ws;

        ws.onopen = () => {
          if (seq !== this.connectionSeq) return;
          console.log('✅ [WS] Connection opened, sending authentication...');

          console.log('[WS] onopen fired, sending auth...');

          try {
            ws.send(JSON.stringify({
              type: 'auth',
              token: token,  // بدون "Bearer "، كما في الموبايل
            }));
          } catch (error) {
            console.error('[WS] Failed to send auth message:', error);
            this.safeClose(ws, 4003, 'Auth send failed');
          }
        };

        ws.onmessage = (event) => {
          if (seq !== this.connectionSeq) return;
          try {
            const data: WSMessage = JSON.parse(event.data);

            if (data.type === 'auth_success') {
              console.log('✅ [WS] Authentication successful');
              this.isAuthenticated = true;
              this.state = 'OPEN';
              this.reconnectAttempts = 0;
              this.onConnectionChange?.(true);
              this.flushQueue();
              resolve(true);
              return;
            }

            if (data.type === 'auth_failed' || (data as any).code === 4001 || (data as any).code === 4003) {
              console.error('❌ [WS] Authentication failed:', (data as any).reason || 'Invalid token');
              this.isAuthenticated = false;
              this.state = 'CLOSED';
              this.onConnectionChange?.(false);
              reject(new Error('Authentication failed'));
              return;
            }

            if (data.type === 'pong') return;

            this.onMessage?.(data);
          } catch (error) {
            console.error('[WS] Failed to parse message:', error);
          }
        };

        ws.onerror = (event) => {
          if (seq !== this.connectionSeq) return;
          console.error('❌ [WS] WebSocket error:', (event as any).message || 'Unknown error');
        };

        ws.onclose = (event) => {
          if (seq !== this.connectionSeq) return;
          console.log(`🔴 [WS] Connection closed - Code: ${event.code}, Reason: ${event.reason || 'No reason'}`);
          this.ws = null;
          this.isAuthenticated = false;
          this.state = 'CLOSED';
          this.onConnectionChange?.(false);

          const isNormalClose = event.code === 1000;
          const isAuthFailure = event.code === 4001 || event.code === 4003;

          if (!this.isIntentionallyClosed && !isNormalClose && !isAuthFailure && this.reconnectAttempts < this.maxReconnectAttempts) {
            this.attemptReconnect();
          }
        };
      } catch (err) {
        console.error('[WS] Failed to initialize WebSocket:', err);
        this.state = 'CLOSED';
        reject(err);
      }
    });
  }

  private attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('[WS] Max reconnect attempts reached');
      return;
    }
    this.reconnectAttempts++;
    const delay = Math.min(this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1), 15000);
    console.log(`[WS] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);

    if (this.reconnectTimeout) clearTimeout(this.reconnectTimeout);
    this.reconnectTimeout = setTimeout(() => {
      if (this.token && !this.isIntentionallyClosed) {
        this.connect(this.token).catch(err => console.error('[WS] Reconnect failed:', err));
      }
    }, delay);
  }

  private safeClose(ws: WebSocket, code: number, reason: string) {
    try { ws.close(code, reason); } catch { /* ignore */ }
  }

  send(message: WSMessage): void {
    if (this.ws?.readyState === WebSocket.OPEN && this.isAuthenticated) {
      this.ws.send(JSON.stringify(message));
    } else {
      this.messageQueue.push(message);
    }
  }

  private flushQueue(): void {
    while (this.messageQueue.length) {
      const msg = this.messageQueue.shift();
      if (msg) this.send(msg);
    }
  }

  ping(): void {
    this.send({ type: 'ping' });
  }

  disconnect(): void {
    this.isIntentionallyClosed = true;
    if (this.reconnectTimeout) clearTimeout(this.reconnectTimeout);
    this.connectionSeq++; // إبطال أي إعادة اتصال معلقة
    if (this.ws) {
      try {
        this.state = 'CLOSING';
        this.ws.close(1000, 'User disconnect');
      } catch { }
      this.ws = null;
    }
    this.state = 'CLOSED';
    this.isAuthenticated = false;
    this.messageQueue = [];
  }

  isConnected(): boolean {
    return this.state === 'OPEN' && this.isAuthenticated && this.ws?.readyState === WebSocket.OPEN;
  }
}

// دوال مساعدة للتوافق مع الإصدار القديم (إذا لزم الأمر)
export function getChatWSUrl(conversationId: string): string {
  const cleanId = conversationId.trim().replace(/\/+$/, '');
  if (typeof window !== 'undefined') {
    const host = process.env.NEXT_PUBLIC_WS_HOST || window.location.hostname;
    return `wss://${host}/wss/chat/${cleanId}`;
  }
  return `wss://fasateen.duckdns.org/wss/chat/${cleanId}`;
}

export function getAuctionWSUrl(auctionId: string): string {
  const cleanId = auctionId.trim().replace(/\/+$/, '');
  if (typeof window !== 'undefined') {
    const host = process.env.NEXT_PUBLIC_WS_HOST || window.location.hostname;
    return `ws://${host}/ws/auctions/${cleanId}`;
  }
  return `wss://fasateen.duckdns.org/wss/auctions/${cleanId}`;
}