'use client';
import { useStore } from '@/store';
import { ALL_SCENARIOS } from '@/scenarios';
import { buildInitialScene, genLiqOrders } from '@/engine/tickGenerator';
import { PAIRS } from '@/lib/constants';
import { DIFFICULTY_ORDER } from '@/types/difficulty';

export default function ScenarioSelector() {
  const scIdx = useStore((s) => s.scIdx);
  const level = useStore((s) => s.level);
  const config = useStore((s) => s.config);
  const setScenario = useStore((s) => s.setScenario);
  const pair = useStore((s) => s.pair);

  const available = ALL_SCENARIOS.filter(
    (sc) => DIFFICULTY_ORDER[sc.availableFrom] <= DIFFICULTY_ORDER[level]
  );

  const selectScenario = (idx: number) => {
    const sc = ALL_SCENARIOS[idx];
    if (!sc) return;
    const s = useStore.getState();
    const P = PAIRS[pair];
    const { candles, volBars, keyLevel, breakoutAt, retestAt, finalPrice } = buildInitialScene(
      P.p, P.atr, sc
    );
    const liq = genLiqOrders(keyLevel, P.atr);
    s.setScenario(sc, idx);
    s.setPrice(finalPrice);
    s.initScene(candles, volBars, liq, keyLevel, finalPrice, breakoutAt, retestAt);
    s.setIsRunning(false);
    s.setSide(sc.dir > 0 ? 'buy' : 'sell');
  };

  const typeStyles: Record<string, string> = {
    bull: 'border-[var(--gbrd)] text-[var(--grn)] hover:brightness-150',
    bear: 'border-[var(--rbrd)] text-[var(--red)] hover:brightness-150',
    warn: 'border-[#5a3a00] text-[var(--org)] hover:brightness-150',
  };

  return (
    <div className="flex items-center gap-1 px-2.5 py-1.5 bg-[var(--bg2)] border-b border-[var(--b)] flex-wrap flex-shrink-0">
      <span className="text-[9px] text-[var(--mut)] uppercase tracking-wide mr-1">Scénario:</span>
      {ALL_SCENARIOS.map((sc, idx) => {
        const isAvail = DIFFICULTY_ORDER[sc.availableFrom] <= DIFFICULTY_ORDER[level];
        const isActive = scIdx === idx;
        return (
          <button
            key={sc.id}
            onClick={() => isAvail && selectScenario(idx)}
            title={!isAvail ? `Disponible en ${sc.availableFrom}` : sc.desc}
            className={`px-2 py-0.5 rounded text-[10px] border cursor-pointer transition-all
              ${typeStyles[sc.type]}
              ${isActive ? 'brightness-150 bg-[var(--bg3)]' : ''}
              ${!isAvail ? 'opacity-30 cursor-not-allowed' : ''}
            `}
          >
            {!isAvail && '🔒 '}{config.showScenarioPreAnnounced ? sc.label : `Scénario ${idx + 1}`}
          </button>
        );
      })}
    </div>
  );
}
