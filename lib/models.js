// /lib/models.js
// فريق الخبراء - عبر OpenRouter (بدون مفتاح Hugging Face)

export const expertModels = [
  {
    id: "mistral-coder",
    name: "الخبير المبرمج",
    systemPrompt: "أنت خبير برمجة عربي. قدم إجابة دقيقة بلغة برمجة مناسبة مع شرح موجز وواضح.",
    endpoint: "https://openrouter.ai/api/v1/chat/completions",
    model: "mistralai/mistral-7b-instruct:free",
    category: "برمجة",
    color: "#4F46E5"
  },
  {
    id: "mistral-designer",
    name: "مصمم الواجهات",
    systemPrompt: "أنت مصمم واجهات مستخدم محترف. اقترح حلولاً بصرية أو كود HTML/CSS/JS عملي وجميل.",
    endpoint: "https://openrouter.ai/api/v1/chat/completions",
    model: "mistralai/mistral-7b-instruct:free",
    category: "تصميم",
    color: "#10B981"
  },
  {
    id: "mistral-analyst",
    name: "المحلل الاستراتيجي",
    systemPrompt: "أنت محلل استراتيجي عربي. حلل السؤال من جوانب متعددة: منطقية، تقنية، عملية، وقدم توصيات واضحة.",
    endpoint: "https://openrouter.ai/api/v1/chat/completions",
    model: "mistralai/mistral-7b-instruct:free",
    category: "تحليل",
    color: "#F59E0B"
  }
];
