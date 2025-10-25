import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (userId) {
      // User is authenticated, redirect to calculator
      return NextResponse.redirect(new URL('/calculator', process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || 'http://localhost:3000'));
    } else {
      // User is not authenticated, redirect to home
      return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || 'http://localhost:3000'));
    }
  } catch (error) {
    console.error('Auth callback error:', error);
    return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || 'http://localhost:3000'));
  }
}
