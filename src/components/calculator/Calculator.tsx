'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { ProtectedContent } from '../auth/AuthButton';
import { 
  Customer, 
  BOOKMAKERS,
  calculateArbitrage,
  gatherOddsData,
  BookmakerInfo,
  ArbitrageResult
} from '../../lib/calculator';
import { CsvManager } from '../csv/CsvManager';
import type { CsvImportResult } from '../../lib/csv-utils';

export function Calculator() {
  const { getToken } = useAuth();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [currentCustomerId, setCurrentCustomerId] = useState<string | null>(null);
  const [currentBetType, setCurrentBetType] = useState<'qualifying' | 'bonus'>('qualifying');
  const [lastCalculatedResult, setLastCalculatedResult] = useState<ArbitrageResult | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [calculationStatus, setCalculationStatus] = useState<'idle' | 'calculating' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState('');
  const [team1Name, setTeam1Name] = useState('');
  const [team2Name, setTeam2Name] = useState('');

  // Initialize calculator when component mounts
  useEffect(() => {
    // Initialize the vanilla TS calculator functionality
    initializeCalculator();
  }, []);

  const initializeCalculator = () => {
    // This will initialize the calculator UI and functionality
    // For now, we'll create a basic structure
  };

  const getCurrentCustomer = (): Customer | null => {
    return customers.find(c => c.id === currentCustomerId) || customers[0] || null;
  };

  const addCustomer = () => {
    if (!newCustomerName.trim() || !team1Name.trim() || !team2Name.trim()) {
      alert('Du skal udfylde alle felter for at fortsætte');
      return;
    }

    const newId = `kunde${customers.length + 1}`;
    const newCustomer: Customer = {
      id: newId,
      name: newCustomerName,
      bookmakers: BOOKMAKERS.map(bm => ({...bm})),
      teamNames: {
        team1: team1Name,
        team2: team2Name
      },
      betType: 'qualifying'
    };
    
    setCustomers([...customers, newCustomer]);
    setCurrentCustomerId(newId);
    setCurrentBetType('qualifying');
    setShowCustomerForm(false);
    setNewCustomerName('');
    setTeam1Name('');
    setTeam2Name('');
  };

  const switchCustomer = (customerId: string) => {
    setCurrentCustomerId(customerId);
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
      setCurrentBetType(customer.betType);
    }
  };

  const switchBetType = (betType: 'qualifying' | 'bonus') => {
    setCurrentBetType(betType);
    const customer = getCurrentCustomer();
    if (customer) {
      customer.betType = betType;
      setCustomers([...customers]);
    }
  };

  const calculateArbitrageHandler = async () => {
    const customer = getCurrentCustomer();
    if (!customer) {
      setErrorMessage('Vælg en kunde først');
      setCalculationStatus('error');
      return;
    }

    setCalculationStatus('calculating');
    setErrorMessage(null);

    try {
      // Collect odds data from active bookmakers using the utility function
      const oddsData = gatherOddsData(customer);

      if (oddsData.length === 0) {
        setErrorMessage('Indtast odds for mindst én aktiv bookmaker');
        setCalculationStatus('error');
        return;
      }

      // Use the advanced arbitrage calculation from calculator.ts
      const result = calculateArbitrage(oddsData, customer);
      setLastCalculatedResult(result);
      setCalculationStatus('idle');
    } catch (error) {
      console.error('Calculation error:', error);
      setErrorMessage(`Fejl ved beregning: ${error instanceof Error ? error.message : 'Ukendt fejl'}`);
      setCalculationStatus('error');
    }
  };

  const saveCalculationHandler = async (calculationData: any) => {
    try {
      const token = await getToken();
      if (!token) throw new Error('No authentication token available');
      
      const response = await fetch('/api/calculations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(calculationData),
      });

      if (!response.ok) {
        throw new Error('Failed to save calculation');
      }

      return await response.json();
    } catch (error) {
      console.error('Error saving calculation:', error);
      throw error;
    }
  };

  const handleSaveCalculation = async () => {
    if (!lastCalculatedResult) return;

    try {
      setSaveStatus('saving');
      
      const customer = getCurrentCustomer();
      if (!customer) {
        throw new Error('No customer selected');
      }

      const calculationData = {
        customerName: customer.name,
        teamNames: customer.teamNames,
        betType: currentBetType,
        bookmakers: lastCalculatedResult.allBookmakers,
        results: {
          totalStake: lastCalculatedResult.totalStake,
          totalActualCost: lastCalculatedResult.totalActualCost,
          potentialReturns: lastCalculatedResult.potentialReturns,
          profit: lastCalculatedResult.profit,
          profitPercentage: lastCalculatedResult.profitPercentage,
          isArbitrage: lastCalculatedResult.isArbitrage,
        }
      };

      await saveCalculationHandler(calculationData);
      setSaveStatus('saved');
      
      // Reset status after 3 seconds
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Error saving calculation:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleCsvImportComplete = (result: CsvImportResult) => {
    if (result.success) {
      setCustomers([...customers]);
    }
    
    // Show result message
    if (result.errors.length > 0) {
      alert(`Fejl: ${result.errors.join(', ')}`);
    } else if (result.warnings.length > 0) {
      alert(`Advarsler: ${result.warnings.join(', ')}`);
    } else {
      alert(`Odds uploadet for ${result.importedCount} bookmakere`);
    }
  };

  return (
    <ProtectedContent>
      <div className="max-w-3xl mx-auto mb-8 bg-blue-50 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-blue-800 mb-4">Sådan kommer du i gang:</h2>
        <ol className="space-y-3 text-blue-900">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center font-bold">1</span>
            <span>Klik på "Start Ny Beregning" og indtast dit navn samt navnene på de to hold du vil beregne odds for.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center font-bold">2</span>
            <span>Indtast odds fra forskellige bookmakere. Du kan enten:
              <ul className="ml-9 mt-2 space-y-1 list-disc text-blue-800">
                <li>Indtaste odds manuelt for hver bookmaker</li>
                <li>Downloade vores CSV-skabelon, udfylde den og uploade den igen</li>
              </ul>
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center font-bold">3</span>
            <span>Brug toggle-knapperne ved siden af hver bookmaker for at vælge hvilke bookmakere der skal indgå i beregningen.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center font-bold">4</span>
            <span>Klik på "Find Bedste Arbitrage Mulighed" for at se den optimale fordeling af indsatser.</span>
          </li>
        </ol>
        <div className="mt-4 pt-4 border-t border-blue-200">
          <p className="text-blue-800 font-medium">💡 Tips:</p>
          <ul className="mt-2 space-y-1 list-disc ml-5 text-blue-800">
            <li>Jo flere bookmakere du inkluderer, jo større chance er der for at finde en god arbitrage mulighed</li>
            <li>Sørg for at odds er indtastet korrekt - selv små fejl kan påvirke resultatet</li>
            <li>Hold øje med minimum odds kravene for hver bookmaker</li>
          </ul>
        </div>
      </div>
      
      {/* Customer Selector */}
      <div className="mb-6 bg-white rounded-xl shadow-sm p-4">
        {customers.length === 0 ? (
          <div className="text-center py-4">
            <button 
              onClick={() => setShowCustomerForm(true)}
              className="btn-primary"
            >
              Start Ny Beregning
            </button>
            <p className="text-gray-600 mt-2">Tryk på knappen ovenfor for at starte en ny beregning</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <select 
                  value={currentCustomerId || ''} 
                  onChange={(e) => switchCustomer(e.target.value)}
                  className="input-field max-w-xs"
                >
                  {customers.map(customer => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
                <button 
                  onClick={() => setShowCustomerForm(true)}
                  className="btn-secondary"
                >
                  Tilføj ny kunde
                </button>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Bet Type:</label>
                <select 
                  value={currentBetType} 
                  onChange={(e) => switchBetType(e.target.value as 'qualifying' | 'bonus')}
                  className="input-field"
                >
                  <option value="qualifying">Bet 1 (Kvalificerende)</option>
                  <option value="bonus">Bet 2 (Bonus og Freebets)</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hold 1</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Indtast navn på hold 1"
                  value={getCurrentCustomer()?.teamNames?.team1 || ''}
                  onChange={(e) => {
                    const customer = getCurrentCustomer();
                    if (customer && customer.teamNames) {
                      customer.teamNames.team1 = e.target.value;
                      setCustomers([...customers]);
                    }
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hold 2</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Indtast navn på hold 2"
                  value={getCurrentCustomer()?.teamNames?.team2 || ''}
                  onChange={(e) => {
                    const customer = getCurrentCustomer();
                    if (customer && customer.teamNames) {
                      customer.teamNames.team2 = e.target.value;
                      setCustomers([...customers]);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Customer Form Modal */}
        {showCustomerForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Ny Beregning</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kundenavn</label>
                  <input 
                    type="text" 
                    className="input-field w-full" 
                    placeholder="Indtast kundens navn"
                    value={newCustomerName}
                    onChange={(e) => setNewCustomerName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hold 1</label>
                    <input 
                      type="text" 
                      className="input-field w-full" 
                      placeholder="Indtast navn på hold 1"
                      value={team1Name}
                      onChange={(e) => setTeam1Name(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hold 2</label>
                    <input 
                      type="text" 
                      className="input-field w-full" 
                      placeholder="Indtast navn på hold 2"
                      value={team2Name}
                      onChange={(e) => setTeam2Name(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button 
                    onClick={() => setShowCustomerForm(false)}
                    className="btn-secondary"
                  >
                    Annuller
                  </button>
                  <button 
                    onClick={addCustomer}
                    className="btn-primary"
                  >
                    Fortsæt til odds
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left side - Odds input */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Bookmaker Odds</h2>
              <p className="text-sm text-gray-600 mb-4" role="note" aria-label="Instructions for entering odds">Indtast odds for hver bookmaker</p>
              
              {/* CSV Manager */}
              <CsvManager
                customers={customers}
                currentCustomer={getCurrentCustomer()}
                calculationResult={lastCalculatedResult}
                onImportComplete={handleCsvImportComplete}
              />
            </div>
            <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
              {getCurrentCustomer() ? (
                <div className="space-y-4">
                  {getCurrentCustomer()!.bookmakers.map((bookmaker, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-800">{bookmaker.name}</h3>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={bookmaker.isActive}
                                onChange={(e) => {
                                  const customer = getCurrentCustomer();
                                  if (customer) {
                                    customer.bookmakers[index].isActive = e.target.checked;
                                    setCustomers([...customers]);
                                  }
                                }}
                              />
                              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                          <p className="text-sm text-gray-600">
                            Min. odds: {bookmaker.minOdds} | Indsats: {bookmaker.fixedStake} DKK
                          </p>
                          {bookmaker.bonusType !== 'none' && (
                            <div className="mt-1">
                              <div className="flex items-center gap-2">
                                <span className={`inline-flex items-center px-2 py-1 rounded-md text-sm ${
                                  bookmaker.bonusType === 'freebet' ? 'bg-green-100 text-green-800' : 
                                  'bg-blue-100 text-blue-800'
                                }`}>
                                  {bookmaker.bonusType === 'freebet' ? 'Freebet' : 'Matching Bonus'}: 
                                  {bookmaker.bonusAmount} DKK
                                  {bookmaker.isBonusLocked ? ' 🔒' : ' ✓'}
                                  {bookmaker.bonusOnlyIfLost ? ' (kun hvis tabt)' : ''}
                                </span>
                                {currentBetType === 'bonus' && (
                                  <label className="flex items-center gap-1">
                                    <input 
                                      type="checkbox" 
                                      className="form-checkbox h-4 w-4 text-blue-600"
                                      checked={bookmaker.usedInBet1 || false}
                                      onChange={(e) => {
                                        const customer = getCurrentCustomer();
                                        if (customer) {
                                          customer.bookmakers[index].usedInBet1 = e.target.checked;
                                          setCustomers([...customers]);
                                        }
                                      }}
                                    />
                                    <span className="text-sm text-gray-600">Brugt i Bet 1</span>
                                  </label>
                                )}
                              </div>
                              <p className="text-xs text-gray-600 mt-1">
                                Kræver {bookmaker.qualifyingBetAmount} DKK kvalificerende bet med min. odds {bookmaker.bonusMinOdds}
                                {bookmaker.bonusOnlyIfLost ? ' - Bonus kun hvis kvalificerende bet tabes (spil på underdog)' : ''}
                              </p>
                              
                              {/* Bet 2 specific fields */}
                              {currentBetType === 'bonus' && (
                                <div className="mt-2">
                                  {bookmaker.bonusType === 'matchingBonus' && (
                                    <div className="flex items-center gap-2">
                                      <label className="text-sm text-gray-600">Saldo fra Bet 1:</label>
                                      <input 
                                        type="number" 
                                        className="input-field w-32" 
                                        value={bookmaker.bet1Balance || ''}
                                        placeholder="DKK"
                                        disabled={!bookmaker.usedInBet1}
                                        onChange={(e) => {
                                          const customer = getCurrentCustomer();
                                          if (customer) {
                                            customer.bookmakers[index].bet1Balance = parseFloat(e.target.value) || 0;
                                            setCustomers([...customers]);
                                          }
                                        }}
                                      />
                                    </div>
                                  )}
                                  
                                  {bookmaker.bonusType === 'freebet' && (
                                    <div className="space-y-2">
                                      {bookmaker.bonusOnlyIfLost && (
                                        <div className="space-y-2">
                                          <div className="flex items-center gap-2">
                                            <label className="text-sm text-gray-600">Bet 1 resultat:</label>
                                            <div className="flex items-center gap-2">
                                              <label className="flex items-center gap-1">
                                                <input 
                                                  type="radio" 
                                                  name={`${bookmaker.name}-bet1-result`}
                                                  value="lost"
                                                  className="form-radio h-4 w-4 text-red-600"
                                                  checked={bookmaker.bet1Lost === true}
                                                  onChange={() => {
                                                    const customer = getCurrentCustomer();
                                                    if (customer) {
                                                      customer.bookmakers[index].bet1Lost = true;
                                                      setCustomers([...customers]);
                                                    }
                                                  }}
                                                />
                                                <span className="text-sm text-red-600">Tabt</span>
                                              </label>
                                              <label className="flex items-center gap-1">
                                                <input 
                                                  type="radio" 
                                                  name={`${bookmaker.name}-bet1-result`}
                                                  value="won"
                                                  className="form-radio h-4 w-4 text-green-600"
                                                  checked={bookmaker.bet1Lost === false}
                                                  onChange={() => {
                                                    const customer = getCurrentCustomer();
                                                    if (customer) {
                                                      customer.bookmakers[index].bet1Lost = false;
                                                      setCustomers([...customers]);
                                                    }
                                                  }}
                                                />
                                                <span className="text-sm text-green-600">Vundet</span>
                                              </label>
                                            </div>
                                          </div>
                                          <div className="text-xs text-gray-600 bg-blue-50 p-2 rounded border-l-4 border-blue-400">
                                            <strong>💡 Freebet betingelse:</strong> 
                                            <span className="ml-1">
                                              {bookmaker.bet1Lost === true ? 
                                                <span className="text-green-600 font-medium">✓ Freebet er tilgængelig (Bet 1 blev tabt)</span> : 
                                                bookmaker.bet1Lost === false ? 
                                                  <span className="text-red-600 font-medium">✗ Freebet ikke tilgængelig (Bet 1 blev vundet)</span> :
                                                  <span className="text-gray-500">Vælg Bet 1 resultat for at se om freebet er tilgængelig</span>
                                              }
                                            </span>
                                          </div>
                                        </div>
                                      )}
                                      <div className="flex items-center gap-2">
                                        <label className="text-sm text-gray-600">Gevinst fra Bet 1:</label>
                                        <input 
                                          type="number" 
                                          className="input-field w-32" 
                                          value={bookmaker.bet1Profit || ''}
                                          placeholder="DKK"
                                          onChange={(e) => {
                                            const customer = getCurrentCustomer();
                                            if (customer) {
                                              customer.bookmakers[index].bet1Profit = parseFloat(e.target.value) || 0;
                                              setCustomers([...customers]);
                                            }
                                          }}
                                        />
                                        <div className="text-xs text-gray-500 ml-2">
                                          {bookmaker.usedInBet1 ? `(Freebet: ${bookmaker.bonusAmount} DKK)` : '(Ikke brugt i Bet 1)'}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={`team1-${index}`}>Hold 1</label>
                          <input 
                            id={`team1-${index}`}
                            type="number" 
                            step="0.01" 
                            min={bookmaker.minOdds}
                            className="input-field" 
                            placeholder="Odds"
                            value={bookmaker.odds?.team1 || ''}
                            onChange={(e) => {
                              const customer = getCurrentCustomer();
                              if (customer) {
                                if (!customer.bookmakers[index].odds) {
                                  customer.bookmakers[index].odds = { team1: 0, draw: 0, team2: 0 };
                                }
                                customer.bookmakers[index].odds!.team1 = parseFloat(e.target.value) || 0;
                                setCustomers([...customers]);
                              }
                            }}
                            aria-label={`Team 1 odds for ${bookmaker.name}`}
                          />
                          <div className="text-xs text-red-600 hidden mt-1">
                            Min. {bookmaker.minOdds}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={`draw-${index}`}>Uafgjort</label>
                          <input 
                            id={`draw-${index}`}
                            type="number" 
                            step="0.01" 
                            min={bookmaker.minOdds}
                            className="input-field" 
                            placeholder="Odds"
                            value={bookmaker.odds?.draw || ''}
                            onChange={(e) => {
                              const customer = getCurrentCustomer();
                              if (customer) {
                                if (!customer.bookmakers[index].odds) {
                                  customer.bookmakers[index].odds = { team1: 0, draw: 0, team2: 0 };
                                }
                                customer.bookmakers[index].odds!.draw = parseFloat(e.target.value) || 0;
                                setCustomers([...customers]);
                              }
                            }}
                            aria-label={`Draw odds for ${bookmaker.name}`}
                          />
                          <div className="text-xs text-red-600 hidden mt-1">
                            Min. {bookmaker.minOdds}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={`team2-${index}`}>Hold 2</label>
                          <input 
                            id={`team2-${index}`}
                            type="number" 
                            step="0.01" 
                            min={bookmaker.minOdds}
                            className="input-field" 
                            placeholder="Odds"
                            value={bookmaker.odds?.team2 || ''}
                            onChange={(e) => {
                              const customer = getCurrentCustomer();
                              if (customer) {
                                if (!customer.bookmakers[index].odds) {
                                  customer.bookmakers[index].odds = { team1: 0, draw: 0, team2: 0 };
                                }
                                customer.bookmakers[index].odds!.team2 = parseFloat(e.target.value) || 0;
                                setCustomers([...customers]);
                              }
                            }}
                            aria-label={`Team 2 odds for ${bookmaker.name}`}
                          />
                          <div className="text-xs text-red-600 hidden mt-1">
                            Min. {bookmaker.minOdds}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Opret en kunde for at indtaste odds
                </div>
              )}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100">
              <button 
                className={`btn-primary flex items-center justify-center gap-2 ${
                  calculationStatus === 'calculating' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={calculateArbitrageHandler}
                disabled={calculationStatus === 'calculating'}
                aria-label="Calculate arbitrage opportunities"
                aria-describedby="calculation-status"
              >
                {calculationStatus === 'calculating' ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                    </svg>
                    Beregner...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                    </svg>
                    Find Bedste Arbitrage Mulighed
                  </>
                )}
              </button>
              
              {/* Status for screen readers */}
              <div id="calculation-status" className="sr-only" aria-live="polite">
                {calculationStatus === 'calculating' ? 'Calculating arbitrage opportunities...' : 
                 calculationStatus === 'error' ? 'Calculation failed' : 
                 'Ready to calculate'}
              </div>
              
              {/* Error Message */}
              {errorMessage && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span className="text-red-800 font-medium">Fejl</span>
                  </div>
                  <p className="text-red-700 text-sm mt-1">{errorMessage}</p>
                  <button
                    onClick={() => setErrorMessage(null)}
                    className="text-red-600 hover:text-red-800 text-sm mt-2"
                  >
                    Luk
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right side - Results */}
        <div className="lg:w-1/2">
          {lastCalculatedResult ? (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Arbitrage Muligheder</h2>
                  <p className="text-sm text-gray-600 mt-1">Beregnede indsatser og potentielle gevinster</p>
                </div>
                <button
                  onClick={handleSaveCalculation}
                  disabled={saveStatus === 'saving'}
                  className={`btn-secondary ${
                    saveStatus === 'saved' ? 'bg-green-100 text-green-800' :
                    saveStatus === 'error' ? 'bg-red-100 text-red-800' :
                    saveStatus === 'saving' ? 'opacity-50' : ''
                  }`}
                >
                  {saveStatus === 'saving' ? 'Saving...' :
                   saveStatus === 'saved' ? 'Saved!' :
                   saveStatus === 'error' ? 'Error' :
                   'Save Calculation'}
                </button>
              </div>
              
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className={`font-semibold text-lg mb-2 ${
                      lastCalculatedResult.isArbitrage ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {lastCalculatedResult.isArbitrage ? '✓ Arbitrage mulighed!' : '✗ Ingen arbitrage'}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total indsats:</span>
                        <span className="font-medium">{lastCalculatedResult.totalStake.toLocaleString('da-DK')} DKK</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Faktisk omkostning:</span>
                        <span className="font-medium">{lastCalculatedResult.totalActualCost.toLocaleString('da-DK')} DKK</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 mb-2">Potentielle gevinster:</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Hold 1:</span>
                        <span className="font-medium">{lastCalculatedResult.potentialReturns.team1.toLocaleString('da-DK')} DKK</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Uafgjort:</span>
                        <span className="font-medium">{lastCalculatedResult.potentialReturns.draw.toLocaleString('da-DK')} DKK</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Hold 2:</span>
                        <span className="font-medium">{lastCalculatedResult.potentialReturns.team2.toLocaleString('da-DK')} DKK</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Garanteret profit:</span>
                    <span className={`text-lg font-bold ${
                      lastCalculatedResult.isArbitrage ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {lastCalculatedResult.profit.toLocaleString('da-DK')} DKK ({lastCalculatedResult.profitPercentage.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Detailed Bookmaker Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Bookmaker</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        {getCurrentCustomer()?.teamNames?.team1 || 'Hold 1'}
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Uafgjort</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                        {getCurrentCustomer()?.teamNames?.team2 || 'Hold 2'}
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Indsats</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Gevinst</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lastCalculatedResult.allBookmakers.map((bm: any, index: number) => {
                      // Calculate potential win based on betType
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
                                  Spil på {getCurrentCustomer()?.teamNames?.team1 || 'Hold 1'}
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
                                  Spil på {getCurrentCustomer()?.teamNames?.team2 || 'Hold 2'}
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
                    })}
                    
                    {/* Total row */}
                    <tr className="bg-gray-50 font-semibold border-t-2 border-gray-200">
                      <td className="px-4 py-3">Total</td>
                      <td className="px-4 py-3 text-right">{lastCalculatedResult.potentialReturns.team1.toLocaleString('da-DK')} DKK</td>
                      <td className="px-4 py-3 text-right">{lastCalculatedResult.potentialReturns.draw.toLocaleString('da-DK')} DKK</td>
                      <td className="px-4 py-3 text-right">{lastCalculatedResult.potentialReturns.team2.toLocaleString('da-DK')} DKK</td>
                      <td className="px-4 py-3 text-right">
                        <div>{lastCalculatedResult.totalStake.toLocaleString('da-DK')} DKK</div>
                        <div className="text-sm text-gray-600">{lastCalculatedResult.totalActualCost.toLocaleString('da-DK')} DKK</div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="text-green-600">
                          Min: {Math.min(
                            lastCalculatedResult.potentialReturns.team1,
                            lastCalculatedResult.potentialReturns.draw,
                            lastCalculatedResult.potentialReturns.team2
                          ).toLocaleString('da-DK')} DKK
                        </div>
                        <div className="text-sm text-green-600">
                          Max: {Math.max(
                            lastCalculatedResult.potentialReturns.team1,
                            lastCalculatedResult.potentialReturns.draw,
                            lastCalculatedResult.potentialReturns.team2
                          ).toLocaleString('da-DK')} DKK
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
              </svg>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Ingen beregninger endnu</h3>
              <p className="text-gray-600">Indtast odds og tryk på "Find Bedste Arbitrage Mulighed" for at se resultater</p>
            </div>
          )}
        </div>
      </div>
    </ProtectedContent>
  );
}