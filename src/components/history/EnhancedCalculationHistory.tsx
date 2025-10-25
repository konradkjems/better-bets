'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Calculation } from '../../lib/mongodb';
import { exportCalculationResults, downloadCsvFile } from '../../lib/csv-utils';

interface EnhancedCalculationHistoryProps {
  className?: string;
}

export function EnhancedCalculationHistory({ className = '' }: EnhancedCalculationHistoryProps) {
  const { getToken } = useAuth();
  const [calculations, setCalculations] = useState<Calculation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'profit' | 'stake'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterBy, setFilterBy] = useState<'all' | 'profitable' | 'loss'>('all');
  const [selectedCalculations, setSelectedCalculations] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  useEffect(() => {
    fetchCalculations();
  }, []);

  const fetchCalculations = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      if (!token) throw new Error('No authentication token');

      const response = await fetch('/api/calculations/list', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch calculations');
      }

      const data = await response.json();
      setCalculations(data.calculations || []);
    } catch (err) {
      console.error('Error fetching calculations:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch calculations');
    } finally {
      setLoading(false);
    }
  };

  const deleteCalculation = async (id: string) => {
    if (!id) return;
    
    try {
      const token = await getToken();
      if (!token) throw new Error('No authentication token');

      const response = await fetch(`/api/calculations/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete calculation');
      }

      setCalculations(prev => prev.filter(calc => calc._id !== id));
    } catch (err) {
      console.error('Error deleting calculation:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete calculation');
    }
  };

  const deleteSelectedCalculations = async () => {
    try {
      const token = await getToken();
      if (!token) throw new Error('No authentication token');

      const deletePromises = selectedCalculations
        .filter(id => id) // Filter out undefined IDs
        .map(id => 
          fetch(`/api/calculations/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          })
        );

      await Promise.all(deletePromises);
      setCalculations(prev => prev.filter(calc => calc._id && !selectedCalculations.includes(calc._id)));
      setSelectedCalculations([]);
      setShowBulkActions(false);
    } catch (err) {
      console.error('Error deleting calculations:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete calculations');
    }
  };

  const exportSelectedCalculations = () => {
    const selectedCalcs = calculations.filter(calc => calc._id && selectedCalculations.includes(calc._id));
    if (selectedCalcs.length === 0) return;

    // Create a combined CSV export
    const csvContent = selectedCalcs.map(calc => {
      const result = calc.results;
      return exportCalculationResults(result, {
        id: calc._id || '',
        name: calc.customerName,
        teamNames: calc.teamNames,
        bookmakers: calc.bookmakers.map(bm => ({
          ...bm,
          hasBonus: bm.bonusType !== 'none'
        })),
        betType: calc.betType
      }, {
        includeHeaders: false,
        delimiter: ','
      });
    }).join('\n');

    const headers = 'Bookmaker,Bet Type,Odds,Indsats (DKK),Faktisk Omkostning (DKK),Potentiel Gevinst (DKK),Profit (DKK)\n';
    const fullCsvContent = headers + csvContent;

    downloadCsvFile(fullCsvContent, `calculations_export_${new Date().toISOString().split('T')[0]}.csv`);
  };

  const filteredAndSortedCalculations = useMemo(() => {
    let filtered = calculations.filter(calc => calc != null);

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(calc =>
        calc.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${calc.teamNames.team1} vs ${calc.teamNames.team2}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by profitability
    if (filterBy === 'profitable') {
      filtered = filtered.filter(calc => calc.results.profit > 0);
    } else if (filterBy === 'loss') {
      filtered = filtered.filter(calc => calc.results.profit <= 0);
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      switch (sortBy) {
        case 'date':
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        case 'profit':
          aValue = a.results.profit;
          bValue = b.results.profit;
          break;
        case 'stake':
          aValue = a.results.totalStake;
          bValue = b.results.totalStake;
          break;
        default:
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [calculations, searchTerm, sortBy, sortOrder, filterBy]);

  const handleSelectAll = () => {
    if (selectedCalculations.length === filteredAndSortedCalculations.length) {
      setSelectedCalculations([]);
    } else {
      setSelectedCalculations(filteredAndSortedCalculations.map(calc => calc._id).filter((id): id is string => !!id));
    }
  };

  const handleSelectCalculation = (id: string | undefined) => {
    if (!id) return;
    
    setSelectedCalculations(prev =>
      prev.includes(id)
        ? prev.filter(calcId => calcId !== id)
        : [...prev, id]
    );
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
        <div className="text-center py-8">
          <div className="text-red-600 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading History</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchCalculations}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Calculation History</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            {filteredAndSortedCalculations.length} calculations
          </span>
          {selectedCalculations.length > 0 && (
            <span className="text-sm text-blue-600">
              {selectedCalculations.length} selected
            </span>
          )}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by customer name or event..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as any)}
              className="input-field"
            >
              <option value="all">All Calculations</option>
              <option value="profitable">Profitable Only</option>
              <option value="loss">Loss Only</option>
            </select>
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [sort, order] = e.target.value.split('-');
                setSortBy(sort as any);
                setSortOrder(order as any);
              }}
              className="input-field"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="profit-desc">Highest Profit</option>
              <option value="profit-asc">Lowest Profit</option>
              <option value="stake-desc">Highest Stake</option>
              <option value="stake-asc">Lowest Stake</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedCalculations.length > 0 && (
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
            <span className="text-sm text-blue-800">
              {selectedCalculations.length} calculation(s) selected
            </span>
            <button
              onClick={exportSelectedCalculations}
              className="btn-secondary text-sm"
            >
              Export Selected
            </button>
            <button
              onClick={deleteSelectedCalculations}
              className="btn-danger text-sm"
            >
              Delete Selected
            </button>
            <button
              onClick={() => setSelectedCalculations([])}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Clear Selection
            </button>
          </div>
        )}
      </div>

      {/* Calculations List */}
      <div className="space-y-4">
        {filteredAndSortedCalculations.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {calculations.length === 0 ? 'No calculations found' : 'No calculations match your filters'}
          </div>
        ) : (
          <>
            {/* Select All */}
            <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
              <input
                type="checkbox"
                checked={selectedCalculations.length === filteredAndSortedCalculations.length && filteredAndSortedCalculations.length > 0}
                onChange={handleSelectAll}
                className="form-checkbox"
              />
              <span className="text-sm text-gray-600">Select All</span>
            </div>

            {filteredAndSortedCalculations.map((calculation) => {
              if (!calculation) return null;
              
              return (
              <div
                key={calculation._id}
                className={`border rounded-lg p-4 transition-colors ${
                  calculation._id && selectedCalculations.includes(calculation._id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={calculation._id ? selectedCalculations.includes(calculation._id) : false}
                    onChange={() => handleSelectCalculation(calculation._id)}
                    className="form-checkbox mt-1"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {calculation.customerName}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          calculation.results.profit > 0
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {calculation.results.profit > 0 ? '+' : ''}{calculation.results.profit.toFixed(2)} DKK
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(calculation.createdAt).toLocaleDateString('da-DK')}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Total Stake:</span>
                        <div className="font-medium">{calculation.results.totalStake.toFixed(2)} DKK</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Actual Cost:</span>
                        <div className="font-medium">{calculation.results.totalActualCost.toFixed(2)} DKK</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Min Return:</span>
                        <div className="font-medium">
                          {Math.min(
                            calculation.results.potentialReturns.team1,
                            calculation.results.potentialReturns.draw,
                            calculation.results.potentialReturns.team2
                          ).toFixed(2)} DKK
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Max Return:</span>
                        <div className="font-medium">
                          {Math.max(
                            calculation.results.potentialReturns.team1,
                            calculation.results.potentialReturns.draw,
                            calculation.results.potentialReturns.team2
                          ).toFixed(2)} DKK
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => {
                          const csvContent = exportCalculationResults(calculation.results, {
                            id: calculation._id || '',
                            name: calculation.customerName,
                            teamNames: calculation.teamNames,
                            bookmakers: calculation.bookmakers.map(bm => ({
                              ...bm,
                              hasBonus: bm.bonusType !== 'none'
                            })),
                            betType: calculation.betType
                          });
                          downloadCsvFile(csvContent, `calculation_${calculation._id}.csv`);
                        }}
                        className="btn-secondary text-sm"
                      >
                        Export CSV
                      </button>
                      <button
                        onClick={() => calculation._id && deleteCalculation(calculation._id)}
                        className="btn-danger text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
