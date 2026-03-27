import { HeritageItem, categoryLabels } from '@/lib/supabase';

interface FilterBarProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
  filteredCount: number;
}

// 類別圖標
const categoryIcons: Record<string, string> = {
  performing_arts: '🎭',
  crafts: '🔨',
  festivals: '🎊',
  oral_traditions: '🗣️',
  food_culture: '🍜',
  martial_arts: '🥋',
  folklore: '🏮',
};

export default function FilterBar({
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  totalCount,
  filteredCount
}: FilterBarProps) {
  return (
    <div className="bg-white border-b border-gray-100">
      {/* 主要篩選列 */}
      <div className="px-4 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          {/* 搜尋框 */}
          <div className="relative flex-shrink-0 w-full sm:w-64">
            <input
              type="text"
              placeholder="搜尋非遺..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          </div>

          {/* 類別篩選 */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
            <button
              onClick={() => onCategoryChange(null)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === null
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>全部</span>
              <span className={`text-xs ${selectedCategory === null ? 'text-gray-300' : 'text-gray-500'}`}>
                {totalCount}
              </span>
            </button>
            
            {Object.entries(categoryLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => onCategoryChange(key)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === key
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{categoryIcons[key]}</span>
                <span>{label.zh}</span>
              </button>
            ))}
          </div>

          {/* 結果計數 */}
          <div className="text-xs text-gray-400 sm:ml-auto flex-shrink-0">
            {filteredCount} / {totalCount}
          </div>
        </div>
      </div>
    </div>
  );
}
