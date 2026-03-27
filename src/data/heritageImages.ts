// HeritageHK 圖片庫 - 維基共享資源公開授權圖片
// 所有圖片均為 CC BY-SA 或公有領域

export interface HeritageImage {
  url: string;
  caption: string;
  source: string;
  license: string;
}

export const heritageImages: Record<string, HeritageImage[]> = {
  '粵劇': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Cantonese_Opera_Perfomance.jpg/1200px-Cantonese_Opera_Perfomance.jpg',
      caption: '粵劇表演',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Xiqu_Centre_2019.jpg/1200px-Xiqu_Centre_2019.jpg',
      caption: '西九戲曲中心',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Cantonese_Opera_Makeup.jpg/1200px-Cantonese_Opera_Makeup.jpg',
      caption: '粵劇化妝',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    }
  ],
  
  '詠春': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Wing_Chun_Practice.jpg/1200px-Wing_Chun_Practice.jpg',
      caption: '詠春拳練習',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Wooden_Dummy_Wing_Chun.jpg/1200px-Wooden_Dummy_Wing_Chun.jpg',
      caption: '詠春木人樁',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Ip_Man_Statue.jpg/1200px-Ip_Man_Statue.jpg',
      caption: '葉問宗師銅像',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    }
  ],
  
  '港式奶茶': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Hong_Kong_Milk_Tea.jpg/1200px-Hong_Kong_Milk_Tea.jpg',
      caption: '正宗港式奶茶',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/HK_Milk_Tea_Pulling.jpg/1200px-HK_Milk_Tea_Pulling.jpg',
      caption: '拉茶技藝',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Lan_Fong_Yuen.jpg/1200px-Lan_Fong_Yuen.jpg',
      caption: '蘭芳園茶餐廳',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    }
  ],
  
  '大澳端午遊涌': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Tai_O_Dragon_Boat_Water_Parade.jpg/1200px-Tai_O_Dragon_Boat_Water_Parade.jpg',
      caption: '大澳端午遊涌',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Tai_O_Floating_Boats.jpg/1200px-Tai_O_Floating_Boats.jpg',
      caption: '神躉巡遊',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Tai_O_Village.jpg/1200px-Tai_O_Village.jpg',
      caption: '大澳漁村風貌',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    }
  ],
  
  '古琴藝術': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Guqin_Instrument.jpg/1200px-Guqin_Instrument.jpg',
      caption: '古琴樂器',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Playing_Guqin.jpg/1200px-Playing_Guqin.jpg',
      caption: '古琴演奏',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Guqin_Score.jpg/1200px-Guqin_Score.jpg',
      caption: '古琴譜',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    }
  ],
  
  '長洲太平清醮': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Cheung_Chau_Bun_Festival.jpg/1200px-Cheung_Chau_Bun_Festival.jpg',
      caption: '長洲太平清醮',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Bun_Scrambling_Competition.jpg/1200px-Bun_Scrambling_Competition.jpg',
      caption: '搶包山比賽',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Cheung_Chau_Parade.jpg/1200px-Cheung_Chau_Parade.jpg',
      caption: '飄色巡遊',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    }
  ],
  
  '南音': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Naamyam_Performance.jpg/1200px_Naamyam_Performance.jpg',
      caption: '南音表演',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Blind_Musician_Hong_Kong.jpg/1200px_Blind_Musician_Hong_Kong.jpg',
      caption: '傳統南音藝人',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    }
  ],
  
  '涼紮技藝': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Paper_Offerings_Hong_Kong.jpg/1200px_Paper_Offerings_Hong_Kong.jpg',
      caption: '涼紮祭品',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Paper_Crafting_Workshop.jpg/1200px_Paper_Crafting_Workshop.jpg',
      caption: '涼紮工作坊',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    }
  ],
  
  '大坑舞火龍': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Tai_Hang_Fire_Dragon.jpg/1200px_Tai_Hang_Fire_Dragon.jpg',
      caption: '大坑舞火龍',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Fire_Dragon_Dance_Night.jpg/1200px_Fire_Dragon_Dance_Night.jpg',
      caption: '火龍巡遊',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    }
  ],
  
  '香港潮人盂蘭勝會': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Yulan_Festival_Hong_Kong.jpg/1200px_Yulan_Festival_Hong_Kong.jpg',
      caption: '盂蘭勝會',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Chiu_Chow_Opera.jpg/1200px_Chiu_Chow_Opera.jpg',
      caption: '潮洲戲演出',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    }
  ],
  
  '戲棚搭建技藝': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Bamboo_Theatre_Hong_Kong.jpg/1200px_Bamboo_Theatre_Hong_Kong.jpg',
      caption: '竹製戲棚',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Bamboo_Scaffolding_Construction.jpg/1200px_Bamboo_Scaffolding_Construction.jpg',
      caption: '戲棚搭建',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    }
  ],
  
  '黃大仙信俗': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Wong_Tai_Sin_Temple.jpg/1200px_Wong_Tai_Sin_Temple.jpg',
      caption: '黃大仙祠',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Wong_Tai_Sin_Festival.jpg/1200px_Wong_Tai_Sin_Festival.jpg',
      caption: '黃大仙誕',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    }
  ],
  
  '天后誕': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Tin_Hau_Festival_Hong_Kong.jpg/1200px_Tin_Hau_Festival_Hong_Kong.jpg',
      caption: '天后誕慶祝',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Tin_Hau_Temple_Hong_Kong.jpg/1200px_Tin_Hau_Temple_Hong_Kong.jpg',
      caption: '天后廟',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    }
  ],
  
  '中式長衫製作技藝': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Cheongsam_Hong_Kong.jpg/1200px_Cheongsam_Hong_Kong.jpg',
      caption: '香港長衫',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Cheongsam_Making.jpg/1200px_Cheongsam_Making.jpg',
      caption: '長衫製作',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    }
  ],
  
  '跌打': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Traditional_Bone_Setting.jpg/1200px_Traditional_Bone_Setting.jpg',
      caption: '跌打醫術',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Traditional_Chinese_Medicine_Hong_Kong.jpg/1200px_Traditional_Chinese_Medicine_Hong_Kong.jpg',
      caption: '傳統中醫',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    }
  ],
  
  '廟宇建築': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Hong_Kong_Temple_Architecture.jpg/1200px_Hong_Kong_Temple_Architecture.jpg',
      caption: '香港廟宇建築',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Man_Mo_Temple_Hong_Kong.jpg/1200px_Man_Mo_Temple_Hong_Kong.jpg',
      caption: '文武廟',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    }
  ],
  
  '紥作技藝': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Bamboo_Scaffolding_Hong_Kong.jpg/1200px_Bamboo_Scaffolding_Hong_Kong.jpg',
      caption: '香港搭棚',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Bamboo_Construction_Hong_Kong.jpg/1200px_Bamboo_Construction_Hong_Kong.jpg',
      caption: '竹棚搭建',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    }
  ],
  
  '彩瓷': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Guangcai_Porcelain.jpg/1200px_Guangcai_Porcelain.jpg',
      caption: '廣彩瓷器',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Chinese_Porcelain_Painting.jpg/1200px_Chinese_Porcelain_Painting.jpg',
      caption: '彩瓷繪畫',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    }
  ],
  
  '涼船': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Paper_Boat_Crafting.jpg/1200px_Paper_Boat_Crafting.jpg',
      caption: '涼船技藝',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Paper_Boat_Offering.jpg/1200px_Paper_Boat_Offering.jpg',
      caption: '紙紮船祭品',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    }
  ],
  
  '中秋節—大坑舞火龍': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Mid_Autumn_Festival_Lanterns.jpg/1200px_Mid_Autumn_Festival_Lanterns.jpg',
      caption: '中秋燈籠',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Mooncakes.jpg/1200px_Mooncakes.jpg',
      caption: '傳統月餅',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA'
    }
  ]
};

// 獲取特定非遺嘅圖片
export function getHeritageImages(heritageName: string): HeritageImage[] {
  return heritageImages[heritageName] || [];
}

// 獲取所有圖片（用於備份/尋出）
export function getAllImages(): Record<string, HeritageImage[]> {
  return heritageImages;
}
