export type ProjectId = "margin" | "intel" | "startfrom" | "cangkul";
export type Project = {
  id: ProjectId;
  name: string;
  category: string;
  status: string;
  intro: string;
  problem: string;
  decisions: string[];
  proof: string;
  href?: string;
  color: string;
};

export const projects: Project[] = [
  {
    id: "margin",
    name: "Margin Studio",
    category: "Commercial thinking",
    status: "Interactive demo",
    color: "mint",
    intro: "A clearer way to make the next pricing decision.",
    problem:
      "A selling price is only useful when you understand the margin, the tax, and what changes when you negotiate.",
    decisions: [
      "Separate margin from markup.",
      "Keep a reference scenario visible while adjusting a new one.",
      "Make tax an explicit choice and show how the final price adds up.",
    ],
    proof:
      "Try the working pricing lab below. It starts empty, uses your own example numbers, and keeps calculations in your browser.",
  },
  {
    id: "intel",
    name: "AE Intel",
    category: "Sales & AI workflow",
    status: "Workflow concept",
    color: "violet",
    intro: "Turn scattered account context into a useful next conversation.",
    problem:
      "Account research, contact updates, and follow-ups lose value when they never lead to a clear next action.",
    decisions: [
      "Keep verified facts separate from assumptions.",
      "Use the contact’s response to choose the next question.",
      "Move from account research to discovery with a clear purpose.",
    ],
    proof:
      "This is a personal working method. The scenario shown here is an illustrative example, with no customer data.",
  },
  {
    id: "startfrom",
    name: "StartFrom",
    category: "Independent product",
    status: "Live product",
    color: "blue",
    intro: "Make a long-term goal useful today.",
    problem:
      "A financial target can feel distant. The product explores how to turn that target into a practical daily roadmap.",
    decisions: [
      "Design around the next action.",
      "Support an installable, offline-capable experience.",
      "Use a local-first approach to keep the product simple to operate.",
    ],
    proof:
      "An independently built web app. Open the live product to explore the experience.",
    href: "https://startfrom.my.id",
  },
  {
    id: "cangkul",
    name: "CangkulYuk!",
    category: "Independent product",
    status: "Live product",
    color: "peach",
    intro: "A familiar card game. A lot happening under the table.",
    problem:
      "A multiplayer game has to stay understandable even when people join, reconnect, or leave.",
    decisions: [
      "Keep game rules separate from the interface.",
      "Handle multiplayer presence and reconnection.",
      "Explore bots and host migration as part of the playing experience.",
    ],
    proof:
      "An Indonesian card game built with real-time multiplayer. Open the live game to play.",
    href: "https://cangkulyuk.my.id",
  },
];

export const career = [
  {
    year: "2026 — now",
    role: "Account Executive",
    company: "Datalabs",
    detail:
      "Enterprise conversations around cloud, AI, data, and business outcomes.",
  },
  {
    year: "2026",
    role: "Curriculum & AI Transformation",
    company: "Aman Jaya",
    detail:
      "Digital concepts for curriculum control, RPS consistency, dashboards, and AI for Work.",
  },
  {
    year: "2024 — 2026",
    role: "Business Development",
    company: "PT. Berkah Niaga Globalindo",
    detail:
      "B2B negotiation, procurement, consulting relationships, and team coordination.",
  },
  {
    year: "2021 — 2022",
    role: "Business Representative — IT Solutions",
    company: "PT. Berca Hardayaperkasa",
    detail:
      "Enterprise IT sales, account management, tenders, and 100% annual quota achievement.",
  },
];
