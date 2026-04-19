'use client';
import { useRef } from 'react';
import { useStore } from '@/store';
import { INITIAL_BALANCE } from '@/lib/constants';
import { drawPnLChart } from '@/lib/chartMath';
import { useEffect } from 'react';

export default function PortfolioTab() {
  const balance = useStore((s) => s.balance);
  const pnlTotal = useStore((s) => s.pnlTotal);
  const tradeHistory = useStore((s) => s.tradeHistory);
  const pnlSeries = useStore((s) => s.pnlSeries);
  const resetPortfolio = useStore((s) => s.resetPortfolio);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const wins = tradeHistory.filter((t) => t.pnl > 0).length;
  const losses = tradeHistory.filter((t) => t.pnl <= 0).length;
  const winRate = tradeHistory.length > 0 ? (wins / tradeHistory.length) * 100 : 0;
  const grossProfit = tradeHistory.filter((t) => t.pnl > 0).reduce((a, t) => a + t.pnl, 0);
  const grossLoss = Math.abs(tradeHistory.filter((t) => t.pnl <= 0).reduce((a, t) => a + t.pnl, 0));
  const profitFactor = grossLoss > 0 ? (grossProfit / grossLoss).toFixed(2) : '—';

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    cv.width = cv.parentElement?.offsetWidth || 260;
    cv.height = cv.parentElement?.offsetHeight || 100;
    const ctx = cv.getContext('2d');
    if (ctx) drawPnLChart(ctx, cv.width, cv.height, pnlSeries, INITIAL_BALANCE);
  }, [pnlSeries]);

  return (
    <div className="space-y-3">
      {/* P&L Chart */}
      <div className="bg-[var(--bg3)] border border-[var(--b2)] rounded-lg overflow-hidden">
        <div className="text-[9px] text-[var(--mut)] uppercase tracking-wide px-2 pt-1.5">
          Courbe de Capital
        </div>
        <div className="h-24 relative">
          <canvas ref={canvasRef} className="w-full h-full block" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-1.5">
        {[
          { label: 'Balance', value: `${Math.round(balance).toLocaleString()} €`, color: 'var(--blu)' },
          { label: 'PnL Total', value: `${pnlTotal >= 0 ? '+' : ''}${Math.round(pnlTotal).toLocaleString()} €`, color: pnlTotal >= 0 ? 'var(--grn)' : 'var(--red)' },
          { label: 'Win Rate', value: `${winRate.toFixed(0)}%`, color: winRate >= 50 ? 'var(--grn)' : 'var(--red)' },
          { label: 'Trades', value: `${tradeHistory.length}`, color: 'var(--txt)' },
          { label: 'Gains', value: `${wins}`, color: 'var(--grn)' },
          { label: 'Pertes', value: `${losses}`, color: 'var(--red)' },
          { label: 'Profit Factor', value: `${profitFactor}`, color: 'var(--org)' },
          { label: 'Perf.', value: `${pnlTotal >= 0 ? '+' : ''}${((pnlTotal / INITIAL_BALANCE) * 100).toFixed(1)}%`, color: pnlTotal >= 0 ? 'var(--grn)' : 'var(--red)' },
        ].map((stat) => (
          <div key={stat.label} className="bg-[var(--bg3)] border border-[var(--b2)] rounded px-2 py-1.5">
            <div className="text-[9px] text-[var(--mut)] uppercase tracking-wide">{stat.label}</div>
            <div className="text-[13px] font-bold font-mono" style={{ color: stat.color }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Trade History */}
      <div>
        <div className="text-[9px] text-[var(--mut)] uppercase tracking-wide mb-1.5">
          Historique ({tradeHistory.length} trades)
        </div>
        {tradeHistory.length === 0 ? (
          <div className="text-center text-[var(--mut)] text-[11px] py-4">
            Aucun trade fermé
          </div>
        ) : (
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {[...tradeHistory].reverse().map((t) => (
              <div
                key={t.id}
                className={`flex items-center justify-between px-2 py-1 rounded border text-[10px] font-mono
                  ${t.pnl > 0
                    ? 'border-[var(--gbrd)] bg-[var(--gdim)]'
                    : 'border-[var(--rbrd)] bg-[var(--rdim)]'
                  }`}
              >
                <span className="text-[var(--mut)]">
                  {t.side === 'buy' ? '▲' : '▼'} {t.pair}
                </span>
                <span className="text-[var(--mut)]">
                  {Math.round(t.entryPrice).toLocaleString()} → {Math.round(t.exitPrice).toLocaleString()}
                </span>
                <span
                  className="font-bold"
                  style={{ color: t.pnl > 0 ? 'var(--grn)' : 'var(--red)' }}
                >
                  {t.pnl >= 0 ? '+' : ''}{Math.round(t.pnl)} €
                </span>
                <span className="text-[var(--mut)] text-[9px]">{t.reason}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reset */}
      <button
        onClick={() => {
          if (confirm('Réinitialiser le portfolio ?')) resetPortfolio();
        }}
        className="w-full py-1.5 rounded text-[11px] border border-[var(--b2)] bg-[var(--bg3)] text-[var(--mut)] hover:text-[var(--txt)] cursor-pointer transition-all"
      >
        Réinitialiser le portfolio
      </button>
    </div>
  );
}
