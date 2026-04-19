import { ScenarioDefinition } from '@/types/scenario';

export const stopHunt: ScenarioDefinition = {
  id: 'stop_hunt',
  label: 'Stop Hunt',
  type: 'warn',
  dir: 1,
  availableFrom: 'intermediaire',
  desc: "Le prix spike brièvement sous un niveau clé pour déclencher les stops des longs, puis repart à la hausse.",
  steps: [
    { label: 'Accumulation près du niveau', desc: 'Prix consolide juste au-dessus d\'un support visible.' },
    { label: 'Spike soudain sous le niveau', desc: 'Le prix plonge rapidement sous le support — déclenche les stops.' },
    { label: 'Volume lors du spike', desc: 'Volume élevé : ce sont les stops des acheteurs qui se déclenchent — les institutions achètent.' },
    { label: 'Retour rapide au-dessus', desc: 'Dans la même bougie ou la suivante, le prix remonte au-dessus. Les institutions ont leurs longs.' },
    { label: 'Entrer LONG après le retour', desc: 'SL sous le plus bas du spike. TP = résistance suivante.' },
    { label: 'Mouvement haussier puissant', desc: 'Sans stops sous le niveau, la route est libre vers le haut.' },
  ],
  education: {
    analogy: "C'est comme un pick-pocket dans le métro. Il crée une bousculade (le spike) pour que tout le monde panique et vide ses poches (les stops déclenchés). Pendant la bousculade, il récupère ce qu'il cherchait (les contrats). Ensuite, tout redevient normal — et lui a rempli ses poches.",
    whatPriceIsDoing: "Le marché 'chasse' les stops qui se trouvent sous un support évident. Ces stops sont des ordres de vente automatiques. Quand ils se déclenchent, ils créent un pic de volume baissier momentané. Les institutions utilisent ce moment pour acheter massivement à bas prix. Le spike est bref : une ou deux bougies maximum.",
    psychologyExplained: "Les stops des traders longs sont prévisibles — tout le monde les place au même endroit (sous le support). Les institutions savent exactement où ils sont. En poussant le prix 10-20 points sous le support, elles déclenchent des milliers de ventes automatiques — ce sont leurs achats à prix réduit. C'est une transaction institutionnelle déguisée en panique de marché.",
    checklistItems: [
      { icon: '⚡', text: 'Spike rapide et violent sous le support (1-2 bougies max)' },
      { icon: '📊', text: 'Volume élevé pendant le spike (stops déclenchés)' },
      { icon: '🔄', text: 'Retour immédiat au-dessus du niveau dans la même bougie' },
      { icon: '🕯️', text: 'Mèche longue visible sous le support' },
      { icon: '✅', text: 'Clôture de la bougie au-dessus du support' },
    ],
    beginnerMistake: "Le débutant voit le spike et croit à une vraie cassure — il vend en catastrophe ou active ses stops manuellement. Ensuite il regarde le prix remonter sans lui.",
    proEntry: {
      entry: 'Entrer LONG à la clôture de la bougie de retour ou sur la première confirmation haussière',
      sl: 'SL juste sous le plus bas du spike (quelques ticks)',
      tp: 'TP à la prochaine résistance ou swing high',
    },
    keyConceptTags: ['Stop Hunt', 'Liquidity', 'SMC', 'Institutionnel', 'Fakeout'],
  },
  de: 600,
  dt: 2500,
};
