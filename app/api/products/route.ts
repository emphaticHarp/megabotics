import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Product from '@/lib/models/Product';

export async function GET(request: NextRequest) {
  try {
    console.log('GET /api/products - Starting');
    await connectDB();
    console.log('GET /api/products - DB Connected');

    const products = await Product.find({})
      .sort({ order: 1 })
      .lean();

    console.log('GET /api/products - Found', products.length, 'products');

    // Convert _id to string for proper serialization
    const productsWithStringId = products.map(prod => ({
      ...prod,
      _id: prod._id?.toString() || prod._id,
    }));

    return NextResponse.json(
      {
        success: true,
        data: productsWithStringId,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.category || !body.price) {
      return NextResponse.json(
        { error: 'Name, category, and price are required' },
        { status: 400 }
      );
    }

    // Ensure description exists
    if (!body.description) {
      body.description = `${body.name} - ${body.category}`;
    }

    // Ensure specs array exists
    if (!body.specs || !Array.isArray(body.specs) || body.specs.length === 0) {
      body.specs = ['Standard specifications'];
    }

    // Ensure images array exists
    if (!body.images || !Array.isArray(body.images) || body.images.length === 0) {
      body.images = ['https://via.placeholder.com/400x400?text=Product'];
    }

    // Validate and constrain rating (0-5)
    if (body.rating !== undefined) {
      body.rating = Math.min(5, Math.max(0, parseFloat(body.rating) || 0));
    }

    // Ensure other numeric fields have valid values
    body.price = parseFloat(body.price) || 0;
    body.originalPrice = body.originalPrice ? parseFloat(body.originalPrice) : body.price;
    body.discount = body.discount ? Math.min(100, Math.max(0, parseFloat(body.discount))) : 0;
    body.stockQuantity = body.stockQuantity ? parseInt(body.stockQuantity) : 0;
    body.reviews = body.reviews ? parseInt(body.reviews) : 0;

    // Auto-mark as out of stock if stock is 0
    if (body.stockQuantity === 0) {
      body.inStock = false;
    }

    const product = new Product(body);
    await product.save();

    return NextResponse.json(
      {
        success: true,
        data: product,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating product:', error);
    
    // Extract validation error details
    let errorMessage = 'Failed to create product';
    if (error.errors) {
      const errorDetails = Object.entries(error.errors)
        .map(([key, value]: any) => `${key}: ${value.message}`)
        .join(', ');
      errorMessage = `Validation error: ${errorDetails}`;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
