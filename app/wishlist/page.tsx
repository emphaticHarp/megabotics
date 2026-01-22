'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WishlistPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

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

  // Mock wishlist data
  const wishlistItems = [
    {
      id: 1,
      name: 'Precision Mapping Drone',
      price: '$2,499.99',
      image: '/agriculture-icon.png',
      category: 'Agriculture',
    },
    {
      id: 2,
      name: 'Collaborative Robot Cobot',
      price: '$1,899.99',
      image: '/robotics-icon.png',
      category: 'Robotics',
    },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <Heart className="w-8 h-8 text-red-600" />
            My Wishlist
          </h1>

          {wishlistItems.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-6">Add items to your wishlist to save them for later</p>
              <Button 
                onClick={() => router.push('/products')}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8"
              >
                Browse Products
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-48 bg-gray-100 flex items-center justify-center">
                    <img src={item.image} alt={item.name} className="w-24 h-24 object-contain" />
                    <button className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
                      {item.category}
                    </p>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-2xl font-bold text-gray-900 mb-4">{item.price}</p>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
