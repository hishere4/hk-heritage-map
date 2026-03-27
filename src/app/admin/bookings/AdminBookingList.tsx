'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Booking {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  organization: string;
  booking_type: string;
  participant_count: number;
  preferred_date: string;
  message: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  admin_notes: string;
  created_at: string;
  workshop: { title: string } | null;
  heritage: { name: string } | null;
}

interface AdminBookingListProps {
  bookings: Booking[];
}

const statusLabels: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: '待處理', color: 'text-amber-700', bg: 'bg-amber-50' },
  confirmed: { label: '已確認', color: 'text-emerald-700', bg: 'bg-emerald-50' },
  cancelled: { label: '已取消', color: 'text-red-700', bg: 'bg-red-50' },
  completed: { label: '已完成', color: 'text-gray-700', bg: 'bg-gray-50' },
};

const typeLabels: Record<string, string> = {
  individual: '個人',
  corporate: '企業',
  school: '學校',
};

export default function AdminBookingList({ bookings: initialBookings }: AdminBookingListProps) {
  const [bookings, setBookings] = useState(initialBookings);
  const [filter, setFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [adminNotes, setAdminNotes] = useState('');

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('bookings')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (!error) {
      setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus as any } : b));
      if (selectedBooking?.id === id) {
        setSelectedBooking({ ...selectedBooking, status: newStatus as any });
      }
    }
  };

  const updateNotes = async (id: string) => {
    const { error } = await supabase
      .from('bookings')
      .update({ admin_notes: adminNotes })
      .eq('id', id);

    if (!error && selectedBooking) {
      setSelectedBooking({ ...selectedBooking, admin_notes: adminNotes });
      setBookings(bookings.map(b => b.id === id ? { ...b, admin_notes: adminNotes } : b));
    }
  };

  const openDetail = (booking: Booking) => {
    setSelectedBooking(booking);
    setAdminNotes(booking.admin_notes || '');
  };

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  const stats = {
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { key: 'pending', label: '待處理', icon: 'H' },
          { key: 'confirmed', label: '已確認', icon: 'O' },
          { key: 'completed', label: '已完成', icon: 'P' },
          { key: 'cancelled', label: '已取消', icon: 'X' },
        ].map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`p-4 rounded-xl border text-left transition-all ${
              filter === key 
                ? 'border-gray-800 bg-gray-800 text-white' 
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={filter === key ? 'text-gray-300' : 'text-gray-500'}>{label}</span>
              <span className="text-lg">{icon}</span>
            </div>
            <p className={`text-2xl font-bold ${filter === key ? 'text-white' : 'text-gray-900'}`}>
              {stats[key as keyof typeof stats]}
            </p>
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-gray-900 text-white'
              : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          全部 ({bookings.length})
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">日期</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">客戶</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">類型</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">項目</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">人數</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">狀態</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    沒有符合條件的預約
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr 
                    key={booking.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => openDetail(booking)}
                  >
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Date(booking.created_at).toLocaleDateString('zh-HK')}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{booking.customer_name}</div>
                      <div className="text-xs text-gray-500">{booking.customer_email}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-700">{typeLabels[booking.booking_type]}</span>
                      {booking.organization && (
                        <div className="text-xs text-gray-500 truncate max-w-[120px]">{booking.organization}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {booking.workshop?.title || booking.heritage?.name || '一般查詢'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {booking.participant_count} 人
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 rounded-md text-xs font-medium ${statusLabels[booking.status].bg} ${statusLabels[booking.status].color}`}>
                        {statusLabels[booking.status].label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={booking.status}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateStatus(booking.id, e.target.value);
                        }}
                        className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      >
                        <option value="pending">待處理</option>
                        <option value="confirmed">確認</option>
                        <option value="completed">完成</option>
                        <option value="cancelled">取消</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedBooking && (
        <div 
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
          onClick={() => setSelectedBooking(null)}
        >
          <div 
            className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">預約詳情</h2>
                <p className="text-sm text-gray-500">{selectedBooking.id.slice(0, 8)}...</p>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
              >
                X
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">狀態:</span>
                <select
                  value={selectedBooking.status}
                  onChange={(e) => updateStatus(selectedBooking.id, e.target.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border-0 ${statusLabels[selectedBooking.status].bg} ${statusLabels[selectedBooking.status].color}`}
                >
                  <option value="pending">待處理</option>
                  <option value="confirmed">已確認</option>
                  <option value="completed">已完成</option>
                  <option value="cancelled">已取消</option>
                </select>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">客戶信息</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">姓名</span>
                    <span className="text-gray-900">{selectedBooking.customer_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">電郵</span>
                    <span className="text-gray-900">{selectedBooking.customer_email}</span>
                  </div>
                  {selectedBooking.customer_phone && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">電話</span>
                      <span className="text-gray-900">{selectedBooking.customer_phone}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">類型</span>
                    <span className="text-gray-900">{typeLabels[selectedBooking.booking_type]}</span>
                  </div>
                  {selectedBooking.organization && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">機構</span>
                      <span className="text-gray-900">{selectedBooking.organization}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">預約詳情</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">項目</span>
                    <span className="text-gray-900">{selectedBooking.workshop?.title || selectedBooking.heritage?.name || '一般查詢'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">人數</span>
                    <span className="text-gray-900">{selectedBooking.participant_count} 人</span>
                  </div>
                  {selectedBooking.preferred_date && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">首選日期</span>
                      <span className="text-gray-900">{new Date(selectedBooking.preferred_date).toLocaleDateString('zh-HK')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">提交日期</span>
                    <span className="text-gray-900">{new Date(selectedBooking.created_at).toLocaleDateString('zh-HK')}</span>
                  </div>
                </div>
              </div>

              {selectedBooking.message && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">客戶留言</h3>
                  <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700">
                    {selectedBooking.message}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">管理員備註</h3>
                <textarea
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="添加備註..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
                <button
                  onClick={() => updateNotes(selectedBooking.id)}
                  className="mt-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800"
                >
                  保存備註
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
