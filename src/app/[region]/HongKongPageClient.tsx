'use client';

import { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Sidebar from '@/components/Sidebar';
import FilterBar from '@/components/FilterBar';
import { HeritageItem } from '@/lib/supabase';

const HK_CENTER: [number, number] = [22.3193, 114.1694];
const HK_ZOOM = 11;

const HeritageMap = dynamic(() => import('@/components/HeritageMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gray-50 flex items-center justify-center">
      <div className="text-gray-400">載入地圖...</div>
    </div>
  ),
});

interface HongKongPageClientProps {
  items: HeritageItem[];
}

export default function HongKongPageClient({ items }: HongKongPageClientProps) {
  const [selectedItem, setSelectedItem] = useState<HeritageItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
      const matchesSearch = searchQuery
        ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  const handleItemClick = (item: HeritageItem) => {
    setSelectedItem(item);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-100 z-20">
        <div className="px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🏛️</span>
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-tight">HeritageHK</h1>
              <p className="text-xs text-gray-500 hidden sm:block">香港非物質文化遺產</p>
            </div>
          </div>
          
          <nav className="flex items-center gap-1">
            <a href="/workshops" className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              工作坊
            </a>
            <a href="/admin" className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              管理
            </a>
          </nav>
        </div>

        <FilterBar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalCount={items.length}
          filteredCount={filteredItems.length}
        />
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 relative">
          <HeritageMap
            items={filteredItems}
            center={selectedItem ? [selectedItem.lat, selectedItem.lng] : HK_CENTER}
            zoom={selectedItem ? 15 : HK_ZOOM}
            selectedItem={selectedItem}
            onItemClick={handleItemClick}
          />
        </div>

        <div className="hidden md:block h-full">
          <Sidebar item={selectedItem} onClose={() => setSelectedItem(null)} />
        </div>

        {selectedItem && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/40">
            <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white">
              <Sidebar item={selectedItem} onClose={() => setSelectedItem(null)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
