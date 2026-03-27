'use client';

import { useState } from 'react';
import { categoryLabels } from '@/lib/supabase';

interface Tour {
  id: string;
  name: string;
  date: string;
  start_time: string;
  end_time: string;
  max_participants: number;
  price: number;
  meeting_point: string;
  guide_name: string;
}

interface HeritageItem {
  id: string;
  name: string;
  name_en: string | null;
  category: string;
  description: string;
  tour_duration: string;
  tour_max_participants: number;
  tour_price: number;
  tour_description: string;
  meeting_point: string;
  guide_name: string;
  images: string[];
  tours?: Tour[];
}

interface TourListProps {
  heritageItems: HeritageItem[];
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

export default function TourList({ heritageItems }: TourListProps) {
  const [selectedHeritage, setSelectedHeritage] = useState<HeritageItem | null>(null);

  // 顯示導賞詳情
  if (selectedHeritage) {
    return (
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => setSelectedHeritage(null)}
          className="mb-4 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
        >
          ← 返回列表
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* 頭部 */}
          <div className="relative h-48 bg-gradient-to-br from-emerald-500 to-teal-600">
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center">
                <div className="text-6xl mb-2">{categoryIcons[selectedHeritage.category]}</div>
                <p className="text-sm opacity-90">{categoryLabels[selectedHeritage.category as keyof typeof categoryLabels]?.zh}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedHeritage.name}</h2>
            <p className="text-gray-600 mb-6">{selectedHeritage.description}</p>

            {/* 導賞信息 */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">導賞詳情</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">時長：</span>
                  <span className="ml-1 font-medium">{selectedHeritage.tour_duration}</span>
                </div>
                <div>
                  <span className="text-gray-500">價格：</span>
                  <span className="ml-1 font-medium text-emerald-600">HK${selectedHeritage.tour_price}/人</span>
                </div>
                <div>
                  <span className="text-gray-500">人數上限：</span>
                  <span className="ml-1 font-medium">{selectedHeritage.tour_max_participants}人</span>
                </div>
                <div>
                  <span className="text-gray-500">集合地點：</span>
                  <span className="ml-1 font-medium">{selectedHeritage.meeting_point}</span>
                </div>
              </div>
              
              {selectedHeritage.guide_name && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <span className="text-gray-500">導賞員：</span>
                  <span className="ml-1 font-medium">{selectedHeritage.guide_name}</span>
                </div>
              )}
            </div>

            {/* 預約表單 */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">預約導賞團</h3>
              <a
                href={`/contact?tour=${selectedHeritage.id}&type=guided_tour`}
                className="block w-full py-3 bg-emerald-500 text-white text-center rounded-lg font-medium hover:bg-emerald-600 transition-colors"
              >
                填寫預約表格
              </a>
              <p className="text-xs text-gray-500 text-center mt-2">
                我們會盡快與您聯絡確認詳情
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 顯示列表
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {heritageItems.map((item) => {
        const category = categoryLabels[item.category as keyof typeof categoryLabels];
        const icon = categoryIcons[item.category];

        return (
          <div
            key={item.id}
            onClick={() => setSelectedHeritage(item)}
            className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group"
          >
            {/* 類別色條 */}
            <div className={`h-1.5 ${category?.color || 'bg-gray-500'}`} />
            
            <div className="p-5">
              {/* 類別標籤 */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{icon}</span>
                <span className="text-xs text-gray-500">{category?.zh}</span>
              </div>

              {/* 標題 */}
              <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                {item.name}
              </h3>
              
              {/* 描述 */}
              <p className="text-sm text-gray-600 line-clamp-2 mb-4">{item.tour_description || item.description}</p>
              
              {/* 底部信息 */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex gap-3 text-sm text-gray-500">
                  <span>⏱️ {item.tour_duration}</span>
                  <span>👥 最多{item.tour_max_participants}人</span>
                </div>
                <span className="font-semibold text-emerald-600">HK${item.tour_price}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
