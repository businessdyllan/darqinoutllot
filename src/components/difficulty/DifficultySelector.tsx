'use client';
import { useStore } from '@/store';
import { DIFFICULTY_CONFIGS, DifficultyLevel } from '@/types/difficulty';

const LEVELS: DifficultyLevel[] = ['debutant', 'intermediaire', 'avance', 'expert'];

export default function DifficultySelector() {
  const show = useStore((s) => s.showDifficultyModal);
  const currentLevel = useStore((s) => s.level);
  const setDifficulty = useStore((s) => s.setDifficulty);
  const setShow = useStore((s) => s.setShowDifficultyModal);

  if (!show) return null;

  const handleSelect = (level: DifficultyLevel) => {
    setDifficulty(level);
    setShow(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[var(--card)] border border-[var(--b2)] rounded-xl p-6 w-[360px] max-w-[95vw]">
        <h2 className="text-[16px] font-bold text-[var(--wht)] mb-1">
          Choisis ton niveau
        </h2>
        <p className="text-[11px] text-[var(--mut)] mb-5">
          Le niveau affecte les hints, la vitesse de simulation et les fonctionnalités disponibles.
        </p>

        <div className="space-y-2">
          {LEVELS.map((lvl) => {
            const cfg = DIFFICULTY_CONFIGS[lvl];
            const isActive = currentLevel === lvl;
            return (
              <button
                key={lvl}
                onClick={() => handleSelect(lvl)}
                className={`w-full text-left px-3 py-3 rounded-lg border transition-all cursor-pointer
                  ${isActive
                    ? 'border-[var(--blu)] bg-[var(--bludim)]'
                    : 'border-[var(--b2)] bg-[var(--bg3)] hover:border-[var(--b3)]'
                  }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[13px] font-bold text-[var(--wht)]">
                    {cfg.emoji} {cfg.labelFr}
                  </span>
                  <span className="text-[9px] text-[var(--mut)] font-mono">
                    ~{cfg.tickIntervalMs}ms/tick
                  </span>
                </div>
                <p className="text-[10px] text-[var(--mut)]">{cfg.description}</p>
                <div className="flex gap-1.5 mt-1.5 flex-wrap">
                  {cfg.showHints && (
                    <Tag color="var(--grn)">Hints</Tag>
                  )}
                  {cfg.showSlTpSuggestions && (
                    <Tag color="var(--grn)">SL/TP suggérés</Tag>
                  )}
                  {cfg.showSignalBox && (
                    <Tag color="var(--blu)">Signal visible</Tag>
                  )}
                  {cfg.scoringEnabled && (
                    <Tag color="var(--org)">Score</Tag>
                  )}
                  {cfg.leaderboardEnabled && (
                    <Tag color="var(--pur)">Classement</Tag>
                  )}
                  {!cfg.showScenarioPreAnnounced && (
                    <Tag color="var(--red)">Scénario masqué</Tag>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {currentLevel && (
          <button
            onClick={() => setShow(false)}
            className="mt-4 w-full py-2 rounded border border-[var(--b2)] text-[var(--mut)] text-[11px] hover:text-[var(--txt)] cursor-pointer transition-all bg-transparent"
          >
            Continuer avec {DIFFICULTY_CONFIGS[currentLevel].labelFr}
          </button>
        )}
      </div>
    </div>
  );
}

function Tag({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span
      className="text-[8px] font-semibold px-1.5 py-0.5 rounded"
      style={{ color, background: `${color}20`, border: `1px solid ${color}40` }}
    >
      {children}
    </span>
  );
}
