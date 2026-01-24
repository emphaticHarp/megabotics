import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/lib/models/Order';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .lean();

    const ordersWithStringId = orders.map(order => ({
      ...order,
      _id: order._id?.toString() || order._id,
    }));

    return NextResponse.json(
      {
        success: true,
        data: ordersWithStringId,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    if (!body.customerName || !body.email || !body.phone || !body.items) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate unique order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const order = new Order({
      ...body,
      orderId,
    });

    await order.save();

    return NextResponse.json(
      {
        success: true,
        data: order,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}
