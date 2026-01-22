'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, Info, Package, Briefcase, Beaker, BookOpen, Users, Mail, LogIn, LogOut, User, Settings, Heart, ShoppingBag, Clock, HelpCircle, Bell } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AuthModal } from '@/components/auth-modal';
import { useAuth } from '@/lib/auth-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'About', href: '/about', icon: Info },
  { label: 'Products', href: '/products', icon: Package },
  { label: 'Projects', href: '/projects', icon: Briefcase },
  { label: 'R&D', href: '/research', icon: Beaker },
  { label: 'Blog', href: '/blog', icon: BookOpen },
  { label: 'Careers', href: '/careers', icon: Users },
  { label: 'Contact', href: '/contact', icon: Mail },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { user, logout, isLoading } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    <nav className="fixed top-0 left-0 right-0 z-50 pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xl font-bold text-gray-900">MEGABOTICS</span>
            <span className="text-xs font-semibold bg-orange-100 px-2 py-1 rounded-full flex items-center gap-1">
              <span className="text-orange-600">Mega Ideas,</span>
              <span className="text-gray-600"> Mega</span>
              <span className="text-green-600">Impact</span>
              <Image 
                src="/Flag_of_India.png" 
                alt="India flag" 
                width={18} 
                height={14} 
                priority
                className="rounded-sm object-cover"
              />
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive(item.href)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            {isLoading ? (
              <div className="w-24 h-10 bg-gray-200 rounded-full animate-pulse" />
            ) : user ? (
              <DropdownMenu onOpenChange={(open) => {
                if (open) {
                  document.body.style.overflow = 'hidden';
                } else {
                  document.body.style.overflow = 'unset';
                }
              }}>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors cursor-pointer">
                    <User className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-900">{user.name}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 mt-4">
                  {/* User Info Header */}
                  <DropdownMenuLabel className="flex items-center gap-3 py-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  {/* Account Section */}
                  <div className="px-2 py-1.5">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Account</p>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>My Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="cursor-pointer flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        <span>Account Settings</span>
                      </Link>
                    </DropdownMenuItem>
                  </div>
                  
                  <DropdownMenuSeparator />
                  
                  {/* Shopping Section */}
                  <div className="px-2 py-1.5">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Shopping</p>
                    <DropdownMenuItem asChild>
                      <Link href="/orders" className="cursor-pointer flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4" />
                        <span>My Orders</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/wishlist" className="cursor-pointer flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        <span>Wishlist</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Recently Viewed</span>
                    </DropdownMenuItem>
                  </div>
                  
                  <DropdownMenuSeparator />
                  
                  {/* Support Section */}
                  <div className="px-2 py-1.5">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Support</p>
                    <DropdownMenuItem asChild>
                      <Link href="/help" className="cursor-pointer flex items-center gap-2">
                        <HelpCircle className="w-4 h-4" />
                        <span>Help & Support</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      <span>Notifications</span>
                    </DropdownMenuItem>
                  </div>
                  
                  <DropdownMenuSeparator />
                  
                  {/* Logout */}
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={() => setIsAuthOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Sign In / Sign Up
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg mt-2 p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive(item.href)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
            {isLoading ? (
              <div className="w-full h-10 bg-gray-200 rounded-full animate-pulse mt-4" />
            ) : user ? (
              <>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <DropdownMenu onOpenChange={(open) => {
                    if (open) {
                      document.body.style.overflow = 'hidden';
                    } else {
                      document.body.style.overflow = 'unset';
                    }
                  }}>
                    <DropdownMenuTrigger asChild>
                      <button className="w-full flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                        <User className="w-4 h-4 text-blue-600" />
                        <div className="text-left">
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-64 mt-12">
                      {/* User Info Header */}
                      <DropdownMenuLabel className="flex items-center gap-3 py-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      
                      {/* Account Section */}
                      <div className="px-2 py-1.5">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Account</p>
                        <DropdownMenuItem asChild>
                          <Link href="/profile" className="cursor-pointer flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>My Profile</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/settings" className="cursor-pointer flex items-center gap-2">
                            <Settings className="w-4 h-4" />
                            <span>Account Settings</span>
                          </Link>
                        </DropdownMenuItem>
                      </div>
                      
                      <DropdownMenuSeparator />
                      
                      {/* Shopping Section */}
                      <div className="px-2 py-1.5">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Shopping</p>
                        <DropdownMenuItem asChild>
                          <Link href="/orders" className="cursor-pointer flex items-center gap-2">
                            <ShoppingBag className="w-4 h-4" />
                            <span>My Orders</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/wishlist" className="cursor-pointer flex items-center gap-2">
                            <Heart className="w-4 h-4" />
                            <span>Wishlist</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>Recently Viewed</span>
                        </DropdownMenuItem>
                      </div>
                      
                      <DropdownMenuSeparator />
                      
                      {/* Support Section */}
                      <div className="px-2 py-1.5">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Support</p>
                        <DropdownMenuItem asChild>
                          <Link href="/help" className="cursor-pointer flex items-center gap-2">
                            <HelpCircle className="w-4 h-4" />
                            <span>Help & Support</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                          <Bell className="w-4 h-4" />
                          <span>Notifications</span>
                        </DropdownMenuItem>
                      </div>
                      
                      <DropdownMenuSeparator />
                      
                      {/* Logout */}
                      <DropdownMenuItem 
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                        className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : (
              <>
                <Button 
                  onClick={() => {
                    setIsAuthOpen(true);
                    setIsOpen(false);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In / Sign Up
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
    </>
  );
}
