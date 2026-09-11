import { NextResponse } from "next/server";

interface Lead {
  id: number;
  name: string;
  email: string;
  company: string | null;
  message: string;
  budget: number | null;
  category: string;
  score: number;
  priority: string;
  nextAction: string;
  createdAt: string;
}

const leads: Lead[] = [];
let nextId = 1;

function qualifyLead(message: string, budget: number | null) {
  const msg = message.toLowerCase();

  if (["urgent", "asap", "now", "immediately"].some((w) => msg.includes(w))) {
    return { category: "hot", score: 0.95, priority: "P1", nextAction: "Schedule immediate call" };
  }
  if (["enterprise", "company", "business", "team"].some((w) => msg.includes(w))) {
    return { category: "qualified", score: 0.85, priority: "P1", nextAction: "Send enterprise proposal" };
  }
  if (budget && budget > 5000) {
    return { category: "qualified", score: 0.8, priority: "P2", nextAction: "Follow up within 24h" };
  }
  if (["price", "cost", "how much", "pricing"].some((w) => msg.includes(w))) {
    return { category: "nurturing", score: 0.55, priority: "P3", nextAction: "Send pricing brochure" };
  }
  return { category: "new", score: 0.4, priority: "P4", nextAction: "Add to email sequence" };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, message, budget } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "name, email, and message are required" }, { status: 400 });
    }

    const qualification = qualifyLead(message, budget || null);

    const lead: Lead = {
      id: nextId++,
      name,
      email,
      company: company || null,
      message,
      budget: budget || null,
      category: qualification.category,
      score: qualification.score,
      priority: qualification.priority,
      nextAction: qualification.nextAction,
      createdAt: new Date().toISOString(),
    };

    leads.push(lead);

    return NextResponse.json(lead, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json(leads);
}
