// /lib/models.js
// فريق الخبراء - باستخدام نموذج مجاني مضمون

export const expertModels = [
  {
    id: "llama-coder",
    name: "الخبير المبرمج",
    systemPrompt: "أنت خبير برمجة عربي. قدم إجابة دقيقة بلغة برمجة مناسبة مع شرح موجز وواضح.",
    endpoint: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-1B-Instruct",
    category: "برمجة",
    color: "#4F46E5"
  },
  {
    id: "llama-designer",
    name: "مصمم الواجهات",
    systemPrompt: "أنت مصمم واجهات مستخدم محترف. اقترح حلولاً بصرية أو كود HTML/CSS/JS عملي وجميل.",
    endpoint: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-1B-Instruct",
    category: "تصميم",
    color: "#10B981"
  },
  {
    id: "llama-analyst",
    name: "المحلل الاستراتيجي",
    systemPrompt: "أنت محلل استراتيجي عربي. حلل السؤال من جوانب متعددة: منطقية، تقنية، عملية، وقدم توصيات واضحة.",
    endpoint: "https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-1B-Instruct",
    category: "تحليل",
    color: "#F59E0B"
  }
];
