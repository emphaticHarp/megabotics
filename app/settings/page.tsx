'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Settings, Bell, Lock, Eye, EyeOff, Smartphone, Mail, Shield, Trash2, LogOut, Download, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAlert } from '@/components/alert-provider';

export default function SettingsPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const { showAlert } = useAlert();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Notification preferences state
  const [notifications, setNotifications] = useState({
    orderConfirmations: true,
    promotions: true,
    recommendations: false,
    securityAlerts: true,
    newsletter: false,
    smsOrders: true,
    smsDelivery: false,
    smsSecurity: true,
  });

  // Privacy settings state
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    personalization: false,
    shareActivity: true,
  });

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      showAlert({ type: 'error', title: 'Please fill all password fields' });
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showAlert({ type: 'error', title: 'New passwords do not match' });
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      showAlert({ type: 'error', title: 'Password must be at least 8 characters' });
      return;
    }

    setLoading(true);
    try {
      // TODO: Add API call to change password
      await new Promise(resolve => setTimeout(resolve, 1000));
      showAlert({ type: 'success', title: 'Password updated successfully!' });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      showAlert({ type: 'error', title: 'Failed to update password' });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotifications = async () => {
    setLoading(true);
    try {
      // TODO: Add API call to save notifications
      await new Promise(resolve => setTimeout(resolve, 1000));
      showAlert({ type: 'success', title: 'Notification preferences saved!' });
    } catch (error) {
      showAlert({ type: 'error', title: 'Failed to save preferences' });
    } finally {
      setLoading(false);
    }
  };

  const handleSavePrivacy = async () => {
    setLoading(true);
    try {
      // TODO: Add API call to save privacy settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      showAlert({ type: 'success', title: 'Privacy settings saved!' });
    } catch (error) {
      showAlert({ type: 'error', title: 'Failed to save privacy settings' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutAllDevices = () => {
    if (confirm('Are you sure you want to logout from all devices?')) {
      logout();
      router.push('/');
    }
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      showAlert({ type: 'error', title: 'Account deletion is not yet available' });
    }
  };

  const handleDownloadData = () => {
    showAlert({ type: 'success', title: 'Your data download will start shortly' });
  };

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-12 flex items-center gap-2">
            <Settings className="w-8 h-8 text-blue-600" />
            Account Settings
          </h1>

          {/* Grid Layout - 2 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Security - Change Password */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Lock className="w-6 h-6 text-blue-600" />
              Change Password
            </h2>

            <form onSubmit={handlePasswordChange} className="space-y-6">
              <div>
                <Label htmlFor="current-password" className="text-sm font-semibold text-gray-700">
                  Current Password
                </Label>
                <div className="relative mt-2">
                  <Input
                    id="current-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your current password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="new-password" className="text-sm font-semibold text-gray-700">
                  New Password
                </Label>
                <Input
                  id="new-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your new password (min 8 characters)"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="confirm-password" className="text-sm font-semibold text-gray-700">
                  Confirm Password
                </Label>
                <Input
                  id="confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm your new password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="mt-2"
                />
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update Password'}
              </Button>
            </form>
          </div>

            {/* Two-Factor Authentication */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-600" />
                Two-Factor Authentication
              </h2>
              <p className="text-gray-600 mb-6">Add an extra layer of security to your account</p>
              <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8">
                Enable 2FA
              </Button>
            </div>
          </div>

          {/* Second Row - 2 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Active Sessions */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Smartphone className="w-6 h-6 text-blue-600" />
              Active Sessions
            </h2>
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">Current Session</p>
                  <p className="text-sm text-gray-600">Windows • Chrome • Last active now</p>
                </div>
                <span className="text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">Active</span>
              </div>
            </div>
            <Button 
              onClick={handleLogoutAllDevices}
              className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout All Devices
            </Button>
          </div>

            {/* Email Notifications */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Mail className="w-6 h-6 text-blue-600" />
                Email Notifications
              </h2>
              <div className="space-y-4 mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={notifications.orderConfirmations}
                    onChange={(e) => setNotifications({ ...notifications, orderConfirmations: e.target.checked })}
                    className="w-4 h-4 accent-blue-600 rounded" 
                  />
                  <span className="text-gray-700">Order confirmations</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={notifications.promotions}
                    onChange={(e) => setNotifications({ ...notifications, promotions: e.target.checked })}
                    className="w-4 h-4 accent-blue-600 rounded" 
                  />
                  <span className="text-gray-700">Promotional offers</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={notifications.recommendations}
                    onChange={(e) => setNotifications({ ...notifications, recommendations: e.target.checked })}
                    className="w-4 h-4 accent-blue-600 rounded" 
                  />
                  <span className="text-gray-700">Recommendations</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={notifications.securityAlerts}
                    onChange={(e) => setNotifications({ ...notifications, securityAlerts: e.target.checked })}
                    className="w-4 h-4 accent-blue-600 rounded" 
                  />
                  <span className="text-gray-700">Security alerts</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={notifications.newsletter}
                    onChange={(e) => setNotifications({ ...notifications, newsletter: e.target.checked })}
                    className="w-4 h-4 accent-blue-600 rounded" 
                  />
                  <span className="text-gray-700">Newsletter</span>
                </label>
              </div>
              <Button 
                onClick={handleSaveNotifications}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Email Prefs'}
              </Button>
            </div>
          </div>

          {/* Third Row - 2 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* SMS Notifications */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Smartphone className="w-6 h-6 text-blue-600" />
              SMS Notifications
            </h2>
            <div className="space-y-4 mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notifications.smsOrders}
                  onChange={(e) => setNotifications({ ...notifications, smsOrders: e.target.checked })}
                  className="w-4 h-4 accent-blue-600 rounded" 
                />
                <span className="text-gray-700">Order status updates</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notifications.smsDelivery}
                  onChange={(e) => setNotifications({ ...notifications, smsDelivery: e.target.checked })}
                  className="w-4 h-4 accent-blue-600 rounded" 
                />
                <span className="text-gray-700">Delivery notifications</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notifications.smsSecurity}
                  onChange={(e) => setNotifications({ ...notifications, smsSecurity: e.target.checked })}
                  className="w-4 h-4 accent-blue-600 rounded" 
                />
                <span className="text-gray-700">Security alerts</span>
              </label>
            </div>
            <Button 
              onClick={handleSaveNotifications}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save SMS Preferences'}
            </Button>
          </div>

            {/* Privacy Settings */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-600" />
                Privacy Settings
              </h2>
              <div className="space-y-4 mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={privacy.profileVisible}
                    onChange={(e) => setPrivacy({ ...privacy, profileVisible: e.target.checked })}
                    className="w-4 h-4 accent-blue-600 rounded" 
                  />
                  <span className="text-gray-700">Profile visible</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={privacy.personalization}
                    onChange={(e) => setPrivacy({ ...privacy, personalization: e.target.checked })}
                    className="w-4 h-4 accent-blue-600 rounded" 
                  />
                  <span className="text-gray-700">Personalization</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={privacy.shareActivity}
                    onChange={(e) => setPrivacy({ ...privacy, shareActivity: e.target.checked })}
                    className="w-4 h-4 accent-blue-600 rounded" 
                  />
                  <span className="text-gray-700">Share activity</span>
                </label>
              </div>
              <Button 
                onClick={handleSavePrivacy}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Privacy'}
              </Button>
            </div>
          </div>

          {/* Fourth Row - 2 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Download Data */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Download className="w-6 h-6 text-blue-600" />
              Download Your Data
            </h2>
            <p className="text-gray-600 mb-6">Get a copy of your personal data in a portable format</p>
            <Button 
              onClick={handleDownloadData}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8"
            >
              Download Data
            </Button>
          </div>

            {/* Delete Account */}
            <div className="bg-red-50 rounded-2xl shadow-lg p-8 border-2 border-red-200">
              <h2 className="text-2xl font-bold text-red-600 mb-4 flex items-center gap-2">
                <Trash2 className="w-6 h-6" />
                Delete Account
              </h2>
              <p className="text-gray-700 mb-6 text-sm">
                Permanently delete your account and all data.
              </p>
              <Button 
                onClick={handleDeleteAccount}
                className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8"
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
