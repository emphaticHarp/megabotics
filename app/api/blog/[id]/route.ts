import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import BlogPost from '@/lib/models/BlogPost';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const post = await BlogPost.findOne({
      $or: [
        { _id: id },
        { slug: id },
      ],
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Increment views
    post.views = (post.views || 0) + 1;
    await post.save();

    return NextResponse.json({ success: true, data: post });
  } catch (error: any) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch blog post' },
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
    const post = await BlogPost.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true }
    );

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: post });
  } catch (error: any) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update blog post' },
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
    const post = await BlogPost.findByIdAndDelete(id);

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Blog post deleted' });
  } catch (error: any) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
