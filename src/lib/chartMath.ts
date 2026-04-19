import { Candle, LiqOrder, ViewportState } from '@/types/candle';
import { Position } from '@/types/order';
import { COLORS } from './constants';

const PAD = { l: 8, r: 74, t: 18, b: 14 };

export function getVisRange(W: number, candlesLen: number, vp: ViewportState) {
  const maxVis = Math.max(10, Math.floor((W - 80) / 6));
  const totalOff = Math.round(vp.panOffsetX + vp.panDeltaX);
  const end = Math.max(1, candlesLen - Math.max(0, totalOff));
  const start = Math.max(0, end - maxVis);
  return { start, end };
}

export function priceRange(
  vis: Candle[],
  price: number,
  keyLevel: number,
  positions: Position[],
  vp: ViewportState
) {
  if (!vis.length) return { mn: price * 0.99, mx: price * 1.01 };
  const all = vis.flatMap((c) => [c.high, c.low]);
  all.push(keyLevel);
  positions.forEach((p) => {
    if (p.sl > 0) all.push(p.sl);
    if (p.tp > 0) all.push(p.tp);
  });
  const mn = Math.min(...all);
  const mx = Math.max(...all);
  const pad = (mx - mn) * 0.08;
  const yShift = vp.panOffsetY + vp.panDeltaY;
  return { mn: mn - pad + yShift, mx: mx + pad + yShift };
}

