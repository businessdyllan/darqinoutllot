export interface TradeRecord {
  id: number;
  scenarioId: string;
  side: 'buy' | 'sell';
  pair: string;
  entryPrice: number;
  exitPrice: number;
  qty: number;
  pnl: number;
  closedAt: number;
  reason: string;
}

export interface PortfolioStats {
  totalTrades: number;
  winCount: number;
  lossCount: number;
  winRate: number;
  avgRR: number;
  maxDrawdown: number;
  profitFactor: number;
  currentBalance: number;
}

export interface PnLPoint {
  timestamp: number;
  balance: number;
}

export interface LeaderboardEntry {
  playerName: string;
  balance: number;
  winRate: number;
  date: number;
}
