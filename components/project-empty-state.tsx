'use client';

import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProjectEmptyStateProps {
  onClearFilters: () => void;
}

export function ProjectEmptyState({ onClearFilters }: ProjectEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="p-4 bg-blue-100 rounded-full">
            <Search className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-2">No Projects Found</h3>
        <p className="text-gray-600 mb-6">
          We couldn't find any projects matching your filters. Try adjusting your search criteria or clearing the filters to see all projects.
        </p>

        <div className="space-y-3">
          <Button
            onClick={onClearFilters}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-3 font-semibold flex items-center justify-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Clear All Filters
          </Button>
          <p className="text-sm text-gray-500">
            or try a different search term
          </p>
        </div>
      </div>
    </div>
  );
}
