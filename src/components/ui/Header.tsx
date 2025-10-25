'use client';

import Link from 'next/link';
import { ClientOnly } from './ClientOnly';

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Better Bets</h1>
                <p className="text-xs text-gray-500">Arbitrage Calculator</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              href="/calculator" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Calculator
            </Link>
            <Link 
              href="/history" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              History
            </Link>
            <Link 
              href="/test" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Tests
            </Link>
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            <ClientOnly fallback={
              <div className="flex items-center space-x-2">
                <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
            }>
              <div className="flex items-center space-x-2">
                <Link 
                  href="/sign-in" 
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link 
                  href="/sign-up" 
                  className="btn-primary text-sm"
                >
                  Sign Up
                </Link>
              </div>
            </ClientOnly>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              className="text-gray-700 hover:text-blue-600 p-2"
              aria-label="Toggle mobile menu"
              aria-expanded="false"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200 py-4">
          <nav className="flex flex-col space-y-2">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              href="/calculator" 
              className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200"
            >
              Calculator
            </Link>
            <Link 
              href="/history" 
              className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200"
            >
              History
            </Link>
            <Link 
              href="/test" 
              className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200"
            >
              Tests
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
