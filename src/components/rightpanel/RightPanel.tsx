'use client';
import { useStore } from '@/store';
import GuideTab from './tabs/GuideTab';
import EducationTab from './tabs/EducationTab';
import PortfolioTabWrapper from './tabs/PortfolioTabWrapper';

const TABS = [
  { key: 'guide' as const, label: '📋 Guide', short: 'Guide' },
  { key: 'education' as const, label: '🎓 Décryptage', short: 'Décryptage' },
  { key: 'portfolio' as const, label: '💼 Portfolio', short: 'Portfolio' },
];

export default function RightPanel() {
  const activeTab = useStore((s) => s.rightPanelTab);
  const setTab = useStore((s) => s.setRightPanelTab);
  const tradeHistory = useStore((s) => s.tradeHistory);

  return (
    <div className="flex flex-col h-full bg-[var(--bg2)] overflow-hidden border-l border-[var(--b)]">
      {/* Tab bar */}
      <div className="flex border-b border-[var(--b)] flex-shrink-0">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setTab(tab.key)}
            className={`flex-1 py-2 text-[10px] font-semibold cursor-pointer border-b-2 transition-all
              ${activeTab === tab.key
                ? 'border-[var(--blu)] text-[var(--wht)] bg-[var(--bg3)]'
                : 'border-transparent text-[var(--mut)] hover:text-[var(--txt)] bg-transparent'
              }`}
          >
            {tab.label}
            {tab.key === 'portfolio' && tradeHistory.length > 0 && (
              <span className="ml-1 text-[8px] bg-[var(--blu)] text-black rounded-full px-1 font-bold">
                {tradeHistory.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-hidden relative">
        <div className={`absolute inset-0 ${activeTab === 'guide' ? '' : 'hidden'}`}>
          <GuideTab />
        </div>
        <div className={`absolute inset-0 ${activeTab === 'education' ? '' : 'hidden'}`}>
          <EducationTab />
        </div>
        <div className={`absolute inset-0 ${activeTab === 'portfolio' ? '' : 'hidden'}`}>
          <PortfolioTabWrapper />
        </div>
      </div>
    </div>
  );
}
