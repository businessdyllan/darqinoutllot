import { ScenarioDefinition } from '@/types/scenario';

export const bullishStrong: ScenarioDefinition = {
  id: 'bullish_strong',
  label: 'Bullish Strong',
  type: 'bull',
  dir: 1,
  availableFrom: 'debutant',
  desc: "Cassure franche d'une résistance clé avec un pic de volume acheteur.",
  steps: [
    { label: 'Range de consolidation', desc: 'Le prix oscille sous la résistance. Volume calme.' },
    { label: 'Pression acheteuse croissante', desc: 'Volume augmente. CVD monte.' },
    { label: 'Test de la résistance — volume fort', desc: 'Gros volume sur la résistance.' },
    { label: 'Cassure haussière — signal !', desc: "Bougie orange clôture AU-DESSUS. CVD explose vers le haut." },
    { label: 'Entrer LONG ici', desc: 'SL sous la résistance cassée. TP = prochain sommet swing.' },
    { label: 'Continuation haussière', desc: "Le prix continue au-dessus. Gérer la position." },
  ],
  education: {
    analogy: "Imagine une cocotte-minute sur le feu (la consolidation). La vapeur (pression acheteuse) s'accumule progressivement à l'intérieur. La cocotte siffle (volume croissant)... puis le couvercle saute d'un coup ! La vapeur s'échappe violemment vers le haut.",
    whatPriceIsDoing: "Le prix teste plusieurs fois une résistance importante. À chaque test, les vendeurs défendent le niveau. Mais progressivement, les acheteurs accumulent des positions avec plus d'agressivité (le CVD monte). Finalement, une grosse bougie orange casse la résistance avec un pic de volume — la cocotte a sauté.",
    psychologyExplained: "Les vendeurs ont placé leurs stops juste au-dessus de la résistance. Quand les acheteurs franchissent enfin ce niveau, tous ces stops se déclenchent — créant des achats forcés supplémentaires. Les vendeurs qui se couvrent deviennent involontairement des acheteurs, amplifiant le mouvement haussier.",
    checklistItems: [
      { icon: '📊', text: 'CVD en hausse progressive avant la cassure' },
      { icon: '🕯️', text: 'Bougie de cassure avec un corps large (clôture au-dessus de la résistance)' },
      { icon: '📈', text: 'Volume au moins 2x supérieur à la moyenne' },
      { icon: '🎯', text: 'Résistance bien définie (2-3 touches minimum)' },
      { icon: '✅', text: 'Pas de wick de rejet au-dessus (clôture haute)' },
    ],
    beginnerMistake: "Le débutant attend une confirmation supplémentaire et entre trop tard — après que le prix a déjà beaucoup monté. Ou il hésite à cause d'un biais baissier et manque complètement le trade.",
    proEntry: {
      entry: 'Entrer LONG sur la clôture de la bougie orange au-dessus de la résistance',
      sl: 'SL sous le plus bas de la bougie de cassure',
      tp: 'TP au prochain niveau de résistance visible sur le graphique',
    },
    keyConceptTags: ['CVD', 'Support/Résistance', 'Volume', 'Breakout'],
  },
  de: 1400,
  dt: 3500,
};
