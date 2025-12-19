// /app/page.js
'use client';

import { useState } from 'react';

export default function Home() {
  const [question, setQuestion] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* شريط الأعلى */}
        <div className="flex justify-between items-center mb-6">
          <h1 
            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
            style={{ fontFamily: 'cursive' }}
          >
            فريق الخبراء الاصطناعي
          </h1>
          <button className="p-2 rounded-full hover:bg-white/50 transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1h.09a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </button>
        </div>

        {/* أيقونات الخبراء */}
        <div className="flex justify-center gap-6 mb-6">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
              <span className="text-white text-xl">👨‍💻</span>
            </div>
            <span className="text-sm mt-1 text-blue-600 font-medium">برمجة</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
              <span className="text-white text-xl">🎨</span>
            </div>
            <span className="text-sm mt-1 text-green-600 font-medium">تصميم</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center shadow-lg">
              <span className="text-white text-xl">📊</span>
            </div>
            <span className="text-sm mt-1 text-orange-600 font-medium">تحليل</span>
          </div>
        </div>

        {/* مربع الإدخال مع زر الإرسال على اليمين */}
        <div className="bg-white rounded-2xl shadow-xl p-1 mb-8 border border-gray-200">
          <div className="flex items-end gap-2">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="اكتب سؤالك هنا..."
              className="w-full min-h-[120px] p-4 text-lg border-none outline-none resize-none bg-transparent"
            />
            <button className="mb-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:from-blue-700 hover:to-purple-700 transition transform hover:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>

        {/* منطقة الردود (عرض تجريبي) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 border-r-4 border-blue-500 shadow-sm">
            <h3 className="font-bold text-blue-600 mb-2">الخبير المبرمج</h3>
            <p className="text-gray-700 text-sm">يمكنك استخدام JavaScript لبناء التطبيقات...</p>
          </div>
          <div className="bg-white rounded-xl p-4 border-r-4 border-green-500 shadow-sm">
            <h3 className="font-bold text-green-600 mb-2">مصمم الواجهات</h3>
            <p className="text-gray-700 text-sm">استخدم ألوانًا متناسقة وزخارف بسيطة...</p>
          </div>
          <div className="bg-white rounded-xl p-4 border-r-4 border-orange-500 shadow-sm">
            <h3 className="font-bold text-orange-600 mb-2">المحلل الاستراتيجي</h3>
            <p className="text-gray-700 text-sm">التحليل يبدأ بفهم المشكلة من جذورها...</p>
          </div>
        </div>

        <footer className="text-center text-gray-500 text-xs mt-8">
          © {new Date().getFullYear()} — فريق الخبراء الاصطناعي
        </footer>
      </div>
    </div>
  );
}
