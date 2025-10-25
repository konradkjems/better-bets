import { auth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';

export async function getUserId(): Promise<string | null> {
  try {
    const { userId } = await auth();
    return userId;
  } catch (error) {
    console.error('Error getting user ID:', error);
    return null;
  }
}

export async function requireAuth(): Promise<string> {
  const userId = await getUserId();
  if (!userId) {
    throw new Error('Unauthorized');
  }
  return userId;
}

export function withAuth<T extends any[]>(
  handler: (userId: string, ...args: T) => Promise<Response>
) {
  return async (...args: T): Promise<Response> => {
    try {
      const userId = await requireAuth();
      return handler(userId, ...args);
    } catch (error) {
      console.error('Auth error:', error);
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  };
}
