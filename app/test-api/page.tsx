'use client';

import { useEffect, useState } from 'react';

export default function TestAPI() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products', {
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

    fetchData();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">API Test Page</h1>
      
      {loading && <p className="text-blue-600">Loading...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      
      {data && (
        <div>
          <p className="text-green-600 mb-4">✅ API Response Received</p>
          <div className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96">
            <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
          </div>
          {data.data && (
            <p className="mt-4 text-lg font-semibold">
              Total Products: {data.data.length}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
