/**
 * Exports CV-relevant data from data.ts to cv-data.json
 * Run: node export-cv-data.js
 */
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src', 'components', 'data.ts');
let content = fs.readFileSync(dataPath, 'utf-8');

function extractArray(name) {
  const regex = new RegExp(`export const ${name}\\s*=\\s*(\\[\\s*[\\s\\S]*?\\]);`, 'm');
  const match = content.match(regex);
  if (!match) return [];
  let arrStr = match[1];
  // Remove icon references
  arrStr = arrStr.replace(/icon:\s*\w+,?\s*/g, '');
  // Convert JS object to JSON-compatible
  arrStr = arrStr.replace(/(\w+):/g, '"$1":');
  arrStr = arrStr.replace(/'/g, '"');
  arrStr = arrStr.replace(/,\s*}/g, '}');
  arrStr = arrStr.replace(/,\s*]/g, ']');
  try {
    return JSON.parse(arrStr);
  } catch (e) {
    console.error(`Failed to parse ${name}:`, e.message);
    return [];
  }
}

const projects = extractArray('projects');
const skillCategories = extractArray('skillCategories');
const certifications = extractArray('certifications');

const cvData = {
  personal: {
    name: "Ahmed Mohamed Abdelatif",
    title: "Python Backend Developer & AI Automation Specialist",
    email: "ahmeeedmohaaamed1@gmail.com",
    location: "Cairo, Egypt",
    github: "github.com/ahmed-abdelatif",
    linkedin: "linkedin.com/in/ahmed-mohamed-b69920435",
    website: "cv-tawny-two.vercel.app"
  },
  profile: "Ahmed Mohamed Abdelatif is an Egyptian Python Backend Developer & AI Automation Specialist based in Cairo. Currently pursuing B.Sc. in Computer Science at the Egyptian Chinese University (ECU) with expected graduation in 2029. Military service status is officially postponed for study.",
  experience: {
    title: "Backend Developer",
    company: "H2M — MAXP Online Platform",
    type: "Full-time | On-site | Cairo, Egypt | 3 Months",
    description: "Built and maintained backend tools and customer messaging workflows for MAXP Online:",
    highlights: [
      "Built product pricing and profitability calculation tools.",
      "Developed marketing campaign tracking and shipping analytics.",
      "Built customer performance analytics tools.",
      "Built WhatsApp workflows using webhooks and message templates.",
      "Implemented automated replies and customer conversation workflows.",
      "Worked on scheduled marketing campaigns and Meta WhatsApp Cloud API integrations."
    ]
  },
  projects: projects.map(p => ({
    title: p.title,
    description: p.description,
    bullets: p.whatIBuilt,
    tech: p.builtWith
  })),
  skills: skillCategories
    .filter(s => s.category !== "Languages")
    .map(s => ({
      category: s.category,
      items: s.skills.join(", ")
    })),
  languages: "Arabic (Native), English (Professional Working Proficiency)",
  education: {
    degree: "B.Sc. Computer Science",
    university: "Egyptian Chinese University (ECU) — Cairo, Egypt",
    details: "Expected Graduation: 2029 | Military Service: Postponed for Study"
  },
  certifications: certifications.map(c => ({
    name: c.name,
    issuer: c.issuer,
    date: c.date,
    credentialId: c.credentialId
  }))
};

const outputPath = path.join(__dirname, 'cv-data.json');
fs.writeFileSync(outputPath, JSON.stringify(cvData, null, 2));
console.log(`CV data exported to: ${outputPath}`);