export function drawChart(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  vis: Candle[],
  price: number,
  keyLevel: number,
  positions: Position[],
  vp: ViewportState,
  tickN: number,
  previewSl: number,
  previewTp: number,
  scenarioDir: number,
  showPanIndicator: boolean,
  panOffset: number
) {
  const { mn, mx } = priceRange(vis, price, keyLevel, positions, vp);
  const n = vis.length;
  const cw = n ? (W - PAD.l - PAD.r) / n : 8;
  const py = (v: number) => ((mx - v) / (mx - mn)) * (H - PAD.t - PAD.b) + PAD.t;
  const cx = (i: number) => PAD.l + i * cw + cw * 0.5;

  ctx.clearRect(0, 0, W, H);

  // Grid
  for (let i = 0; i <= 6; i++) {
    const y = PAD.t + (H - PAD.t - PAD.b) * (i / 6);
    const v = mx - (mx - mn) * (i / 6);
    ctx.strokeStyle = 'rgba(42,48,70,.5)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(PAD.l, y);
    ctx.lineTo(W - PAD.r, y);
    ctx.stroke();
    ctx.fillStyle = '#4a5068';
    ctx.font = '9px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(Math.round(v).toLocaleString(), W - PAD.r + 4, y + 3);
  }

  // S/R level
  if (keyLevel > mn && keyLevel < mx) {
    const y = py(keyLevel);
    ctx.fillStyle = 'rgba(74,158,255,.06)';
    ctx.fillRect(PAD.l, y - 4, W - PAD.l - PAD.r, 8);
    ctx.strokeStyle = 'rgba(74,158,255,.85)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(PAD.l, y);
    ctx.lineTo(W - PAD.r, y);
    ctx.stroke();
    ctx.fillStyle = 'rgba(74,158,255,.85)';
    ctx.font = 'bold 9px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(
      (scenarioDir < 0 ? 'SUPPORT ' : 'RÉSISTANCE ') + Math.round(keyLevel).toLocaleString(),
      PAD.l + 3,
      y - 4
    );
  }

  // Position SL/TP lines
  positions.forEach((pos) => {
    ctx.setLineDash([5, 3]);
    if (pos.sl > 0 && pos.sl > mn && pos.sl < mx) {
      const y = py(pos.sl);
      ctx.strokeStyle = 'rgba(240,48,80,.75)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(PAD.l, y);
      ctx.lineTo(W - PAD.r, y);
      ctx.stroke();
      ctx.fillStyle = 'rgba(240,48,80,.9)';
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'right';
      ctx.fillText('SL @' + Math.round(pos.sl).toLocaleString(), W - PAD.r - 2, y - 2);
    }
    if (pos.tp > 0 && pos.tp > mn && pos.tp < mx) {
      const y = py(pos.tp);
      ctx.strokeStyle = 'rgba(0,212,100,.75)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(PAD.l, y);
      ctx.lineTo(W - PAD.r, y);
      ctx.stroke();
      ctx.fillStyle = 'rgba(0,212,100,.9)';
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'right';
      ctx.fillText('TP @' + Math.round(pos.tp).toLocaleString(), W - PAD.r - 2, y - 2);
    }
  });

  // Preview lines
  if (previewSl > 0 && previewSl > mn && previewSl < mx) {
    const y = py(previewSl);
    ctx.strokeStyle = 'rgba(240,48,80,.4)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 4]);
    ctx.beginPath();
    ctx.moveTo(PAD.l, y);
    ctx.lineTo(W - PAD.r, y);
    ctx.stroke();
    ctx.fillStyle = 'rgba(240,48,80,.55)';
    ctx.font = '9px monospace';
    ctx.textAlign = 'right';
    ctx.fillText('SL preview', W - PAD.r - 2, y - 2);
  }
  if (previewTp > 0 && previewTp > mn && previewTp < mx) {
    const y = py(previewTp);
    ctx.strokeStyle = 'rgba(0,212,100,.4)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 4]);
    ctx.beginPath();
    ctx.moveTo(PAD.l, y);
    ctx.lineTo(W - PAD.r, y);
    ctx.stroke();
    ctx.fillStyle = 'rgba(0,212,100,.55)';
    ctx.font = '9px monospace';
    ctx.textAlign = 'right';
    ctx.fillText('TP preview', W - PAD.r - 2, y - 2);
  }
  ctx.setLineDash([]);

  // Phase labels
  const phaseColors: Record<string, string> = {
    consolidation: 'rgba(74,158,255,.28)',
    post: 'rgba(0,212,100,.32)',
    retest: 'rgba(245,160,32,.42)',
    fakeout: 'rgba(245,160,32,.5)',
    breakout: 'rgba(245,160,32,.5)',
  };
  const phaseNames: Record<string, string> = {
    consolidation: 'Consolidation',
    post: 'Post-breakout',
    retest: 'Retest',
    fakeout: 'FAKEOUT',
    breakout: 'BREAKOUT',
  };
  const seen = new Set<string>();
  vis.forEach((c, i) => {
    const ph = c.phase;
    if (!seen.has(ph) && phaseNames[ph]) {
      seen.add(ph);
      ctx.fillStyle = phaseColors[ph] || 'rgba(100,110,150,.3)';
      ctx.font = '9px Segoe UI,sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(phaseNames[ph], PAD.l + i * cw + 3, PAD.t + 13);
    }
  });

  // Candles
  vis.forEach((c, i) => {
    const x = cx(i);
    const isUp = c.close >= c.open;
    const bw = Math.max(1, cw * 0.74);
    let fill = isUp ? COLORS.grn : COLORS.red;
    let stroke = isUp ? '#009950' : '#b01830';
    if (c.breakout || c.fakeout) {
      fill = COLORS.org;
      stroke = '#b07010';
    }
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(x, py(c.high));
    ctx.lineTo(x, py(c.low));
    ctx.stroke();
    ctx.fillStyle = fill;
    const oy = py(Math.max(c.open, c.close));
    const ch = Math.max(1, py(Math.min(c.open, c.close)) - oy);
    ctx.fillRect(x - bw / 2, oy, bw, ch);
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 0.5;
    ctx.strokeRect(x - bw / 2, oy, bw, ch);

    if (c.breakout || c.fakeout) {
      const ay = scenarioDir > 0 ? oy - 14 : oy + ch + 14;
      ctx.fillStyle = COLORS.org;
      ctx.font = 'bold 13px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(scenarioDir > 0 ? '▲' : '▼', x, ay);
    }
  });

  // Current price line
  if (price > mn && price < mx) {
    const pY = py(price);
    ctx.strokeStyle = 'rgba(74,158,255,.5)';
    ctx.lineWidth = 1;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(PAD.l, pY);
    ctx.lineTo(W - PAD.r, pY);
    ctx.stroke();
    ctx.fillStyle = COLORS.blu;
    ctx.fillRect(W - PAD.r + 2, pY - 8, PAD.r - 4, 16);
    ctx.fillStyle = '#000';
    ctx.font = 'bold 9px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(price.toLocaleString(), W - PAD.r + 2 + (PAD.r - 4) / 2, pY + 3);
  }

  // Pan indicator
  if (showPanIndicator && panOffset > 0) {
    ctx.fillStyle = 'rgba(245,160,32,.6)';
    ctx.font = '9px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('◀ −' + panOffset + ' bougies', PAD.l + 4, H - PAD.b - 4);
  }
}

