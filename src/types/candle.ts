export type Timeframe = '1m' | '5m' | '15m' | '1h' | '4h';

export interface Candle {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  delta: number;
  phase: string;
  breakout?: boolean;
  fakeout?: boolean;
}

export interface ViewportState {
  panOffsetX: number;
  panDeltaX: number;
  panOffsetY: number;
  panDeltaY: number;
}

export interface LiqOrder {
  price: number;
  side: 'bid' | 'ask';
  vol: number;
  whale: boolean;
  age: number;
}
