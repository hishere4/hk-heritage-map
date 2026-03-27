import { supabase } from '@/lib/supabase';
import B2BForm from './B2BForm';

export const dynamic = 'force-dynamic';

// 獲取所有非遺項目（用於企業包場選擇）
async function getHeritageItems() {
  const { data, error } = await supabase
    .from('heritage_items')
    .select('*')
    .eq('is_published', true)
    .order('name');
  
  if (error) {
    console.error('Error fetching heritage items:', error);
    return [];
  }
  
  return data || [];
}

export default async function B2BPage() {
  const heritageItems = await getHeritageItems();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between">
            <div>
              <a href="/hk" className="text-3xl mb-4 inline-block">🏛️</a>
              <h1 className="text-3xl font-bold mb-2">企業 & 學校專區</h1>
              <p className="text-indigo-100">專屬包場服務 · 定制文化體驗 · 團隊建設</p>
            </div>
            <a 
              href="/hk" 
              className="text-white/80 hover:text-white px-4 py-2 bg-white/10 rounded-lg"
            >
              ← 返回地圖
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 服務介紹 */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: '🏢',
              title: '企業包場',
              desc: '公司活動、團隊建設、客戶招待專屬場地同導賞服務',
              features: ['專屬導賞員', '定制路線', '餐飲安排', '包場體驗']
            },
            {
              icon: '🎓',
              title: '學校教育團',
              desc: '中小學生非遺教育、實地考察、互動工作坊',
              features: ['課程對接', '安全教育', '互動體驗', '學習手冊']
            },
            {
              icon: '🤝',
              title: '機構合作',
              desc: '非政府組織、社區團體、文化機構合作計劃',
              features: ['聯合推廣', '義工培訓', '社區活動', '研究支援']
            }
          ].map((service, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.desc}</p>
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-emerald-500">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 預約表單 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">提交查詢</h2>
            <p className="text-gray-600 mt-1">填寫以下表格，我們會喺 1-2 個工作天內與您聯絡</p>
          </div>
          
          <div className="p-6">
            <B2BForm heritageItems={heritageItems} />
          </div>
        </div>
      </main>
    </div>
  );
}
