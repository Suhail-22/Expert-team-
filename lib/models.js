// /lib/models.js
// فريق الخبراء - نموذج مجاني يعمل بدون أي مفتاح

export const expertModels = [
  {
    id: "phi-coder",
    name: "الخبير المبرمج",
    systemPrompt: "أنت خبير برمجة عربي. قدم إجابة دقيقة بلغة برمجة مناسبة مع شرح موجز.",
    endpoint: "https://api-inference.huggingface.co/models/microsoft/Phi-3-mini-4k-instruct",
    category: "برمجة",
    color: "#4F46E5"
  },
  {
    id: "phi-designer",
    name: "مصمم الواجهات",
    systemPrompt: "أنت مصمم واجهات محترف. اقترح حلولاً بصرية أو كود HTML/CSS عملي.",
    endpoint: "https://api-inference.huggingface.co/models/microsoft/Phi-3-mini-4k-instruct",
    category: "تصميم",
    color: "#10B981"
  },
  {
    id: "phi-analyst",
    name: "المحلل الاستراتيجي",
    systemPrompt: "أنت محلل عربي. حلل السؤال من جوانب منطقية وتقنية وقدم توصيات.",
    endpoint: "https://api-inference.huggingface.co/models/microsoft/Phi-3-mini-4k-instruct",
    category: "تحليل",
    color: "#F59E0B"
  }
];
