import { NextResponse } from "next/server";
import { PORTFOLIO_KNOWLEDGE_BASE } from "@/components/knowledgeBase";

const MAX_MESSAGE_LENGTH = 500;
const MAX_MESSAGES = 20;

function sanitizeInput(text: unknown): string {
  if (typeof text !== "string") return "";
  return text
    .replace(/<[^>]*>/g, "")
    .replace(/[^\w\s@.,!?'"\-:;/()]/g, "")
    .trim()
    .slice(0, MAX_MESSAGE_LENGTH);
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    if (messages.length > MAX_MESSAGES) {
      return NextResponse.json({ error: "Too many messages" }, { status: 400 });
    }

    const sanitizedMessages = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "user" ? "user" : "assistant",
      content: sanitizeInput(m.content),
    })).filter((m: { content: string }) => m.content.length > 0);

    if (sanitizedMessages.length === 0) {
      return NextResponse.json({ error: "Empty message" }, { status: 400 });
    }

    const groqApiKey = process.env.GROQ_API_KEY;

    if (!groqApiKey) {
      return NextResponse.json({ error: "Groq API key not configured" }, { status: 503 });
    }

    const systemPrompt = PORTFOLIO_KNOWLEDGE_BASE;

    const apiResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${groqApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          ...sanitizedMessages
        ],
        temperature: 0.3,
        max_tokens: 300
      })
    });

    if (!apiResponse.ok) {
      const errText = await apiResponse.text();
      console.error("Groq API Error:", errText);
      return NextResponse.json({ error: "Groq API error" }, { status: 502 });
    }

    const data = await apiResponse.json();
    const reply = data.choices?.[0]?.message?.content || "I am Ahmed's AI Assistant. How can I help you explore his backend experience?";

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    console.error("API Route Exception:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
