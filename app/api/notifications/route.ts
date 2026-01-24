import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/lib/models/User';
import Order from '@/lib/models/Order';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Get new users (registered in last 24 hours)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const newUsers = await User.find({
      createdAt: { $gte: oneDayAgo },
    }).select('name email createdAt').limit(10).sort({ createdAt: -1 });

    // Get new orders (placed in last 24 hours)
    const newOrders = await Order.find({
      createdAt: { $gte: oneDayAgo },
    }).select('_id customerName customerEmail totalAmount status createdAt').limit(10).sort({ createdAt: -1 });

    // Get total counts
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: 'pending' });

    return NextResponse.json({
      success: true,
      data: {
        newUsers,
        newOrders,
        stats: {
          totalUsers,
          totalOrders,
          pendingOrders,
          newUsersCount: newUsers.length,
          newOrdersCount: newOrders.length,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}
