'use client';

import { HeritageItem } from '@/lib/supabase';

// 類別顏色
export const categoryColors: Record<HeritageItem['category'], string> = {
  performing_arts: '#8b5cf6',   // 紫
  crafts: '#d97706',            // 琥珀
  festivals: '#ef4444',         // 紅
  oral_traditions: '#3b82f6',   // 藍
  food_culture: '#f97316',      // 橙
  martial_arts: '#22c55e',      // 綠
  folklore: '#14b8a6',          // 青
};

// 類別圖標 SVG
export const CategoryIcons: Record<HeritageItem['category'], React.FC<{ className?: string }>> = {
  // 戲曲面譜 - 表演藝術
  performing_arts: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <ellipse cx="12" cy="12" rx="10" ry="9" fill="currentColor" opacity="0.2"/>
      <ellipse cx="12" cy="12" rx="10" ry="9" stroke="currentColor" strokeWidth="1.5"/>
      {/* 眼睛 */}
      <ellipse cx="8" cy="9" rx="2" ry="1.5" fill="currentColor"/>
      <ellipse cx="16" cy="9" rx="2" ry="1.5" fill="currentColor"/>
      {/* 眉毛 */}
      <path d="M6 6 Q8 4 10 6" stroke="currentColor" strokeWidth="1" fill="none"/>
      <path d="M14 6 Q16 4 18 6" stroke="currentColor" strokeWidth="1" fill="none"/>
      {/* 嘴巴 */}
      <path d="M9 15 Q12 17 15 15" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  ),

  // 剪刀 - 手工藝
  crafts: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2"/>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
      {/* 剪刀 */}
      <path d="M8 6 L16 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16 6 L8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      {/* 手柄圓圈 */}
      <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="17" cy="7" r="2" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),

  // 燈籠 - 節慶
  festivals: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2"/>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
      {/* 燈籠 */}
      <rect x="8" y="6" width="8" height="10" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      {/* 頂部 */}
      <rect x="9" y="5" width="6" height="1.5" fill="currentColor"/>
      {/* 底部 */}
      <rect x="9" y="16" width="6" height="1.5" fill="currentColor"/>
      {/* 流蘇 */}
      <line x1="12" y1="17.5" x2="12" y2="20" stroke="currentColor" strokeWidth="1"/>
      <line x1="10" y1="19" x2="14" y2="19" stroke="currentColor" strokeWidth="1"/>
    </svg>
  ),

  // 聲波 - 口述傳統
  oral_traditions: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2"/>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
      {/* 聲波 */}
      <path d="M8 9 Q8 12 8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 7 Q12 12 12 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16 9 Q16 12 16 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),

  // 茶壺 - 飲食文化
  food_culture: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2"/>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
      {/* 茶壺 */}
      <ellipse cx="11" cy="11" rx="5" ry="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M16 9 Q19 9 19 12 Q19 15 16 15" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      {/* 壺蓋 */}
      <ellipse cx="11" cy="7" rx="2" ry="1" fill="currentColor"/>
      {/* 底座 */}
      <rect x="9" y="15" width="4" height="2" fill="currentColor"/>
    </svg>
  ),

  // 拳頭 - 武術
  martial_arts: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2"/>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
      {/* 拳頭 */}
      <rect x="7" y="8" width="10" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      {/* 手指 */}
      <line x1="8" y1="11" x2="8" y2="14" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="10" y1="11" x2="10" y2="14" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="12" y1="11" x2="12" y2="14" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="14" y1="11" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),

  // 卷軸 - 民間傳說
  folklore: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2"/>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
      {/* 卷軸 */}
      <rect x="6" y="7" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      {/* 左軸 */}
      <rect x="5" y="6" width="2" height="12" rx="1" fill="currentColor"/>
      {/* 右軸 */}
      <rect x="17" y="6" width="2" height="12" rx="1" fill="currentColor"/>
      {/* 文字線 */}
      <line x1="8" y1="10" x2="16" y2="10" stroke="currentColor" strokeWidth="1"/>
      <line x1="8" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="1"/>
    </svg>
  ),
};

