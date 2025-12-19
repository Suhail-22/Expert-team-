// /app/api/ask-experts/route.js
import { expertModels } from '@/lib/models';

export async function POST(request) {
  try {
    const { question } = await request.json();
    if (!question?.trim()) {
      return Response.json({ error: 'السؤال مطلوب' }, { status: 400 });
    }

    const promises = expertModels.map(async (model) => {
      try {
        const res = await fetch(model.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
            // لا حاجة لمفتاح — Phi-3 يدعم الطلبات المفتوحة
          },
          body: JSON.stringify({
            inputs: [
              { role: 'system', content: model.systemPrompt },
              { role: 'user', content: question.trim() }
            ],
            parameters: {
              max_new_tokens: 800,
              temperature: 0.7,
              return_full_text: false
            }
          })
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`فشل: ${res.status}`);
        }

        const data = await res.json();
        let answer = '';
        if (Array.isArray(data)) {
          answer = data[0]?.generated_text || '';
        } else if (data.generated_text) {
          answer = data.generated_text;
        }
        answer = answer.replace(/.*?<\|im_end\|>/g, '').trim();

        return {
          id: model.id,
          name: model.name,
          category: model.category,
          color: model.color,
          answer: answer || 'لم يتمكن النموذج من الرد.'
        };
      } catch (err) {
        return {
          id: model.id,
          name: model.name,
          category: model.category,
          color: model.color,
          answer: `خطأ: ${err.message}`
        };
      }
    });

    const responses = await Promise.all(promises);
    return Response.json({ expertResponses: responses }, { status: 200 });
  } catch (error) {
    return Response.json({ error: 'فشل في معالجة الطلب' }, { status: 500 });
  }
}
