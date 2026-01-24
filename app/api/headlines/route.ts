import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Headline from '@/lib/models/Headline';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const headline = await Headline.findOne({ isActive: true }).lean();

    // Serialize the MongoDB document
    const serializedHeadline = headline ? {
      _id: headline._id?.toString(),
      text: headline.text,
      isActive: headline.isActive,
      createdAt: headline.createdAt,
      updatedAt: headline.updatedAt,
    } : null;

    console.log('GET /api/headlines - Found headline:', serializedHeadline);

    return NextResponse.json(
      {
        success: true,
        data: serializedHeadline,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching headline:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch headline' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    console.log('POST /api/headlines - Received:', body);

    // Deactivate all existing headlines
    await Headline.updateMany({}, { isActive: false });

    // Create or update headline
    let headline = await Headline.findOne({});

    if (headline) {
      headline.text = body.text;
      headline.isActive = body.isActive;
      await headline.save();
    } else {
      headline = new Headline({
        text: body.text,
        isActive: body.isActive,
      });
      await headline.save();
    }

    // Serialize the response
    const serializedHeadline = {
      _id: headline._id?.toString(),
      text: headline.text,
      isActive: headline.isActive,
      createdAt: headline.createdAt,
      updatedAt: headline.updatedAt,
    };

    console.log('POST /api/headlines - Saved:', serializedHeadline);

    return NextResponse.json(
      {
        success: true,
        data: serializedHeadline,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error saving headline:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to save headline' },
      { status: 500 }
    );
  }
}