export function drawHeatmap(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  vis: Candle[],
  price: number,
  keyLevel: number,
  positions: Position[],
  vp: ViewportState,
  liqOrders: LiqOrder[],
  tickN: number,
  showBid: boolean,
  showAsk: boolean
) {
  const { mn, mx } = priceRange(vis, price, keyLevel, positions, vp);
  const n = vis.length;
  const cw = n ? (W - PAD.l - PAD.r) / n : 8;
  const py = (v: number) => ((mx - v) / (mx - mn)) * (H - PAD.t - PAD.b) + PAD.t;

  ctx.clearRect(0, 0, W, H);
  if (!liqOrders.length) return;

  const maxV = Math.max(...liqOrders.map((o) => o.vol));
  liqOrders.forEach((o) => {
    if (o.side === 'bid' && !showBid) return;
    if (o.side === 'ask' && !showAsk) return;
    if (o.price < mn || o.price > mx) return;
    const norm = Math.pow(o.vol / maxV, 0.42);
    const y = py(o.price);
    const bH = Math.max(2, (o.vol / maxV) * 18 + 1);
    if (o.whale) {
      const pulse = 0.38 + Math.sin(tickN * 0.12) * 0.24;
      const rr = o.side === 'bid' ? 0 : 240;
      const gg = o.side === 'bid' ? 200 : 60;
      const bb = o.side === 'bid' ? 100 : 80;
      ctx.fillStyle = `rgba(${rr},${gg},${bb},${norm * 0.5})`;
      ctx.fillRect(PAD.l, y - bH / 2, W - PAD.l - PAD.r, bH);
      ctx.strokeStyle = `rgba(${rr},${gg},${bb},${pulse})`;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(PAD.l, y);
      ctx.lineTo(W - PAD.r, y);
      ctx.stroke();
      const vol = (o.vol / 1e6).toFixed(1) + 'M';
      ctx.fillStyle = `rgba(${rr},${gg},${bb},.85)`;
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(
        `${o.side === 'bid' ? '▶ BID WALL' : '◀ ASK WALL'} ${Math.round(o.price).toLocaleString()}  ${vol}`,
        W - PAD.r + 3,
        y + 3
      );
    } else {
      const startX = Math.max(PAD.l, W - PAD.r - cw * 20);
      const r = o.side === 'bid' ? '0,200,100' : '240,60,80';
      ctx.fillStyle = `rgba(${r},${Math.pow(o.vol / maxV, 0.5) * 0.42})`;
      ctx.fillRect(startX, y - bH / 2, W - PAD.r - startX, bH);
    }
  });
}

