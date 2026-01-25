import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Product from '@/lib/models/Product';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const userId = searchParams.get('userId');
    const type = searchParams.get('type') || 'similar'; // similar, trending, popular

    let recommendations: any[] = [];

    if (type === 'similar' && productId) {
      // Get similar products based on category and price range
      const product = await Product.findById(productId).lean();

      if (product) {
        recommendations = await Product.find({
          _id: { $ne: productId },
          category: product.category,
          price: {
            $gte: product.price * 0.7,
            $lte: product.price * 1.3,
          },
          isActive: true,
        })
          .limit(6)
          .lean();
      }
    } else if (type === 'trending') {
      // Get trending products (high reviews and ratings)
      recommendations = await Product.find({ isActive: true })
        .sort({ reviews: -1, rating: -1 })
        .limit(6)
        .lean();
    } else if (type === 'popular') {
      // Get popular products (high ratings)
      recommendations = await Product.find({ isActive: true })
        .sort({ rating: -1 })
        .limit(6)
        .lean();
    }

    return NextResponse.json(
      {
        success: true,
        data: recommendations,
        type,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Recommendations error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get recommendations' },
      { status: 500 }
    );
  }
}
