import { ScenarioDefinition } from '@/types/scenario';

export const resistanceFakeout: ScenarioDefinition = {
  id: 'resistance_fakeout',
  label: 'Resistance Fakeout',
  type: 'warn',
  dir: -1,
  availableFrom: 'debutant',
  desc: "Fausse cassure haussière — le prix perce brièvement la résistance puis retombe. Volume faible = fakeout.",
  steps: [
    { label: 'Range sous la résistance', desc: 'Prix consolide juste sous la résistance.' },
    { label: 'Spike au-dessus de la résistance', desc: "Prix perce brièvement — semble haussier. Attendre." },
    { label: 'Volume faible sur le spike', desc: "CVD ne confirme pas. Alerte fakeout." },
    { label: 'Clôture sous la résistance', desc: "Le prix retombe. Fakeout confirmé." },
    { label: 'Entrer SHORT — fakeout confirmé', desc: "SL au-dessus du wick. TP = support le plus proche." },
    { label: 'Mouvement baissier post-fakeout', desc: "Les stops des acheteurs piégés alimentent la baisse." },
  ],
  education: {
    analogy: "C'est comme un feu rouge qui clignote vert pendant 2 secondes puis revient au rouge. Les conducteurs impatients (acheteurs) s'élancent... et se retrouvent bloqués au milieu de l'intersection. Les voitures qui arrivent en face (vendeurs) les forcent à reculer précipitamment.",
    whatPriceIsDoing: "Le prix monte et perce brièvement le niveau de résistance — ce qui ressemble à un vrai breakout haussier. Mais le volume est anémique : peu d'acheteurs ont réellement participé. En l'absence de conviction, le prix retombe sous le niveau. La clôture sous la résistance confirme que la 'cassure' était fausse.",
    psychologyExplained: "Les traders breakout placent des ordres d'achat au-dessus de la résistance. La banque utilise ces ordres pour se délester de ses positions longues — elle vend à ces acheteurs. Une fois les ordres absorbés, il n'y a plus d'acheteurs pour soutenir le prix, qui s'effondre. Les acheteurs piégés au-dessus de la résistance coupent leurs pertes... en vendant.",
    checklistItems: [
      { icon: '📊', text: "CVD qui ne confirme PAS la cassure (divergence)" },
      { icon: '🕯️', text: 'Clôture de la bougie sous la résistance (malgré le wick au-dessus)' },
      { icon: '📉', text: 'Volume faible sur le spike haussier' },
      { icon: '⚡', text: 'Retour rapide sous le niveau (même bougie ou suivante)' },
      { icon: '🎯', text: 'Wick long visible au-dessus de la résistance' },
    ],
    beginnerMistake: "Le débutant achète sur le spike en voyant un 'breakout' — c'est exactement ce que le marché attend de lui. Il entre LONG exactement là où les professionnels vendent.",
    proEntry: {
      entry: 'Entrer SHORT sur la clôture sous la résistance après le fakeout',
      sl: 'SL au-dessus du wick (le plus haut du spike)',
      tp: 'TP au support le plus proche (ou 1-2x la taille du wick)',
    },
    keyConceptTags: ['Fakeout', 'Volume', 'CVD', 'Piège acheteurs'],
  },
  de: 500,
  dt: 2800,
};
