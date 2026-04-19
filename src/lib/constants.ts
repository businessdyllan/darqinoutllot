export const COLORS = {
  bg: '#0b0d12',
  bg2: '#10131a',
  bg3: '#161921',
  card: '#1a1d27',
  b: '#242836',
  b2: '#2e3348',
  b3: '#3a4060',
  txt: '#d8dce8',
  mut: '#6b7394',
  hint: '#3a4060',
  red: '#f03050',
  rdim: '#1e0c12',
  rbrd: '#5a1828',
  grn: '#00d47a',
  gdim: '#061810',
  gbrd: '#186040',
  blu: '#4a9eff',
  bludim: '#0c1e35',
  blubrd: '#1a4a80',
  org: '#f5a020',
  pur: '#b060ff',
  wht: '#e8ecf8',
};

export const PAIRS: Record<string, { sym: string; p: number; atr: number; lev: number }> = {
  BTC: { sym: 'BTC/USD', p: 82450, atr: 2200, lev: 5 },
  DAX: { sym: 'DAX 40', p: 22480, atr: 180, lev: 20 },
  ETH: { sym: 'ETH/USD', p: 3850, atr: 180, lev: 10 },
  NAS: { sym: 'NAS100', p: 19850, atr: 280, lev: 20 },
};

export const SPEED_PRESETS = [
  { label: '×0.5', ms: 2000 },
  { label: '×1', ms: 800 },
  { label: '×2', ms: 400 },
  { label: '×5', ms: 150 },
  { label: '×10', ms: 50 },
];

export const INITIAL_BALANCE = 25000;
