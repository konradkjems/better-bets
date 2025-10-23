import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';

interface Calculation {
  _id: string;
  customerName: string;
  teamNames: {
    team1: string;
    team2: string;
  };
  betType: 'qualifying' | 'bonus';
  results: {
    totalStake: number;
    totalActualCost: number;
    profit: number;
    profitPercentage: number;
    isArbitrage: boolean;
  };
  createdAt: string;
}

interface CalculationHistoryProps {
  onLoadCalculation: (calculation: Calculation) => void;
}

export function CalculationHistory({ onLoadCalculation }: CalculationHistoryProps) {
  const { getToken } = useAuth();
  const [calculations, setCalculations] = useState<Calculation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'qualifying' | 'bonus'>('all');

  const fetchCalculations = async () => {
    try {
      setLoading(true);
      
      // In development, use mock data since Vite doesn't support serverless functions
      if (import.meta.env.DEV) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setCalculations([]);
        setLoading(false);
        return;
      }
      
      const token = await getToken();
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      const response = await fetch(`${apiUrl}/calculations/list`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch calculations');
      }

      const data = await response.json();
      setCalculations(data.calculations);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch calculations');
    } finally {
      setLoading(false);
    }
  };

  const deleteCalculation = async (id: string) => {
    try {
      // In development, just remove from local state
      if (import.meta.env.DEV) {
        setCalculations(calculations.filter(calc => calc._id !== id));
        return;
      }
      
      const token = await getToken();
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      const response = await fetch(`${apiUrl}/calculations/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete calculation');
      }

      setCalculations(calculations.filter(calc => calc._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete calculation');
    }
  };

  useEffect(() => {
    fetchCalculations();
  }, []);

  const filteredCalculations = calculations.filter(calc => 
    filter === 'all' || calc.betType === filter
  );

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="text-center text-red-600">
          <p>Error: {error}</p>
          <button 
            onClick={fetchCalculations}
            className="btn-secondary mt-2"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">My Calculations</h2>
        <div className="flex gap-2">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value as 'all' | 'qualifying' | 'bonus')}
            className="input-field"
          >
            <option value="all">All Types</option>
            <option value="qualifying">Bet 1 (Qualifying)</option>
            <option value="bonus">Bet 2 (Bonus)</option>
          </select>
          <button 
            onClick={fetchCalculations}
            className="btn-secondary"
          >
            Refresh
          </button>
        </div>
      </div>

      {filteredCalculations.length === 0 ? (
        <div className="text-center py-8">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No calculations yet</h3>
          <p className="text-gray-600 mb-4">Your saved calculations will appear here.</p>
          {import.meta.env.DEV && (
            <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg max-w-md mx-auto">
              💡 <strong>Development Mode:</strong> API calls are disabled in development. 
              Calculations will be saved when deployed to production.
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCalculations.map((calculation) => (
            <div key={calculation._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="font-semibold text-gray-800">{calculation.customerName}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      calculation.betType === 'qualifying' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {calculation.betType === 'qualifying' ? 'Bet 1' : 'Bet 2'}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      calculation.results.isArbitrage 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {calculation.results.isArbitrage ? 'Arbitrage' : 'No Arbitrage'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    {calculation.teamNames.team1} vs {calculation.teamNames.team2}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-600">
                      Stake: {calculation.results.totalStake.toLocaleString('da-DK')} DKK
                    </span>
                    <span className={`font-medium ${
                      calculation.results.profit > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      Profit: {calculation.results.profit.toLocaleString('da-DK')} DKK ({calculation.results.profitPercentage.toFixed(2)}%)
                    </span>
                    <span className="text-gray-500">
                      {new Date(calculation.createdAt).toLocaleDateString('da-DK')}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => onLoadCalculation(calculation)}
                    className="btn-secondary text-sm"
                  >
                    Load
                  </button>
                  <button 
                    onClick={() => deleteCalculation(calculation._id)}
                    className="btn-secondary text-sm text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
