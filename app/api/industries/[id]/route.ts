import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Industry from '@/lib/models/Industry';
import { Types } from 'mongoose';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid industry ID' },
        { status: 400 }
      );
    }

    const result = await Industry.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json(
        { error: 'Industry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Industry deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting industry:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete industry' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    console.log('PUT /api/industries/[id] - Updating industry:', id);

    if (!Types.ObjectId.isValid(id)) {
      console.error('Invalid ID format:', id);
      return NextResponse.json(
        { error: `Invalid industry ID: ${id}` },
        { status: 400 }
      );
    }

    const industry = await Industry.findByIdAndUpdate(id, body, { new: true });

    if (!industry) {
      return NextResponse.json(
        { error: 'Industry not found' },
        { status: 404 }
      );
    }

    console.log('Industry updated successfully:', industry._id);

    return NextResponse.json(
      { success: true, data: industry },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating industry:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update industry' },
      { status: 500 }
    );
  }
}
