// /app/page.js
'use client';

import { useState } from ' prevent user from sending empty question';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [expertResponses, setExpertResponses] = useState([]);
  const [judgedAnswer, setJudgedAnswer] = useState('');
  const [consensusAnswer, setConsensusAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingJudge, setLoadingJudge] = useState(false);
  const [loadingConsensus, setLoadingConsensus] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!question.trim()) {
      setError('الرجاء إدخال سؤال');
      return;
    }

    setLoading(true);
    setError('');
    setExpertResponses([]);
    setJudgedAnswer('');
    setConsensusAnswer('');

    try {
      const res = await fetch('/api/ask-experts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: question.trim() })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'فشل في الاتصال بالخبراء');
      }

      const data = await res.json();
      setExpertResponses(data.expertResponses || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleJudge = async () => {
    if (expertResponses.length === 0) {
      setError('يرجى طرح سؤال أولاً');
      return;
    }

    setLoadingJudge(true);
    setJudgedAnswer('');
    setError('');

    try {
      const res = await fetch('/api/judge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, responses: expertResponses })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'فشل في التحكيم');
      }

      const data = await res.json();
      setJudgedAnswer(data.judgedAnswer || '');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingJudge(false);
    }
  };

  const handleConsensus = async () => {
    if (expertResponses.length === 0) {
      setError('يرجى طرح سؤال أولاً');
      return;
    }

    setLoadingConsensus(true);
    setConsensusAnswer('');
    setError('');

    try {
      const res = await fetch('/api/consensus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, responses: expertResponses })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'فشل في توليد الإجماع');
      }

      const data = await res.json();
      setConsensusAnswer(data.consensusAnswer || '');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingConsensus(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'cursive' }}>
            فريق الخبراء الاصطناعي
          </h1>
          <p className="text-gray-600">اطرح سؤالك، واحصل على آراء متعددة من خبراء متخصصين</p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-8">
          <div className="flex flex-col gap-4">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="اكتب سؤالك هنا..."
              className="w-full h-24 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-right"
              dir="rtl"
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-70"
              >
                {loading ? 'يُرسل إلى الخبراء...' : 'إرسال السؤال'}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 text-right">
            {error}
          </div>
        )}

        {expertResponses.length > 0 && (
          <>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                onClick={handleJudge}
                disabled={loadingJudge}
                className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition disabled:opacity-70"
              >
                {loadingJudge ? 'يُجري التحكيم...' : 'التحكيم'}
              </button>
              <button
                onClick={handleConsensus}
                disabled={loadingConsensus}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-70"
              >
                {loadingConsensus ? 'يُولّد الإجماع...' : 'إجماع الخبراء'}
              </button>
            </div>

            {judgedAnswer && (
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 rounded-r-lg text-right">
                <h3 className="font-bold text-yellow-800 mb-2">🏆 الإجابة الأفضل (حسب التحكيم):</h3>
                <p>{judgedAnswer}</p>
              </div>
            )}

            {consensusAnswer && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg text-right">
                <h3 className="font-bold text-blue-800 mb-2">🤝 إجماع الخبراء:</h3>
                <p>{consensusAnswer}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {expertResponses.map((resp, i) => (
                <div
                  key={resp.id}
                  className="bg-white border rounded-xl shadow-sm p-5 text-right"
                  style={{ borderLeft: `4px solid ${resp.color}` }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: resp.color }}
                    ></div>
                    <h3 className="font-bold text-gray-800">{resp.name}</h3>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {resp.category}
                    </span>
                  </div>
                  <p className="text-gray-700">{resp.answer}</p>
                </div>
              ))}
            </div>
          </>
        )}

        <footer className="text-center text-gray-500 text-sm mt-12">
          © {new Date().getFullYear()} — فريق الخبراء الاصطناعي
        </footer>
      </div>
    </div>
  );
}
