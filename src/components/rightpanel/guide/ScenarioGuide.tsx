'use client';
import { useStore } from '@/store';

export default function ScenarioGuide() {
  const scenario = useStore((s) => s.scenario);
  const stepTriggered = useStore((s) => s.stepTriggered);
  const signalReady = useStore((s) => s.signalReady);
  const config = useStore((s) => s.config);

  if (!scenario) return null;

  const done = stepTriggered.filter(Boolean).length;
  const progress = Math.round((done / scenario.steps.length) * 100);

  const badgeClass =
    scenario.type === 'bull'
      ? 'bg-[var(--gdim)] border border-[var(--gbrd)] text-[var(--grn)]'
      : scenario.type === 'bear'
      ? 'bg-[var(--rdim)] border border-[var(--rbrd)] text-[var(--red)]'
      : 'bg-[#1e1000] border border-[#5a3a00] text-[var(--org)]';

  const badgeLabel =
    scenario.type === 'bull' ? 'HAUSSIER' : scenario.type === 'bear' ? 'BAISSIER' : 'FAKEOUT';

  const sigClass =
    scenario.type === 'bull'
      ? 'border-[var(--gbrd)] bg-[var(--gdim)] text-[#80d8a0]'
      : scenario.type === 'bear'
      ? 'border-[var(--rbrd)] bg-[var(--rdim)] text-[#f09090]'
      : 'border-[#5a3a00] bg-[#1e1000] text-[#d09040]';

  const sigText =
    scenario.type === 'warn'
      ? `Fakeout confirmé — volume insuffisant. Entrer dans le sens opposé.`
      : scenario.dir > 0
      ? `Signal LONG — cassure haussière confirmée. CVD positif.`
      : `Signal SHORT — cassure baissière confirmée. CVD négatif.`;

  const sigIcon = scenario.type === 'warn' ? '⚠' : scenario.dir > 0 ? '▲' : '▼';
  const sigLabel =
    scenario.type === 'warn' ? 'FAKEOUT' : scenario.dir > 0 ? 'SIGNAL LONG' : 'SIGNAL SHORT';

  return (
    <div>
      <div className="flex items-center gap-1.5 mb-1">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${badgeClass}`}>
          {badgeLabel}
        </span>
        {config.showScenarioPreAnnounced && (
          <span className="text-[13px] font-bold text-[var(--wht)]">{scenario.label}</span>
        )}
      </div>

      {config.showScenarioPreAnnounced && (
        <p className="text-[11px] text-[#9aa0bc] leading-relaxed mb-2">{scenario.desc}</p>
      )}

      <div className="h-0.5 bg-[var(--b)] rounded mb-2 overflow-hidden">
        <div
          className="h-full bg-[var(--blu)] rounded transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {signalReady && config.showSignalBox && (
        <div className={`p-2 rounded border mb-2 text-[11px] leading-relaxed ${sigClass}`}>
          <div className="font-bold text-[12px] mb-0.5">
            {sigIcon} {sigLabel}
          </div>
          {sigText}
        </div>
      )}

      <div className="text-[9px] text-[var(--mut)] uppercase tracking-wide mb-1.5">
        Étapes — {done}/{scenario.steps.length}
      </div>

      {scenario.steps.map((step, i) => {
        const isDone = stepTriggered[i];
        const isActive = !isDone && (i === 0 || (i > 0 && stepTriggered[i - 1]));
        const isLocked = !isDone && !isActive;

        return (
          <div
            key={i}
            className={`flex gap-2 px-2 py-1.5 rounded border mb-1 transition-all
              ${isDone ? 'border-[var(--gbrd)] bg-[var(--gdim)] opacity-80' : ''}
              ${isActive ? 'border-[var(--blu)] bg-[var(--bludim)]' : ''}
              ${isLocked ? 'border-[var(--b)] bg-[var(--bg3)] opacity-35' : ''}
            `}
          >
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5
                ${isDone ? 'border-[var(--gbrd)] text-[var(--grn)] bg-[var(--gdim)]' : ''}
                ${isActive ? 'border-[var(--blu)] text-[var(--blu)] bg-[var(--bludim)]' : ''}
                ${isLocked ? 'border-[var(--b2)] text-[var(--mut)]' : ''}
              `}
            >
              {isDone ? '✓' : i + 1}
            </div>
            <div className="flex-1">
              <div className={`text-[11px] font-semibold mb-0.5
                ${isDone ? 'text-[var(--grn)]' : isActive ? 'text-[var(--wht)]' : 'text-[var(--txt)]'}
              `}>
                {i === scenario.steps.length - 1 ? '⚡ ' : ''}{step.label}
              </div>
              {config.showHints && (
                <div className={`text-[10px] leading-relaxed
                  ${isActive ? 'text-[#a0b0d0]' : 'text-[var(--mut)]'}
                `}>
                  {step.desc}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
