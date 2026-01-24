import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import FeaturedProject from '@/lib/models/FeaturedProject';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const projects = await FeaturedProject.find({ isActive: true })
      .sort({ order: 1 })
      .lean();

    // Convert _id to string for proper serialization
    const projectsWithStringId = projects.map(proj => ({
      ...proj,
      _id: proj._id?.toString() || proj._id,
    }));

    return NextResponse.json(
      {
        success: true,
        data: projectsWithStringId,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const project = new FeaturedProject(body);
    await project.save();

    return NextResponse.json(
      {
        success: true,
        data: project,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create project' },
      { status: 500 }
    );
  }
}
