'use client';

import React, { memo, useMemo, useCallback, Suspense, lazy } from 'react';
import { Customer, ArbitrageResult } from '../../lib/calculator';

// Lazy load heavy components
const CsvManager = lazy(() => import('../csv/CsvManager').then(module => ({ default: module.CsvManager })));

interface OptimizedCalculatorProps {
  customers: Customer[];
  currentCustomer: Customer | null;
  calculationResult: ArbitrageResult | null;
  onImportComplete: (result: any) => void;
}

// Memoized bookmaker row component
const BookmakerRow = memo(({ 
  bookmaker, 
  index, 
  currentBetType, 
  onOddsChange, 
  onActiveChange, 
  onBet1Change 
}: {
  bookmaker: any;
  index: number;
  currentBetType: 'qualifying' | 'bonus';
  onOddsChange: (index: number, field: string, value: number) => void;
  onActiveChange: (index: number, active: boolean) => void;
  onBet1Change: (index: number, field: string, value: any) => void;
}) => {
  const handleOddsChange = useCallback((field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    onOddsChange(index, field, numValue);
  }, [index, onOddsChange]);

  const handleActiveChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onActiveChange(index, e.target.checked);
  }, [index, onActiveChange]);

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-800">{bookmaker.name}</h3>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={bookmaker.isActive}
                onChange={handleActiveChange}
              />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <p className="text-sm text-gray-600">
            Min. odds: {bookmaker.minOdds} | Indsats: {bookmaker.fixedStake} DKK
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hold 1</label>
          <input 
            type="number" 
            step="0.01" 
            min={bookmaker.minOdds}
            className="input-field" 
            placeholder="Odds"
            value={bookmaker.odds?.team1 || ''}
            onChange={(e) => handleOddsChange('team1', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Uafgjort</label>
          <input 
            type="number" 
            step="0.01" 
            min={bookmaker.minOdds}
            className="input-field" 
            placeholder="Odds"
            value={bookmaker.odds?.draw || ''}
            onChange={(e) => handleOddsChange('draw', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hold 2</label>
          <input 
            type="number" 
            step="0.01" 
            min={bookmaker.minOdds}
            className="input-field" 
            placeholder="Odds"
            value={bookmaker.odds?.team2 || ''}
            onChange={(e) => handleOddsChange('team2', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
});

BookmakerRow.displayName = 'BookmakerRow';

// Memoized results table component
const ResultsTable = memo(({ 
  calculationResult, 
  currentCustomer 
}: {
  calculationResult: ArbitrageResult;
  currentCustomer: Customer | null;
}) => {
  const bookmakerRows = useMemo(() => {
    return calculationResult.allBookmakers.map((bm: any, index: number) => {
      const potentialWin = bm.betType === 'team1' ? bm.team1Odds * bm.fixedStake :
                          bm.betType === 'draw' ? bm.drawOdds * bm.fixedStake :
                          bm.team2Odds * bm.fixedStake;

      return (
        <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
          <td className="px-4 py-3">
            <div className="font-medium text-gray-900">{bm.name}</div>
            {bm.actualCost !== bm.fixedStake && (
              <div className="text-xs text-green-600">Med bonus</div>
            )}
          </td>
          <td className="px-4 py-3">
            <div className="flex items-center gap-1">
              {bm.team1Odds.toFixed(2)}
              {bm.betType === 'team1' && (
                <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                  Spil på {currentCustomer?.teamNames?.team1 || 'Hold 1'}
                </span>
              )}
            </div>
          </td>
          <td className="px-4 py-3">
            <div className="flex items-center gap-1">
              {bm.drawOdds.toFixed(2)}
              {bm.betType === 'draw' && (
                <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                  Spil på Uafgjort
                </span>
              )}
            </div>
          </td>
          <td className="px-4 py-3">
            <div className="flex items-center gap-1">
              {bm.team2Odds.toFixed(2)}
              {bm.betType === 'team2' && (
                <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                  Spil på {currentCustomer?.teamNames?.team2 || 'Hold 2'}
                </span>
              )}
            </div>
          </td>
          <td className="px-4 py-3 text-right">
            <div className="font-medium">{bm.fixedStake.toLocaleString('da-DK')} DKK</div>
            {bm.actualCost !== bm.fixedStake && (
              <div className="text-xs text-green-600">{bm.actualCost.toLocaleString('da-DK')} DKK</div>
            )}
          </td>
          <td className="px-4 py-3 text-right">
            <div className="font-medium text-green-600">{potentialWin.toLocaleString('da-DK')} DKK</div>
            {bm.actualCost !== bm.fixedStake && (
              <div className="text-xs text-green-600">
                Profit: {(potentialWin - bm.actualCost).toLocaleString('da-DK')} DKK
              </div>
            )}
          </td>
        </tr>
      );
    });
  }, [calculationResult.allBookmakers, currentCustomer]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Bookmaker</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              {currentCustomer?.teamNames?.team1 || 'Hold 1'}
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Uafgjort</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              {currentCustomer?.teamNames?.team2 || 'Hold 2'}
            </th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Indsats</th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Gevinst</th>
          </tr>
        </thead>
        <tbody>
          {bookmakerRows}
          
          {/* Total row */}
          <tr className="bg-gray-50 font-semibold border-t-2 border-gray-200">
            <td className="px-4 py-3">Total</td>
            <td className="px-4 py-3 text-right">{calculationResult.potentialReturns.team1.toLocaleString('da-DK')} DKK</td>
            <td className="px-4 py-3 text-right">{calculationResult.potentialReturns.draw.toLocaleString('da-DK')} DKK</td>
            <td className="px-4 py-3 text-right">{calculationResult.potentialReturns.team2.toLocaleString('da-DK')} DKK</td>
            <td className="px-4 py-3 text-right">
              <div>{calculationResult.totalStake.toLocaleString('da-DK')} DKK</div>
              <div className="text-sm text-gray-600">{calculationResult.totalActualCost.toLocaleString('da-DK')} DKK</div>
            </td>
            <td className="px-4 py-3 text-right">
              <div className="text-green-600">
                Min: {Math.min(
                  calculationResult.potentialReturns.team1,
                  calculationResult.potentialReturns.draw,
                  calculationResult.potentialReturns.team2
                ).toLocaleString('da-DK')} DKK
              </div>
              <div className="text-sm text-green-600">
                Max: {Math.max(
                  calculationResult.potentialReturns.team1,
                  calculationResult.potentialReturns.draw,
                  calculationResult.potentialReturns.team2
                ).toLocaleString('da-DK')} DKK
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});

ResultsTable.displayName = 'ResultsTable';

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

// Main optimized calculator component
export const OptimizedCalculator = memo(({ 
  customers, 
  currentCustomer, 
  calculationResult, 
  onImportComplete 
}: OptimizedCalculatorProps) => {
  const handleOddsChange = useCallback((index: number, field: string, value: number) => {
    if (currentCustomer) {
      if (!currentCustomer.bookmakers[index].odds) {
        currentCustomer.bookmakers[index].odds = { team1: 0, draw: 0, team2: 0 };
      }
      (currentCustomer.bookmakers[index].odds as any)[field] = value;
    }
  }, [currentCustomer]);

  const handleActiveChange = useCallback((index: number, active: boolean) => {
    if (currentCustomer) {
      currentCustomer.bookmakers[index].isActive = active;
    }
  }, [currentCustomer]);

  const handleBet1Change = useCallback((index: number, field: string, value: any) => {
    if (currentCustomer) {
      (currentCustomer.bookmakers[index] as any)[field] = value;
    }
  }, [currentCustomer]);

  const bookmakerRows = useMemo(() => {
    if (!currentCustomer) return null;
    
    return currentCustomer.bookmakers.map((bookmaker, index) => (
      <BookmakerRow
        key={`${bookmaker.name}-${index}`}
        bookmaker={bookmaker}
        index={index}
        currentBetType="qualifying"
        onOddsChange={handleOddsChange}
        onActiveChange={handleActiveChange}
        onBet1Change={handleBet1Change}
      />
    ));
  }, [currentCustomer, handleOddsChange, handleActiveChange, handleBet1Change]);

  return (
    <div className="lg:w-1/2">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Bookmaker Odds</h2>
          <p className="text-sm text-gray-600 mb-4">Indtast odds for hver bookmaker</p>
          
          {/* Lazy loaded CSV Manager */}
          <Suspense fallback={<LoadingSpinner />}>
            <CsvManager
              customers={customers}
              currentCustomer={currentCustomer}
              calculationResult={calculationResult}
              onImportComplete={onImportComplete}
            />
          </Suspense>
        </div>
        
        <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
          {currentCustomer ? (
            <div className="space-y-4">
              {bookmakerRows}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Opret en kunde for at indtaste odds
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

OptimizedCalculator.displayName = 'OptimizedCalculator';
