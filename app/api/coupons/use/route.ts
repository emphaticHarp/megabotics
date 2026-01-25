import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Coupon from '@/lib/models/Coupon';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: 'Coupon code is required' },
        { status: 400 }
      );
    }

    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) {
      return NextResponse.json(
        { error: 'Coupon not found' },
        { status: 404 }
      );
    }

    // Check if usage limit is reached
    if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
      return NextResponse.json(
        { error: 'Coupon usage limit exceeded' },
        { status: 400 }
      );
    }

    // Increment usage count
    coupon.usageCount += 1;
    await coupon.save();

    return NextResponse.json({
      success: true,
      message: 'Coupon usage updated',
      data: coupon,
    });
  } catch (error: any) {
    console.error('Error updating coupon usage:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update coupon usage' },
      { status: 500 }
    );
  }
}
