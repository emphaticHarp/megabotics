import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/lib/models/Order';
import mongoose from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid order ID' },
        { status: 400 }
      );
    }

    const order = await Order.findById(id).lean();

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          ...order,
          _id: order._id?.toString(),
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch order' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid order ID' },
        { status: 400 }
      );
    }

    const body = await request.json();

    const order = await Order.findByIdAndUpdate(
      id,
      {
        ...body,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: order,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update order' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid order ID' },
        { status: 400 }
      );
    }

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Order deleted successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting order:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete order' },
      { status: 500 }
    );
  }
}
