import { seedBrandsWithUsers } from "./seed/seedBrands";
import { seedChallenges } from "./seed/seedChallenges";
import prisma from "./db";

async function main() {
  await seedBrandsWithUsers();
  await seedChallenges();
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });