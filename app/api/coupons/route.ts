import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Coupon from '@/lib/models/Coupon';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const all = searchParams.get('all');

    const cacheHeaders = {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    };

    if (code) {
      const coupon = await Coupon.findOne({
        code: code.toUpperCase(),
        active: true,
        validFrom: { $lte: new Date() },
        validUntil: { $gte: new Date() },
      });

      if (!coupon) {
        return new NextResponse(
          JSON.stringify({ error: 'Invalid or expired coupon' }),
          { status: 404, headers: cacheHeaders }
        );
      }

      if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
        return new NextResponse(
          JSON.stringify({ error: 'Coupon usage limit exceeded' }),
          { status: 400, headers: cacheHeaders }
        );
      }

      return new NextResponse(
        JSON.stringify({ success: true, data: coupon }),
        { status: 200, headers: cacheHeaders }
      );
    }

    // If all=true, fetch all coupons (for admin), otherwise only active ones
    const query = all ? {} : { active: true };
    const coupons = await Coupon.find(query).sort({ createdAt: -1 });
    return new NextResponse(
      JSON.stringify({ success: true, data: coupons }),
      { status: 200, headers: cacheHeaders }
    );
  } catch (error: any) {
    console.error('Error fetching coupons:', error);
    return new NextResponse(
      JSON.stringify({ error: error.message || 'Failed to fetch coupons' }),
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      code,
      description,
      discountType,
      discountValue,
      minOrderAmount,
      maxDiscount,
      usageLimit,
      validFrom,
      validUntil,
    } = body;

    if (!code || !discountType || !discountValue || !validFrom || !validUntil) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const coupon = new Coupon({
      code: code.toUpperCase(),
      description,
      discountType,
      discountValue,
      minOrderAmount: minOrderAmount || 0,
      maxDiscount,
      usageLimit,
      validFrom: new Date(validFrom),
      validUntil: new Date(validUntil),
    });

    await coupon.save();

    return NextResponse.json(
      { success: true, data: coupon },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating coupon:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create coupon' },
      { status: 500 }
    );
  }
}
