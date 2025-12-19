// /app/api/ask-experts/route.js
import { expertModels } from '@/lib/models';

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

if (!HUGGINGFACE_API_KEY) {
  throw new Error('HUGGINGFACE_API_KEY is required in .env');
}

export async function POST(request) {
  try {
    const { question } = await request.json();

    if (!question || typeof question !== 'string') {
      return Response.json({ error: 'السؤال مطلوب' }, { status: 400 });
    }

    const promises = expertModels.map(async (model) => {
      try {
        const prompt = [
          { role: 'system', content: model.systemPrompt },
          { role: 'user', content: question }
        ];

        const response = await fetch(model.endpoint, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            inputs: prompt,
            parameters: {
              max_new_tokens: 1024,
              temperature: 0.6,
              return_full_text: false
            }
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`فشل: ${response.status}`);
        }

        const result = await response.json();
        let answer = '';

        if (Array.isArray(result)) {
          answer = result[0]?.generated_text || '';
        } else if (typeof result === 'object' && result.generated_text) {
          answer = result.generated_text;
        } else if (typeof result === 'string') {
          answer = result;
        }

        answer = answer.replace(/^.*?<\|im_end\|>/, '').trim();

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
    console.error('Error in ask-experts:', error);
    return Response.json({ error: 'فشل الخادم' }, { status: 500 });
  }
      }
