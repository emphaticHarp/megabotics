'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, Info, Package, Briefcase, Beaker, BookOpen, Users, Mail, LogIn } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AuthModal } from '@/components/auth-modal';

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
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

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
            <Button 
              onClick={() => setIsAuthOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Sign In / Sign Up
            </Button>
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
            <Button 
              onClick={() => {
                setIsAuthOpen(true);
                setIsOpen(false);
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full mt-4 flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Sign In / Sign Up
            </Button>
          </div>
        )}
      </div>
    </nav>
    </>
  );
}
