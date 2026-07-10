import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ACHIEVEMENTS = [
  { slug: "first-visit", title: "Primeira Visita", description: "Explorou sua primeira obra de arte", icon: "🎨", category: "EXPLORATION" as const, points: 10, criteria: {} },
  { slug: "voice-explorer", title: "Explorador de Voz", description: "Conversou com a IA por voz pela primeira vez", icon: "🎤", category: "EXPLORATION" as const, points: 15, criteria: {} },
  { slug: "libras-ally", title: "Aliado da Acessibilidade", description: "Ativou o modo LIBRAS", icon: "🤟", category: "ACCESSIBILITY" as const, points: 20, criteria: {} },
  { slug: "renaissance-master", title: "Mestre do Renascimento", description: "Explorou 3 obras do Renascimento", icon: "🏛️", category: "KNOWLEDGE" as const, points: 30, criteria: { movement: "Renascimento", count: 3 } },
  { slug: "picasso-expert", title: "Especialista em Picasso", description: "Explorou todas as obras de Picasso", icon: "🔷", category: "KNOWLEDGE" as const, points: 50, criteria: { artist: "pablo-picasso" } },
  { slug: "collector", title: "Colecionador", description: "Visitou 5 obras diferentes", icon: "🖼️", category: "EXPLORATION" as const, points: 40, criteria: { visits: 5 } },
  { slug: "connoisseur", title: "Conhecedor", description: "Visitou todas as 10 obras da galeria", icon: "👁️", category: "KNOWLEDGE" as const, points: 100, criteria: { visits: 10 } },
  { slug: "quiz-champion", title: "Campeão dos Quizzes", description: "Completou 5 quizzes com nota máxima", icon: "🏆", category: "KNOWLEDGE" as const, points: 75, criteria: { quizzes: 5, score: 100 } },
];

async function main() {
  console.log("Seeding achievements...");
  for (const achievement of ACHIEVEMENTS) {
    await prisma.achievement.upsert({
      where: { slug: achievement.slug },
      update: {},
      create: achievement,
    });
  }
  console.log(`✓ Created ${ACHIEVEMENTS.length} achievements`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
