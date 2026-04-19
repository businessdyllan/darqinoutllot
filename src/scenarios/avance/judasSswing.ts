import { ScenarioDefinition } from '@/types/scenario';

export const judasSswing: ScenarioDefinition = {
  id: 'judas_swing',
  label: 'Judas Swing',
  type: 'warn',
  dir: -1,
  availableFrom: 'avance',
  desc: "Faux mouvement haussier en début de session pour piéger les acheteurs, avant le vrai mouvement baissier.",
  steps: [
    { label: 'Ouverture de session', desc: 'Début de la session Londres ou New York. Prix dans le range asiatique.' },
    { label: 'Spike haussier initial', desc: 'Prix monte rapidement — les traders achètent le "breakout haussier".' },
    { label: 'Volume faible sur la hausse', desc: 'CVD ne confirme pas le mouvement. Alerte manipulation.' },
    { label: 'Retournement rapide', desc: 'Prix casse le bas de la session et renverse complètement.' },
    { label: 'Entrer SHORT après le retournement', desc: 'BOS baissier confirmé. SL au-dessus du pic. TP = bas du range asiatique.' },
    { label: 'Vrai mouvement baissier de la session', desc: 'Distribution institutionnelle. Le vrai mouvement était baissier.' },
  ],
  education: {
    analogy: "C'est le tour de magie classique : 'regardez ma main gauche' (le spike haussier). Pendant que vous regardez la main gauche, la main droite (les vendeurs institutionnels) fait la vraie chose — vendre massivement en haut. Judas a trahi ses amis avec un faux sourire. Le marché fait pareil avec les traders.",
    whatPriceIsDoing: "En début de session (souvent Londres ou New York), le prix monte brièvement, donnant l'impression d'un breakout haussier. C'est le mouvement 'B' du modèle AMD (la Manipulation). Cette hausse est fausse — elle existe juste pour attirer les acheteurs et générer la liquidité dont les vendeurs institutionnels ont besoin pour distribuer.",
    psychologyExplained: "Les institutions ont besoin de vendre des millions de contrats. Pour vendre, il faut des acheteurs. En créant un faux breakout haussier, elles attirent les acheteurs FOMO (peur de rater). Ces acheteurs deviennent les contreparties des ventes institutionnelles massives. Ensuite, sans soutien institutionnel, le prix s'effondre.",
    checklistItems: [
      { icon: '⏰', text: 'Occur en début de session (2h-5h EST Londres / 7h-10h EST New York)' },
      { icon: '📊', text: 'CVD qui diverge avec le mouvement de prix' },
      { icon: '🔄', text: 'Renversement rapide et cassure du bas de session' },
      { icon: '📉', text: 'BOS baissier sur timeframe inférie après le retournement' },
      { icon: '🎯', text: 'Le vrai target = côté opposé du range asiatique' },
    ],
    beginnerMistake: "Le débutant achète le spike initial avec enthousiasme — il pense être dans le bon sens. Il ignore que les premiers mouvements de session sont souvent des pièges.",
    proEntry: {
      entry: 'Entrer SHORT après le BOS baissier sur le timeframe 5m/15m',
      sl: 'SL au-dessus du plus haut du spike (le Judas high)',
      tp: 'TP = bas du range asiatique ou prochain support structurel',
    },
    keyConceptTags: ['ICT', 'AMD', 'Judas Swing', 'Sessions', 'Manipulation'],
  },
  de: 600,
  dt: 3000,
};