export function drawVolume(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  volBars: { v: number; delta: number; phase: string; breakout?: boolean }[]
) {
  ctx.clearRect(0, 0, W, H);
  if (!volBars.length) return;
  const VPAD = { l: 8, r: 74, b: 3, t: 3 };
  const n = volBars.length;
  const bw = (W - VPAD.l - VPAD.r) / n;
  const maxV = Math.max(...volBars.map((b) => b.v), 1);
  let runCvd = 0;
  const cvdPts: number[] = [];

  volBars.forEach((b, i) => {
    runCvd += b.delta;
    cvdPts.push(runCvd);
    const bh = Math.max(1, (b.v / maxV) * (H - VPAD.t - VPAD.b));
    const x = VPAD.l + i * bw;
    ctx.fillStyle = b.breakout
      ? 'rgba(245,160,32,.9)'
      : b.delta >= 0
      ? 'rgba(0,212,100,.55)'
      : 'rgba(240,60,80,.55)';
    ctx.fillRect(x + bw * 0.1, H - VPAD.b - bh, bw * 0.8, bh);
  });

  const cvdMn = Math.min(...cvdPts);
  const cvdMx = Math.max(...cvdPts);
  const cvdRng = cvdMx - cvdMn || 1;
  const cy = (v: number) => H - VPAD.b - ((v - cvdMn) / cvdRng) * (H - VPAD.t - VPAD.b);

  ctx.strokeStyle = 'rgba(245,160,32,.85)';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([]);
  ctx.beginPath();
  cvdPts.forEach((v, i) => {
    const x = VPAD.l + i * bw + bw * 0.5;
    if (i === 0) ctx.moveTo(x, cy(v));
    else ctx.lineTo(x, cy(v));
  });
  ctx.stroke();

  ctx.strokeStyle = 'rgba(100,110,150,.25)';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(VPAD.l, cy(0));
  ctx.lineTo(W - VPAD.r, cy(0));
  ctx.stroke();

  return cvdPts[cvdPts.length - 1] || 0;
}

export function drawPnLChart(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  points: { balance: number }[],
  initialBalance: number
) {
  ctx.clearRect(0, 0, W, H);
  if (points.length < 2) {
    ctx.fillStyle = COLORS.mut;
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Aucun trade fermé', W / 2, H / 2);
    return;
  }
  const PAD2 = { l: 8, r: 8, t: 8, b: 8 };
  const vals = points.map((p) => p.balance);
  const mn = Math.min(...vals, initialBalance * 0.98);
  const mx = Math.max(...vals, initialBalance * 1.02);
  const rng = mx - mn || 1;
  const n = vals.length;
  const bw = (W - PAD2.l - PAD2.r) / (n - 1);
  const py2 = (v: number) => H - PAD2.b - ((v - mn) / rng) * (H - PAD2.t - PAD2.b);

  // baseline
  const baseY = py2(initialBalance);
  ctx.strokeStyle = 'rgba(74,158,255,.2)';
  ctx.lineWidth = 0.5;
  ctx.setLineDash([4, 3]);
  ctx.beginPath();
  ctx.moveTo(PAD2.l, baseY);
  ctx.lineTo(W - PAD2.r, baseY);
  ctx.stroke();
  ctx.setLineDash([]);

  const last = vals[vals.length - 1];
  const isUp = last >= initialBalance;

  // fill
  ctx.beginPath();
  vals.forEach((v, i) => {
    const x = PAD2.l + i * bw;
    const y = py2(v);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.lineTo(PAD2.l + (n - 1) * bw, H - PAD2.b);
  ctx.lineTo(PAD2.l, H - PAD2.b);
  ctx.closePath();
  ctx.fillStyle = isUp ? 'rgba(0,212,100,.12)' : 'rgba(240,48,80,.12)';
  ctx.fill();

  // line
  ctx.beginPath();
  vals.forEach((v, i) => {
    const x = PAD2.l + i * bw;
    const y = py2(v);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = isUp ? COLORS.grn : COLORS.red;
  ctx.lineWidth = 1.5;
  ctx.stroke();
}
