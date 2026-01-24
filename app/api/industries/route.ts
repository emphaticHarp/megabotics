import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Industry from '@/lib/models/Industry';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const industries = await Industry.find({ isActive: true })
      .sort({ order: 1 })
      .lean();

    // Convert _id to string for proper serialization
    const industriesWithStringId = industries.map(ind => ({
      ...ind,
      _id: ind._id?.toString() || ind._id,
    }));

    return NextResponse.json(
      {
        success: true,
        data: industriesWithStringId,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching industries:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch industries' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    console.log('POST /api/industries - Creating new industry:', body);

    // Validate required fields
    if (!body.name || !body.description) {
      return NextResponse.json(
        { error: 'Name and description are required' },
        { status: 400 }
      );
    }

    const industry = new Industry(body);
    await industry.save();

    console.log('Industry created successfully:', industry._id);

    return NextResponse.json(
      {
        success: true,
        data: industry,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating industry:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create industry' },
      { status: 500 }
    );
  }
}
