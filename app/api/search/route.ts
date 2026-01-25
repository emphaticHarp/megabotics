import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Product from '@/lib/models/Product';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category');
    const minPrice = parseInt(searchParams.get('minPrice') || '0');
    const maxPrice = parseInt(searchParams.get('maxPrice') || '999999999');
    const minRating = parseInt(searchParams.get('minRating') || '0');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!query || query.length < 2) {
      return NextResponse.json(
        { error: 'Search query must be at least 2 characters' },
        { status: 400 }
      );
    }

    const skip = (page - 1) * limit;

    // Build search filter
    const searchFilter: any = {
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
        { specs: { $regex: query, $options: 'i' } },
      ],
      price: { $gte: minPrice, $lte: maxPrice },
      rating: { $gte: minRating },
      isActive: true,
    };

    if (category) {
      searchFilter.category = category;
    }

    const products = await Product.find(searchFilter)
      .sort({ rating: -1, reviews: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Product.countDocuments(searchFilter);

    return NextResponse.json(
      {
        success: true,
        data: products,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
        query,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: error.message || 'Search failed' },
      { status: 500 }
    );
  }
}
