import { ScenarioDefinition } from '@/types/scenario';

export const bullBreakRetest: ScenarioDefinition = {
  id: 'bull_break_retest',
  label: 'Bull Break+Retest',
  type: 'bull',
  dir: 1,
  availableFrom: 'debutant',
  desc: "Breakout haussier puis retest de l'ancienne résistance devenue support.",
  steps: [
    { label: 'Consolidation avec pression haussière', desc: 'CVD légèrement positif.' },
    { label: 'Cassure haussière initiale', desc: 'Résistance cassée avec volume. Premier mouvement.' },
    { label: "Retest de l'ancienne résistance", desc: 'Prix revient tester la zone. Volume faible.' },
    { label: 'Rejet haussier sur le niveau', desc: 'CVD repart à la hausse.' },
    { label: 'Entrer LONG sur le rejet', desc: 'SL sous le niveau retesté. TP = extension.' },
    { label: 'Deuxième jambe haussière', desc: 'Continuation. Retest validé.' },
  ],
  education: {
    analogy: "C'est comme un alpiniste qui franchit un rebord rocheux (cassure). Il marque une pause, regarde en bas pour vérifier que le rocher est solide (retest)... puis repart vers le sommet avec confiance. Le rebord qui le ralentissait devient maintenant son point d'appui.",
    whatPriceIsDoing: "Après la cassure de la résistance, le prix remonte en force puis se replie doucement. Ce repli calme ramène le prix vers l'ancien niveau de résistance — qui est maintenant un support. Le faible volume du repli signifie que les vendeurs ne sont pas convaincus. Le rebond confirme la solidité du nouveau support.",
    psychologyExplained: "Les traders qui ont manqué la cassure attendent le retest pour entrer à meilleur prix. Cette demande 'latente' soutient le prix au retest. Les vendeurs à découvert testent ce niveau — mais face à l'afflux d'acheteurs opportunistes, ils capitulent rapidement.",
    checklistItems: [
      { icon: '📈', text: 'Première cassure avec volume élevé' },
      { icon: '🔄', text: 'Repli calme, volume faible (peu de vendeurs)' },
      { icon: '🕯️', text: 'Bougie de rejet haussier au niveau (marteau ou englobante)' },
      { icon: '📊', text: 'CVD qui repart à la hausse au moment du rebond' },
      { icon: '⏱️', text: 'Retest dans les 3-8 bougies après la cassure' },
    ],
    beginnerMistake: "Le débutant voit le repli et panique — il pense que la cassure était fausse et coupe sa position LONG. Il regarde ensuite le prix remonter sans lui.",
    proEntry: {
      entry: 'Entrer LONG sur la bougie de rejet ou la clôture au-dessus du niveau retesté',
      sl: 'SL sous le plus bas de la bougie de rejet (sous le niveau)',
      tp: "TP = hauteur de la première jambe projetée depuis le point de retest",
    },
    keyConceptTags: ['Support/Résistance', 'Retest', 'Flip de niveau', 'CVD'],
  },
  de: 800,
  dt: 3800,
};
