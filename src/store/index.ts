import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { Candle, LiqOrder, ViewportState } from '@/types/candle';
import { Position, OrderSide, OrderType } from '@/types/order';
import { ScenarioDefinition } from '@/types/scenario';
import { DifficultyLevel, DifficultyConfig, DIFFICULTY_CONFIGS } from '@/types/difficulty';
import { TradeRecord, PnLPoint } from '@/types/portfolio';
import { INITIAL_BALANCE, PAIRS } from '@/lib/constants';

// ── SIMULATION SLICE ──────────────────────────────────────────────
interface SimulationState {
  pair: string;
  price: number;
  candles: Candle[];
  volBars: { v: number; delta: number; phase: string; breakout?: boolean }[];
  liqOrders: LiqOrder[];
  cvd: number;
  tickN: number;
  isRunning: boolean;
  tickInterval: number;
  speedMultiplier: number;
  keyLevel: number;
  breakoutAt: number;
  retestAt: number;
  viewport: ViewportState;
  showBid: boolean;
  showAsk: boolean;
  histOffset: number;
}

// ── SCENARIO SLICE ────────────────────────────────────────────────
interface ScenarioState {
  scenario: ScenarioDefinition | null;
  scIdx: number;
  stepTriggered: boolean[];
  signalReady: boolean;
  currentPhase: string;
}

// ── ORDER SLICE ───────────────────────────────────────────────────
interface OrderState {
  side: OrderSide;
  orderType: OrderType;
  lots: number;
  slEur: number;
  tpEur: number;
  positions: Position[];
}

// ── PORTFOLIO SLICE ───────────────────────────────────────────────
interface PortfolioState {
  balance: number;
  pnlTotal: number;
  tradeHistory: TradeRecord[];
  pnlSeries: PnLPoint[];
}

// ── DIFFICULTY SLICE ──────────────────────────────────────────────
interface DifficultyState {
  level: DifficultyLevel;
  config: DifficultyConfig;
  showDifficultyModal: boolean;
}

// ── UI SLICE ──────────────────────────────────────────────────────
interface UIState {
  rightPanelTab: 'guide' | 'education' | 'portfolio';
  activeTimeframe: string;
  showToast: boolean;
  toastMsg: string;
  toastType: string;
}

// ── COMBINED STORE ────────────────────────────────────────────────
interface Store
  extends SimulationState,
    ScenarioState,
    OrderState,
    PortfolioState,
    DifficultyState,
    UIState {
  // Simulation actions
  setPair: (pair: string) => void;
  setPrice: (price: number) => void;
  appendCandle: (c: Candle, vb: { v: number; delta: number; phase: string; breakout?: boolean }) => void;
  setLiqOrders: (orders: LiqOrder[]) => void;
  setCvd: (cvd: number) => void;
  setTickN: (n: number) => void;
  setIsRunning: (v: boolean) => void;
  setTickInterval: (ms: number) => void;
  setKeyLevel: (kl: number) => void;
  setBreakoutAt: (n: number) => void;
  setRetestAt: (n: number) => void;
  setViewport: (vp: Partial<ViewportState>) => void;
  setShowBid: (v: boolean) => void;
  setShowAsk: (v: boolean) => void;
  setHistOffset: (v: number) => void;
  resetSimulation: () => void;
  initScene: (
    candles: Candle[],
    volBars: { v: number; delta: number; phase: string }[],
    liqOrders: LiqOrder[],
    keyLevel: number,
    price: number,
    breakoutAt: number,
    retestAt: number
  ) => void;

  // Scenario actions
  setScenario: (sc: ScenarioDefinition, idx: number) => void;
  triggerStep: (i: number) => void;
  setSignalReady: (v: boolean) => void;
  setCurrentPhase: (ph: string) => void;

  // Order actions
  setSide: (s: OrderSide) => void;
  setOrderType: (t: OrderType) => void;
  setLots: (n: number) => void;
  setSlEur: (n: number) => void;
  setTpEur: (n: number) => void;
  addPosition: (p: Position) => void;
  removePosition: (id: number) => void;

  // Portfolio actions
  setBalance: (n: number) => void;
  addPnl: (n: number) => void;
  addTrade: (t: TradeRecord) => void;
  resetPortfolio: () => void;

  // Difficulty actions
  setDifficulty: (level: DifficultyLevel) => void;
  setShowDifficultyModal: (v: boolean) => void;

  // UI actions
  setRightPanelTab: (tab: UIState['rightPanelTab']) => void;
  setActiveTimeframe: (tf: string) => void;
  toast: (msg: string, type?: string) => void;
}

const defaultViewport: ViewportState = {
  panOffsetX: 0,
  panDeltaX: 0,
  panOffsetY: 0,
  panDeltaY: 0,
};

