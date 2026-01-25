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
      // Don't reveal if email exists for security
      return NextResponse.json({
        success: true,
        message: 'If email exists, password reset link has been sent',
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    user.resetPasswordToken = tokenHash;
    user.resetPasswordTokenExpiry = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour
    await user.save();

    // In production, send email with reset link
    const resetLink = `${process.env.NEXT_PUBLIC_API_URL}/reset-password?token=${resetToken}&email=${email}`;

    return NextResponse.json({
      success: true,
      message: 'Password reset link sent to email',
      resetLink, // Remove in production
    });
  } catch (error: any) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process password reset' },
      { status: 500 }
    );
  }
}
