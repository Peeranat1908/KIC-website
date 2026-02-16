
import { GoogleGenAI } from "@google/genai";

export async function getInvestmentInsights(language: 'TH' | 'EN', portfolioSummary: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const prompt = language === 'TH' 
      ? `วิเคราะห์พอร์ตการลงทุนนี้และให้คำแนะนำสั้นๆ 3 ข้อ: ${portfolioSummary}`
      : `Analyze this investment portfolio and provide 3 brief recommendations: ${portfolioSummary}`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: language === 'TH' 
          ? "คุณเป็นผู้เชี่ยวชาญด้านการเงินของชมรม ให้คำแนะนำที่เป็นมืออาชีพและกระชับ"
          : "You are a professional club financial advisor. Provide professional and concise advice.",
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return language === 'TH' ? "ขออภัย ไม่สามารถดึงข้อมูลคำแนะนำได้ในขณะนี้" : "Sorry, insights are currently unavailable.";
  }
}
