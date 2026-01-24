import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Product from '@/lib/models/Product';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const body = await request.json();
    const { id } = await params;

    // Auto-mark as out of stock if stock is being set to 0
    if (body.stockQuantity !== undefined && body.stockQuantity === 0) {
      body.inStock = false;
    }

    const product = await Product.findByIdAndUpdate(id, body, { new: true });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: product },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Product deleted successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete product' },
      { status: 500 }
    );
  }
}
