// /lib/models.js
// فريق الخبراء - قابل للتوسّع بسهولة

export const expertModels = [
  {
    id: "qwen-coder",
    name: "الخبير المبرمج",
    systemPrompt: "أنت خبير برمجة عربي. قدم إجابة دقيقة بلغة برمجة مناسبة مع شرح موجز وواضح.",
    endpoint: "https://api-inference.huggingface.co/models/Qwen/Qwen-1.5-7B-Chat",
    category: "برمجة",
    color: "#4F46E5"
  },
  {
    id: "mistral-designer",
    name: "مصمم الواجهات",
    systemPrompt: "أنت مصمم واجهات مستخدم محترف. اقترح حلولاً بصرية أو كود HTML/CSS/JS عملي وجميل.",
    endpoint: "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3",
    category: "تصميم",
    color: "#10B981"
  },
  {
    id: "nous-analyst",
    name: "المحلل الاستراتيجي",
    systemPrompt: "أنت محلل استراتيجي عربي. حلل السؤال من جوانب متعددة: منطقية، تقنية، عملية، وقدم توصيات واضحة.",
    endpoint: "https://api-inference.huggingface.co/models/NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO",
    category: "تحليل",
    color: "#F59E0B"
  }
];
