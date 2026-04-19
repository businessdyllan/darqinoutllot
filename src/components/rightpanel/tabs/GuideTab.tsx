'use client';
import ScenarioGuide from '../guide/ScenarioGuide';
import OrderForm from '../order/OrderForm';
import PositionChips from '../order/PositionChips';

export default function GuideTab() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto p-3">
        <ScenarioGuide />
      </div>
      <OrderForm />
      <PositionChips />
    </div>
  );
}
