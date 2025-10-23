import React, { useState } from 'react';
import { ClerkProvider, useUser } from '@clerk/clerk-react';
import { AuthButton } from './components/AuthButton';
import { CalculationHistory } from './components/CalculationHistory';
import { Calculator } from './components/Calculator';

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk Publishable Key');
}

function CalculatorPage() {
  const { isSignedIn, isLoaded } = useUser();
  const [showHistory, setShowHistory] = useState(false);

  const handleLoadCalculation = (calculation: any) => {
    // This will be implemented to load calculation data into the calculator
    console.log('Loading calculation:', calculation);
    // TODO: Implement loading calculation into calculator
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <a href="/" className="flex items-center gap-2">
                <img src="/src/assets/Better Bets Icon.svg" alt="Better Bets Logo" className="h-8 w-8" />
                <span className="text-xl font-bold text-gray-800">Better Bets</span>
              </a>
              <AuthButton />
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Calculator</h1>
            <p className="text-gray-600 mb-8">Please sign in to access the arbitrage calculator and save your calculations.</p>
            <AuthButton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <a href="/" className="flex items-center gap-2">
              <img src="/src/assets/Better Bets Icon.svg" alt="Better Bets Logo" className="h-8 w-8" />
              <span className="text-xl font-bold text-gray-800">Better Bets</span>
            </a>
            <div className="flex items-center gap-4">
              <AuthButton />
              <button 
                onClick={() => setShowHistory(!showHistory)}
                className="btn-secondary"
              >
                {showHistory ? 'Hide History' : 'My Calculations'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Better Bets Lommeregner</h1>
          <p className="text-gray-600">Find de bedste betting muligheder på tværs af bookmakere</p>
        </header>

        {/* History Panel */}
        {showHistory && (
          <div className="mb-6">
            <CalculationHistory onLoadCalculation={handleLoadCalculation} />
          </div>
        )}

        {/* Calculator Content */}
        <Calculator />
      </div>
    </div>
  );
}

function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <CalculatorPage />
    </ClerkProvider>
  );
}

export default App;
