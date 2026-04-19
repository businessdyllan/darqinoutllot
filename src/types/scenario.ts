import { DifficultyLevel } from './difficulty';

export type ScenarioType = 'bull' | 'bear' | 'warn';
export type ScenarioDir = 1 | -1;

export interface ChecklistItem {
  icon: string;
  text: string;
}

export interface EducationContent {
  analogy: string;
  whatPriceIsDoing: string;
  psychologyExplained: string;
  checklistItems: ChecklistItem[];
  beginnerMistake: string;
  proEntry: {
    entry: string;
    sl: string;
    tp: string;
  };
  keyConceptTags: string[];
}

export interface ScenarioStep {
  label: string;
  desc: string;
  hint?: string;
}

export interface ScenarioDefinition {
  id: string;
  label: string;
  type: ScenarioType;
  dir: ScenarioDir;
  availableFrom: DifficultyLevel;
  desc: string;
  steps: ScenarioStep[];
  education: EducationContent;
  de: number;
  dt: number;
}
