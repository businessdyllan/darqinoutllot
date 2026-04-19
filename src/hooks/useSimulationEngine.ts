'use client';
import { useEffect, useRef } from 'react';
import { useStore } from '@/store';
import { generateTick, genLiqOrders } from '@/engine/tickGenerator';
import { checkSlTp, calcPnl, buildTradeRecord } from '@/engine/orderEngine';
import { PAIRS } from '@/lib/constants';

export function useSimulationEngine() {
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isRunning = useStore((s) => s.isRunning);
  const tickInterval = useStore((s) => s.tickInterval);
  const pair = useStore((s) => s.pair);
  const scenario = useStore((s) => s.scenario);
  const candles = useStore((s) => s.candles);
  const cvd = useStore((s) => s.cvd);
  const tickN = useStore((s) => s.tickN);
  const price = useStore((s) => s.price);
  const keyLevel = useStore((s) => s.keyLevel);
  const breakoutAt = useStore((s) => s.breakoutAt);
  const retestAt = useStore((s) => s.retestAt);
  const stepTriggered = useStore((s) => s.stepTriggered);
  const liqOrders = useStore((s) => s.liqOrders);

  const store = useStore.getState;

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isRunning || !scenario) return;

    timerRef.current = setInterval(() => {
      const s = store();
      if (!s.scenario) return;
      const P = PAIRS[s.pair];
      const result = generateTick(
        s.price,
        s.cvd,
        s.candles.length,
        s.scenario,
        P.atr,
        s.breakoutAt,
        s.retestAt,
        s.stepTriggered
      );

      s.appendCandle(result.candle, result.volBar);
      s.setPrice(result.newPrice);
      s.setCvd(result.newCvd);
      s.setTickN(s.tickN + 1);
      s.setCurrentPhase(result.phase);

      if (result.triggeredStepIdx !== null) {
        s.triggerStep(result.triggeredStepIdx);
        if (result.triggeredStepIdx === 3) {
          s.setSignalReady(true);
        }
      }

      // Update liq orders (slight drift for non-whales)
      const updated = s.liqOrders.map((o) => ({
        ...o,
        price: o.whale
          ? o.price
          : o.price + Math.round((Math.random() - 0.5) * P.atr * 0.005),
        age: o.age + 1,
      }));
      s.setLiqOrders(updated);

      // Check SL/TP hits
      const hits = checkSlTp(s.positions, result.newPrice);
      hits.forEach(({ id, reason }) => {
        const pos = s.positions.find((p) => p.id === id);
        if (!pos) return;
        const pnl = calcPnl(pos, result.newPrice);
        const trade = buildTradeRecord(pos, result.newPrice, reason, s.scenario!.id);
        s.removePosition(id);
        const newBal = s.balance + pos.margin + pnl;
        s.setBalance(newBal);
        s.addPnl(pnl);
        s.addTrade(trade);
        s.pnlSeries.push({ timestamp: Date.now(), balance: newBal });
        s.toast(
          `${reason} — PnL: ${pnl >= 0 ? '+' : ''}${Math.round(pnl)} €`,
          pnl >= 0 ? 'buy' : 'sell'
        );
      });

      // Sync hist slider
      if (s.histOffset === 0) {
        const n = s.candles.length;
        const pct = n > 1 ? Math.round((1 - s.histOffset / Math.max(1, n - 1)) * 100) : 100;
        // slider synced via store
      }
    }, useStore.getState().tickInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, tickInterval, scenario?.id]);
}
