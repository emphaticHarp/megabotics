'use client';

import { useRouter } from 'next/navigation';
import { AIChatbot } from '@/components/ai-chatbot';
import { Footer } from '@/components/footer';
import { AlertCircle, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();

  return (
    <>
      <AIChatbot />

      <div className="min-h-screen pt-40 pb-20 bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center">
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6">
              <AlertCircle className="w-12 h-12 text-red-600" />
            </div>
          </div>

          <h1 className="text-6xl font-black text-gray-900 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Sorry, the page you're looking for doesn't exist. It might have been moved or deleted.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.back()}
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </button>
          </div>

          {/* Helpful Links */}
          <div className="mt-16 p-8 bg-white rounded-2xl border-2 border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Helpful Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => router.push('/products')}
                className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-all text-left"
              >
                <p className="font-semibold text-gray-900">Browse Products</p>
                <p className="text-sm text-gray-600">Explore our catalog</p>
              </button>
              <button
                onClick={() => router.push('/')}
                className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-all text-left"
              >
                <p className="font-semibold text-gray-900">Home Page</p>
                <p className="text-sm text-gray-600">Return to homepage</p>
              </button>
              <button
                onClick={() => router.push('/about')}
                className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-all text-left"
              >
                <p className="font-semibold text-gray-900">About Us</p>
                <p className="text-sm text-gray-600">Learn about MEGABOTICS</p>
              </button>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
