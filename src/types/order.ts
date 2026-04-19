export type OrderSide = 'buy' | 'sell';
export type OrderType = 'market' | 'limit' | 'stop';
export type OrderStatus = 'pending' | 'open' | 'closed' | 'cancelled';

export interface Position {
  id: number;
  pair: string;
  side: OrderSide;
  qty: number;
  entry: number;
  sl: number;
  tp: number;
  slEur: number;
  tpEur: number;
  margin: number;
}
