'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart3, Users, Package, ShoppingCart, BarChart, FileText, Settings, LogOut, Menu, X, Home, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { AdminNotifications } from './admin-notifications';
import { AdminDateTime } from './admin-datetime';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

export function AdminLayout({ children, currentPage }: AdminLayoutProps) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [admin, setAdmin] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    const adminUser = localStorage.getItem('adminUser');

    if (!adminToken || !adminUser) {
      router.push('/admin/login');
      return;
    }

    try {
      setAdmin(JSON.parse(adminUser));
      setLoading(false);
    } catch (err) {
      router.push('/admin/login');
    }
  }, [router]);

  const menuItems = [
    { label: 'Dashboard', icon: Home, href: '/admin/dashboard' },
    { label: 'Industries', icon: Package, href: '/admin/industries' },
    { label: 'Featured Projects', icon: Package, href: '/admin/featured-projects' },
    { label: 'Users', icon: Users, href: '/admin/users' },
    { label: 'Products', icon: Package, href: '/admin/products' },
    { label: 'Orders', icon: ShoppingCart, href: '/admin/orders' },
    { label: 'Blog', icon: FileText, href: '/admin/blog' },
    { label: 'Analytics', icon: BarChart, href: '/admin/analytics' },
    { label: 'Reports', icon: FileText, href: '/admin/reports' },
    { label: 'Settings', icon: Settings, href: '/admin/settings' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gradient-to-b from-blue-600 to-blue-800 text-white transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-blue-500">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6" />
            </div>
            {sidebarOpen && <span className="font-bold text-lg">ADMIN</span>}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.label;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-blue-500 text-white/80 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-blue-500">
          <button
            onClick={() => {
              localStorage.removeItem('adminToken');
              localStorage.removeItem('adminUser');
              router.push('/admin/login');
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white shadow-md p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
            <h1 className="text-2xl font-bold text-gray-900">{currentPage || 'Dashboard'}</h1>
          </div>

          <div className="flex items-center gap-4">
            <AdminDateTime />
            <AdminNotifications />
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-3 pl-4 border-l border-gray-200 hover:bg-gray-50 pr-3 py-2 rounded-lg transition-colors"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                  {admin?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="text-sm text-left">
                  <p className="font-semibold text-gray-900">{admin?.name}</p>
                  <p className="text-gray-500 text-xs capitalize">{admin?.role}</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                    <p className="font-semibold text-gray-900">{admin?.name}</p>
                    <p className="text-xs text-gray-600">{admin?.email}</p>
                  </div>

                  <div className="py-2">
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors text-sm">
                      Account Settings
                    </button>
                  </div>

                  <div className="border-t border-gray-200"></div>

                  <button
                    onClick={() => {
                      localStorage.removeItem('adminToken');
                      localStorage.removeItem('adminUser');
                      router.push('/admin/login');
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors text-sm font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
