'use client';

import { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { HeritageItem, categoryLabels } from '@/lib/supabase';
import { categoryColors, createMarkerIcon } from './CategoryIcons';

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

// 自定義 Popup 內容
function HeritagePopup({ item }: { item: HeritageItem }) {
  const category = categoryLabels[item.category];
  
  return (
    <div className="min-w-[180px] p-3">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{getEmoji(item.category)}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full text-white ${category.color}`}>
          {category.zh}
        </span>
      </div>
      <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
      <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
      <div className="mt-2 pt-2 border-t border-gray-100">
        <span className="text-xs text-gray-400">點擊查看詳情 →</span>
      </div>
    </div>
  );
}

function getEmoji(category: HeritageItem['category']): string {
  const emojis: Record<HeritageItem['category'], string> = {
    performing_arts: '🎭',
    crafts: '✂️',
    festivals: '🏮',
    oral_traditions: '🎵',
    food_culture: '🫖',
    martial_arts: '👊',
    folklore: '📜',
  };
  return emojis[category];
}

interface HeritageMapProps {
  items: HeritageItem[];
  center: [number, number];
  zoom: number;
  selectedItem: HeritageItem | null;
  onItemClick: (item: HeritageItem) => void;
}

export default function HeritageMap({ items, center, zoom, selectedItem, onItemClick }: HeritageMapProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  // 為每個項目創建圖標
  const markerIcons = useMemo(() => {
    const icons: Record<string, L.DivIcon> = {};
    items.forEach(item => {
      const isSelected = selectedItem?.id === item.id;
      const isHovered = hoveredId === item.id;
      icons[item.id] = L.divIcon({
        className: 'custom-marker',
        html: createMarkerIcon(item.category, isSelected, isHovered),
        iconSize: [isSelected ? 40 : 32, isSelected ? 40 : 32],
        iconAnchor: [isSelected ? 20 : 16, isSelected ? 20 : 16],
        popupAnchor: [0, -20],
      });
    });
    return icons;
  }, [items, selectedItem, hoveredId]);

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
        attribution='© <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      
      <ZoomControls />
      <MapUpdater center={center} zoom={zoom} />
      
      {items.map((item) => (
        <Marker
          key={item.id}
          position={[item.lat, item.lng]}
          icon={markerIcons[item.id]}
          eventHandlers={{
            click: () => onItemClick(item),
            mouseover: () => setHoveredId(item.id),
            mouseout: () => setHoveredId(null),
          }}
        >
          <Popup 
            closeButton={false}
            className="heritage-popup"
            offset={[0, -10]}
          >
            <HeritagePopup item={item} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
