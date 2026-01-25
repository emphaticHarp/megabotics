'use client';

import { useEffect, useState } from 'react';

export default function TestAPI() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [testType, setTestType] = useState('products');
  const [couponCode, setCouponCode] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      let url = '/api/products';
      
      if (testType === 'coupons') {
        url = '/api/coupons?all=true';
      } else if (testType === 'coupon-test' && couponCode) {
        url = `/api/coupons?code=${encodeURIComponent(couponCode.toUpperCase())}`;
      }
      
      const response = await fetch(url, {
        cache: 'no-store',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const json = await response.json();
      setData(json);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [testType]);

  return (
    <div className="p-8 max-w-4xl mx-auto pt-32">
      <h1 className="text-3xl font-bold mb-4">API Test Page</h1>
      
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setTestType('products')}
          className={`px-4 py-2 rounded ${testType === 'products' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Products
        </button>
        <button
          onClick={() => setTestType('coupons')}
          className={`px-4 py-2 rounded ${testType === 'coupons' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          All Coupons
        </button>
        <button
          onClick={() => setTestType('coupon-test')}
          className={`px-4 py-2 rounded ${testType === 'coupon-test' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Test Coupon
        </button>
      </div>

      {testType === 'coupon-test' && (
        <div className="mb-6 flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter coupon code"
            className="flex-1 px-4 py-2 border rounded"
          />
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Test
          </button>
        </div>
      )}
      
      {loading && <p className="text-blue-600">Loading...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      
      {data && (
        <div>
          <p className="text-green-600 mb-4">✅ API Response Received</p>
          <div className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96">
            <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
          </div>
          {data.data && Array.isArray(data.data) && (
            <p className="mt-4 text-lg font-semibold">
              Total: {data.data.length} items
            </p>
          )}
        </div>
      )}
    </div>
  );
}
