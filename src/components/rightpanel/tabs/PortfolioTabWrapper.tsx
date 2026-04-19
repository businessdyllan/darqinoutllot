'use client';
import PortfolioTab from '../portfolio/PortfolioTab';

export default function PortfolioTabWrapper() {
  return (
    <div className="h-full overflow-y-auto p-3">
      <PortfolioTab />
    </div>
  );
}
