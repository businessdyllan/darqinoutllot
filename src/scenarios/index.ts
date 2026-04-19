import { ScenarioDefinition } from '@/types/scenario';
import { bearishStrong } from './intermediaire/bearishStrong';
import { bearBreakRetest } from './intermediaire/bearBreakRetest';
import { resistanceFakeout } from './intermediaire/resistanceFakeout';
import { bullishStrong } from './intermediaire/bullishStrong';
import { bullBreakRetest } from './intermediaire/bullBreakRetest';
import { supportFakeout } from './intermediaire/supportFakeout';
import { orderBlock } from './avance/orderBlock';
import { stopHunt } from './avance/stopHunt';
import { judasSswing } from './avance/judasSswing';
import { absorption } from './avance/absorption';
import { turtleSoup } from './avance/turtleSoup';
import { amd } from './avance/amd';

export const ALL_SCENARIOS: ScenarioDefinition[] = [
  bearishStrong,
  bullishStrong,
  bearBreakRetest,
  bullBreakRetest,
  resistanceFakeout,
  supportFakeout,
  orderBlock,
  stopHunt,
  turtleSoup,
  absorption,
  judasSswing,
  amd,
];

export const getScenarioById = (id: string): ScenarioDefinition | undefined =>
  ALL_SCENARIOS.find((s) => s.id === id);
