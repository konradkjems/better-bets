import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import { requireAuth } from '../../../../lib/auth';

export async function GET(request: NextRequest) {
  try {
    const userId = await requireAuth();
    const { db } = await connectToDatabase();
    const calculationsCollection = db.collection('calculations');

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const calculations = await calculationsCollection
      .find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await calculationsCollection.countDocuments({ userId });

    return NextResponse.json({
      calculations,
      total,
      page,
      limit,
    });
  } catch (error) {
    console.error('Error fetching calculations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch calculations' },
      { status: 500 }
    );
  }
}
