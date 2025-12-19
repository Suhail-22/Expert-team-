'use client';

import { useState } from 'react';

export default function HomePage() {
  const [question, setQuestion] = useState('');
  const [expertResponses, setExpertResponses] = useState([]);
  const [judgedAnswer, setJudgedAnswer] = useState('');
  const [consensusAnswer, setConsensusAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [judging, setJudging] = useState(false);
  const [consensing, setConsensing] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setExpertResponses([]);
    setJudgedAnswer('');
    setConsensusAnswer('');

    try {
      const res = await fetch('/api/ask-experts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: question.trim() })
      });

      const data = await res.json();
      if (res.ok) {
        setExpertResponses(data.expertResponses || []);
      } else {
        alert('خطأ: ' + (data.error || 'فشل في التواصل مع الخبراء'));
      }
    } catch (err) {
      alert('حدث خطأ أثناء الاتصال بالخوادم');
    } finally {
      setLoading(false);
    }
  };

  const handleJudge = async () => {
    if (expertResponses.length === 0) return;
    setJudging(true);
    setJudgedAnswer('');
    try {
      const res = await fetch('/api/judge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, responses: expertResponses })
      });
      const data = await res.json();
      if (res.ok) {
        setJudgedAnswer(data.judgedAnswer || 'لا توجد إجابة مُحكَمة.');
      } else {
        alert('فشل التحكيم: ' + (data.error || 'خطأ غير معروف'));
      }
    } catch (err) {
      alert('خطأ في التحكيم');
    } finally {
      setJudging(false);
    }
  };

  const handleConsensus = async () => {
    if (expertResponses.length === 0) return;
    setConsensing(true);
    setConsensusAnswer('');
    try {
      const res = await fetch('/api/consensus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, responses: expertResponses })
      });
      const data = await res.json();
      if (res.ok) {
        setConsensusAnswer(data.consensusAnswer || 'لا يوجد إجماع.');
      } else {
        alert('فشل الإجماع: ' + (data.error || 'خطأ غير معروف'));
      }
    } catch (err) {
      alert('خطأ في توليد الإجماع');
    } finally {
      setConsensing(false);
    }
  };

  return (
    <div dir="rtl" style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#1F2937', marginBottom: '20px' }}>
        فريق الخبراء الاصطناعي
      </h1>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="اكتب سؤالك هنا..."
          style={{
            flex: 1,
            padding: '12px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '1px solid #D1D5DB'
          }}
          onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
        />
        <button
          onClick={handleAsk}
          disabled={loading || !question.trim()}
          style={{
            padding: '12px 24px',
            backgroundColor: loading ? '#9CA3AF' : '#3B82F6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'ينتظر...' : 'إرسال'}
        </button>
      </div>

      {/* عرض إجابات الخبراء */}
      {expertResponses.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#111827', marginBottom: '15px' }}>آراء الخبراء:</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
            {expertResponses.map((resp, idx) => (
              <div
                key={resp.id}
                style={{
                  border: `2px solid ${resp.color}`,
                  borderRadius: '10px',
                  padding: '15px',
                  backgroundColor: '#F9FAFB'
                }}
              >
                <h3 style={{ color: resp.color, margin: '0 0 10px 0' }}>
                  {resp.name} <span style={{ fontSize: '14px', color: '#6B7280' }}>({resp.category})</span>
                </h3>
                <p style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{resp.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* أزرار التحكيم والإجماع */}
      {expertResponses.length > 0 && (
        <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
          <button
            onClick={handleJudge}
            disabled={judging}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: judging ? '#FBBF24' : '#F59E0B',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: judging ? 'not-allowed' : 'pointer'
            }}
          >
            {judging ? 'يُحكّم...' : 'التحكيم'}
          </button>
          <button
            onClick={handleConsensus}
            disabled={consensing}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: consensing ? '#10B981' : '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: consensing ? 'not-allowed' : 'pointer'
            }}
          >
            {consensing ? 'يجمع الآراء...' : 'إجماع الخبراء'}
          </button>
        </div>
      )}

      {/* عرض نتيجة التحكيم */}
      {judgedAnswer && (
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ color: '#DC2626', marginBottom: '10px' }}>الإجابة الأفضل (بعد التحكيم):</h2>
          <div style={{ padding: '15px', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px' }}>
            <p style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{judgedAnswer}</p>
          </div>
        </div>
      )}

      {/* عرض نتيجة الإجماع */}
      {consensusAnswer && (
        <div>
          <h2 style={{ color: '#059669', marginBottom: '10px' }}>إجماع الخبراء:</h2>
          <div style={{ padding: '15px', backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '8px' }}>
            <p style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{consensusAnswer}</p>
          </div>
        </div>
      )}
    </div>
  );
}
