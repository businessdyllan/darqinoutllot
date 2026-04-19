export const fmtEur = (n: number) =>
  (n >= 0 ? '+' : '') + Math.round(n).toLocaleString('fr-FR') + ' €';

export const fmtPct = (n: number) =>
  (n >= 0 ? '+' : '') + (n * 100).toFixed(1) + '%';

export const fmtPrice = (n: number) => Math.round(n).toLocaleString('fr-FR');
