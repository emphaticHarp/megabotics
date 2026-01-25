import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/lib/models/User';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (user.isVerified) {
      return NextResponse.json(
        { error: 'Email already verified' },
        { status: 400 }
      );
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto
      .createHash('sha256')
      .update(verificationToken)
      .digest('hex');

    user.verificationToken = tokenHash;
    user.verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    await user.save();

    // In production, send email with verification link
    // For now, return the token for testing
    const verificationLink = `${process.env.NEXT_PUBLIC_API_URL}/verify-email?token=${verificationToken}&email=${email}`;

    return NextResponse.json({
      success: true,
      message: 'Verification email sent',
      verificationLink, // Remove in production
    });
  } catch (error: any) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send verification email' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (!token || !email) {
      return NextResponse.json(
        { error: 'Invalid verification link' },
        { status: 400 }
      );
    }

    const tokenHash = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      email,
      verificationToken: tokenHash,
      verificationTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired verification link' },
        { status: 400 }
      );
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully',
    });
  } catch (error: any) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to verify email' },
      { status: 500 }
    );
  }
}
