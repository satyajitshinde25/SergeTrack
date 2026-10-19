import React, { useState } from 'react';
import { useSegreTrack } from '../../context/SegreTrackContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { EmptyState } from '../../components/common/EmptyState';
import { WasteStream } from '../../types';
import { 
  Search, 
  BookOpen, 
  Info, 
  Check, 
  X, 
  Apple, 
  Soup, 
  Coffee, 
  Newspaper, 
  Package, 
  Milk, 
  Wine, 
  BatteryCharging, 
  Cpu, 
  Lightbulb,
  Trash2
} from 'lucide-react';

export const WasteGuide: React.FC = () => {
  const { wasteGuide } = useSegreTrack();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Map icon names to Lucide icons
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Apple': return <Apple className="w-5 h-5 text-emerald-600" />;
      case 'Soup': return <Soup className="w-5 h-5 text-emerald-600" />;
      case 'Coffee': return <Coffee className="w-5 h-5 text-emerald-600" />;
      case 'Newspaper': return <Newspaper className="w-5 h-5 text-sky-600" />;
      case 'Package': return <Package className="w-5 h-5 text-sky-600" />;
      case 'Milk': return <Milk className="w-5 h-5 text-sky-600" />;
      case 'Wine': return <Wine className="w-5 h-5 text-sky-600" />;
      case 'BatteryCharging': return <BatteryCharging className="w-5 h-5 text-amber-600" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-amber-600" />;
      case 'Lightbulb': return <Lightbulb className="w-5 h-5 text-amber-600" />;
      default: return <Trash2 className="w-5 h-5 text-stone-600" />;
    }
  };

  const filteredItems = wasteGuide.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchSub = item.subCategory.toLowerCase().includes(q);
      const matchInst = item.instructions.toLowerCase().includes(q);
      return matchName || matchSub || matchInst;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E2EAE4] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-4 h-4 text-[#174C3C]" />
              <span className="text-xs uppercase font-bold tracking-wider text-[#66756D]">
                Household Knowledge Base
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#17251F]">
              Waste Segregation Directory
            </h2>
            <p className="text-xs text-[#66756D] mt-1 max-w-2xl leading-relaxed">
              Correct segregation starts in the kitchen and living room. Follow our verified 3-stream segregation rules to ensure municipal recyclers can process your waste effectively.
            </p>
          </div>

          {/* Categorical summary tags */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
              🟢 Wet Organics
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-200 font-semibold">
              🔵 Dry Recyclables
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
              🔴 Special Locker
            </span>
          </div>
        </div>

        {/* Academic Prototype Honesty Notice */}
        <div className="p-3.5 rounded-xl bg-[#F8FAF7] border border-[#E2EAE4] flex items-start gap-2.5 text-xs text-[#66756D]">
          <Info className="w-4 h-4 text-[#174C3C] shrink-0 mt-0.5" />
          <p>
            <strong className="text-[#17251F]">Notice: </strong>
            This guide provides established municipal civic rules. Actual disposal criteria, plastic gauge acceptance, and hazardous schedules depend on your local society bylaws. No simulated or artificial AI vision is used.
          </p>
        </div>
      </div>

      {/* Search and Category Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#66756D] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search waste item (e.g., vegetable, battery, plastic bottle, paper)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-white border border-[#E2EAE4] text-[#17251F] placeholder:text-[#66756D] focus:outline-hidden focus:border-[#43A879] shadow-xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'Wet Waste', label: 'Wet Waste' },
            { id: 'Dry Waste', label: 'Dry Waste' },
            { id: 'Special Waste', label: 'Special Waste' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors border ${
                selectedCategory === cat.id
                  ? 'bg-[#174C3C] text-white border-[#174C3C] shadow-xs font-semibold'
                  : 'bg-white text-[#17251F] border-[#E2EAE4] hover:bg-stone-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Guide Cards Grid */}
      {filteredItems.length === 0 ? (
        <EmptyState
          title="No waste items found"
          description={`No guide entries match your search query "${searchQuery}". Try searching for generic items like peels, plastic, paper, or batteries.`}
          action={{
            label: 'Clear Search',
            onClick: () => {
              setSearchQuery('');
              setSelectedCategory('all');
            }
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 border border-[#E2EAE4] hover:border-[#43A879]/40 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F8FAF7] border border-[#E2EAE4] flex items-center justify-center shrink-0">
                    {renderIcon(item.iconName)}
                  </div>
                  <StatusBadge status={item.category} size="sm" />
                </div>

                <h3 className="text-base font-bold text-[#17251F] font-display mb-0.5">
                  {item.name}
                </h3>
                <span className="text-[11px] font-medium text-[#66756D] block mb-2.5">
                  Category: {item.subCategory}
                </span>

                <p className="text-xs text-[#17251F] leading-relaxed mb-4 p-2.5 rounded-xl bg-[#F8FAF7] border border-[#E2EAE4]">
                  {item.instructions}
                </p>
              </div>

              {/* Do's and Don'ts */}
              <div className="space-y-2 pt-2 border-t border-[#E2EAE4] text-xs">
                {item.doAndDont.dos.map((d, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-emerald-800">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-[11px] leading-tight">{d}</span>
                  </div>
                ))}
                {item.doAndDont.donts.map((d, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-red-700">
                    <X className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-[11px] leading-tight">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
