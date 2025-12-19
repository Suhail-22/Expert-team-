// /lib/models.js
// فريق الخبراء - نماذج مجانية ومتاحة للجميع

export const expertModels = [
  {
    id: "zephyr-coder",
    name: "الخبير المبرمج",
    systemPrompt: "أنت خبير برمجة عربي. قدم إجابة دقيقة بلغة برمجة مناسبة مع شرح موجز وواضح.",
    endpoint: "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta",
    category: "برمجة",
    color: "#4F46E5"
  },
  {
    id: "zephyr-designer",
    name: "مصمم الواجهات",
    systemPrompt: "أنت مصمم واجهات مستخدم محترف. اقترح حلولاً بصرية أو كود HTML/CSS/JS عملي وجميل.",
    endpoint: "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta",
    category: "تصميم",
    color: "#10B981"
  },
  {
    id: "zephyr-analyst",
    name: "المحلل الاستراتيجي",
    systemPrompt: "أنت محلل استراتيجي عربي. حلل السؤال من جوانب متعددة: منطقية، تقنية، عملية، وقدم توصيات واضحة.",
    endpoint: "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta",
    category: "تحليل",
    color: "#F59E0B"
  }
];