// 獲取圖標組件
export function getCategoryIcon(category: HeritageItem['category']) {
  return CategoryIcons[category] || CategoryIcons.folklore;
}

// 創建標記 HTML
export function createMarkerIcon(
  category: HeritageItem['category'],
  isSelected: boolean,
  isHovered: boolean
): string {
  const color = categoryColors[category];
  const size = isSelected ? 40 : isHovered ? 36 : 32;
  const IconComponent = CategoryIcons[category];
  
  // 創建臨時容器渲染 SVG
  const svgString = `<svg viewBox="0 0 24 24" fill="none" style="width: 60%; height: 60%; color: ${color};">
    ${getSvgContent(category)}
  </svg>`;
  
  return `
    <div style="
      width: ${size}px;
      height: ${size}px;
      background: white;
      border-radius: 50%;
      border: 3px solid ${color};
      box-shadow: ${isSelected ? '0 4px 16px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.15)'};
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      cursor: pointer;
    ">
      ${svgString}
    </div>
  `;
}

// SVG 內容
function getSvgContent(category: HeritageItem['category']): string {
  const icons: Record<string, string> = {
    performing_arts: `
      <ellipse cx="12" cy="12" rx="9" ry="8" fill="currentColor" opacity="0.2"/>
      <ellipse cx="12" cy="12" rx="9" ry="8" stroke="currentColor" strokeWidth="1.5"/>
      <ellipse cx="8" cy="9" rx="2" ry="1.5" fill="currentColor"/>
      <ellipse cx="16" cy="9" rx="2" ry="1.5" fill="currentColor"/>
      <path d="M6 6 Q8 4 10 6" stroke="currentColor" strokeWidth="1" fill="none"/>
      <path d="M14 6 Q16 4 18 6" stroke="currentColor" strokeWidth="1" fill="none"/>
      <path d="M9 15 Q12 17 15 15" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    `,
    crafts: `
      <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.2"/>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 6 L16 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16 6 L8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="17" cy="7" r="2" stroke="currentColor" strokeWidth="1.5"/>
    `,
    festivals: `
      <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.2"/>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="8" y="6" width="8" height="10" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="9" y="5" width="6" height="1.5" fill="currentColor"/>
      <rect x="9" y="16" width="6" height="1.5" fill="currentColor"/>
      <line x1="12" y1="17.5" x2="12" y2="20" stroke="currentColor" strokeWidth="1"/>
      <line x1="10" y1="19" x2="14" y2="19" stroke="currentColor" strokeWidth="1"/>
    `,
    oral_traditions: `
      <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.2"/>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 9 Q8 12 8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 7 Q12 12 12 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16 9 Q16 12 16 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    `,
    food_culture: `
      <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.2"/>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
      <ellipse cx="11" cy="11" rx="5" ry="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M16 9 Q19 9 19 12 Q19 15 16 15" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <ellipse cx="11" cy="7" rx="2" ry="1" fill="currentColor"/>
      <rect x="9" y="15" width="4" height="2" fill="currentColor"/>
    `,
    martial_arts: `
      <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.2"/>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="7" y="8" width="10" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="8" y1="11" x2="8" y2="14" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="10" y1="11" x2="10" y2="14" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="12" y1="11" x2="12" y2="14" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="14" y1="11" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5"/>
    `,
    folklore: `
      <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.2"/>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="6" y="7" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="5" y="6" width="2" height="12" rx="1" fill="currentColor"/>
      <rect x="17" y="6" width="2" height="12" rx="1" fill="currentColor"/>
      <line x1="8" y1="10" x2="16" y2="10" stroke="currentColor" strokeWidth="1"/>
      <line x1="8" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="1"/>
    `,
  };
  
  return icons[category] || icons.folklore;
}
