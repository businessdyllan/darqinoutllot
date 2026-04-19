'use client';
import { useEffect } from 'react';
import { useStore } from '@/store';
import { ALL_SCENARIOS } from '@/scenarios';
import { buildInitialScene, genLiqOrders } from '@/engine/tickGenerator';
import { PAIRS } from '@/lib/constants';
import { useSimulationEngine } from '@/hooks/useSimulationEngine';
import TopBar from './TopBar';
import ChartToolbar from '@/components/chart/ChartToolbar';
import ScenarioSelector from '@/components/chart/ScenarioSelector';
import CandlestickChart from '@/components/chart/CandlestickChart';
import VolumePanel from '@/components/chart/VolumePanel';
import HistorySlider from '@/components/chart/HistorySlider';
import RightPanel from '@/components/rightpanel/RightPanel';
import DifficultySelector from '@/components/difficulty/DifficultySelector';
import Toast from '@/components/ui/Toast';

export default function TradingPlatform() {
  useSimulationEngine();

  const scenario = useStore((s) => s.scenario);
  const setScenario = useStore((s) => s.setScenario);
  const initScene = useStore((s) => s.initScene);
  const setPrice = useStore((s) => s.setPrice);
  const setSide = useStore((s) => s.setSide);
  const pair = useStore((s) => s.pair);

  // Initialize with first scenario on mount
  useEffect(() => {
    if (!scenario) {
      const sc = ALL_SCENARIOS[0];
      const P = PAIRS[pair];
      const { candles, volBars, keyLevel, breakoutAt, retestAt, finalPrice } =
        buildInitialScene(P.p, P.atr, sc);
      const liq = genLiqOrders(keyLevel, P.atr);
      setScenario(sc, 0);
      setPrice(finalPrice);
      initScene(candles, volBars, liq, keyLevel, finalPrice, breakoutAt, retestAt);
      setSide(sc.dir > 0 ? 'buy' : 'sell');
    }
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[var(--bg)]">
      <TopBar />
      <div className="flex flex-1 overflow-hidden" style={{ height: 'calc(100vh - 40px)' }}>
        {/* Left column — chart */}
        <div className="flex flex-col flex-1 overflow-hidden border-r border-[var(--b)]">
          <ChartToolbar />
          <ScenarioSelector />
          <div className="flex-1 flex flex-col overflow-hidden">
            <CandlestickChart />
            <VolumePanel />
            <HistorySlider />
          </div>
        </div>

        {/* Right panel */}
        <div className="w-[280px] flex-shrink-0">
          <RightPanel />
        </div>
      </div>

      <DifficultySelector />
      <Toast />
    </div>
  );
}
