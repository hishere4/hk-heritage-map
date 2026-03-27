'use client';

import { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { HeritageItem, categoryLabels } from '@/lib/supabase';

// 簡化嘅類別顏色
const categoryColors: Record<HeritageItem['category'], string> = {
  performing_arts: '#8b5cf6',   // 紫
  crafts: '#d97706',            // 琥珀
  festivals: '#ef4444',         // 紅
  oral_traditions: '#3b82f6',   // 藍
  food_culture: '#f97316',      // 橙
  martial_arts: '#22c55e',      // 綠
  folklore: '#14b8a6',          // 青
};

// 簡潔圓點標記
const createSimpleIcon = (category: HeritageItem['category'], isSelected: boolean) => {
  const color = categoryColors[category];
  const size = isSelected ? 28 : 20;
  
  return L.divIcon({
    className: 'simple-marker',
    html: `<div style="
      width: ${size}px;
      height: ${size}px;
      background-color: ${color};
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: ${isSelected ? '0 4px 12px rgba(0,0,0,0.3)' : '0 2px 6px rgba(0,0,0,0.2)'};
      transition: all 0.2s ease;
      cursor: pointer;
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

// 地圖視圖更新
function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  map.flyTo(center, zoom, { duration: 0.8 });
  return null;
}

// 縮放控制組件
function ZoomControls() {
  const map = useMap();
  
  return (
    <div className="absolute bottom-6 right-6 z-[1000] flex flex-col gap-1">
      <button 
        onClick={() => map.zoomIn()}
        className="w-9 h-9 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50 text-lg font-bold transition-colors"
        aria-label="放大"
      >
        +
      </button>
      <button 
        onClick={() => map.zoomOut()}
        className="w-9 h-9 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50 text-lg font-bold transition-colors"
        aria-label="縮小"
      >
        −
      </button>
    </div>
  );
}

interface HeritageMapProps {
  items: HeritageItem[];
  center: [number, number];
  zoom: number;
  selectedItem: HeritageItem | null;
  onItemClick: (item: HeritageItem) => void;
}

export default function HeritageMap({ items, center, zoom, selectedItem, onItemClick }: HeritageMapProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      zoomControl={false}
      style={{ height: '100%', width: '100%', background: '#f8fafc' }}
    >
      {/* 極簡地圖風格 */}
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      
      <ZoomControls />
      <MapUpdater center={center} zoom={zoom} />
      
      {items.map((item) => (
        <Marker
          key={item.id}
          position={[item.lat, item.lng]}
          icon={createSimpleIcon(item.category, selectedItem?.id === item.id)}
          eventHandlers={{
            click: () => onItemClick(item),
          }}
        />
      ))}
    </MapContainer>
  );
}
