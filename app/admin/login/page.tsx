'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      // Store token and user info
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', JSON.stringify(data.user));

      // Redirect to dashboard
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* Login Card */}
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-8 pb-6 bg-gradient-to-r from-blue-600 to-cyan-600">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <LogIn className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">
                MEGABOTICS
              </h1>
            </div>
            <p className="text-center text-sm text-blue-100">Admin Dashboard</p>
          </div>

          {/* Form */}
          <div className="p-8">
            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="border-gray-300 text-gray-900 placeholder:text-gray-400"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="border-gray-300 text-gray-900 placeholder:text-gray-400 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded border-gray-300 text-blue-600"
                />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </label>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Info Box */}
            <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-800">
                Use your registered admin account credentials to login.
              </p>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-600">
                Not an admin?{' '}
                <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                  Go Home
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-4 text-center text-xs text-gray-500">
          🔒 Secure Admin Area
        </div>
      </div>
    </div>
  );
}
