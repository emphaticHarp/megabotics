'use client';

import { useState, useEffect } from 'react';
import { Search, X, TrendingUp, Clock } from 'lucide-react';

interface SearchResult {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

interface ProductSearchProps {
  products: SearchResult[];
  onSearch: (query: string) => void;
  onSelectProduct: (product: SearchResult) => void;
}

export function ProductSearch({ products, onSearch, onSelectProduct }: ProductSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    setRecentSearches(saved);
  }, []);

  // Filter products based on query
  useEffect(() => {
    if (query.trim()) {
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query, products]);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      // Save to recent searches
      const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));

      onSearch(searchQuery);
      setQuery('');
      setIsOpen(false);
    }
  };

  const handleSelectProduct = (product: SearchResult) => {
    handleSearch(product.name);
    onSelectProduct(product);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search products by name or category..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-12 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setSuggestions([]);
            }}
            className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto">
          {/* Search Results */}
          {suggestions.length > 0 && (
            <div>
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50 border-b">
                SEARCH RESULTS
              </div>
              {suggestions.map(product => (
                <button
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-blue-50 transition-all text-left border-b last:border-b-0"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>
                  <p className="font-bold text-blue-600 whitespace-nowrap">₹{(product.price / 1000).toFixed(0)}K</p>
                </button>
              ))}
            </div>
          )}

          {/* Recent Searches */}
          {!query && recentSearches.length > 0 && (
            <div>
              <div className="px-4 py-3 flex items-center justify-between border-b">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                  <Clock className="w-4 h-4" />
                  RECENT SEARCHES
                </div>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Clear
                </button>
              </div>
              {recentSearches.map((search, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSearch(search)}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-all border-b last:border-b-0 text-sm"
                >
                  {search}
                </button>
              ))}
            </div>
          )}

          {/* Trending */}
          {!query && recentSearches.length === 0 && (
            <div>
              <div className="px-4 py-3 flex items-center gap-2 text-xs font-semibold text-gray-500 border-b">
                <TrendingUp className="w-4 h-4" />
                TRENDING
              </div>
              {['Drone', 'Robot', 'Surveillance', 'Agriculture'].map((trend, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSearch(trend)}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-all border-b last:border-b-0 text-sm"
                >
                  {trend}
                </button>
              ))}
            </div>
          )}

          {/* No Results */}
          {query && suggestions.length === 0 && (
            <div className="px-4 py-8 text-center">
              <p className="text-gray-600">No products found for "{query}"</p>
              <p className="text-xs text-gray-500 mt-2">Try different keywords</p>
            </div>
          )}
        </div>
      )}

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
