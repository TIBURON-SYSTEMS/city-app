import { BrandStatus, UserRole } from "@/generated/prisma";
import prisma from "./db";

async function main() {
  //CREATE PARTICIPANT
  const userParticipant = await prisma.user.create({
    data: {
      email: "arnaud.obri@gmail.com",
      role: UserRole.PARTICIPANT,
    },
  });
  console.log({ userParticipant });
  const participant = await prisma.participant.create({
    data: {
      userId: userParticipant.id,
    },
  });
  console.log({ participant });

  // CREATE BRANDS
  const userBrand = await prisma.user.create({
    data: {
      email: "brand@brand.com",
      role: UserRole.BRAND,
    },
  });
  console.log({ userBrand });
  const userBrand2 = await prisma.user.create({
    data: {
      email: "brand2@brand.com",
      role: UserRole.BRAND,
    },
  });
  console.log({ userBrand2 });

  const brand = await prisma.brand.create({
    data: {
      name: "Demo Brand",
      description: "Description of the brand",
      logoUrl:
        "https://static.tildacdn.net/tild6231-3164-4435-b331-396333613165/LOGO_BLACK.png",
      userId: userBrand.id,
      status: BrandStatus.ACTIVE,
    },
  });
  console.log({ brand });

  const brand2 = await prisma.brand.create({
    data: {
      name: "Demo Brand2",
      description: "Description of the brand",
      logoUrl:
        "https://static.tildacdn.net/tild6231-3164-4435-b331-396333613165/LOGO_BLACK.png",
      userId: userBrand2.id,
      status: BrandStatus.ACTIVE,
    },
  });
  console.log({ brand2 });

  // CREATE PRODUCTS

  const plasticBottle = await prisma.product.create({
    data: {
      label: "plastic bottle",
      material: "plastic",
      brandId: brand.id,
    },
  });
  console.log(plasticBottle);

  const plasticBottle2 = await prisma.product.create({
    data: {
      label: "plastic bottle2",
      material: "plastic",
      brandId: brand2.id,
    },
  });
  console.log(plasticBottle2);

  const can = await prisma.product.create({
    data: {
      label: "aluminium can",
      material: "aluminium",
      brandId: brand.id,
    },
  });
  console.log(can);

  const paper = await prisma.product.create({
    data: {
      label: "a4 paper",
      material: "paper",
      brandId: brand.id,
    },
  });
  console.log(paper);

  const newspaper = await prisma.product.create({
    data: {
      label: "newspaper",
      material: "paper",
      brandId: brand.id,
    },
  });
  console.log(newspaper);

  // CREATE CHALLENGES

  const challenge1 = await prisma.challenge.create({
    data: {
      label: "Plastic Bottle Blitz",
      status: "active",
      endDate: new Date("2025-08-31T23:59:59"),
      goal: 30,
      description:
        "Recycle plastic bottles to earn rewards. Hit 30 bottles and win a 1000 reward points!",
      brandId: brand.id,
    },
  });
  console.log({ challenge1 });

  const challenge12 = await prisma.challenge.create({
    data: {
      label: "Plastic Bottle Blitz2",
      status: "active",
      endDate: new Date("2025-08-31T23:59:59"),
      goal: 30,
      description:
        "Recycle plastic bottles to earn rewards. Hit 30 bottles and win a 1000 reward points!",
      brandId: brand2.id,
    },
  });
  console.log({ challenge12 });

  const challenge2 = await prisma.challenge.create({
    data: {
      label: "Can Crusher Challenge",
      status: "active",
      endDate: new Date("2025-09-15T23:59:59"),
      goal: 50,
      description:
        "Collect and recycle aluminum cans Reach 50 and get 400 reward points!!",
      brandId: brand.id,
    },
  });
  console.log({ challenge2 });

  const challenge3 = await prisma.challenge.create({
    data: {
      label: "Paper Purge",
      status: "inactive",
      endDate: new Date("2025-10-01T23:59:59"),
      goal: 100,
      description:
        "Recycle used paper sheets and earn 1 point per sheet. Reach 100 and receive a plantable notebook!",
      brandId: brand.id,
    },
  });
  console.log({ challenge3 });

  const challenge4 = await prisma.challenge.create({
    data: {
      label: "Paper Purge",
      status: "active",
      endDate: new Date("2025-10-01T23:59:59"),
      goal: 100,
      description:
        "Recycle used paper sheets and earn 1 point per sheet. Reach 100 and receive a plantable notebook!",
      brandId: brand.id,
    },
  });
  console.log({ challenge4 });

  await prisma.challengeProduct.createMany({
    data: [
      {
        challengeId: challenge1.id,
        productId: plasticBottle.id,
      },
      {
        challengeId: challenge2.id,
        productId: can.id,
      },
      {
        challengeId: challenge3.id,
        productId: paper.id,
      },
      {
        challengeId: challenge4.id,
        productId: newspaper.id,
      },
      {
        challengeId: challenge12.id,
        productId: plasticBottle2.id,
      },
    ],
  });
  //add reward
  await prisma.reward.createMany({
    data: [
      // Rewards for Challenge 1
      {
        label: "tshirt",
        amount: 1,
        challengeId: challenge1.id,
        imageUrl:
          "https://static.vecteezy.com/system/resources/previews/012/628/220/original/plain-black-t-shirt-on-transparent-background-free-png.png",
      },
      {
        label: "tshirt2",
        amount: 1,
        challengeId: challenge12.id,
        imageUrl:
          "https://static.vecteezy.com/system/resources/previews/012/628/220/original/plain-black-t-shirt-on-transparent-background-free-png.png",
      },
      {
        label: "Eco-friendly Water Bottle",
        amount: 1,
        challengeId: challenge1.id,
        imageUrl:
          "https://themerchlist.com/wp-content/uploads/2023/04/eco-friendly-glass-bottle-with.png",
      },
      // Rewards for Challenge 2
      {
        label: "Reward Points",
        amount: 400,
        challengeId: challenge2.id,
        imageUrl:
          "https://as2.ftcdn.net/v2/jpg/03/57/60/25/1000_F_357602510_azcWAt9QPy0zl1OglD1sWMYNrG3WUQIv.jpg",
      },
      {
        label: "15% Off Next Purchase",
        amount: 1,
        challengeId: challenge2.id,
        imageUrl:
          "https://c8.alamy.com/comp/EMC80G/special-discount-15-off-stamp-EMC80G.jpg",
      },
      // Rewards for Challenge 3
      {
        label: "Plantable Notebook",
        amount: 1,
        challengeId: challenge3.id,
        imageUrl:
          "https://trashbackwards.com/wp-content/uploads/2021/12/1-Plantable-Notebook.png",
      },
      {
        label: "Bonus Points",
        amount: 50,
        challengeId: challenge3.id,
        imageUrl:
          "https://img.freepik.com/premium-vector/bonus-point-editable-text-effect-font_87783-238.jpg?w=2000",
      },
      {
        label: "free newspaper",
        amount: 1,
        challengeId: challenge4.id,
        imageUrl:
          "https://cdn.britannica.com/25/93825-050-D1300547/collection-newspapers.jpg",
      },
    ],
  });

  //add partiticipation
  await prisma.participation.createMany({
    data: [
      { challengeId: challenge1.id, participantId: participant.id, amount: 10 },
      { challengeId: challenge2.id, participantId: participant.id, amount: 30 },
      { challengeId: challenge12.id, participantId: participant.id, amount: 2 },
    ],
  });

  // CREATE BINS

  const bins = await prisma.bin.createMany({
    data: [
      {
        label: "Contenidor 1",
        type: "yellow",
        latitude: 41.3865,
        longitude: 2.1732,
      },
      {
        label: "Contenidor 2",
        type: "paper",
        latitude: 41.3859,
        longitude: 2.1748,
      },
      {
        label: "Contenidor 3",
        type: "glass",
        latitude: 41.3871,
        longitude: 2.172,
      },
      {
        label: "Contenidor 4",
        type: "rest",
        latitude: 41.3843,
        longitude: 2.1755,
      },
      {
        label: "Contenidor 5",
        type: "rest",
        latitude: 41.385,
        longitude: 2.1764,
      },
      {
        label: "Contenidor 6",
        type: "paper",
        latitude: 41.3862,
        longitude: 2.1791,
      },
      {
        label: "Contenidor 7",
        type: "rest",
        latitude: 41.3837,
        longitude: 2.1746,
      },
      {
        label: "Contenidor 8",
        type: "glass",
        latitude: 41.3875,
        longitude: 2.1713,
      },
      {
        label: "Contenidor 9",
        type: "rest",
        latitude: 41.3849,
        longitude: 2.1788,
      },
      {
        label: "Contenidor 10",
        type: "paper",
        latitude: 41.3868,
        longitude: 2.1699,
      },
      {
        label: "Contenidor 11",
        type: "glass",
        latitude: 41.3841,
        longitude: 2.1723,
      },
      {
        label: "Contenidor 12",
        type: "rest",
        latitude: 41.3872,
        longitude: 2.1767,
      },
      {
        label: "Contenidor 13",
        type: "glass",
        latitude: 41.3835,
        longitude: 2.178,
      },
      {
        label: "Contenidor 14",
        type: "paper",
        latitude: 41.3857,
        longitude: 2.1706,
      },
      {
        label: "Contenidor 15",
        type: "rest",
        latitude: 41.387,
        longitude: 2.1743,
      },
      {
        label: "Contenidor 16",
        type: "glass",
        latitude: 41.3845,
        longitude: 2.1718,
      },
      {
        label: "Contenidor 17",
        type: "rest",
        latitude: 41.386,
        longitude: 2.1782,
      },
      {
        label: "Contenidor 18",
        type: "paper",
        latitude: 41.3839,
        longitude: 2.1761,
      },
      {
        label: "Contenidor 19",
        type: "rest",
        latitude: 41.3854,
        longitude: 2.1729,
      },
      {
        label: "Contenidor 20",
        type: "glass",
        latitude: 41.3873,
        longitude: 2.1695,
      },
    ],
  });
  console.log(bins);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
