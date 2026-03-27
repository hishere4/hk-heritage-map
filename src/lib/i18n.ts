// 簡易多語言配置
export const translations = {
  zh: {
    siteName: 'HeritageHK',
    siteDesc: '香港非物質文化遺產地圖',
    nav: {
      map: '地圖',
      workshops: '工作坊',
      tours: '導賞團',
      b2b: '企業/學校',
      admin: '管理'
    },
    sidebar: {
      explore: '探索非遺',
      selectMarker: '點擊地圖標記查看詳情',
      history: '歷史',
      significance: '文化意義',
      funFacts: '冷知識',
      references: '參考資料',
      bookWorkshop: '預約工作坊',
      bookTour: '預約導賞團',
      wikipedia: '維基百科'
    },
    filter: {
      search: '搜尋非遺...',
      all: '全部',
      result: '項結果'
    }
  },
  en: {
    siteName: 'HeritageHK',
    siteDesc: 'Hong Kong Intangible Cultural Heritage',
    nav: {
      map: 'Map',
      workshops: 'Workshops',
      tours: 'Guided Tours',
      b2b: 'Corporate/School',
      admin: 'Admin'
    },
    sidebar: {
      explore: 'Explore Heritage',
      selectMarker: 'Click map markers for details',
      history: 'History',
      significance: 'Cultural Significance',
      funFacts: 'Fun Facts',
      references: 'References',
      bookWorkshop: 'Book Workshop',
      bookTour: 'Book Guided Tour',
      wikipedia: 'Wikipedia'
    },
    filter: {
      search: 'Search heritage...',
      all: 'All',
      result: 'results'
    }
  }
};

export type Language = 'zh' | 'en';

export function getTranslation(lang: Language) {
  return translations[lang];
}
