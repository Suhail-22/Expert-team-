// /app/api/consensus/route.js
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
const CONSENSUS_MODEL = "https://api-inference.huggingface.co/models/Qwen/Qwen-1.5-7B-Chat";

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
      .map((r) => `من منظور ${r.category} (${r.name}): ${r.answer}`)
      .join('\n\n');

    const consensusPrompt = `السؤال: "${question}"

الآراء من خبراء متخصصين:
${answersText}

مهمتك: دمج هذه الآراء في إجابة واحدة متكاملة، منظمة، وخالية من التكرار.
اجعل الإجابة شاملة، واضحة، وتستفيد من تخصص كل خبير.
لا تكرر نفس الفكرة مرتين. ركّز على الجوهر.`;

    const response = await fetch(CONSENSUS_MODEL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: [{ role: 'user', content: consensusPrompt }],
        parameters: { max_new_tokens: 1200, temperature: 0.5 }
      })
    });

    if (!response.ok) {
      throw new Error('فشل في توليد الإجماع');
    }

    const result = await response.json();
    let consensusAnswer = Array.isArray(result) ? result[0]?.generated_text : result.generated_text;

    return Response.json({ consensusAnswer: consensusAnswer || 'تعذر توليد الإجماع.' }, { status: 200 });
  } catch (error) {
    console.error('Consensus error:', error);
    return Response.json({ error: 'فشل في توليد الإجماع' }, { status: 500 });
  }
}
