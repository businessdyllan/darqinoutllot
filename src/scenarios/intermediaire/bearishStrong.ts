import { ScenarioDefinition } from '@/types/scenario';

export const bearishStrong: ScenarioDefinition = {
  id: 'bearish_strong',
  label: 'Bearish Strong',
  type: 'bear',
  dir: -1,
  availableFrom: 'debutant',
  desc: "Cassure franche d'un support clé avec un pic de volume vendeur. Le prix clôture nettement sous le support.",
  steps: [
    { label: 'Range de consolidation', desc: 'Le prix oscille autour du support. Volume calme. Observer le niveau clé.' },
    { label: 'Pression vendeuse croissante', desc: 'Volume augmente. CVD baisse progressivement.' },
    { label: 'Test du support — volume fort', desc: "Gros volume sur le support. Les acheteurs résistent encore." },
    { label: 'Cassure baissière — signal !', desc: "Bougie orange clôture SOUS le support. CVD plonge. C'est le breakout." },
    { label: 'Entrer SHORT ici', desc: "SL au-dessus du support cassé. TP = prochain support." },
    { label: 'Continuation baissière', desc: "Le prix continue sous l'ancien support. Gérer la position." },
  ],
  education: {
    analogy: "Imagine un barrage qui retient l'eau (les acheteurs qui défendent le support). Pendant longtemps, le barrage tient. Mais la pression de l'eau (vendeurs) augmente progressivement... jusqu'au moment où le barrage cède d'un coup. L'eau s'écoule alors massivement et rapidement vers le bas.",
    whatPriceIsDoing: "Le prix teste plusieurs fois un niveau support important. À chaque test, les acheteurs défendent le niveau. Mais progressivement, les vendeurs deviennent plus agressifs (le CVD baisse). Finalement, une grosse bougie orange casse le support avec un pic de volume — c'est la rupture du barrage.",
    psychologyExplained: "Les acheteurs ont placé leurs stops juste en dessous du support. Quand les vendeurs poussent enfin le prix en dessous, tous ces stops sont déclenchés automatiquement — créant une cascade de ventes supplémentaires. C'est pourquoi la cassure est si violente : les acheteurs piégés deviennent involontairement des vendeurs.",
    checklistItems: [
      { icon: '📊', text: 'CVD en baisse progressive avant la cassure' },
      { icon: '🕯️', text: 'Bougie de cassure avec un corps large (clôture sous le support)' },
      { icon: '📈', text: 'Volume au moins 2x supérieur à la moyenne' },
      { icon: '🎯', text: 'Support bien défini (2-3 touches minimum)' },
      { icon: '⚠️', text: 'Pas de bougie de rejet immédiat après la cassure' },
    ],
    beginnerMistake: "Le débutant attend que le prix 'revienne au support' pour confirmer — mais à ce stade il est souvent trop tard, le prix est déjà loin. Ou pire : il achète la cassure en pensant que c'est un fakeout, et se fait emporter par la continuation baissière.",
    proEntry: {
      entry: 'Entrer SHORT sur la clôture de la bougie orange sous le support',
      sl: 'SL au-dessus du plus haut de la bougie de cassure + 1 ATR',
      tp: 'TP au prochain niveau de support visible sur le graphique',
    },
    keyConceptTags: ['CVD', 'Support/Résistance', 'Volume', 'Breakout'],
  },
  de: 1400,
  dt: 3500,
};
