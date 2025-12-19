// /app/api/ask-experts/route.js
import { expertModels } from '@/lib/models';

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

if (!HUGGINGFACE_API_KEY) {
  throw new Error('HUGGINGFACE_API_KEY is required');
}

export async function POST(request) {
  try {
    const { question } = await request.json();
    if (!question?.trim()) {
      return Response.json({ error: 'السؤال مطلوب' }, { status: 400 });
    }

    const promises = expertModels.map(async (model) => {
      try {
        const payload = {
          inputs: [
            { role: 'system', content: model.systemPrompt },
            { role: 'user', content: question.trim() }
          ],
          parameters: {
            max_new_tokens: 800,
            temperature: 0.6,
            return_full_text: false
          }
        };

        const res = await fetch(model.endpoint.trim(), {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error('API Error:', errorText);
          throw new Error('فشل في الاتصال بالنموذج');
        }

        const data = await res.json();
        let answer = '';

        if (Array.isArray(data) && data[0]?.generated_text) {
          answer = data[0].generated_text;
        } else if (typeof data === 'object' && data.generated_text) {
          answer = data.generated_text;
        }

        answer = answer.trim();

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
    console.error('Server error:', error);
    return Response.json({ error: 'فشل في معالجة الطلب' }, { status: 500 });
  }
}
