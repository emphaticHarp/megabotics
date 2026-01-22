'use client';

import { Heart, Share2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { shareProject } from '@/lib/pdf-utils';

interface ProjectFavoritesViewProps {
  favorites: any[];
  onRemoveFavorite: (id: number) => void;
  onClose: () => void;
}

export function ProjectFavoritesView({ favorites, onRemoveFavorite, onClose }: ProjectFavoritesViewProps) {
  if (favorites.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
          <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Favorites Yet</h2>
          <p className="text-gray-600 mb-6">
            Start bookmarking projects to save them for later!
          </p>
          <Button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full"
          >
            Close
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-4xl w-full my-8">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Saved Projects ({favorites.length})</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {favorites.map((project) => (
              <div
                key={project.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="h-40 bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>

                  <div className="flex gap-2 mb-3">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {project.category}
                    </span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                      {project.status}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/projects/${project.id}`} className="flex-1">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg">
                        View Details
                      </Button>
                    </Link>
                    <button
                      onClick={() => onRemoveFavorite(project.id)}
                      className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg"
                    >
                      <Heart className="w-4 h-4 fill-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {favorites.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200 flex gap-3">
              <Button
                onClick={() => {
                  const text = `Check out these ${favorites.length} amazing projects from MEGABOTICS:\n${favorites.map(p => `- ${p.title}`).join('\n')}`;
                  navigator.clipboard.writeText(text);
                  alert('Favorites list copied to clipboard!');
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share Favorites
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
