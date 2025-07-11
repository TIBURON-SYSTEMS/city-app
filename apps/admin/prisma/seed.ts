import { BrandStatus, UserRole } from "@/generated/prisma";
import prisma from "./db";

async function main() {
  //CREATE PARTICIPANT
  const userParticipant = await prisma.user.create({
    data: {
      // email: "arnaud.obri@gmail.com",
      email: "footworkextreme@gmail.com",
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
      goal: 31,
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
      { challengeId: challenge1.id, participantId: participant.id, amount: 29 },
      { challengeId: challenge2.id, participantId: participant.id, amount: 30 },
      {
        challengeId: challenge12.id,
        participantId: participant.id,
        amount: 29,
      },
    ],
  });

  // CREATE BINS
  const bins = await prisma.bin.createMany({
    data: [
      {
        label: "Bin 1",
        type: "plastic",
        latitude: 41.376409,
        longitude: 2.152514,
      },
      {
        label: "Bin 2",
        type: "glass",
        latitude: 41.37553,
        longitude: 2.152359,
      },
      {
        label: "Bin 3",
        type: "paper",
        latitude: 41.375155,
        longitude: 2.152945,
      },
      {
        label: "Bin 4",
        type: "plastic",
        latitude: 41.376375,
        longitude: 2.153465,
      },
      {
        label: "Bin 5",
        type: "glass",
        latitude: 41.377166,
        longitude: 2.154405,
      },
      {
        label: "Bin 6",
        type: "aluminium",
        latitude: 41.377492,
        longitude: 2.155788,
      },
      {
        label: "Bin 7",
        type: "organic",
        latitude: 41.37806,
        longitude: 2.155042,
      },
      {
        label: "Bin 8",
        type: "paper",
        latitude: 41.378881,
        longitude: 2.156179,
      },
      {
        label: "Bin 9",
        type: "glass",
        latitude: 41.379405,
        longitude: 2.155493,
      },
      {
        label: "Bin 10",
        type: "plastic",
        latitude: 41.378464,
        longitude: 2.156747,
      },
      {
        label: "Bin 11",
        type: "organic",
        latitude: 41.379333,
        longitude: 2.157499,
      },
      {
        label: "Bin 12",
        type: "paper",
        latitude: 41.378818,
        longitude: 2.158381,
      },
      {
        label: "Bin 13",
        type: "aluminium",
        latitude: 41.380051,
        longitude: 2.156914,
      },
      {
        label: "Bin 14",
        type: "glass",
        latitude: 41.380145,
        longitude: 2.158949,
      },
      {
        label: "Bin 15",
        type: "plastic",
        latitude: 41.380577,
        longitude: 2.158397,
      },
      {
        label: "Bin 16",
        type: "paper",
        latitude: 41.380913,
        longitude: 2.159509,
      },
      {
        label: "Bin 17",
        type: "glass",
        latitude: 41.382678,
        longitude: 2.160253,
      },
      {
        label: "Bin 18",
        type: "organic",
        latitude: 41.382449,
        longitude: 2.161598,
      },
      {
        label: "Bin 19",
        type: "aluminium",
        latitude: 41.382562,
        longitude: 2.162457,
      },
      {
        label: "Bin 20",
        type: "plastic",
        latitude: 41.380629,
        longitude: 2.162987,
      },
      {
        label: "Bin 21",
        type: "paper",
        latitude: 41.385084,
        longitude: 2.163649,
      },
      {
        label: "Bin 22",
        type: "glass",
        latitude: 41.384336,
        longitude: 2.162363,
      },
      {
        label: "Bin 23",
        type: "organic",
        latitude: 41.383633,
        longitude: 2.163478,
      },
      {
        label: "Bin 24",
        type: "plastic",
        latitude: 41.383539,
        longitude: 2.163026,
      },
      {
        label: "Bin 25",
        type: "glass",
        latitude: 41.382061,
        longitude: 2.163457,
      },
      {
        label: "Bin 26",
        type: "aluminium",
        latitude: 41.383531,
        longitude: 2.161177,
      },
      {
        label: "Bin 27",
        type: "paper",
        latitude: 41.381459,
        longitude: 2.162351,
      },
      {
        label: "Bin 28",
        type: "glass",
        latitude: 41.381851,
        longitude: 2.16132,
      },
      {
        label: "Bin 29",
        type: "plastic",
        latitude: 41.380906,
        longitude: 2.161657,
      },
      {
        label: "Bin 30",
        type: "organic",
        latitude: 41.379918,
        longitude: 2.160303,
      },
      {
        label: "Bin 31",
        type: "paper",
        latitude: 41.379057,
        longitude: 2.15915,
      },
      {
        label: "Bin 32",
        type: "aluminium",
        latitude: 41.378381,
        longitude: 2.159118,
      },
      {
        label: "Bin 33",
        type: "glass",
        latitude: 41.377417,
        longitude: 2.158139,
      },
      {
        label: "Bin 34",
        type: "plastic",
        latitude: 41.377227,
        longitude: 2.158995,
      },
      {
        label: "Bin 35",
        type: "organic",
        latitude: 41.377287,
        longitude: 2.156823,
      },
      {
        label: "Bin 36",
        type: "paper",
        latitude: 41.376377,
        longitude: 2.155581,
      },
      {
        label: "Bin 37",
        type: "glass",
        latitude: 41.375768,
        longitude: 2.154813,
      },
      {
        label: "Bin 38",
        type: "plastic",
        latitude: 41.375128,
        longitude: 2.154738,
      },
      {
        label: "Bin 39",
        type: "aluminium",
        latitude: 41.375429,
        longitude: 2.15611,
      },
      {
        label: "Bin 40",
        type: "organic",
        latitude: 41.375743,
        longitude: 2.157219,
      },
      {
        label: "Bin 41",
        type: "paper",
        latitude: 41.376409,
        longitude: 2.157941,
      },
      {
        label: "Bin 42",
        type: "glass",
        latitude: 41.376709,
        longitude: 2.156894,
      },
      {
        label: "Bin 43",
        type: "plastic",
        latitude: 41.375128,
        longitude: 2.159775,
      },
      {
        label: "Bin 44",
        type: "glass",
        latitude: 41.375108,
        longitude: 2.160636,
      },
      {
        label: "Bin 45",
        type: "paper",
        latitude: 41.375666,
        longitude: 2.160483,
      },
      {
        label: "Bin 46",
        type: "aluminium",
        latitude: 41.375796,
        longitude: 2.161633,
      },
      {
        label: "Bin 47",
        type: "organic",
        latitude: 41.376693,
        longitude: 2.162988,
      },
      {
        label: "Bin 48",
        type: "plastic",
        latitude: 41.376674,
        longitude: 2.163486,
      },
      {
        label: "Bin 49",
        type: "glass",
        latitude: 41.377148,
        longitude: 2.16284,
      },
      {
        label: "Bin 50",
        type: "aluminium",
        latitude: 41.377321,
        longitude: 2.163603,
      },
      {
        label: "Bin 51",
        type: "organic",
        latitude: 41.377799,
        longitude: 2.164196,
      },
      {
        label: "Bin 52",
        type: "paper",
        latitude: 41.378145,
        longitude: 2.163723,
      },
      {
        label: "Bin 53",
        type: "plastic",
        latitude: 41.379583,
        longitude: 2.162342,
      },
      {
        label: "Bin 54",
        type: "glass",
        latitude: 41.37843,
        longitude: 2.161335,
      },
      {
        label: "Bin 55",
        type: "aluminium",
        latitude: 41.377152,
        longitude: 2.16283,
      },
      {
        label: "Bin 56",
        type: "paper",
        latitude: 41.376979,
        longitude: 2.160779,
      },
      {
        label: "Bin 57",
        type: "organic",
        latitude: 41.376931,
        longitude: 2.161142,
      },
      {
        label: "Bin 58",
        type: "glass",
        latitude: 41.375833,
        longitude: 2.162459,
      },
      {
        label: "Bin 59",
        type: "plastic",
        latitude: 41.375068,
        longitude: 2.166652,
      },
      {
        label: "Bin 60",
        type: "aluminium",
        latitude: 41.375547,
        longitude: 2.165975,
      },
      {
        label: "Bin 61",
        type: "glass",
        latitude: 41.375074,
        longitude: 2.16479,
      },
      {
        label: "Bin 62",
        type: "organic",
        latitude: 41.375425,
        longitude: 2.165141,
      },
      {
        label: "Bin 63",
        type: "paper",
        latitude: 41.376521,
        longitude: 2.165028,
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
