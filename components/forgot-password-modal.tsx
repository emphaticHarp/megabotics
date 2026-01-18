'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import { useAlert } from '@/components/alert-provider';

type ForgotPasswordStep = 'email' | 'otp' | 'password';

const calculatePasswordStrength = (password: string): { strength: 'weak' | 'medium' | 'strong'; score: number } => {
  let score = 0;
  
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2) return { strength: 'weak', score };
  if (score <= 4) return { strength: 'medium', score };
  return { strength: 'strong', score };
};

export function ForgotPasswordModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState<ForgotPasswordStep>('email');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { showAlert } = useAlert();
  const passwordStrength = calculatePasswordStrength(password);
  const passwordsMatch = password === confirmPassword && password.length > 0;
  const isPasswordValid = password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password);

  const handleReset = () => {
    showAlert({
      type: 'success',
      title: 'Password Reset Successfully! You can now sign in with your new password.',
      duration: 5000,
    });
    setStep('email');
    setEmailOrPhone('');
    setOtp('');
    setPassword('');
    setConfirmPassword('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 border-0 overflow-hidden bg-white rounded-3xl shadow-2xl gap-0 sm:max-w-2xl">
        <DialogTitle className="sr-only">Reset Your Password</DialogTitle>
        <div className="grid grid-cols-2 gap-0">
          {/* Left Side - Branding & Info */}
          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-8 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">MEGABOTICS</h2>
              <p className="text-sm text-blue-100 mb-6">Make in India 🇮🇳</p>
              
              <div className="space-y-4">
                <div className="animate-in fade-in slide-in-from-left duration-500">
                  <h3 className="text-lg font-semibold mb-2">Reset Your Password</h3>
                  <p className="text-sm text-blue-100 leading-relaxed">
                    We'll help you regain access to your MEGABOTICS account. Follow the simple steps to reset your password securely.
                  </p>
                </div>
                <div className="space-y-3 pt-2 animate-in fade-in slide-in-from-left duration-500 delay-100">
                  <div className="flex items-start gap-2">
                    <span className="text-lg mt-1">✓</span>
                    <div>
                      <p className="font-semibold text-sm">Verify Your Identity</p>
                      <p className="text-xs text-blue-100">Confirm via email or phone</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-lg mt-1">✓</span>
                    <div>
                      <p className="font-semibold text-sm">Enter OTP Code</p>
                      <p className="text-xs text-blue-100">6-digit verification code</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-lg mt-1">✓</span>
                    <div>
                      <p className="font-semibold text-sm">Create New Password</p>
                      <p className="text-xs text-blue-100">Set a strong password</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-blue-100">MEGABOTICS © 2025</p>
          </div>

          {/* Right Side - Form */}
          <div className="p-8">
            {/* Step 1: Email/Phone Input */}
            {step === 'email' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Verify Account</h3>
                  <p className="text-xs text-gray-500 mt-1">Enter your email or phone number</p>
                </div>

                {/* Email or Phone Input */}
                <div className="space-y-1.5">
                  <Label htmlFor="email-phone" className="text-xs font-semibold text-gray-700">Email or Phone Number</Label>
                  <Input
                    id="email-phone"
                    type="text"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="you@example.com or +91 98765 43210"
                    className="px-3 py-2.5 text-sm border-0 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Send OTP Button */}
                <Button 
                  onClick={() => setStep('otp')}
                  className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
                >
                  Send OTP
                </Button>

                {/* Back Button */}
                <Button 
                  onClick={onClose}
                  variant="outline"
                  className="w-full py-2.5 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-full transition-all duration-300 text-sm"
                >
                  Back to Login
                </Button>
              </div>
            )}

            {/* Step 2: OTP Verification */}
            {step === 'otp' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Enter OTP</h3>
                  <p className="text-xs text-gray-500 mt-1">We've sent a 6-digit code to your email/phone</p>
                </div>

                {/* OTP Input */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-gray-700">Verification Code</Label>
                  <div className="flex justify-center py-4">
                    <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} className="w-10 h-10 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
                        <InputOTPSlot index={1} className="w-10 h-10 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
                        <InputOTPSlot index={2} className="w-10 h-10 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} className="w-10 h-10 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
                        <InputOTPSlot index={4} className="w-10 h-10 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
                        <InputOTPSlot index={5} className="w-10 h-10 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  <p className="text-xs text-gray-600 text-center">
                    Didn't receive code? <button className="text-blue-600 font-semibold hover:text-blue-700">Resend</button>
                  </p>
                </div>

                {/* Verify OTP Button */}
                <Button 
                  onClick={() => setStep('password')}
                  disabled={otp.length !== 6}
                  className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Verify OTP
                </Button>

                {/* Back Button */}
                <Button 
                  onClick={() => setStep('email')}
                  variant="outline"
                  className="w-full py-2.5 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-full transition-all duration-300 text-sm"
                >
                  Back
                </Button>
              </div>
            )}

            {/* Step 3: Password Reset */}
            {step === 'password' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Create New Password</h3>
                  <p className="text-xs text-gray-500 mt-1">Set a strong password for your account</p>
                </div>

                {/* New Password Input */}
                <div className="space-y-1.5">
                  <Label htmlFor="new-password" className="text-xs font-semibold text-gray-700">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="px-3 py-2.5 text-sm border-0 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  
                  {/* Password Strength Indicator */}
                  {password.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${
                              passwordStrength.strength === 'weak'
                                ? 'w-1/3 bg-red-500'
                                : passwordStrength.strength === 'medium'
                                ? 'w-2/3 bg-yellow-500'
                                : 'w-full bg-green-500'
                            }`}
                          />
                        </div>
                        <span className={`text-xs font-semibold ${
                          passwordStrength.strength === 'weak'
                            ? 'text-red-500'
                            : passwordStrength.strength === 'medium'
                            ? 'text-yellow-500'
                            : 'text-green-500'
                        }`}>
                          {passwordStrength.strength.charAt(0).toUpperCase() + passwordStrength.strength.slice(1)}
                        </span>
                      </div>
                      
                      {/* Password Requirements */}
                      <div className="space-y-1">
                        <p className={`text-xs font-medium ${password.length >= 8 ? 'text-green-600' : 'text-gray-600'}`}>
                          {password.length >= 8 ? '✓' : '○'} At least 8 characters
                        </p>
                        <p className={`text-xs font-medium ${/[a-z]/.test(password) ? 'text-green-600' : 'text-gray-600'}`}>
                          {/[a-z]/.test(password) ? '✓' : '○'} Lowercase letter
                        </p>
                        <p className={`text-xs font-medium ${/[A-Z]/.test(password) ? 'text-green-600' : 'text-gray-600'}`}>
                          {/[A-Z]/.test(password) ? '✓' : '○'} Uppercase letter
                        </p>
                        <p className={`text-xs font-medium ${/[0-9]/.test(password) ? 'text-green-600' : 'text-gray-600'}`}>
                          {/[0-9]/.test(password) ? '✓' : '○'} Number
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password Input */}
                <div className="space-y-1.5">
                  <Label htmlFor="confirm-password" className="text-xs font-semibold text-gray-700">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`px-3 py-2.5 text-sm border-0 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 ${
                      confirmPassword.length > 0 && !passwordsMatch
                        ? 'focus:ring-red-500 ring-2 ring-red-200'
                        : 'focus:ring-blue-500'
                    }`}
                  />
                  
                  {/* Password Match Status */}
                  {confirmPassword.length > 0 && (
                    <p className={`text-xs font-medium ${
                      passwordsMatch ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {passwordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
                    </p>
                  )}
                </div>

                {/* Reset Password Button */}
                <Button 
                  onClick={handleReset}
                  disabled={!isPasswordValid || !passwordsMatch}
                  className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reset Password
                </Button>

                {/* Back Button */}
                <Button 
                  onClick={() => setStep('otp')}
                  variant="outline"
                  className="w-full py-2.5 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-full transition-all duration-300 text-sm"
                >
                  Back
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
