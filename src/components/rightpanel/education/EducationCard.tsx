'use client';
import { useStore } from '@/store';

export default function EducationCard() {
  const scenario = useStore((s) => s.scenario);

  if (!scenario) {
    return (
      <div className="flex items-center justify-center h-full text-[var(--mut)] text-[11px]">
        Sélectionne un scénario pour voir l&apos;explication
      </div>
    );
  }

  const edu = scenario.education;

  const tagColors = ['var(--blu)', 'var(--pur)', 'var(--org)', 'var(--grn)', 'var(--red)'];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-[14px] font-bold text-[var(--wht)] mb-0.5">
          🎓 Décryptage : {scenario.label}
        </h2>
        <div className="flex flex-wrap gap-1 mt-1">
          {edu.keyConceptTags.map((tag, i) => (
            <span
              key={tag}
              className="text-[9px] px-1.5 py-0.5 rounded font-semibold"
              style={{
                color: tagColors[i % tagColors.length],
                background: `${tagColors[i % tagColors.length]}20`,
                border: `1px solid ${tagColors[i % tagColors.length]}40`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Section 1: L'analogie */}
      <div className="bg-[var(--bg3)] border border-[var(--b2)] rounded-lg p-3">
        <div className="text-[10px] text-[var(--org)] font-bold uppercase tracking-wide mb-1.5 flex items-center gap-1">
          <span>🎭</span> L&apos;analogie
        </div>
        <p className="text-[11px] text-[#c0c8e0] leading-relaxed italic">
          &ldquo;{edu.analogy}&rdquo;
        </p>
      </div>

      {/* Section 2: Ce que fait le prix */}
      <div className="bg-[var(--bg3)] border border-[var(--b2)] rounded-lg p-3">
        <div className="text-[10px] text-[var(--blu)] font-bold uppercase tracking-wide mb-1.5 flex items-center gap-1">
          <span>📈</span> Ce que fait le prix
        </div>
        <p className="text-[11px] text-[var(--txt)] leading-relaxed">
          {edu.whatPriceIsDoing}
        </p>
      </div>

      {/* Section 3: Psychologie */}
      <div className="bg-[var(--bg3)] border border-[var(--b2)] rounded-lg p-3">
        <div className="text-[10px] text-[var(--pur)] font-bold uppercase tracking-wide mb-1.5 flex items-center gap-1">
          <span>🧠</span> Pourquoi ça marche
        </div>
        <p className="text-[11px] text-[var(--txt)] leading-relaxed">
          {edu.psychologyExplained}
        </p>
      </div>

      {/* Section 4: Checklist */}
      <div className="bg-[var(--bg3)] border border-[var(--b2)] rounded-lg p-3">
        <div className="text-[10px] text-[var(--grn)] font-bold uppercase tracking-wide mb-2 flex items-center gap-1">
          <span>✅</span> Comment le repérer
        </div>
        <div className="space-y-1.5">
          {edu.checklistItems.map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-[11px]">
              <span className="flex-shrink-0 text-[13px]">{item.icon}</span>
              <span className="text-[var(--txt)] leading-relaxed">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section 5: Erreur classique */}
      <div className="bg-[var(--rdim)] border border-[var(--rbrd)] rounded-lg p-3">
        <div className="text-[10px] text-[var(--red)] font-bold uppercase tracking-wide mb-1.5 flex items-center gap-1">
          <span>⚠️</span> L&apos;erreur classique du débutant
        </div>
        <p className="text-[11px] text-[#f09090] leading-relaxed">
          {edu.beginnerMistake}
        </p>
      </div>

      {/* Section 6: Le métier */}
      <div className="bg-[var(--gdim)] border border-[var(--gbrd)] rounded-lg p-3">
        <div className="text-[10px] text-[var(--grn)] font-bold uppercase tracking-wide mb-2 flex items-center gap-1">
          <span>💼</span> L&apos;entrée du professionnel
        </div>
        <div className="space-y-1.5 text-[11px]">
          <div className="flex gap-2">
            <span className="text-[var(--blu)] font-bold flex-shrink-0">ENTRÉE:</span>
            <span className="text-[var(--txt)]">{edu.proEntry.entry}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[var(--red)] font-bold flex-shrink-0">SL:</span>
            <span className="text-[var(--txt)]">{edu.proEntry.sl}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[var(--grn)] font-bold flex-shrink-0">TP:</span>
            <span className="text-[var(--txt)]">{edu.proEntry.tp}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
