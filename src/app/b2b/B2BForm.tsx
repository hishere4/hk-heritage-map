'use client';

import { useState } from 'react';

interface HeritageItem {
  id: string;
  name: string;
}

interface B2BFormProps {
  heritageItems: HeritageItem[];
}

export default function B2BForm({ heritageItems }: B2BFormProps) {
  const [formData, setFormData] = useState({
    organization: '',
    contactName: '',
    email: '',
    phone: '',
    eventType: 'corporate',
    participantCount: '',
    preferredDate: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send to backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">提交成功！</h3>
        <p className="text-gray-600">我們會喺 1-2 個工作天內與您聯絡。</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            機構名稱 *
          </label>
          <input
            type="text"
            required
            value={formData.organization}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="公司名稱 / 學校名稱"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            聯絡人姓名 *
          </label>
          <input
            type="text"
            required
            value={formData.contactName}
            onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            電郵地址 *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            聯絡電話
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          活動類型 *
        </label>
        <select
          value={formData.eventType}
          onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="corporate">企業包場</option>
          <option value="school">學校教育團</option>
          <option value="organization">機構合作</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            預計人數 *
          </label>
          <input
            type="number"
            required
            min="1"
            value={formData.participantCount}
            onChange={(e) => setFormData({ ...formData, participantCount: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            首選日期
          </label>
          <input
            type="date"
            value={formData.preferredDate}
            onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          留言 / 特別要求
        </label>
        <textarea
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="請描述您嘅需求，例如：想參觀嘅非遺項目、特別安排等"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
      >
        提交查詢
      </button>
    </form>
  );
}
