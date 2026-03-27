import BookingForm from '@/components/BookingForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/hk" className="text-2xl">🏛️</a>
            <div>
              <h1 className="text-xl font-bold text-gray-800">聯絡我們</h1>
              <p className="text-sm text-gray-500">預約導賞團或查詢服務</p>
            </div>
          </div>
          <a href="/hk" className="text-gray-600 hover:text-gray-800">
            ← 返回地圖
          </a>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* 聯絡資訊 */}
          <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 text-white">
            <h2 className="text-xl font-bold mb-2">與我們聯絡</h2>
            <p className="opacity-90">
              無論是預約導賞團、安排工作坊，還是任何查詢，我們都很樂意為您服務。
            </p>
          </div>

          {/* 表單 */}
          <div className="p-6">
            <BookingForm bookingType="general" />
          </div>
        </div>

        {/* 其他聯絡方式 */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-3xl mb-2">📧</div>
            <h3 className="font-medium text-gray-800">電郵</h3>
            <p className="text-sm text-gray-500">info@heritagehk.com</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-3xl mb-2">📱</div>
            <h3 className="font-medium text-gray-800">WhatsApp</h3>
            <p className="text-sm text-gray-500">+852 1234 5678</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-3xl mb-2">⏰</div>
            <h3 className="font-medium text-gray-800">辦公時間</h3>
            <p className="text-sm text-gray-500">周一至周五 9:00-18:00</p>
          </div>
        </div>
      </main>
    </div>
  );
}
