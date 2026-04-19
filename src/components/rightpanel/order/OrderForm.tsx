'use client';
import { useStore } from '@/store';
import { PAIRS } from '@/lib/constants';
import { Position } from '@/types/order';
import { calcPnl, buildTradeRecord } from '@/engine/orderEngine';

export default function OrderForm() {
  const side = useStore((s) => s.side);
  const orderType = useStore((s) => s.orderType);
  const lots = useStore((s) => s.lots);
  const slEur = useStore((s) => s.slEur);
  const tpEur = useStore((s) => s.tpEur);
  const price = useStore((s) => s.price);
  const pair = useStore((s) => s.pair);
  const balance = useStore((s) => s.balance);
  const config = useStore((s) => s.config);
  const scenario = useStore((s) => s.scenario);

  const setSide = useStore((s) => s.setSide);
  const setOrderType = useStore((s) => s.setOrderType);
  const setLots = useStore((s) => s.setLots);
  const setSlEur = useStore((s) => s.setSlEur);
  const setTpEur = useStore((s) => s.setTpEur);
  const addPosition = useStore((s) => s.addPosition);
  const setBalance = useStore((s) => s.setBalance);
  const toast = useStore((s) => s.toast);

  const P = PAIRS[pair];
  const margin = lots > 0 ? (lots * price) / P.lev : 0;
  const slPts = slEur > 0 && lots > 0 ? slEur / lots : 0;
  const tpPts = tpEur > 0 && lots > 0 ? tpEur / lots : 0;
  const slPx = slPts > 0 ? (side === 'buy' ? price - slPts : price + slPts) : 0;
  const tpPx = tpPts > 0 ? (side === 'buy' ? price + tpPts : price - tpPts) : 0;
  const rr = slEur > 0 && tpEur > 0 ? (tpEur / slEur).toFixed(1) : '—';

  const execOrder = () => {
    if (lots <= 0) return toast('Volume invalide', 'info');
    const ep = price * (side === 'buy' ? 1.0001 : 0.9999);
    if (margin > balance) return toast('Marge insuffisante', 'info');
    const pos: Position = {
      id: Date.now(),
      pair,
      side,
      qty: lots,
      entry: ep,
      sl: slPx,
      tp: tpPx,
      slEur,
      tpEur,
      margin,
    };
    addPosition(pos);
    setBalance(balance - margin);
    toast(
      `${side === 'buy' ? 'Long' : 'Short'} ${lots} @ ${Math.round(ep).toLocaleString()}${slPx ? ' | SL ' + Math.round(slPx).toLocaleString() : ''}`,
      side
    );
  };

  return (
    <div className="border-t border-[var(--b)] p-3 flex-shrink-0">
      {/* Side toggle */}
      <div className="flex rounded overflow-hidden border border-[var(--b2)] mb-2">
        <button
          onClick={() => setSide('buy')}
          className={`flex-1 py-1.5 text-[11px] font-bold cursor-pointer border-none transition-all
            ${side === 'buy' ? 'bg-[var(--gdim)] text-[var(--grn)]' : 'bg-transparent text-[var(--mut)]'}`}
        >
          ▲ LONG
        </button>
        <button
          onClick={() => setSide('sell')}
          className={`flex-1 py-1.5 text-[11px] font-bold cursor-pointer border-none transition-all
            ${side === 'sell' ? 'bg-[var(--rdim)] text-[var(--red)]' : 'bg-transparent text-[var(--mut)]'}`}
        >
          ▼ SHORT
        </button>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-1.5 mb-1.5">
        <div className="flex flex-col gap-1">
          <label className="text-[9px] text-[var(--mut)] uppercase tracking-wide">Lots</label>
          <input
            type="number"
            step={0.01}
            value={lots}
            onChange={(e) => setLots(parseFloat(e.target.value) || 0.1)}
            className="bg-[var(--bg3)] border border-[var(--b2)] text-[var(--txt)] rounded px-1.5 py-1 text-[12px] font-mono outline-none focus:border-[var(--blu)] w-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[9px] text-[var(--mut)] uppercase tracking-wide">Type</label>
          <select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value as any)}
            className="bg-[var(--bg3)] border border-[var(--b2)] text-[var(--txt)] rounded px-1.5 py-1 text-[12px] outline-none focus:border-[var(--blu)] w-full cursor-pointer"
          >
            <option value="market">Market</option>
            <option value="limit">Limit</option>
            <option value="stop">Stop</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[9px] text-[var(--mut)] uppercase tracking-wide">Stop-Loss (€)</label>
          <input
            type="number"
            placeholder="ex: 200"
            value={slEur || ''}
            onChange={(e) => setSlEur(+e.target.value || 0)}
            className="bg-[var(--bg3)] border border-[var(--b2)] text-[var(--txt)] rounded px-1.5 py-1 text-[12px] font-mono outline-none focus:border-[var(--blu)] w-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[9px] text-[var(--mut)] uppercase tracking-wide">Take-Profit (€)</label>
          <input
            type="number"
            placeholder="ex: 400"
            value={tpEur || ''}
            onChange={(e) => setTpEur(+e.target.value || 0)}
            className="bg-[var(--bg3)] border border-[var(--b2)] text-[var(--txt)] rounded px-1.5 py-1 text-[12px] font-mono outline-none focus:border-[var(--blu)] w-full"
          />
        </div>
      </div>

      {/* SL/TP Suggestions */}
      {config.showSlTpSuggestions && scenario && (
        <div className="text-[9px] text-[var(--org)] mb-1.5 bg-[#1e1000] border border-[#5a3a00] rounded px-2 py-1">
          💡 Suggestion : SL ~{Math.round(PAIRS[pair].atr * 0.3)} € | TP ~{Math.round(PAIRS[pair].atr * 0.6)} €
        </div>
      )}

      {/* R:R info */}
      <div className="flex flex-wrap gap-2 text-[10px] mb-1.5">
        <span>Mrg:<span className="text-[var(--blu)] ml-1 font-mono">{Math.round(margin).toLocaleString()}€</span></span>
        {slPx > 0 && <span>SL@:<span className="text-[var(--red)] ml-1 font-mono">{Math.round(slPx).toLocaleString()}</span></span>}
        {tpPx > 0 && <span>TP@:<span className="text-[var(--grn)] ml-1 font-mono">{Math.round(tpPx).toLocaleString()}</span></span>}
        <span>R:R <span className="text-[var(--blu)]">{rr !== '—' ? `1:${rr}` : '—'}</span></span>
      </div>

      {/* Execute */}
      <button
        onClick={execOrder}
        className={`w-full py-2 rounded text-[12px] font-bold cursor-pointer border-none transition-all active:scale-[.98]
          ${side === 'buy' ? 'bg-[var(--grn)] text-black' : 'bg-[var(--red)] text-white'}`}
      >
        {side === 'buy' ? 'LONG' : 'SHORT'} {PAIRS[pair].sym}
      </button>
    </div>
  );
}
