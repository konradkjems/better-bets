'use client';

import React from 'react';
import { useUser, SignInButton, UserButton } from '@clerk/nextjs';

export function AuthButton() {
  const { isSignedIn, user } = useUser();

  if (isSignedIn) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          Welcome, {user?.firstName || user?.emailAddresses[0]?.emailAddress}
        </span>
        <UserButton 
          appearance={{
            elements: {
              avatarBox: "w-8 h-8"
            }
          }}
        />
      </div>
    );
  }

  return (
    <SignInButton mode="modal">
      <button className="btn-primary">
        Sign In
      </button>
    </SignInButton>
  );
}

export function ProtectedContent({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 text-center">
        <div className="mb-4">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Sign in to save calculations</h3>
          <p className="text-gray-600 mb-4">Create an account to save your arbitrage calculations and access them later.</p>
        </div>
        <SignInButton mode="modal">
          <button className="btn-primary">
            Sign In with Google
          </button>
        </SignInButton>
      </div>
    );
  }

  return <>{children}</>;
}
