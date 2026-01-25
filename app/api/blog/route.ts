import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import BlogPost from '@/lib/models/BlogPost';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let query: any = { published: true };

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;
    const total = await BlogPost.countDocuments(query);
    const posts = await BlogPost.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { title, slug, content, excerpt, author, category, tags, image } = body;

    if (!title || !slug || !content || !excerpt || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const post = new BlogPost({
      title,
      slug: slug.toLowerCase().replace(/\s+/g, '-'),
      content,
      excerpt,
      author,
      category,
      tags: tags || [],
      image,
    });

    await post.save();

    return NextResponse.json(
      { success: true, data: post },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
