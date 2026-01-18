'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogClose, DialogTitle } from '@/components/ui/dialog';
import { ForgotPasswordModal } from '@/components/forgot-password-modal';
import { useAlert } from '@/components/alert-provider';

export function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const { showAlert } = useAlert();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignIn = () => {
    if (!email.trim()) {
      showAlert({
        type: 'error',
        title: 'Email is required',
      });
      return;
    }

    if (!validateEmail(email)) {
      showAlert({
        type: 'error',
        title: 'Please enter a valid email address',
      });
      return;
    }

    if (!password.trim()) {
      showAlert({
        type: 'error',
        title: 'Password is required',
      });
      return;
    }

    if (password.length < 6) {
      showAlert({
        type: 'error',
        title: 'Password must be at least 6 characters',
      });
      return;
    }

    showAlert({
      type: 'success',
      title: 'Sign in successful!',
    });
    // Here you would typically make an API call
  };

  const handleSignUp = () => {
    if (!email.trim()) {
      showAlert({
        type: 'error',
        title: 'Email is required',
      });
      return;
    }

    if (!validateEmail(email)) {
      showAlert({
        type: 'error',
        title: 'Please enter a valid email address',
      });
      return;
    }

    if (!name.trim()) {
      showAlert({
        type: 'error',
        title: 'Full name is required',
      });
      return;
    }

    if (!password.trim()) {
      showAlert({
        type: 'error',
        title: 'Password is required',
      });
      return;
    }

    if (password.length < 8) {
      showAlert({
        type: 'error',
        title: 'Password must be at least 8 characters',
      });
      return;
    }

    if (!/[a-z]/.test(password)) {
      showAlert({
        type: 'error',
        title: 'Password must contain lowercase letters',
      });
      return;
    }

    if (!/[A-Z]/.test(password)) {
      showAlert({
        type: 'error',
        title: 'Password must contain uppercase letters',
      });
      return;
    }

    if (!/[0-9]/.test(password)) {
      showAlert({
        type: 'error',
        title: 'Password must contain numbers',
      });
      return;
    }

    if (!confirmPassword.trim()) {
      showAlert({
        type: 'error',
        title: 'Please confirm your password',
      });
      return;
    }

    if (password !== confirmPassword) {
      showAlert({
        type: 'error',
        title: 'Passwords do not match',
      });
      return;
    }

    showAlert({
      type: 'success',
      title: 'Account created successfully!',
    });
    // Here you would typically make an API call
  };

  return (
    <>
      <Dialog open={isOpen && !isForgotPasswordOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 border-0 overflow-hidden bg-white rounded-3xl shadow-2xl gap-0 sm:max-w-2xl">
        <DialogTitle className="sr-only">
          {isLogin ? 'Sign In to MEGABOTICS' : 'Create Account with MEGABOTICS'}
        </DialogTitle>
        <div className="grid grid-cols-2 gap-0">
          {/* Left Side - Branding & Info */}
          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-8 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">MEGABOTICS</h2>
              <p className="text-sm text-blue-100 mb-6">Make in India 🇮🇳</p>
              
              <div className="space-y-4">
                {isLogin ? (
                  <>
                    <div className="animate-in fade-in slide-in-from-left duration-500">
                      <h3 className="text-lg font-semibold mb-2">Welcome Back</h3>
                      <p className="text-sm text-blue-100 leading-relaxed">
                        Continue your innovation journey with MEGABOTICS. Access your projects, track progress, and collaborate with our community of innovators.
                      </p>
                    </div>
                    <div className="space-y-3 pt-2 animate-in fade-in slide-in-from-left duration-500 delay-100">
                      <div className="flex items-start gap-2">
                        <span className="text-lg mt-1">✓</span>
                        <div>
                          <p className="font-semibold text-sm">Access Your Projects</p>
                          <p className="text-xs text-blue-100">Manage all your robotics projects</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-lg mt-1">✓</span>
                        <div>
                          <p className="font-semibold text-sm">Track Progress</p>
                          <p className="text-xs text-blue-100">Monitor your development milestones</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-lg mt-1">✓</span>
                        <div>
                          <p className="font-semibold text-sm">Join Community</p>
                          <p className="text-xs text-blue-100">Connect with innovators worldwide</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="animate-in fade-in slide-in-from-left duration-500">
                      <h3 className="text-lg font-semibold mb-2">Join Us Today</h3>
                      <p className="text-sm text-blue-100 leading-relaxed">
                        Start your deep-tech journey with MEGABOTICS. Get exclusive access to tools, resources, and our innovation hub.
                      </p>
                    </div>
                    <div className="space-y-3 pt-2 animate-in fade-in slide-in-from-left duration-500 delay-100">
                      <div className="flex items-start gap-2">
                        <span className="text-lg mt-1">✓</span>
                        <div>
                          <p className="font-semibold text-sm">Exclusive Features</p>
                          <p className="text-xs text-blue-100">Access premium tools and resources</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-lg mt-1">✓</span>
                        <div>
                          <p className="font-semibold text-sm">Innovation Hub</p>
                          <p className="text-xs text-blue-100">Collaborate with industry leaders</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-lg mt-1">✓</span>
                        <div>
                          <p className="font-semibold text-sm">Early Access</p>
                          <p className="text-xs text-blue-100">Get first access to new products</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <p className="text-xs text-blue-100">MEGABOTICS © 2025</p>
          </div>

          {/* Right Side - Form */}
          <div className="p-8 relative">
            <DialogClose className="absolute top-4 right-4" />

            {/* Toggle Buttons */}
            <div className="flex gap-2 justify-center mb-6">
              <Button
                onClick={() => setIsLogin(true)}
                variant={isLogin ? 'default' : 'outline'}
                className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                  isLogin
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg'
                    : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
                }`}
              >
                Sign In
              </Button>
              <Button
                onClick={() => setIsLogin(false)}
                variant={!isLogin ? 'default' : 'outline'}
                className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                  !isLogin
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg'
                    : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
                }`}
              >
                Sign Up
              </Button>
            </div>

            {/* Form Content with Animation */}
            <div className="space-y-4">
              {isLogin ? (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Sign In</h3>
                    <p className="text-xs text-gray-500 mt-1">Enter your credentials</p>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-xs font-semibold text-gray-700">Email ID</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="px-3 py-2.5 text-sm border-0 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Password Input */}
                  <div className="space-y-1.5">
                    <Label htmlFor="password" className="text-xs font-semibold text-gray-700">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="px-3 py-2.5 text-sm border-0 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                      />
                      <span className="text-xs text-gray-700 font-medium">Remember me</span>
                    </label>
                    <button 
                      onClick={() => setIsForgotPasswordOpen(true)}
                      className="text-xs text-blue-600 font-medium hover:text-blue-700 transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  {/* Sign In Button */}
                  <Button 
                    onClick={handleSignIn}
                    className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
                  >
                    Sign In
                  </Button>

                  {/* Divider */}
                  <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-white text-gray-600 font-medium">Or continue with</span>
                    </div>
                  </div>

                  {/* Social Login Buttons */}
                  <div className="space-y-2">
                    <Button className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm">
                      <FontAwesomeIcon icon={faFacebook} className="w-4 h-4" />
                      Facebook
                    </Button>
                    <Button className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm">
                      <FontAwesomeIcon icon={faGoogle} className="w-4 h-4" />
                      Google
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 animate-in fade-in duration-300">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Create Account</h3>
                    <p className="text-xs text-gray-500 mt-1">Join MEGABOTICS community</p>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <Label htmlFor="signup-email" className="text-xs font-semibold text-gray-700">Email ID</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="px-3 py-2.5 text-sm border-0 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-xs font-semibold text-gray-700">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="px-3 py-2.5 text-sm border-0 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Password Input */}
                  <div className="space-y-1.5">
                    <Label htmlFor="signup-password" className="text-xs font-semibold text-gray-700">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="px-3 py-2.5 text-sm border-0 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
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
                      className="px-3 py-2.5 text-sm border-0 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Sign Up Button */}
                  <Button 
                    onClick={handleSignUp}
                    className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
                  >
                    Create Account
                  </Button>

                  {/* Divider */}
                  <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-white text-gray-600 font-medium">Or sign up with</span>
                    </div>
                  </div>

                  {/* Social Login Buttons */}
                  <div className="space-y-2">
                    <Button className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm">
                      <FontAwesomeIcon icon={faFacebook} className="w-4 h-4" />
                      Facebook
                    </Button>
                    <Button className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm">
                      <FontAwesomeIcon icon={faGoogle} className="w-4 h-4" />
                      Google
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    <ForgotPasswordModal isOpen={isForgotPasswordOpen} onClose={() => setIsForgotPasswordOpen(false)} />
    </>
  );
}
