// /app/api/ask-experts/route.js
export async function POST(request) {
  // مؤقتًا: لا نستخدم أي نموذج — الواجهة للعرض فقط
  return Response.json({
    expertResponses: [
      {
        id: "coder",
        name: "الخبير المبرمج",
        category: "برمجة",
        color: "#4F46E5",
        answer: "تم تفعيل الوضع العرضي. لرؤية التطبيق الكامل، سيتم ربطه بالنماذج لاحقًا."
      },
      {
        id: "designer",
        name: "مصمم الواجهات",
        category: "تصميم",
        color: "#10B981",
        answer: "التصميم جاهز! سنضيف الذكاء الاصطناعي بمجرد الموافقة على الشكل."
      },
      {
        id: "analyst",
        name: "المحلل الاستراتيجي",
        category: "تحليل",
        color: "#F59E0B",
        answer: "التحليل سيكون متاحًا في الخطوة التالية بعد التأكيد على الواجهة."
      }
    ]
  }, { status: 200 });
}
