// /app/page.js
'use client';

import { useState } from 'react';

export default function Home() {
  const [question, setQuestion] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* شريط الأعلى */}
        <div className="flex justify-between items-center mb-6">
          <h1 
            className="text-3xl font-bold text-gray-800"
            style={{ fontFamily: 'cursive' }}
          >
            فريق الخبراء الاصطناعي
          </h1>
          <button className="p-2 text-gray-600 hover:bg-gray-200 rounded-full transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1h.09a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </button>
        </div>

        {/* شريط الخبراء - مبسط وأنيق */}
        <div className="flex justify-center gap-6 mb-6">
          {[
            { color: 'bg-blue-500', label: 'برمجة', icon: '👨‍💻' },
            { color: 'bg-emerald-500', label: 'تصميم', icon: '🎨' },
            { color: 'bg-amber-500', label: 'تحليل', icon: '📊' }
          ].map((expert, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`w-12 h-12 ${expert.color} rounded-xl flex items-center justify-center shadow-md`}>
                <span className="text-white text-lg">{expert.icon}</span>
              </div>
              <span className="text-xs mt-1.5 text-gray-700 font-medium">{expert.label}</span>
            </div>
          ))}
        </div>

        {/* مربع الإدخال مع زر الإرسال على اليمين - محسّن للهاتف */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
          <div className="flex items-end p-3 gap-3">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="اكتب سؤالك هنا..."
              className="w-full min-h-[110px] p-3 text-base border-none outline-none resize-none bg-transparent placeholder:text-gray-500"
            />
            <button 
              className="mb-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-md hover:from-blue-700 hover:to-indigo-700 transition active:scale-95"
              aria-label="إرسال"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>

        {/* عرض تجريبي للردود - بتصميم نظيف */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 border-l-4 border-blue-500 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <h3 className="font-bold text-blue-700">الخبير المبرمج</h3>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              يمكنك استخدام JavaScript مع React لبناء واجهات تفاعلية بسهولة...
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border-l-4 border-emerald-500 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <h3 className="font-bold text-emerald-700">مصمم الواجهات</h3>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              استخدم نظام ألوان متناسق مع خطوط واضحة ومسافات بيضاء كافية...
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border-l-4 border-amber-500 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <h3 className="font-bold text-amber-700">المحلل الاستراتيجي</h3>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              ابدأ بتحليل المشكلة من جذورها، ثم ضع خطة تنفيذية مرنة...
            </p>
          </div>
        </div>

        <footer className="text-center text-gray-500 text-xs mt-10 pb-4">
          © {new Date().getFullYear()} — فريق الخبراء الاصطناعي
        </footer>
      </div>
    </div>
  );
}
