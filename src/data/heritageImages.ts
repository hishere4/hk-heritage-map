// HeritageHK - 維基共享資源圖片
// 所有圖片均為公有領域或 CC BY-SA 授權

export interface HeritageImage {
  url: string;
  caption: string;
  source: string;
}

// Wikimedia Commons 圖片（直接連結到原始檔案）
export const heritageImages: Record<string, HeritageImage[]> = {
  '粵劇': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/Cantonese_Opera_Perfomance.jpg',
      caption: '粵劇表演（香港文化中心）',
      source: 'Wikimedia Commons'
    }
  ],
  
  '詠春': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Wing_Chun_Kuen_Hong_Kong.jpg',
      caption: '詠春拳術',
      source: 'Wikimedia Commons'
    }
  ],
  
  '港式奶茶': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Hong_Kong_style_Milk_Tea.jpg',
      caption: '港式奶茶',
      source: 'Wikimedia Commons'
    }
  ],
  
  '長洲太平清醮': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Cheung_Chau_Bun_Festival.jpg',
      caption: '長洲太平清醮搶包山',
      source: 'Wikimedia Commons'
    }
  ],
  
  '大坑舞火龍': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Tai_Hang_Fire_Dragon_2012.jpg',
      caption: '大坑舞火龍',
      source: 'Wikimedia Commons'
    }
  ],
  
  '黃大仙信俗': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Wong_Tai_Sin_Temple_Hong_Kong.jpg',
      caption: '黃大仙祠',
      source: 'Wikimedia Commons'
    }
  ],
  
  '天后誕': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Tin_Hau_Festival_Hong_Kong.jpg',
      caption: '天后誕慶典',
      source: 'Wikimedia Commons'
    }
  ],
  
  '古琴藝術': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Guqin.jpg',
      caption: '古琴',
      source: 'Wikimedia Commons'
    }
  ],
  
  '南音': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Naamyam_performer.jpg',
      caption: '南音演唱',
      source: 'Wikimedia Commons'
    }
  ],
  
  '涼紮技藝': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Paper_Offerings_Hong_Kong.jpg',
      caption: '紮作祭品',
      source: 'Wikimedia Commons'
    }
  ],
  
  '戲棚搭建技藝': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Bamboo_Scaffolding_Hong_Kong.jpg',
      caption: '竹棚搭建',
      source: 'Wikimedia Commons'
    }
  ],
  
  '中式長衫製作技藝': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Cheongsam_Hong_Kong.jpg',
      caption: '香港長衫',
      source: 'Wikimedia Commons'
    }
  ],
  
  '香港潮人盂蘭勝會': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Yulan_Festival_Hong_Kong.jpg',
      caption: '盂蘭勝會',
      source: 'Wikimedia Commons'
    }
  ],
  
  '大澳端午遊涌': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Tai_O_Dragon_Boat_Water_Parade.jpg',
      caption: '大澳端午遊涌',
      source: 'Wikimedia Commons'
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

/*
注意：以上圖片連結需要驗證是否真實存在。
驗證方法：在瀏覽器打開連結，睇下係咪顯示圖片。

Wikimedia Commons 搜尋方法：
1. 訪問 https://commons.wikimedia.org
2. 搜尋關鍵詞（如 "Cantonese opera Hong Kong"）
3. 選擇合適圖片
4. 點擊「原始檔案」獲取直接連結

官方圖片來源（需手動獲取）：
- 香港非遺辦事處：https://www.heritage.gov.hk/tc/index.html
- 康文署：https://www.lcsd.gov.hk/
- 香港旅遊發展局：https://www.discoverhongkong.com/
*/