export const useStore = create<Store>()(
  subscribeWithSelector((set, get) => ({
    // Simulation
    pair: 'BTC',
    price: PAIRS.BTC.p,
    candles: [],
    volBars: [],
    liqOrders: [],
    cvd: 0,
    tickN: 0,
    isRunning: false,
    tickInterval: 800,
    speedMultiplier: 1,
    keyLevel: 0,
    breakoutAt: 0,
    retestAt: 0,
    viewport: defaultViewport,
    showBid: true,
    showAsk: true,
    histOffset: 0,

    setPair: (pair) => set({ pair }),
    setPrice: (price) => set({ price }),
    appendCandle: (c, vb) =>
      set((s) => {
        const candles = [...s.candles, c].slice(-200);
        const volBars = [...s.volBars, vb].slice(-200);
        return { candles, volBars };
      }),
    setLiqOrders: (liqOrders) => set({ liqOrders }),
    setCvd: (cvd) => set({ cvd }),
    setTickN: (tickN) => set({ tickN }),
    setIsRunning: (isRunning) => set({ isRunning }),
    setTickInterval: (tickInterval) => set({ tickInterval }),
    setKeyLevel: (keyLevel) => set({ keyLevel }),
    setBreakoutAt: (breakoutAt) => set({ breakoutAt }),
    setRetestAt: (retestAt) => set({ retestAt }),
    setViewport: (vp) => set((s) => ({ viewport: { ...s.viewport, ...vp } })),
    setShowBid: (showBid) => set({ showBid }),
    setShowAsk: (showAsk) => set({ showAsk }),
    setHistOffset: (histOffset) => set({ histOffset }),
    resetSimulation: () =>
      set({
        candles: [],
        volBars: [],
        liqOrders: [],
        cvd: 0,
        tickN: 0,
        isRunning: false,
        viewport: defaultViewport,
        histOffset: 0,
        stepTriggered: Array(6).fill(false),
        signalReady: false,
        currentPhase: 'consolidation',
      }),
    initScene: (candles, volBars, liqOrders, keyLevel, price, breakoutAt, retestAt) =>
      set({
        candles,
        volBars,
        liqOrders,
        keyLevel,
        price,
        breakoutAt,
        retestAt,
        cvd: 0,
        tickN: 0,
        viewport: defaultViewport,
        histOffset: 0,
        stepTriggered: Array(6).fill(false),
        signalReady: false,
        currentPhase: 'consolidation',
      }),

    // Scenario
    scenario: null,
    scIdx: 0,
    stepTriggered: Array(6).fill(false),
    signalReady: false,
    currentPhase: 'consolidation',

    setScenario: (scenario, scIdx) =>
      set({
        scenario,
        scIdx,
        stepTriggered: Array(scenario.steps.length).fill(false),
        signalReady: false,
      }),
    triggerStep: (i) =>
      set((s) => {
        const stepTriggered = [...s.stepTriggered];
        stepTriggered[i] = true;
        return { stepTriggered };
      }),
    setSignalReady: (signalReady) => set({ signalReady }),
    setCurrentPhase: (currentPhase) => set({ currentPhase }),

    // Orders
    side: 'buy',
    orderType: 'market',
    lots: 0.1,
    slEur: 0,
    tpEur: 0,
    positions: [],

    setSide: (side) => set({ side }),
    setOrderType: (orderType) => set({ orderType }),
    setLots: (lots) => set({ lots }),
    setSlEur: (slEur) => set({ slEur }),
    setTpEur: (tpEur) => set({ tpEur }),
    addPosition: (p) => set((s) => ({ positions: [...s.positions, p] })),
    removePosition: (id) =>
      set((s) => ({ positions: s.positions.filter((p) => p.id !== id) })),

    // Portfolio
    balance: INITIAL_BALANCE,
    pnlTotal: 0,
    tradeHistory: [],
    pnlSeries: [{ timestamp: Date.now(), balance: INITIAL_BALANCE }],

    setBalance: (balance) => set({ balance }),
    addPnl: (n) =>
      set((s) => {
        const pnlTotal = s.pnlTotal + n;
        const balance = s.balance;
        const pnlSeries = [...s.pnlSeries, { timestamp: Date.now(), balance }];
        return { pnlTotal, pnlSeries };
      }),
    addTrade: (t) => set((s) => ({ tradeHistory: [...s.tradeHistory, t] })),
    resetPortfolio: () =>
      set({
        balance: INITIAL_BALANCE,
        pnlTotal: 0,
        tradeHistory: [],
        pnlSeries: [{ timestamp: Date.now(), balance: INITIAL_BALANCE }],
        positions: [],
      }),

    // Difficulty
    level: 'debutant',
    config: DIFFICULTY_CONFIGS.debutant,
    showDifficultyModal: true,

    setDifficulty: (level) =>
      set({ level, config: DIFFICULTY_CONFIGS[level], tickInterval: DIFFICULTY_CONFIGS[level].tickIntervalMs }),
    setShowDifficultyModal: (showDifficultyModal) => set({ showDifficultyModal }),

    // UI
    rightPanelTab: 'guide',
    activeTimeframe: '15m',
    showToast: false,
    toastMsg: '',
    toastType: '',

    setRightPanelTab: (rightPanelTab) => set({ rightPanelTab }),
    setActiveTimeframe: (activeTimeframe) => set({ activeTimeframe }),
    toast: (msg, type = 'info') => {
      set({ showToast: true, toastMsg: msg, toastType: type });
      setTimeout(() => set({ showToast: false }), 2800);
    },
  }))
);
