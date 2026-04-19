import { Position } from '@/types/order';
import { TradeRecord } from '@/types/portfolio';

export function checkSlTp(
  positions: Position[],
  price: number
): { id: number; reason: string }[] {
  const hits: { id: number; reason: string }[] = [];
  positions.forEach((p) => {
    if (p.sl > 0) {
      if (p.side === 'buy' && price <= p.sl) hits.push({ id: p.id, reason: 'SL' });
      if (p.side === 'sell' && price >= p.sl) hits.push({ id: p.id, reason: 'SL' });
    }
    if (p.tp > 0) {
      if (p.side === 'buy' && price >= p.tp) hits.push({ id: p.id, reason: 'TP' });
      if (p.side === 'sell' && price <= p.tp) hits.push({ id: p.id, reason: 'TP' });
    }
  });
  return hits;
}

export function calcPnl(pos: Position, closePrice: number): number {
  const cp = closePrice * (pos.side === 'buy' ? 0.9999 : 1.0001);
  return pos.side === 'buy'
    ? (cp - pos.entry) * pos.qty
    : (pos.entry - cp) * pos.qty;
}

export function buildTradeRecord(
  pos: Position,
  closePrice: number,
  reason: string,
  scenarioId: string
): TradeRecord {
  const pnl = calcPnl(pos, closePrice);
  return {
    id: pos.id,
    scenarioId,
    side: pos.side,
    pair: pos.pair,
    entryPrice: pos.entry,
    exitPrice: closePrice,
    qty: pos.qty,
    pnl,
    closedAt: Date.now(),
    reason,
  };
}
