import { ScenarioDefinition } from '@/types/scenario';

export const turtleSoup: ScenarioDefinition = {
  id: 'turtle_soup',
  label: 'Turtle Soup',
  type: 'warn',
  dir: 1,
  availableFrom: 'avance',
  desc: "Fausse cassure d'un plus bas récent — les traders breakout vendeurs sont piégés avant un fort rebond.",
  steps: [
    { label: 'Plus bas récent bien visible', desc: 'Un swing low identifiable. Les breakout traders ont leurs ventes au-dessous.' },
    { label: 'Cassure sous le plus bas', desc: 'Prix perce le low — déclenche les ventes automatiques (breakout bears).' },
    { label: 'Clôture de retour au-dessus', desc: 'La bougie clôt AU-DESSUS du low précédent. Piège confirmé.' },
    { label: 'Volume élevé sur le spike baissier', desc: 'Le volume élevé = les vendeurs piégés qui ont vendu au pire moment.' },
    { label: 'Entrer LONG — Turtle Soup confirmé', desc: 'SL sous le spike. TP = haut récent.' },
    { label: 'Squeeze haussier', desc: 'Les vendeurs piégés se couvrent en achetant — accélérateur de la hausse.' },
  ],
  education: {
    analogy: "Les 'Turtles' étaient des traders des années 80 qui achetaient les nouveaux plus hauts et vendaient les nouveaux plus bas. Leur règle était simple et mécanique. Aujourd'hui, tout le monde connaît cette règle — et les institutions s'en servent comme piège. La 'soupe de tortue', c'est manger les tortues à leur propre jeu.",
    whatPriceIsDoing: "Le prix casse brièvement un swing low évident — déclenchant les ordres de vente des traders systématiques. Mais la cassure ne tient pas : le prix remonte immédiatement au-dessus du low. Cette bougie caractéristique (corps fermant au-dessus du low percé) est le signal que les vendeurs sont maintenant piégés.",
    psychologyExplained: "Les systèmes de trading automatiques vendent sur les nouvelles cassures de bas. Les institutions savent exactement où ces ordres sont placés. Elles poussent le prix sous le low pour déclencher ces ventes — puis absorbent tous ces ordres de vente à bas prix. Résultat : les turtles ont vendu bas, les institutions ont acheté bas.",
    checklistItems: [
      { icon: '🎯', text: 'Swing low évident et récent (20 bougies max)' },
      { icon: '📉', text: 'Cassure sous le low avec volume (stops déclenchés)' },
      { icon: '✅', text: 'Bougie qui CLÔT au-dessus du swing low' },
      { icon: '⚡', text: 'Retour rapide (2-3 bougies maximum)' },
      { icon: '📊', text: 'CVD remonte malgré la cassure initiale' },
    ],
    beginnerMistake: "Le débutant vend sur la cassure du swing low en suivant une stratégie breakout classique. Il ignore que les breakouts évidents sont souvent des pièges institutionnels.",
    proEntry: {
      entry: 'Entrer LONG sur la clôture au-dessus du swing low percé',
      sl: 'SL sous le plus bas du spike (2-3 ticks)',
      tp: 'TP au plus haut récent ou au prochain niveau de résistance',
    },
    keyConceptTags: ['ICT', 'Turtle Soup', 'Liquidity Sweep', 'Stop Hunt', 'Contra-tendance'],
  },
  de: 500,
  dt: 2800,
};
