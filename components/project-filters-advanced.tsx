'use client';

import { ChevronDown, X } from 'lucide-react';
import { useState } from 'react';

interface AdvancedFiltersProps {
  onFilterChange: (filters: any) => void;
  technologies: string[];
}

export function ProjectFiltersAdvanced({ onFilterChange, technologies }: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [roiMin, setRoiMin] = useState('');
  const [roiMax, setRoiMax] = useState('');
  const [teamMin, setTeamMin] = useState('');
  const [teamMax, setTeamMax] = useState('');
  const [durationMin, setDurationMin] = useState('');
  const [durationMax, setDurationMax] = useState('');
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  const handleApplyFilters = () => {
    onFilterChange({
      budgetMin: budgetMin ? parseInt(budgetMin) : null,
      budgetMax: budgetMax ? parseInt(budgetMax) : null,
      roiMin: roiMin ? parseInt(roiMin) : null,
      roiMax: roiMax ? parseInt(roiMax) : null,
      teamMin: teamMin ? parseInt(teamMin) : null,
      teamMax: teamMax ? parseInt(teamMax) : null,
      durationMin: durationMin ? parseInt(durationMin) : null,
      durationMax: durationMax ? parseInt(durationMax) : null,
      selectedTechs,
    });
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    setBudgetMin('');
    setBudgetMax('');
    setRoiMin('');
    setRoiMax('');
    setTeamMin('');
    setTeamMax('');
    setDurationMin('');
    setDurationMax('');
    setSelectedTechs([]);
    onFilterChange({
      budgetMin: null,
      budgetMax: null,
      roiMin: null,
      roiMax: null,
      teamMin: null,
      teamMax: null,
      durationMin: null,
      durationMax: null,
      selectedTechs: [],
    });
  };

  const toggleTech = (tech: string) => {
    setSelectedTechs(prev =>
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-900 font-semibold flex items-center gap-2"
      >
        Advanced Filters
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-xl p-6 w-96 z-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900">Advanced Filters</h3>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-100 rounded">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {/* Budget Range */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Budget Range (₹ Lakh)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={budgetMin}
                  onChange={(e) => setBudgetMin(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>

            {/* ROI Range */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">ROI Range (%)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={roiMin}
                  onChange={(e) => setRoiMin(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={roiMax}
                  onChange={(e) => setRoiMax(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>

            {/* Team Size Range */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Team Size</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={teamMin}
                  onChange={(e) => setTeamMin(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={teamMax}
                  onChange={(e) => setTeamMax(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>

            {/* Duration Range */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Duration (Months)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={durationMin}
                  onChange={(e) => setDurationMin(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={durationMax}
                  onChange={(e) => setDurationMax(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>

            {/* Technologies */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Technologies</label>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => toggleTech(tech)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      selectedTechs.includes(tech)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={handleClearFilters}
              className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-semibold"
            >
              Clear
            </button>
            <button
              onClick={handleApplyFilters}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
