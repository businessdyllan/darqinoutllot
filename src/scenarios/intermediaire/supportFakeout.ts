import { ScenarioDefinition } from '@/types/scenario';

export const supportFakeout: ScenarioDefinition = {
  id: 'support_fakeout',
  label: 'Support Fakeout',
  type: 'warn',
  dir: 1,
  availableFrom: 'debutant',
  desc: "Fausse cassure baissière — le prix plonge brièvement sous le support puis rebondit.",
  steps: [
    { label: 'Range au-dessus du support', desc: 'Pression baissière apparente.' },
    { label: 'Spike sous le support', desc: "Prix perce brièvement. Attendre." },
    { label: 'Volume faible sur le spike', desc: "CVD ne confirme pas. Alerte fakeout." },
    { label: 'Clôture au-dessus du support', desc: "Fakeout confirmé." },
    { label: 'Entrer LONG — fakeout confirmé', desc: 'SL sous le wick. TP = résistance suivante.' },
    { label: 'Mouvement haussier post-fakeout', desc: "Les stops des vendeurs piégés alimentent la hausse." },
  ],
  education: {
    analogy: "Un plongeur saute du bord d'une piscine (le support)... mais la piscine n'a que 10 cm d'eau — il rebondit immédiatement vers le haut. Les vendeurs qui ont 'plongé' sous le support se retrouvent à sec, forcés de remonter précipitamment.",
    whatPriceIsDoing: "Le prix descend et perce brièvement sous le support — ce qui ressemble à une vraie cassure baissière. Mais le volume est très faible : les vendeurs n'ont pas vraiment suivi. La clôture remonte au-dessus du support, confirmant que la 'cassure' était un piège à vendeurs.",
    psychologyExplained: "Les traders systematiques vendent sur cassure de support. La banque utilise ces ventes pour accumuler des longs à bas prix. Elle achète tous ces ordres vendeurs, faisant remonter le prix immédiatement. Les vendeurs piégés en dessous coupent leurs pertes... en achetant — ce qui accélère le mouvement haussier.",
    checklistItems: [
      { icon: '📊', text: "CVD qui ne confirme PAS la cassure baissière" },
      { icon: '🕯️', text: 'Clôture au-dessus du support (malgré le wick en dessous)' },
      { icon: '📈', text: 'Volume très faible sur le spike baissier' },
      { icon: '⚡', text: 'Retour rapide au-dessus du niveau' },
      { icon: '🎯', text: 'Wick long visible sous le support' },
    ],
    beginnerMistake: "Le débutant vend sur la cassure du support — c'est exactement le piège. Il entre SHORT au moment précis où les institutions accumulent des longs.",
    proEntry: {
      entry: 'Entrer LONG sur la clôture au-dessus du support après le fakeout',
      sl: 'SL sous le wick (le plus bas du spike)',
      tp: 'TP à la résistance la plus proche (ou 1-2x la taille du wick)',
    },
    keyConceptTags: ['Fakeout', 'Volume', 'CVD', 'Piège vendeurs', 'Liquidity Sweep'],
  },
  de: 500,
  dt: 2800,
};
