import React, { useEffect } from 'react';
import { ClerkProvider, useUser } from '@clerk/clerk-react';
import { AuthButton } from './components/AuthButton';

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk Publishable Key');
}

function LandingPage() {
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    // Redirect to calculator if user is signed in
    if (isLoaded && isSignedIn) {
      window.location.href = '/calculator.html';
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
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
            <AuthButton />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Find the Best <span className="text-blue-600">Arbitrage</span> Opportunities
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Maximize your betting profits by finding guaranteed arbitrage opportunities across multiple bookmakers. 
            Our advanced calculator helps you identify the best betting combinations for risk-free profits.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={() => window.location.href = '/calculator.html'}
              className="btn-primary text-lg px-8 py-4"
            >
              Start Calculating
            </button>
            <button className="btn-secondary text-lg px-8 py-4">
              Learn More
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Advanced Calculator</h3>
              <p className="text-gray-600">Our sophisticated algorithm analyzes odds across multiple bookmakers to find the most profitable arbitrage opportunities.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Risk-Free Profits</h3>
              <p className="text-gray-600">Guaranteed profits regardless of the match outcome. Our calculations ensure you win money no matter what happens.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Save & Track</h3>
              <p className="text-gray-600">Create an account to save your calculations, track your profits, and access your betting history anytime.</p>
            </div>
          </div>

          {/* How it Works */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                <h3 className="font-semibold text-gray-800 mb-2">Sign Up</h3>
                <p className="text-gray-600 text-sm">Create your account with Google for secure access</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                <h3 className="font-semibold text-gray-800 mb-2">Enter Odds</h3>
                <p className="text-gray-600 text-sm">Input odds from different bookmakers for your match</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                <h3 className="font-semibold text-gray-800 mb-2">Calculate</h3>
                <p className="text-gray-600 text-sm">Our algorithm finds the optimal betting distribution</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">4</div>
                <h3 className="font-semibold text-gray-800 mb-2">Profit</h3>
                <p className="text-gray-600 text-sm">Place your bets and enjoy guaranteed profits</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src="/src/assets/Better Bets Icon.svg" alt="Better Bets Logo" className="h-6 w-6" />
            <span className="text-lg font-bold">Better Bets</span>
          </div>
          <p className="text-gray-400">© 2024 Better Bets. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <LandingPage />
    </ClerkProvider>
  );
}

export default App;
