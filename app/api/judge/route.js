// /app/api/judge/route.js
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
const JUDGE_MODEL = "https://api-inference.huggingface.co/models/Qwen/Qwen-1.5-7B-Chat";

if (!HUGGINGFACE_API_KEY) {
  throw new Error('HUGGINGFACE_API_KEY is required in .env');
}

export async function POST(request) {
  try {
    const { question, responses } = await request.json();

    if (!question || !Array.isArray(responses) || responses.length === 0) {
      return Response.json({ error: 'البيانات غير كاملة' }, { status: 400 });
    }

    const answersText = responses
      .map((r, i) => `خبير ${i + 1} (${r.name}): ${r.answer}`)
      .join('\n\n');

    const judgePrompt = `السؤال الأصلي: "${question}"

الإجابات المقدمة:
${answersText}

مهمتك: قراءة هذه الإجابات وتحليلها، ثم اختيار واحدة فقط كأفضل إجابة من حيث الدقة، العمق، والفائدة.
اكتب إجابتك على الشكل التالي:

الإجابة الأفضل:
[ضع هنا النص الكامل للإجابة المختارة]

السبب:
[اكتب سبب اختيارك باختصار]`;

    const response = await fetch(JUDGE_MODEL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: [{ role: 'user', content: judgePrompt }],
        parameters: { max_new_tokens: 800, temperature: 0.3 }
      })
    });

    if (!response.ok) {
      throw new Error('فشل في الحصول على رأي التحكيم');
    }

    const result = await response.json();
    let judgedAnswer = Array.isArray(result) ? result[0]?.generated_text : result.generated_text;

    return Response.json({ judgedAnswer: judgedAnswer || 'تعذر إصدار حكم.' }, { status: 200 });
  } catch (error) {
    console.error('Judge error:', error);
    return Response.json({ error: 'فشل في التحكيم' }, { status: 500 });
  }
}
