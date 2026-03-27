'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface BookingFormProps {
  workshopId?: string;
  heritageId?: string;
  bookingType?: 'workshop' | 'tour' | 'general';
}

export default function BookingForm({ workshopId, heritageId, bookingType = 'general' }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    participantCount: 1,
    preferredDate: '',
    message: '',
    bookingType: 'individual',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const { error: submitError } = await supabase.from('bookings').insert({
        workshop_id: workshopId || null,
        heritage_id: heritageId || null,
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone || null,
        organization: formData.organization || null,
        booking_type: formData.bookingType,
        participant_count: formData.participantCount,
        preferred_date: formData.preferredDate || null,
        message: formData.message || null,
        status: 'pending',
      });

      if (submitError) throw submitError;

      setIsSuccess(true);
    } catch (err) {
      setError('提交失敗，請稍後再試。');
      console.error('Booking error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">預約成功！</h3>
        <p className="text-gray-600 mb-4">我們會盡快與您聯絡確認詳情。</p>
        <button
          onClick={() => {
            setIsSuccess(false);
            setFormData({
              name: '',
              email: '',
              phone: '',
              organization: '',
              participantCount: 1,
              preferredDate: '',
              message: '',
              bookingType: 'individual',
            });
          }}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          再預約一個
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>
      )}

      {/* 預約類型 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">預約類型</label>
        <div className="flex gap-2">
          {[
            { id: 'individual', label: '個人' },
            { id: 'corporate', label: '企業' },
            { id: 'school', label: '學校' },
          ].map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => setFormData({ ...formData, bookingType: type.id })}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                formData.bookingType === type.id
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* 姓名 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">姓名 *</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="請輸入您的姓名"
        />
      </div>

      {/* 電郵 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">電郵 *</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="example@email.com"
        />
      </div>

      {/* 電話 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">電話</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="+852 1234 5678"
        />
      </div>

      {/* 機構名稱 */}
      {(formData.bookingType === 'corporate' || formData.bookingType === 'school') && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">機構名稱 *</label>
          <input
            type="text"
            required
            value={formData.organization}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="公司/學校名稱"
          />
        </div>
      )}

      {/* 參與人數 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">參與人數</label>
        <input
          type="number"
          min={1}
          max={100}
          value={formData.participantCount}
          onChange={(e) => setFormData({ ...formData, participantCount: parseInt(e.target.value) || 1 })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* 首選日期 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">首選日期</label>
        <input
          type="date"
          value={formData.preferredDate}
          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* 留言 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">留言 / 特別要求</label>
        <textarea
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="請告訴我們您的需求..."
        />
      </div>

      {/* 提交 */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 disabled:opacity-50"
      >
        {isSubmitting ? '提交中...' : '提交預約'}
      </button>
    </form>
  );
}
