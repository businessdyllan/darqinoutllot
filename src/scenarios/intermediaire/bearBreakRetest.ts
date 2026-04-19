import { ScenarioDefinition } from '@/types/scenario';

export const bearBreakRetest: ScenarioDefinition = {
  id: 'bear_break_retest',
  label: 'Bear Break+Retest',
  type: 'bear',
  dir: -1,
  availableFrom: 'debutant',
  desc: "Cassure baissière puis retour sur l'ancien support devenu résistance. Entrée optimale sur le retest.",
  steps: [
    { label: 'Consolidation sous pression', desc: 'Prix consolide. CVD légèrement négatif.' },
    { label: 'Cassure baissière initiale', desc: 'Support cassé avec volume. Premier mouvement rapide.' },
    { label: "Retest de l'ancien support", desc: 'Prix remonte tester la zone cassée. Volume faible.' },
    { label: 'Rejet sur le niveau retesté', desc: 'Bougie de rejet (pin bar / engulf). CVD reprend à la baisse.' },
    { label: 'Entrer SHORT sur le rejet', desc: "SL au-dessus du niveau retesté. TP = extension du premier mouvement." },
    { label: 'Deuxième jambe baissière', desc: "Continuation. Le retest a validé la résistance." },
  ],
  education: {
    analogy: "C'est comme un château fort dont les murs viennent d'être percés. Les soldats attaquants (vendeurs) percent les murailles (cassure). Mais ils s'arrêtent pour se regrouper. Les défenseurs (acheteurs) tentent de reprendre les murs — mais les murs sont maintenant du côté ennemi. Le retour sur les murs est repoussé, et la véritable invasion commence.",
    whatPriceIsDoing: "Après la cassure initiale du support, le prix remonte vers ce même niveau — mais cette fois depuis le bas. Ce que les acheteurs défendaient devient maintenant un plafond (résistance). Le retour est souvent calme avec peu de volume — les vendeurs laissent le prix revenir pour remonter sur de meilleures positions.",
    psychologyExplained: "Les acheteurs qui ont survécu à la cassure espèrent un retour à leur niveau d'entrée. Ils vendent au niveau du retest pour 'sauver' leur mise. Les nouveaux vendeurs voient le retest comme une entrée parfaite. Cette confluence crée un rejet net et la deuxième jambe baissière.",
    checklistItems: [
      { icon: '📉', text: 'Première cassure avec volume élevé' },
      { icon: '🔄', text: 'Retest avec volume faible (peu de conviction à la hausse)' },
      { icon: '🕯️', text: 'Bougie de rejet au niveau (pin bar ou englobante baissière)' },
      { icon: '📊', text: 'CVD qui reprend à la baisse au moment du rejet' },
      { icon: '⏱️', text: 'Retest rapide (2-5 bougies max après la cassure)' },
    ],
    beginnerMistake: "Le débutant entre SHORT lors de la première cassure — c'est correct, mais il rate l'entrée optimale. Pire : certains pensent que le retest est un rebond et passent LONG, se faisant piéger par la deuxième jambe.",
    proEntry: {
      entry: 'Entrer SHORT lors de la bougie de rejet sur le niveau retesté',
      sl: 'SL au-dessus du plus haut de la bougie de rejet',
      tp: "TP = extension de la première jambe baissière projetée depuis le point de retest",
    },
    keyConceptTags: ['Support/Résistance', 'Retest', 'Flip de niveau', 'CVD'],
  },
  de: 800,
  dt: 3800,
};
