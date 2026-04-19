import { Candle } from '@/types/candle';
import { ScenarioDefinition } from '@/types/scenario';

interface TickResult {
  candle: Candle;
  volBar: { v: number; delta: number; phase: string; breakout?: boolean };
  newPrice: number;
  newCvd: number;
  phase: string;
  isBreakout: boolean;
  isFakeout: boolean;
  triggeredStepIdx: number | null;
}

export function generateTick(
  price: number,
  cvd: number,
  candleCount: number,
  sc: ScenarioDefinition,
  atr: number,
  breakoutAt: number,
  retestAt: number,
  stepTriggered: boolean[]
): TickResult {
  const n = candleCount;
  const isBrk = n === breakoutAt;
  const isRetest = sc.label.includes('Retest') && (n === retestAt || n === retestAt + 1);
  const isFakeout = sc.type === 'warn' && n === breakoutAt;
  const isPreBrk = n >= breakoutAt - 3 && n < breakoutAt;

  let mv: number, vol: number, delta: number, phase = 'consolidation';
  let isBreakout = false, triggeredStepIdx: number | null = null;

  if (isBrk) {
    mv = sc.dir * atr * (0.3 + Math.random() * 0.18);
    vol = 200 + Math.random() * 250;
    delta = sc.dir * vol * 0.75;
    phase = 'breakout';
    isBreakout = true;
    if (!stepTriggered[3]) triggeredStepIdx = 3;
  } else if (isFakeout) {
    mv = sc.dir * atr * (0.14 + Math.random() * 0.08);
    vol = 55 + Math.random() * 70;
    delta = sc.dir * vol * 0.22;
    phase = 'fakeout';
    if (!stepTriggered[3]) triggeredStepIdx = 3;
  } else if (isPreBrk) {
    mv = (Math.random() - 0.5) * atr * 0.05 + sc.dir * atr * 0.035;
    vol = 70 + Math.random() * 100;
    delta = sc.dir * vol * (0.3 + Math.random() * 0.3);
    if (n === breakoutAt - 3 && !stepTriggered[1]) triggeredStepIdx = 1;
    if (n === breakoutAt - 1 && !stepTriggered[2]) triggeredStepIdx = 2;
  } else if (isRetest) {
    mv = -sc.dir * atr * (0.1 + Math.random() * 0.07);
    vol = 45 + Math.random() * 60;
    delta = -sc.dir * vol * 0.3;
    phase = 'retest';
    if (!stepTriggered[4]) triggeredStepIdx = 4;
  } else if (n > breakoutAt) {
    const pastRetest = !sc.label.includes('Retest') || n > retestAt + 1;
    if (sc.label.includes('Retest') && n <= retestAt) {
      mv = -sc.dir * atr * (0.04 + Math.random() * 0.04) + (Math.random() - 0.5) * atr * 0.02;
    } else if (!pastRetest) {
      mv = -sc.dir * atr * (0.04 + Math.random() * 0.04);
    } else {
      mv = sc.dir * atr * (0.025 + Math.random() * 0.04) + (Math.random() - 0.5) * atr * 0.02;
      if (sc.type === 'warn' && n === breakoutAt + 1) mv = -mv * 1.4;
    }
    vol = 35 + Math.random() * 65;
    delta = mv > 0 ? vol * 0.38 : -vol * 0.38;
    phase = 'post';
    if (n === breakoutAt + 2 && !stepTriggered[5]) triggeredStepIdx = 5;
    if (sc.label.includes('Retest') && n === retestAt + 3 && !stepTriggered[5]) triggeredStepIdx = 5;
  } else {
    mv = (Math.random() - 0.5) * atr * 0.065 - (price - 0) * 0.025;
    vol = 18 + Math.random() * 38;
    delta = (Math.random() - 0.5) * vol * 0.5;
    if (!stepTriggered[0]) triggeredStepIdx = 0;
  }

  const o = price;
  const c = Math.round(o + mv);
  const rng = Math.abs(mv) * (1.2 + Math.random() * 0.7);

  const candle: Candle = {
    timestamp: Date.now(),
    open: o,
    close: c,
    high: Math.max(o, c) + rng * 0.22,
    low: Math.min(o, c) - rng * 0.22,
    volume: vol,
    delta,
    phase,
    breakout: isBrk,
    fakeout: isFakeout,
  };

  return {
    candle,
    volBar: { v: vol, delta, phase, breakout: isBrk },
    newPrice: c,
    newCvd: cvd + delta,
    phase,
    isBreakout: isBrk,
    isFakeout,
    triggeredStepIdx,
  };
}

export function buildInitialScene(
  price: number,
  atr: number,
  sc: ScenarioDefinition
): {
  candles: Candle[];
  volBars: { v: number; delta: number; phase: string }[];
  keyLevel: number;
  breakoutAt: number;
  retestAt: number;
  finalPrice: number;
} {
  const candles: Candle[] = [];
  const volBars: { v: number; delta: number; phase: string }[] = [];
  const keyLevel = Math.round(price + sc.dir * (atr * (0.18 + Math.random() * 0.1)));
  let cp = price;
  const consolidN = 18 + Math.floor(Math.random() * 6);

  for (let i = 0; i < consolidN; i++) {
    const o = cp;
    let mv = (Math.random() - 0.5) * atr * 0.065;
    mv -= (cp - keyLevel) * 0.03;
    const c = o + mv;
    const rng = Math.abs(mv) * (1.3 + Math.random() * 0.7);
    const vol = 20 + Math.random() * 35;
    const delta = (Math.random() - 0.5) * vol * 0.5;
    candles.push({
      timestamp: Date.now() - (consolidN - i) * 1000,
      open: o,
      close: Math.round(c),
      high: Math.max(o, c) + rng * 0.25,
      low: Math.min(o, c) - rng * 0.25,
      volume: vol,
      delta,
      phase: 'consolidation',
    });
    volBars.push({ v: vol, delta, phase: 'consolidation' });
    cp = c;
  }

  const breakoutAt = consolidN + 5 + Math.floor(Math.random() * 4);
  const retestAt = breakoutAt + 4 + Math.floor(Math.random() * 3);

  return { candles, volBars, keyLevel, breakoutAt, retestAt, finalPrice: Math.round(cp) };
}

export function genLiqOrders(keyLevel: number, atr: number) {
  const orders: { price: number; side: 'bid' | 'ask'; vol: number; whale: boolean; age: number }[] = [];
  const walls = [
    { r: 0.002, vol: 28e6, whale: true },
    { r: 0.006, vol: 14e6, whale: true },
    { r: 0.013, vol: 6e6, whale: false },
    { r: 0.024, vol: 2.5e6, whale: false },
  ];
  walls.forEach((w) => {
    const ap = Math.round(keyLevel * (1 + w.r));
    const bp = Math.round(keyLevel * (1 - w.r));
    orders.push({ price: ap, side: 'ask' as const, vol: w.vol, whale: w.whale, age: 0 });
    orders.push({ price: bp, side: 'bid' as const, vol: w.vol, whale: w.whale, age: 0 });
    for (let j = 0; j < 2; j++) {
      orders.push({
        price: ap + Math.round((Math.random() - 0.5) * atr * 0.2),
        side: 'ask' as const,
        vol: w.vol * 0.07 * (Math.random() + 0.3),
        whale: false,
        age: 0,
      });
      orders.push({
        price: bp + Math.round((Math.random() - 0.5) * atr * 0.2),
        side: 'bid' as const,
        vol: w.vol * 0.07 * (Math.random() + 0.3),
        whale: false,
        age: 0,
      });
    }
  });
  return orders;
}
