'use client';
import { RefObject, useEffect, useCallback } from 'react';
import { useStore } from '@/store';
import { drawChart, drawHeatmap, getVisRange } from '@/lib/chartMath';
import { PAIRS } from '@/lib/constants';

export function useChartRenderer(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  heatmapRef: RefObject<HTMLCanvasElement | null>
) {
  const candles = useStore((s) => s.candles);
  const price = useStore((s) => s.price);
  const keyLevel = useStore((s) => s.keyLevel);
  const positions = useStore((s) => s.positions);
  const viewport = useStore((s) => s.viewport);
  const liqOrders = useStore((s) => s.liqOrders);
  const tickN = useStore((s) => s.tickN);
  const showBid = useStore((s) => s.showBid);
  const showAsk = useStore((s) => s.showAsk);
  const scenario = useStore((s) => s.scenario);
  const side = useStore((s) => s.side);
  const slEur = useStore((s) => s.slEur);
  const tpEur = useStore((s) => s.tpEur);
  const lots = useStore((s) => s.lots);
  const pair = useStore((s) => s.pair);

  const draw = useCallback(() => {
    const cv = canvasRef.current;
    const hv = heatmapRef.current;
    if (!cv) return;

    const W = cv.parentElement?.offsetWidth || 0;
    const H = cv.parentElement?.offsetHeight || 0;
    if (!W || !H) return;

    cv.width = W;
    cv.height = H;
    if (hv) { hv.width = W; hv.height = H; }

    const { start, end } = getVisRange(W, candles.length, viewport);
    const vis = candles.slice(start, end);

    // Compute preview SL/TP prices
    const P = PAIRS[pair];
    const slPts = slEur > 0 && lots > 0 ? slEur / lots : 0;
    const tpPts = tpEur > 0 && lots > 0 ? tpEur / lots : 0;
    const previewSl = slPts > 0 ? (side === 'buy' ? price - slPts : price + slPts) : 0;
    const previewTp = tpPts > 0 ? (side === 'buy' ? price + tpPts : price - tpPts) : 0;

    const panOffset = Math.round(viewport.panOffsetX + viewport.panDeltaX);
    const showPanIndicator = panOffset > 0;

    const ctx = cv.getContext('2d');
    if (ctx) {
      drawChart(
        ctx, W, H, vis, price, keyLevel, positions, viewport, tickN,
        previewSl, previewTp, scenario?.dir ?? 1, showPanIndicator, panOffset
      );
    }

    if (hv) {
      const hctx = hv.getContext('2d');
      if (hctx) {
        drawHeatmap(hctx, W, H, vis, price, keyLevel, positions, viewport, liqOrders, tickN, showBid, showAsk);
      }
    }
  }, [candles, price, keyLevel, positions, viewport, liqOrders, tickN, showBid, showAsk, scenario, side, slEur, tpEur, lots, pair]);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ro = new ResizeObserver(() => draw());
    ro.observe(cv.parentElement!);
    return () => ro.disconnect();
  }, [draw]);
}
