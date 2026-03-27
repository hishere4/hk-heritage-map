'use client';

import { useState } from 'react';
import BookingForm from '@/components/BookingForm';
import { categoryLabels } from '@/lib/supabase';

interface Workshop {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  max_participants: number;
  heritage: {
    name: string;
    category: string;
  };
}

interface WorkshopListProps {
  workshops: Workshop[];
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

export default function WorkshopList({ workshops }: WorkshopListProps) {
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);

  // 顯示預約表單
  if (selectedWorkshop) {
    const category = categoryLabels[selectedWorkshop.heritage.category as keyof typeof categoryLabels];
    const icon = categoryIcons[selectedWorkshop.heritage.category] || '🎨';

    return (
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => setSelectedWorkshop(null)}
          className="mb-4 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1 px-3 py-1.5 hover:bg-gray-100 rounded-lg transition-colors"
        >
          ← 返回列表
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* 頭部 */}
          <div className={`p-6 ${category?.color || 'bg-gray-500'} text-white`}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-3xl">{icon}</span>
              <span className="text-sm opacity-90">{selectedWorkshop.heritage.name}</span>
            </div>
            <h2 className="text-2xl font-bold">{selectedWorkshop.title}</h2>
          </div>

          <div className="p-6">
            <p className="text-gray-700 mb-6">{selectedWorkshop.description}</p>
            
            <div className="flex flex-wrap gap-6 text-sm mb-6 pb-6 border-b border-gray-100">
              <div>
                <span className="text-gray-500">時長</span>
                <p className="font-medium text-gray-900">{selectedWorkshop.duration}</p>
              </div>
              <div>
                <span className="text-gray-500">價格</span>
                <p className="font-medium text-emerald-600 text-lg">HK${selectedWorkshop.price}</p>
              </div>
              <div>
                <span className="text-gray-500">每場人數</span>
                <p className="font-medium text-gray-900">最多 {selectedWorkshop.max_participants} 人</p>
              </div>
            </div>

            <h3 className="font-semibold text-gray-800 mb-4">預約此工作坊</h3>
            <BookingForm workshopId={selectedWorkshop.id} />
          </div>
        </div>
      </div>
    );
  }

  // 顯示列表
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {workshops.map((workshop) => {
        const category = categoryLabels[workshop.heritage.category as keyof typeof categoryLabels];
        const icon = categoryIcons[workshop.heritage.category] || '🎨';

        return (
          <div
            key={workshop.id}
            onClick={() => setSelectedWorkshop(workshop)}
            className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group"
          >
            {/* 類別色條 */}
            <div className={`h-1.5 ${category?.color || 'bg-gray-500'}`} />
            
            <div className="p-5">
              {/* 類別標籤 */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{icon}</span>
                <span className="text-xs text-gray-500">{workshop.heritage.name}</span>
              </div>

              {/* 標題 */}
              <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                {workshop.title}
              </h3>
              
              {/* 描述 */}
              <p className="text-sm text-gray-600 line-clamp-2 mb-4">{workshop.description}</p>
              
              {/* 底部信息 */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <span className="text-xs text-gray-500">⏱️ {workshop.duration}</span>
                <span className="font-semibold text-emerald-600">HK${workshop.price}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
