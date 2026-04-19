'use client';
import { useStore } from '@/store';
import { calcPnl, buildTradeRecord } from '@/engine/orderEngine';

export default function PositionChips() {
  const positions = useStore((s) => s.positions);
  const price = useStore((s) => s.price);
  const removePosition = useStore((s) => s.removePosition);
  const setBalance = useStore((s) => s.setBalance);
  const balance = useStore((s) => s.balance);
  const addPnl = useStore((s) => s.addPnl);
  const addTrade = useStore((s) => s.addTrade);
  const toast = useStore((s) => s.toast);
  const scenario = useStore((s) => s.scenario);
  const pnlSeries = useStore((s) => s.pnlSeries);

  const closePos = (id: number) => {
    const s = useStore.getState();
    const pos = s.positions.find((p) => p.id === id);
    if (!pos) return;
    const pnl = calcPnl(pos, price);
    const trade = buildTradeRecord(pos, price, 'Manuel', scenario?.id || '');
    const newBal = balance + pos.margin + pnl;
    removePosition(id);
    setBalance(newBal);
    addPnl(pnl);
    addTrade(trade);
    pnlSeries.push({ timestamp: Date.now(), balance: newBal });
    toast(`Fermé — PnL: ${pnl >= 0 ? '+' : ''}${Math.round(pnl)} €`, pnl >= 0 ? 'buy' : 'sell');
  };

  if (!positions.length) return null;

  return (
    <div className="flex gap-1 flex-wrap px-3 py-1.5 border-t border-[var(--b)] min-h-[26px]">
      {positions.map((p) => {
        const pnl = calcPnl(p, price);
        return (
          <div
            key={p.id}
            className={`flex items-center gap-1 px-1.5 py-0.5 rounded border text-[10px] font-mono
              ${p.side === 'buy'
                ? 'border-[var(--gbrd)] bg-[var(--gdim)]'
                : 'border-[var(--rbrd)] bg-[var(--rdim)]'
              }`}
          >
            <span className="text-[var(--mut)] text-[9px]">
              {p.side === 'buy' ? 'L' : 'S'} {p.qty}
            </span>
            <span className="text-[var(--mut)] text-[9px]">
              @{Math.round(p.entry).toLocaleString()}
            </span>
            <span className={`font-bold ${pnl >= 0 ? 'text-[var(--grn)]' : 'text-[var(--red)]'}`}>
              {pnl >= 0 ? '+' : ''}{Math.round(pnl)}€
            </span>
            <button
              onClick={() => closePos(p.id)}
              className="bg-none border-none text-[var(--mut)] cursor-pointer text-[11px] px-0.5 hover:text-[var(--red)]"
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
}
