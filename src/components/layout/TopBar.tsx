'use client';
import { useStore } from '@/store';
import { PAIRS } from '@/lib/constants';
import { ALL_SCENARIOS } from '@/scenarios';
import { buildInitialScene, genLiqOrders } from '@/engine/tickGenerator';
import { DIFFICULTY_CONFIGS } from '@/types/difficulty';

const PHASE_LABELS: Record<string, string> = {
  consolidation: 'Consolidation',
  post: 'Post-breakout',
  retest: 'Retest',
  fakeout: 'Fakeout !',
  breakout: 'BREAKOUT !',
};

export default function TopBar() {
  const pair = useStore((s) => s.pair);
  const price = useStore((s) => s.price);
  const candles = useStore((s) => s.candles);
  const cvd = useStore((s) => s.cvd);
  const currentPhase = useStore((s) => s.currentPhase);
  const balance = useStore((s) => s.balance);
  const pnlTotal = useStore((s) => s.pnlTotal);
  const level = useStore((s) => s.level);
  const config = useStore((s) => s.config);
  const setPair = useStore((s) => s.setPair);
  const setShowDifficultyModal = useStore((s) => s.setShowDifficultyModal);

  const store = useStore.getState;

  const first = candles.length ? candles[0].open : price;
  const chgPct = ((price - first) / first) * 100;
  const up = chgPct >= 0;
  const phaseLabel = PHASE_LABELS[currentPhase] || currentPhase;
  const phaseColor =
    ['breakout', 'fakeout'].includes(currentPhase)
      ? 'var(--org)'
      : currentPhase === 'post'
      ? 'var(--grn)'
      : 'var(--blu)';

  const handleSetPair = (p: string) => {
    const s = store();
    if (!s.scenario) return;
    const P = PAIRS[p];
    const { candles, volBars, keyLevel, breakoutAt, retestAt, finalPrice } = buildInitialScene(
      P.p, P.atr, s.scenario
    );
    const liq = genLiqOrders(keyLevel, P.atr);
    s.setPair(p);
    s.setPrice(finalPrice);
    s.initScene(candles, volBars, liq, keyLevel, finalPrice, breakoutAt, retestAt);
    s.setIsRunning(false);
  };

  return (
    <div className="flex items-center gap-2 h-10 bg-[var(--bg2)] border-b border-[var(--b)] px-3 flex-shrink-0 overflow-x-auto">
      <div className="text-[13px] font-bold text-[var(--wht)] whitespace-nowrap">
        Price<span className="text-[var(--blu)]">Pro</span>
      </div>

      {Object.keys(PAIRS).map((p) => (
        <button
          key={p}
          onClick={() => handleSetPair(p)}
          className={`px-2 py-1 rounded text-[11px] font-medium border transition-all cursor-pointer whitespace-nowrap
            ${pair === p
              ? 'bg-[var(--bludim)] border-[var(--blu)] text-[var(--blu)]'
              : 'bg-[var(--bg3)] border-[var(--b2)] text-[var(--mut)] hover:text-[var(--txt)]'
            }`}
        >
          {PAIRS[p].sym}
        </button>
      ))}

      <span
        className="text-[17px] font-bold font-mono ml-1"
        style={{ color: up ? 'var(--grn)' : 'var(--red)' }}
      >
        {price.toLocaleString()}
      </span>
      <span
        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${up ? 'bg-[var(--gdim)] text-[var(--grn)]' : 'bg-[var(--rdim)] text-[var(--red)]'}`}
      >
        {up ? '+' : ''}{chgPct.toFixed(2)}%
      </span>

      <div className="flex flex-col ml-2">
        <span className="text-[9px] text-[var(--mut)] uppercase tracking-wide">CVD</span>
        <span className={`text-[12px] font-bold font-mono ${cvd >= 0 ? 'text-[var(--grn)]' : 'text-[var(--red)]'}`}>
          {cvd >= 0 ? '+' : ''}{Math.round(cvd / 1000)}K
        </span>
      </div>

      <div className="flex flex-col">
        <span className="text-[9px] text-[var(--mut)] uppercase tracking-wide">Phase</span>
        <span className="text-[12px] font-bold font-mono" style={{ color: phaseColor }}>
          {phaseLabel}
        </span>
      </div>

      <div className="ml-auto flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => setShowDifficultyModal(true)}
          className="bg-[var(--bg3)] border border-[var(--b2)] rounded px-2 py-1 text-[11px] font-semibold hover:border-[var(--blu)] transition-all cursor-pointer"
        >
          {config.emoji} {config.labelFr}
        </button>
        <div className="bg-[var(--bg3)] border border-[var(--b2)] rounded px-2 py-1 text-[11px] font-semibold">
          Balance: <span className="text-[var(--blu)]">{Math.round(balance).toLocaleString()} €</span>
        </div>
        <div className="bg-[var(--bg3)] border border-[var(--b2)] rounded px-2 py-1 text-[11px] font-semibold">
          PnL: <span style={{ color: pnlTotal >= 0 ? 'var(--grn)' : 'var(--red)' }}>
            {pnlTotal >= 0 ? '+' : ''}{Math.round(pnlTotal).toLocaleString()} €
          </span>
        </div>
      </div>
    </div>
  );
}
