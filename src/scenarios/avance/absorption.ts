import { ScenarioDefinition } from '@/types/scenario';

export const absorption: ScenarioDefinition = {
  id: 'absorption',
  label: 'Absorption Haussière',
  type: 'bull',
  dir: 1,
  availableFrom: 'avance',
  desc: "Les acheteurs absorbent tous les ordres vendeurs à un niveau — le prix ne bouge pas malgré le volume élevé, puis explose.",
  steps: [
    { label: 'Niveau de support sous pression', desc: 'Vendeurs agressifs poussent vers un support. Volume monte.' },
    { label: 'Absorption : volume fort, prix stable', desc: 'Gros volume de vente mais le prix ne descend PAS. Les acheteurs absorbent tout.' },
    { label: 'CVD commence à diverger', desc: 'Delta positif malgré la pression baissière apparente.' },
    { label: 'Réduction du volume vendeur', desc: 'Les vendeurs s\'épuisent. Ils ont vendu mais le prix n\'a pas bougé.' },
    { label: 'Entrer LONG — signal d\'absorption', desc: 'Tous les vendeurs sont absorbés. Route libre. SL sous l\'absorption.' },
    { label: 'Explosion haussière', desc: 'Sans pression vendeuse, le prix monte rapidement. L\'absorption a alimenté le moteur.' },
  ],
  education: {
    analogy: "Imagine une éponge géante (les acheteurs institutionnels) posée sur le sol. Les vendeurs jettent des seaux d'eau sur le sol (ordres de vente). Mais l'éponge absorbe tout — le sol reste sec. À un moment, les vendeurs n'ont plus d'eau. L'éponge est gorgée... et quand quelqu'un la presse, l'eau gicle vers le haut d'un coup.",
    whatPriceIsDoing: "À un niveau de support, le prix stagne malgré un volume de vente important. Visuellement : une ou plusieurs bougies avec un grand volume mais un petit corps (fourchette étroite). C'est le signe classique de l'absorption : les vendeurs frappent fort, mais quelqu'un achète TOUT ce qu'ils vendent sans faire bouger le prix.",
    psychologyExplained: "Une institution veut acheter 500 000 contrats. Elle pose un order iceberg : elle montre 1000 contrats en bid mais en a 499 000 cachés. Chaque fois que des vendeurs frappent le bid, l'iceberg absorbe. Le prix reste stable mais l'institution remplit sa position. Quand elle a tout acheté, il n'y a plus de buyers-absorbeurs — le prix monte naturellement.",
    checklistItems: [
      { icon: '📊', text: 'Volume élevé avec amplitude de prix faible (grandes bougies à corps étroit)' },
      { icon: '🔄', text: 'CVD positif ou divergent malgré l\'apparent mouvement baissier' },
      { icon: '⚓', text: 'Le prix "colle" au niveau de support sans le casser' },
      { icon: '📉', text: 'Diminution progressive du volume vendeur (épuisement)' },
      { icon: '⚡', text: 'Cassure haussière soudaine après l\'absorption' },
    ],
    beginnerMistake: "Le débutant voit le volume élevé et l'absence de hausse — il interprète ça comme une 'distribution' et vend. En réalité c'est l'opposé : une accumulation silencieuse.",
    proEntry: {
      entry: 'Entrer LONG sur la première bougie haussière après l\'épuisement des vendeurs',
      sl: 'SL sous le bas de la zone d\'absorption',
      tp: 'TP à la prochaine résistance (le mouvement post-absorption est souvent fort)',
    },
    keyConceptTags: ['Order Flow', 'Absorption', 'Volume Profile', 'Iceberg', 'Delta'],
  },
  de: 900,
  dt: 3200,
};
