'use client';
import { useStore } from '@/store';
import { SPEED_PRESETS } from '@/lib/constants';

const TIMEFRAMES = ['1m', '5m', '15m', '1H', '4H'];

export default function ChartToolbar() {
  const isRunning = useStore((s) => s.isRunning);
  const tickInterval = useStore((s) => s.tickInterval);
  const activeTimeframe = useStore((s) => s.activeTimeframe);
  const showBid = useStore((s) => s.showBid);
  const showAsk = useStore((s) => s.showAsk);
  const setIsRunning = useStore((s) => s.setIsRunning);
  const setTickInterval = useStore((s) => s.setTickInterval);
  const setActiveTimeframe = useStore((s) => s.setActiveTimeframe);
  const setShowBid = useStore((s) => s.setShowBid);
  const setShowAsk = useStore((s) => s.setShowAsk);
  const scenario = useStore((s) => s.scenario);
  const config = useStore((s) => s.config);

  const handleReset = () => {
    const s = useStore.getState();
    if (!s.scenario) return;
    const { buildInitialScene, genLiqOrders } = require('@/engine/tickGenerator');
    const { PAIRS } = require('@/lib/constants');
    const P = PAIRS[s.pair];
    const { candles, volBars, keyLevel, breakoutAt, retestAt, finalPrice } = buildInitialScene(P.p, P.atr, s.scenario);
    const liq = genLiqOrders(keyLevel, P.atr);
    s.setIsRunning(false);
    s.setPrice(finalPrice);
    s.initScene(candles, volBars, liq, keyLevel, finalPrice, breakoutAt, retestAt);
    s.resetPortfolio();
  };

  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[var(--bg2)] border-b border-[var(--b)] flex-wrap flex-shrink-0">
      {TIMEFRAMES.map((tf) => (
        <button
          key={tf}
          onClick={() => setActiveTimeframe(tf)}
          className={`px-2 py-0.5 rounded text-[11px] cursor-pointer transition-all
            ${activeTimeframe === tf
              ? 'bg-[var(--bg3)] text-[var(--txt)]'
              : 'bg-transparent text-[var(--mut)] hover:bg-[var(--bg3)] hover:text-[var(--txt)]'
            }`}
        >
          {tf}
        </button>
      ))}

      <div className="w-px h-3.5 bg-[var(--b2)] mx-0.5" />

      <button
        onClick={() => setIsRunning(!isRunning)}
        className={`px-3 py-1 rounded text-[11px] font-bold cursor-pointer border-none ${
          isRunning ? 'bg-[var(--b2)] text-[var(--txt)]' : 'bg-[var(--grn)] text-black'
        }`}
      >
        {isRunning ? '⏸ Pause' : '▶ Play'}
      </button>

      <button
        onClick={handleReset}
        className="px-2 py-1 rounded text-[10px] border border-[var(--b2)] bg-transparent text-[var(--mut)] hover:bg-[var(--bg3)] hover:text-[var(--txt)] cursor-pointer"
      >
        ↺ Reset
      </button>

      <div className="w-px h-3.5 bg-[var(--b2)] mx-0.5" />

      <span className="text-[9px] text-[var(--mut)] uppercase tracking-wide">Vitesse</span>
      <div className="flex gap-1">
        {SPEED_PRESETS.map((sp) => (
          <button
            key={sp.label}
            onClick={() => setTickInterval(sp.ms)}
            className={`px-1.5 py-0.5 rounded text-[9px] border cursor-pointer transition-all
              ${tickInterval === sp.ms
                ? 'bg-[var(--bludim)] border-[var(--blu)] text-[var(--blu)]'
                : 'bg-transparent border-[var(--b2)] text-[var(--mut)] hover:bg-[var(--bg3)] hover:text-[var(--txt)]'
              }`}
          >
            {sp.label}
          </button>
        ))}
      </div>

      <div className="w-px h-3.5 bg-[var(--b2)] mx-0.5" />

      <button
        onClick={() => setShowBid(!showBid)}
        className={`px-2 py-0.5 rounded text-[10px] font-semibold border cursor-pointer transition-all
          ${showBid
            ? 'border-[var(--gbrd)] bg-[var(--gdim)] text-[var(--grn)]'
            : 'border-[var(--b2)] bg-[var(--bg3)] text-[var(--mut)]'
          }`}
      >
        Bid wall
      </button>
      <button
        onClick={() => setShowAsk(!showAsk)}
        className={`px-2 py-0.5 rounded text-[10px] font-semibold border cursor-pointer transition-all
          ${showAsk
            ? 'border-[var(--rbrd)] bg-[var(--rdim)] text-[var(--red)]'
            : 'border-[var(--b2)] bg-[var(--bg3)] text-[var(--mut)]'
          }`}
      >
        Ask wall
      </button>

      <span className="text-[9px] text-[var(--hint)] ml-1">ESPACE+glisser pour naviguer</span>
    </div>
  );
}
