'use client';

import { useEffect, useState } from 'react';
import { HeritageItem, categoryLabels } from '@/lib/supabase';
import { getHeritageImages } from '@/data/heritageImages';
import { categoryColors } from './CategoryIcons';

interface SidebarProps {
  item: HeritageItem | null;
  onClose: () => void;
}

// 類別表情符號
const categoryEmojis: Record<string, string> = {
  performing_arts: '🎭',
  crafts: '✂️',
  festivals: '🏮',
  oral_traditions: '🎵',
  food_culture: '🫖',
  martial_arts: '👊',
  folklore: '📜',
};

// 獲取地區
function getRegion(lat: number, lng: number): string {
  if (lat > 22.35) return '新界';
  if (lat < 22.25) return '香港島';
  return '九龍';
}

export default function Sidebar({ item, onClose }: SidebarProps) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (item) {
      setImageError(false);
    }
  }, [item]);

  // 空白狀態
  if (!item) {
    return (
      <div className="w-full md:w-80 bg-white h-full flex flex-col border-l border-gray-100">
        <div className="p-6 flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center mb-5 shadow-inner">
            <span className="text-4xl">🏛️</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">探索香港非遺</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            點擊地圖上的標記<br />
            發掘20項珍貴文化遺產
          </p>
        </div>
      </div>
    );
  }

  const category = categoryLabels[item.category];
  const emoji = categoryEmojis[item.category];
  const color = categoryColors[item.category];
  const region = getRegion(item.lat, item.lng);
  const images = getHeritageImages(item.name);
  const hasImage = images.length > 0 && !imageError;

  return (
    <div className="w-full md:w-96 bg-white h-full flex flex-col border-l border-gray-100 overflow-hidden animate-slideIn">
      {/* 頭部 */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div 
            className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
            style={{ 
              backgroundColor: `${color}15`,
            }}
          >
            {emoji}
          </div>
          <span 
            className="text-xs px-2.5 py-1 rounded-full font-medium"
            style={{ 
              backgroundColor: `${color}15`,
              color: color 
            }}
          >
            {category.zh}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
        >
          ✕
        </button>
      </div>

      {/* 內容 - 故事書風格 */}
      <div className="flex-1 overflow-y-auto">
        {/* 標題區 */}
        <div className="px-5 py-5">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{item.name}</h1>
          {item.name_en && (
            <p className="text-sm text-gray-500 italic">{item.name_en}</p>
          )}
        </div>

        {/* 快速統計卡片 */}
        <div className="px-5 pb-5">
          <div className="grid grid-cols-3 gap-2">
            {item.recognition_year && (
              <div className="bg-amber-50 rounded-xl p-3 text-center">
                <div className="text-lg mb-0.5">🏆</div>
                <div className="text-xs font-medium text-amber-700">{item.recognition_year}</div>
                <div className="text-[10px] text-amber-600">列入非遺</div>
              </div>
            )}
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-lg mb-0.5">📍</div>
              <div className="text-xs font-medium text-gray-700">{region}</div>
              <div className="text-[10px] text-gray-500">地區</div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-lg mb-0.5">{emoji}</div>
              <div className="text-xs font-medium text-gray-700">{category.zh}</div>
              <div className="text-[10px] text-gray-500">類別</div>
            </div>
          </div>
        </div>

        {/* 圖片（如果有） */}
        {hasImage && (
          <div className="px-5 pb-5">
            <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-sm">
              <img
                src={images[0].url}
                alt={images[0].caption}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <p className="text-white text-xs">{images[0].caption}</p>
              </div>
            </div>
          </div>
        )}

        {/* 內容章節 */}
        <div className="px-5 pb-6 space-y-4">
          
          {/* 必睇亮點 */}
          {(item as any).highlights && (
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-5 border border-blue-100">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-sm">⭐</div>
                <h2 className="font-bold text-gray-900">必睇亮點</h2>
              </div>
              <ul className="space-y-2">
                {(item as any).highlights.map((highlight: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-blue-500 mt-0.5">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 簡介卡片 */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-sm">📖</div>
              <h2 className="font-bold text-gray-900">簡介</h2>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
          </div>

          {/* 體驗方式 */}
          {(item as any).how_to_experience && (
            <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-5 border border-emerald-100">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-sm">🎯</div>
                <h2 className="font-bold text-gray-900">體驗方式</h2>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{(item as any).how_to_experience}</p>
            </div>
          )}

          {/* 最佳時間 */}
          {(item as any).best_time && (
            <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-5 border border-orange-100">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-sm">📅</div>
                <h2 className="font-bold text-gray-900">最佳體驗時間</h2>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{(item as any).best_time}</p>
            </div>
          )}

          {/* 歷史卡片 */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-sm">⏳</div>
              <h2 className="font-bold text-gray-900">歷史</h2>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {item.history || <span className="text-gray-400 italic">暫無歷史資料</span>}
            </p>
          </div>

          {/* 文化意義卡片 */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-sm">💎</div>
              <h2 className="font-bold text-gray-900">文化意義</h2>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {item.cultural_significance || <span className="text-gray-400 italic">暫無文化意義資料</span>}
            </p>
          </div>

          {/* 體驗貼士 */}
          {(item as any).tips && (
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-5 border border-purple-100">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-sm">💡</div>
                <h2 className="font-bold text-gray-900">體驗貼士</h2>
              </div>
              <ul className="space-y-2">
                {(item as any).tips.map((tip: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-purple-500 mt-0.5">💡</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 趣聞（如果有） */}
          {item.fun_facts && (
            <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl p-5 border border-amber-100">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-sm">✨</div>
                <h2 className="font-bold text-amber-900">趣聞</h2>
              </div>
              <p className="text-amber-800 text-sm leading-relaxed">{item.fun_facts}</p>
            </div>
          )}

          {/* 地址及交通 */}
          {(item.address || (item as any).transportation) && (
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-sm">📍</div>
                <h2 className="font-bold text-gray-900">地點及交通</h2>
              </div>
              {item.address && (
                <p className="text-gray-700 text-sm leading-relaxed mb-2">
                  <span className="font-medium">地址：</span>{item.address}
                </p>
              )}
              {(item as any).transportation && (
                <p className="text-gray-700 text-sm leading-relaxed">
                  <span className="font-medium">交通：</span>{(item as any).transportation}
                </p>
              )}
            </div>
          )}

          {/* 參考資料 */}
          {item.references && item.references.length > 0 && (
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-sm">🔗</div>
                <h2 className="font-bold text-gray-900">參考資料</h2>
              </div>
              <ul className="space-y-2">
                {item.references.map((ref, idx) => (
                  <li key={idx}>
                    <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                      {ref.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 服務標籤 */}
        <div className="px-5 pb-5">
          <div className="flex flex-wrap gap-2">
            {item.workshop_available && (
              <span className="px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-xs font-medium border border-emerald-100">
                🎨 可預約工作坊
              </span>
            )}
            {item.tour_available && (
              <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-medium border border-blue-100">
                🚶 可預約導賞
              </span>
            )}
          </div>
        </div>

        {/* 按鈕 */}
        <div className="px-5 pb-6 space-y-2">
          {item.tour_available && (
            <a
              href={`/tours?heritage=${item.id}`}
              className="block w-full py-3 bg-blue-500 text-white text-center rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors shadow-sm shadow-blue-200"
            >
              🚶 預約導賞團
            </a>
          )}
          
          {item.workshop_available && (
            <a
              href={`/workshops?heritage=${item.id}`}
              className="block w-full py-3 bg-emerald-500 text-white text-center rounded-xl text-sm font-medium hover:bg-emerald-600 transition-colors shadow-sm shadow-emerald-200"
            >
              🎨 預約工作坊
            </a>
          )}
          
          {item.wikipedia_url && (
            <a
              href={item.wikipedia_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 bg-gray-100 text-gray-700 text-center rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              📖 維基百科
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
