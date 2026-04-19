import { ScenarioDefinition } from '@/types/scenario';

export const amd: ScenarioDefinition = {
  id: 'amd',
  label: 'AMD — Accumulation, Manipulation, Distribution',
  type: 'bear',
  dir: -1,
  availableFrom: 'avance',
  desc: "Modèle en 3 actes : accumulation en range, manipulation haussière pour piéger, puis distribution baissière.",
  steps: [
    { label: 'Acte 1 — Accumulation', desc: 'Prix range. Institutions accumulent discrètement des shorts en haut du range.' },
    { label: 'Acte 2 — Manipulation haussière', desc: 'Prix spike vers le haut — piège les acheteurs FOMO. C\'est le Judas Swing.' },
    { label: 'Volume faible sur la hausse', desc: 'CVD ne confirme pas. La hausse est artificielle.' },
    { label: 'Retournement — début de la Distribution', desc: 'Le prix casse le bas du range. BOS baissier confirmé.' },
    { label: 'Entrer SHORT — Distribution en cours', desc: 'SL au-dessus du pic de manipulation. TP = premier support structurel.' },
    { label: 'Distribution forte', desc: 'Le vrai mouvement : baissier. Les acheteurs piégés alimentent la vente.' },
  ],
  education: {
    analogy: "C'est le scénario du film 'L'Arnaque' : Acte 1 — les escrocs (institutions) mettent en place le décor (accumulation). Acte 2 — ils font miroiter une opportunité en or à la victime (la hausse manipulation). Acte 3 — quand la victime a mis son argent, ils disparaissent avec la caisse (distribution baissière).",
    whatPriceIsDoing: "En 3 phases. Phase A (Accumulation) : le prix fait des allers-retours tranquilles dans un range — les institutions construisent silencieusement leur position. Phase B (Manipulation) : le prix fait un faux mouvement haussier pour attirer les acheteurs et créer la liquidité nécessaire. Phase C (Distribution) : le vrai mouvement — baissier — commence, et il est souvent violent.",
    psychologyExplained: "Les institutions ont besoin d'acheteurs pour pouvoir vendre. La manipulation crée ces acheteurs. En montrant un 'breakout haussier', elles attirent les FOMO buyers. Ces acheteurs deviennent les contreparties de la vente institutionnelle massive. Sans eux, il serait impossible de distribuer des millions de contrats sans effondrer le prix.",
    checklistItems: [
      { icon: '⏸️', text: 'Phase A : range calme avec volume décroissant' },
      { icon: '⬆️', text: 'Phase B : spike haussier avec volume faible ou CVD divergent' },
      { icon: '🔄', text: 'Retournement rapide après le spike (renversement baissier)' },
      { icon: '📉', text: 'BOS baissier sous le bas du range' },
      { icon: '📊', text: 'Volume fort sur la phase C (vraie distribution)' },
    ],
    beginnerMistake: "Le débutant achète pendant la Phase B (la manipulation) en pensant être dans le bon sens. Il subit ensuite toute la Phase C seul dans le mauvais sens.",
    proEntry: {
      entry: 'Entrer SHORT après le BOS baissier (sous le bas du range)',
      sl: 'SL au-dessus du plus haut de la Phase B (le pic de manipulation)',
      tp: 'TP = hauteur du range projetée vers le bas depuis le point de cassure',
    },
    keyConceptTags: ['ICT', 'AMD', 'Manipulation', 'Distribution', 'Judas Swing'],
  },
  de: 1200,
  dt: 4000,
};
