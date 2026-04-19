import { ScenarioDefinition } from '@/types/scenario';

export const orderBlock: ScenarioDefinition = {
  id: 'order_block',
  label: 'Order Block',
  type: 'bull',
  dir: 1,
  availableFrom: 'intermediaire',
  desc: "Le prix revient sur le dernier bloc institutionnel avant l'impulsion — une zone de commandes dormantes.",
  steps: [
    { label: 'Impulsion initiale haussière', desc: 'Fort mouvement directionnel avec volume. Identifier la dernière bougie baissière avant l\'impulsion.' },
    { label: 'Retracement vers l\'OB', desc: 'Prix revient calme vers le bas de l\'OB. Volume faible.' },
    { label: 'Entrée dans la zone OB', desc: 'Prix entre dans la bougie source (l\'OB). CVD commence à monter.' },
    { label: 'Rejet dans l\'OB — signal', desc: 'Bougie de rejet : pin bar ou engulfing haussier dans la zone.' },
    { label: 'Entrer LONG sur le rejet', desc: 'SL sous le bas de l\'OB. TP = point de départ de l\'impulsion ou au-delà.' },
    { label: 'Reprise haussière', desc: 'Deuxième jambe haussière. L\'OB a bien tenu.' },
  ],
  education: {
    analogy: "Imagine un chef cuisinier qui passe une grosse commande de légumes à son fournisseur. Il veut 10 tonnes, mais le fournisseur ne peut en livrer que 2 tonnes par jour. La banque, c'est pareil : elle veut acheter des millions de contrats mais ne peut pas tous les acheter d'un coup sans faire monter le prix. Elle laisse donc des 'commandes en attente' à un niveau précis. Quand le prix revient à ce niveau, les commandes se déclenchent.",
    whatPriceIsDoing: "Après une forte impulsion haussière, le prix se replie doucement. Ce repli ramène le prix vers la dernière bougie qui existait AVANT l'impulsion — c'est l'Order Block. C'est là que les institutions ont commencé à acheter lors de la première visite. Elles ont des commandes non remplies qui attendent que le prix revienne.",
    psychologyExplained: "Les grandes institutions ne peuvent pas acheter 1 milliard de dollars d'un coup — ça ferait trop monter le prix. Elles fractionnent leurs ordres. La bougie source (OB) contient les premiers achats institutionnels. Quand le prix retourne dans cette zone, les ordres restants se déclenchent automatiquement, créant un plancher naturel.",
    checklistItems: [
      { icon: '🏦', text: 'Identifier la dernière bougie BAISSIÈRE avant une impulsion haussière' },
      { icon: '📉', text: 'Retracement calme et ordonné vers la zone (volume faible)' },
      { icon: '🎯', text: 'Prix entre dans le corps de la bougie source' },
      { icon: '🕯️', text: 'Bougie de rejet visible dans la zone (wick ou englobante)' },
      { icon: '📊', text: 'CVD reprend à la hausse dans la zone OB' },
    ],
    beginnerMistake: "Le débutant vend pendant le retracement en pensant que la tendance s'est retournée. Il ignore que les retracements dans un trend sont des opportunités d'achat institutionnelles.",
    proEntry: {
      entry: 'Entrer LONG à la bougie de rejet dans la zone OB (50%-100% de la bougie source)',
      sl: 'SL sous le bas de la bougie source (OB)',
      tp: 'TP au point de départ de l\'impulsion initiale ou extension 1.618',
    },
    keyConceptTags: ['SMC', 'Order Block', 'Retracement', 'Institutionnel'],
  },
  de: 800,
  dt: 3500,
};
