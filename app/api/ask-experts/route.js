// /app/api/ask-experts/route.js
import { expertModels } from '@/lib/models';

export async function POST(request) {
  try {
    const { question } = await request.json();

    if (!question || typeof question !== 'string') {
      return Response.json({ error: 'السؤال مطلوب' }, { status: 400 });
    }

    const promises = expertModels.map(async (model) => {
      try {
        const response = await fetch(model.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://your-app.vercel.app', // ضروري لـ OpenRouter
            'X-Title': 'Expert Team AI'
          },
          body: JSON.stringify({
            model: model.model,
            messages: [
              { role: 'system', content: model.systemPrompt },
              { role: 'user', content: question }
            ],
            max_tokens: 800
          })
        });

        if (!response.ok) {
          const error = await response.text();
          throw new Error(`فشل: ${response.status}`);
        }

        const data = await response.json();
        const answer = data.choices?.[0]?.message?.content?.trim() || 'لم يتمكن النموذج من الرد.';

        return {
          id: model.id,
          name: model.name,
          category: model.category,
          color: model.color,
          answer
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
    return Response.json({ error: 'فشل الخادم' }, { status: 500 });
  }
}
