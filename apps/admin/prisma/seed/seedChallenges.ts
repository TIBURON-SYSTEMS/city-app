import prisma from '../db';

export async function seedChallenges() {

  const brands = {
    sony: await prisma.brand.findFirst({ where: { name: 'Sony' } }),
    pepsi: await prisma.brand.findFirst({ where: { name: 'PepsiCo' } }),
    doritos: await prisma.brand.findFirst({ where: { name: 'Doritos' } }),
    oreos: await prisma.brand.findFirst({ where: { name: 'Oreos' } }),
    sweetCookie: await prisma.brand.findFirst({ where: { name: 'Sweet-Cookie' } }),
    cocaCola: await prisma.brand.findFirst({ where: { name: 'Coca-Cola' } }),
    mcDonalds: await prisma.brand.findFirst({ where: { name: "McDonald's" } }),
  };

  for (const [key, brand] of Object.entries(brands)) {
    if (!brand) throw new Error(`Brand not found: ${key}`);
  }

  await prisma.challenge.createMany({
    data: [
      {
        label: 'PlayStation Eco Gaming',
        status: 'published',
        goal: 20,
        brandId: brands.sony!.id,
        description: "Recycle 20 PlayStation game cases...",
        reward: [
          "PlayStation 5 game",
          "PlayStation Store credit €80",
          "Limited edition controller",
        ],
        product: 'PlayStation game case',
        amount: 14,
      },
      {
        label: "Pepsi Can challenge",
        status: "published",
        goal: 100,
        brandId: brands.pepsi!.id,
        description: "Recycle 100 Pepsi cans to unlock incredible rewards...",
        reward: ["A dream jet", "Pepsi tshirt"],
        product: "Pepsi can",
        amount: 45,
      },
      {
        label: "Doritos challenge",
        status: "published",
        goal: 60,
        brandId: brands.doritos!.id,
        description: "Help us recycle 60 Doritos bags while enjoying your favorite snacks...",
        reward: ["Giant tacos"],
        product: "Doritos bag",
        amount: 30,
      },
    ],
  });

  console.log('Challenges seeded');
}
