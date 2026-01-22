'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { Eye, EyeOff, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogClose, DialogTitle } from '@/components/ui/dialog';
import { ForgotPasswordModal } from '@/components/forgot-password-modal';
import { useAlert } from '@/components/alert-provider';
import { useAuth } from '@/lib/auth-context';

export function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { showAlert } = useAlert();
  const { login, register } = useAuth();

  // Slideshow images
  const slideImages = [
    '/agriculture-icon.png',
    '/infrastructure-icon.png',
    '/defence-icon.png',
    '/disaster-icon.png',
    '/environment-icon.png',
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slideImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length);
  };

  // Load form data from localStorage on mount
  useEffect(() => {
    if (isOpen) {
      const savedData = localStorage.getItem('authFormData');
      if (savedData) {
        try {
          const { email: savedEmail, name: savedName } = JSON.parse(savedData);
          setEmail(savedEmail || '');
          setName(savedName || '');
        } catch (e) {
          // Ignore parse errors
        }
      }
    }
  }, [isOpen]);

  // Save form data to localStorage
  useEffect(() => {
    localStorage.setItem('authFormData', JSON.stringify({ email, name }));
  }, [email, name]);

  // Calculate password strength
  useEffect(() => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  }, [password]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Real-time email validation
  useEffect(() => {
    if (email && !validateEmail(email)) {
      setErrors(prev => ({ ...prev, email: 'Invalid email format' }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.email;
        return newErrors;
      });
    }
  }, [email]);

  // Real-time password validation for signup
  useEffect(() => {
    if (!isLogin && password) {
      const newErrors: Record<string, string> = {};
      if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (!/[a-z]/.test(password)) newErrors.password = 'Must contain lowercase letters';
      if (!/[A-Z]/.test(password)) newErrors.password = 'Must contain uppercase letters';
      if (!/[0-9]/.test(password)) newErrors.password = 'Must contain numbers';
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(prev => ({ ...prev, ...newErrors }));
      } else {
        setErrors(prev => {
          const updated = { ...prev };
          delete updated.password;
          return updated;
        });
      }
    }
  }, [password, isLogin]);

  // Real-time password match validation
  useEffect(() => {
    if (!isLogin && confirmPassword && password !== confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
    } else {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated.confirmPassword;
        return updated;
      });
    }
  }, [password, confirmPassword, isLogin]);

  // Reset form when toggling modes
  const handleToggleMode = (newMode: boolean) => {
    setIsLogin(newMode);
    setPassword('');
    setConfirmPassword('');
    setAcceptTerms(false);
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSignIn = async (e?: React.KeyboardEvent) => {
    // Allow Enter key to submit
    if (e && e.key !== 'Enter') return;
    
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showAlert({
        type: 'error',
        title: 'Please fix the errors above',
      });
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      
      showAlert({
        type: 'success',
        title: 'Sign in successful!',
      });
      
      // Clear form data
      localStorage.removeItem('authFormData');
      setEmail('');
      setPassword('');
      setRememberMe(false);
      setErrors({});
      onClose();
    } catch (error: any) {
      showAlert({
        type: 'error',
        title: error.message || 'Sign in failed',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e?: React.KeyboardEvent) => {
    // Allow Enter key to submit
    if (e && e.key !== 'Enter') return;
    
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/[a-z]/.test(password)) {
      newErrors.password = 'Must contain lowercase letters';
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = 'Must contain uppercase letters';
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = 'Must contain numbers';
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!acceptTerms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showAlert({
        type: 'error',
        title: 'Please fix the errors above',
      });
      return;
    }

    setIsLoading(true);
    try {
      await register(name, email, password, confirmPassword);
      
      showAlert({
        type: 'success',
        title: 'Account created successfully!',
      });
      
      // Clear form data
      localStorage.removeItem('authFormData');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setName('');
      setAcceptTerms(false);
      setErrors({});
      onClose();
    } catch (error: any) {
      showAlert({
        type: 'error',
        title: error.message || 'Sign up failed. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen && !isForgotPasswordOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 border-0 overflow-hidden bg-white rounded-3xl shadow-2xl gap-0 sm:max-w-2xl">
        <DialogTitle className="sr-only">
          {isLogin ? 'Sign In to MEGABOTICS' : 'Create Account with MEGABOTICS'}
        </DialogTitle>
        <div className="grid grid-cols-2 gap-0">
          {/* Left Side - Image Slideshow with Overlay */}
          <div className="relative bg-gray-900 p-8 text-white flex flex-col justify-between overflow-hidden group">
            {/* Slideshow Images - Full Background */}
            {slideImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40" />
              </div>
            ))}

            {/* Navigation Buttons - Visible on Hover */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Content Overlay at Bottom */}
            <div className="relative z-10 mt-auto space-y-4">
              {/* Badge */}
              <div className="inline-block">
                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {isLogin ? 'Welcome' : 'Join Now'}
                </span>
              </div>

              {/* Title */}
              <div>
                <h2 className="text-4xl font-bold mb-3">
                  {isLogin ? 'MEGABOTICS' : 'Innovation Hub'}
                </h2>
                <p className="text-sm text-gray-200 leading-relaxed max-w-xs">
                  {isLogin
                    ? 'Experience the future of robotics and autonomous systems with cutting-edge technology.'
                    : 'Join our community of innovators and pioneers in deep-tech robotics.'}
                </p>
              </div>

              {/* Features */}
              <div className="flex gap-4 text-xs text-gray-300 pt-2">
                <div className="flex items-center gap-1">
                  <span>✓</span>
                  <span>{isLogin ? 'Access Projects' : 'Exclusive Access'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>✓</span>
                  <span>{isLogin ? 'Track Progress' : 'Early Features'}</span>
                </div>
              </div>

              {/* Slide Indicators */}
              <div className="flex gap-2 pt-4">
                {slideImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1 rounded-full transition-all ${
                      index === currentSlide ? 'bg-white w-6' : 'bg-white/50 w-2'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="p-8 relative">
            <DialogClose className="absolute top-4 right-4" />

            {/* Toggle Buttons */}
            <div className="flex gap-2 justify-center mb-6">
              <Button
                onClick={() => handleToggleMode(true)}
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
                onClick={() => handleToggleMode(false)}
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
                      onKeyDown={(e) => e.key === 'Enter' && handleSignIn()}
                      placeholder="you@example.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={`px-3 py-2.5 text-sm border-0 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 transition-all ${
                        errors.email ? 'focus:ring-red-500 ring-2 ring-red-200' : 'focus:ring-blue-500'
                      }`}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-xs text-red-600 font-medium" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Password Input */}
                  <div className="space-y-1.5">
                    <Label htmlFor="password" className="text-xs font-semibold text-gray-700">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSignIn()}
                        placeholder="••••••••"
                        aria-invalid={!!errors.password}
                        aria-describedby={errors.password ? 'password-error' : undefined}
                        className={`px-3 py-2.5 pr-10 text-sm border-0 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 transition-all ${
                          errors.password ? 'focus:ring-red-500 ring-2 ring-red-200' : 'focus:ring-blue-500'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p id="password-error" className="text-xs text-red-600 font-medium" role="alert">
                        {errors.password}
                      </p>
                    )}
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
                    onClick={() => handleSignIn()}
                    disabled={isLoading || !!errors.email || !!errors.password}
                    className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      'Sign In'
                    )}
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
                      onKeyDown={(e) => e.key === 'Enter' && handleSignUp()}
                      placeholder="you@example.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'signup-email-error' : undefined}
                      className={`px-3 py-2.5 text-sm border-0 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 transition-all ${
                        errors.email ? 'focus:ring-red-500 ring-2 ring-red-200' : 'focus:ring-blue-500'
                      }`}
                    />
                    {errors.email && (
                      <p id="signup-email-error" className="text-xs text-red-600 font-medium" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-xs font-semibold text-gray-700">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSignUp()}
                      placeholder="John Doe"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className={`px-3 py-2.5 text-sm border-0 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 transition-all ${
                        errors.name ? 'focus:ring-red-500 ring-2 ring-red-200' : 'focus:ring-blue-500'
                      }`}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-xs text-red-600 font-medium" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Password Input */}
                  <div className="space-y-1.5">
                    <Label htmlFor="signup-password" className="text-xs font-semibold text-gray-700">Password</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSignUp()}
                        placeholder="••••••••"
                        aria-invalid={!!errors.password}
                        aria-describedby={errors.password ? 'signup-password-error' : 'password-requirements'}
                        className={`px-3 py-2.5 pr-10 text-sm border-0 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 transition-all ${
                          errors.password ? 'focus:ring-red-500 ring-2 ring-red-200' : 'focus:ring-blue-500'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    
                    {/* Password Strength Indicator */}
                    {password && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all duration-300 ${
                                passwordStrength <= 2
                                  ? 'w-1/3 bg-red-500'
                                  : passwordStrength <= 4
                                  ? 'w-2/3 bg-yellow-500'
                                  : 'w-full bg-green-500'
                              }`}
                            />
                          </div>
                          <span className={`text-xs font-semibold ${
                            passwordStrength <= 2
                              ? 'text-red-600'
                              : passwordStrength <= 4
                              ? 'text-yellow-600'
                              : 'text-green-600'
                          }`}>
                            {passwordStrength <= 2 ? 'Weak' : passwordStrength <= 4 ? 'Medium' : 'Strong'}
                          </span>
                        </div>
                        
                        {/* Password Requirements */}
                        <div id="password-requirements" className="space-y-1">
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
                    
                    {errors.password && (
                      <p id="signup-password-error" className="text-xs text-red-600 font-medium" role="alert">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password Input */}
                  <div className="space-y-1.5">
                    <Label htmlFor="confirm-password" className="text-xs font-semibold text-gray-700">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSignUp()}
                        placeholder="••••••••"
                        aria-invalid={!!errors.confirmPassword}
                        aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
                        className={`px-3 py-2.5 pr-10 text-sm border-0 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 transition-all ${
                          errors.confirmPassword ? 'focus:ring-red-500 ring-2 ring-red-200' : 'focus:ring-blue-500'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p id="confirm-password-error" className="text-xs text-red-600 font-medium" role="alert">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  {/* Terms & Conditions */}
                  <div className="space-y-1.5">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        aria-invalid={!!errors.terms}
                        aria-describedby={errors.terms ? 'terms-error' : undefined}
                        className="w-4 h-4 accent-blue-600 rounded cursor-pointer mt-0.5 flex-shrink-0"
                      />
                      <span className="text-xs text-gray-700 font-medium">
                        I agree to the{' '}
                        <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                          Terms & Conditions
                        </a>
                        {' '}and{' '}
                        <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                    {errors.terms && (
                      <p id="terms-error" className="text-xs text-red-600 font-medium" role="alert">
                        {errors.terms}
                      </p>
                    )}
                  </div>

                  {/* Sign Up Button */}
                  <Button 
                    onClick={() => handleSignUp()}
                    disabled={isLoading || !!errors.email || !!errors.name || !!errors.password || !!errors.confirmPassword || !!errors.terms}
                    className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      'Create Account'
                    )}
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
