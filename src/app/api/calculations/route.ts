import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import { requireAuth } from '../../../lib/auth';

export async function POST(request: NextRequest) {
  try {
    const userId = await requireAuth();
    const { db } = await connectToDatabase();
    const calculationsCollection = db.collection('calculations');

    const body = await request.json();
    const calculationData = {
      userId,
      customerName: body.customerName,
      teamNames: body.teamNames,
      betType: body.betType,
      bookmakers: body.bookmakers,
      results: body.results,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await calculationsCollection.insertOne(calculationData);

    return NextResponse.json({
      success: true,
      id: result.insertedId,
      message: 'Calculation saved successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Error saving calculation:', error);
    return NextResponse.json(
      { error: 'Failed to save calculation' },
      { status: 500 }
    );
  }
}
