'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Calculation } from '../../lib/mongodb';

interface CalculationHistoryProps {
  onLoadCalculation?: (calculation: Calculation) => void;
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
      
      const token = await getToken();
      const response = await fetch('/api/calculations/list', {
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
      const token = await getToken();
      const response = await fetch(`/api/calculations/${id}`, {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('da-DK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Beregningshistorik</h1>
            <div className="flex items-center gap-4">
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value as 'all' | 'qualifying' | 'bonus')}
                className="input-field"
              >
                <option value="all">Alle</option>
                <option value="qualifying">Kvalificerende</option>
                <option value="bonus">Bonus</option>
              </select>
              <button 
                onClick={fetchCalculations}
                className="btn-secondary"
              >
                Opdater
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {filteredCalculations.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen beregninger fundet</h3>
              <p className="text-gray-600 mb-4">
                {filter === 'all' 
                  ? 'Du har endnu ikke gemt nogen beregninger.' 
                  : `Du har endnu ikke gemt nogen ${filter === 'qualifying' ? 'kvalificerende' : 'bonus'} beregninger.`
                }
              </p>
              <a 
                href="/calculator"
                className="btn-primary"
              >
                Start Ny Beregning
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCalculations.map((calculation) => (
                <div key={calculation._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="font-semibold text-gray-900">{calculation.customerName}</h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          calculation.betType === 'qualifying' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {calculation.betType === 'qualifying' ? 'Kvalificerende' : 'Bonus'}
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          calculation.results.isArbitrage 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {calculation.results.isArbitrage ? 'Arbitrage' : 'Ingen Arbitrage'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">{calculation.teamNames.team1}</span> vs <span className="font-medium">{calculation.teamNames.team2}</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Total Indsats:</span>
                          <div className="font-semibold">{calculation.results.totalStake.toFixed(2)} DKK</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Faktisk Omkostning:</span>
                          <div className="font-semibold">{calculation.results.totalActualCost.toFixed(2)} DKK</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Profit:</span>
                          <div className={`font-semibold ${calculation.results.profit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {calculation.results.profit.toFixed(2)} DKK
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Profit %:</span>
                          <div className={`font-semibold ${calculation.results.profitPercentage > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {calculation.results.profitPercentage.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        Oprettet: {formatDate(calculation.createdAt.toString())}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {onLoadCalculation && (
                        <button 
                          onClick={() => onLoadCalculation(calculation)}
                          className="btn-secondary text-sm"
                        >
                          Indlæs
                        </button>
                      )}
                      <button 
                        onClick={() => deleteCalculation(calculation._id!)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Slet
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
