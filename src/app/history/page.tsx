import { EnhancedCalculationHistory } from '../../components/history/EnhancedCalculationHistory';

export default function HistoryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Calculation History</h1>
        <p className="text-gray-600">
          View, manage, and export your past arbitrage calculations
        </p>
      </div>
      
      <EnhancedCalculationHistory />
    </div>
  );
}
