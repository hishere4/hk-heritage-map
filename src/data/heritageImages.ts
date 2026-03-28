// HeritageHK 圖片庫 - 使用 Unsplash 免費圖片
// 所有圖片均為免費使用，無需 API key

export interface HeritageImage {
  url: string;
  caption: string;
  source: string;
}

// Unsplash 圖片 ID 列表
export const heritageImages: Record<string, HeritageImage[]> = {
  '粵劇': [
    {
      url: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80',
      caption: '戲曲表演',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
      caption: '傳統戲台',
      source: 'Unsplash'
    }
  ],
  
  '詠春': [
    {
      url: 'https://images.unsplash.com/photo-1552062697-13b48d8d2c39?w=800&q=80',
      caption: '武術練習',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=800&q=80',
      caption: '功夫訓練',
      source: 'Unsplash'
    }
  ],
  
  '港式奶茶': [
    {
      url: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80',
      caption: '香港茶餐廳',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1576092768241-dec231847233?w=800&q=80',
      caption: '奶茶文化',
      source: 'Unsplash'
    }
  ],
  
  '大澳端午遊涌': [
    {
      url: 'https://images.unsplash.com/photo-1595331545665-88a6402a8f5c?w=800&q=80',
      caption: '龍舟競渡',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1542931287-023b922fa89b?w=800&q=80',
      caption: '端午節慶祝',
      source: 'Unsplash'
    }
  ],
  
  '古琴藝術': [
    {
      url: 'https://images.unsplash.com/photo-1513883049090-d0b7439799bf?w=800&q=80',
      caption: '古琴樂器',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1525926477800-7a3be8300c73?w=800&q=80',
      caption: '傳統樂器',
      source: 'Unsplash'
    }
  ],
  
  '長洲太平清醮': [
    {
      url: 'https://images.unsplash.com/photo-1582739501019-5c4aa6e949d9?w=800&q=80',
      caption: '節慶活動',
      source: 'Unsplash'
    },
    {
      url: 'https://images.unsplash.com/photo-1535063406830-1897558d7e9a?w=800&q=80',
      caption: '傳統節日',
      source: 'Unsplash'
    }
  ],
  
  '南音': [
    {
      url: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=80',
      caption: '音樂表演',
      source: 'Unsplash'
    }
  ],
  
  '涼紮技藝': [
    {
      url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
      caption: '手工藝品',
      source: 'Unsplash'
    }
  ],
  
  '大坑舞火龍': [
    {
      url: 'https://images.unsplash.com/photo-1538669716095-09471c8c6c7a?w=800&q=80',
      caption: '火龍表演',
      source: 'Unsplash'
    }
  ],
  
  '香港潮人盂蘭勝會': [
    {
      url: 'https://images.unsplash.com/photo-1597211684694-8f238228eebb?w=800&q=80',
      caption: '傳統祭祀',
      source: 'Unsplash'
    }
  ],
  
  '戲棚搭建技藝': [
    {
      url: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&q=80',
      caption: '竹棚建築',
      source: 'Unsplash'
    }
  ],
  
  '黃大仙信俗': [
    {
      url: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&q=80',
      caption: '寺廟建築',
      source: 'Unsplash'
    }
  ],
  
  '天后誕': [
    {
      url: 'https://images.unsplash.com/photo-1599572835611-d630cc17293e?w=800&q=80',
      caption: '廟宇活動',
      source: 'Unsplash'
    }
  ],
  
  '中式長衫製作技藝': [
    {
      url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
      caption: '傳統服飾',
      source: 'Unsplash'
    }
  ],
  
  '跌打': [
    {
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
      caption: '傳統醫療',
      source: 'Unsplash'
    }
  ],
  
  '廟宇建築': [
    {
      url: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=800&q=80',
      caption: '廟宇建築',
      source: 'Unsplash'
    }
  ],
  
  '紥作技藝': [
    {
      url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
      caption: '竹搭建',
      source: 'Unsplash'
    }
  ],
  
  '彩瓷': [
    {
      url: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80',
      caption: '陶瓷工藝',
      source: 'Unsplash'
    }
  ],
  
  '涼船': [
    {
      url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80',
      caption: '紙藝品',
      source: 'Unsplash'
    }
  ],
  
  '中秋節—大坑舞火龍': [
    {
      url: 'https://images.unsplash.com/photo-1513624954087-ca7109c6e6fe?w=800&q=80',
      caption: '中秋節慶祝',
      source: 'Unsplash'
    }
  ]
};

// 獲取特定非遺嘅圖片
export function getHeritageImages(heritageName: string): HeritageImage[] {
  return heritageImages[heritageName] || [];
}

// 獲取所有圖片
export function getAllImages(): Record<string, HeritageImage[]> {
  return heritageImages;
}
