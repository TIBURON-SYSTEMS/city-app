import { BrandStatus, UserRole } from "@/generated/prisma";
import prisma from "./db";

async function main() {
  const userParticipant = await prisma.user.create({
    data: {
      email: "arnaud.obri@gmail.com",
      role: UserRole.PARTICIPANT,
    },
  });
  console.log({ userParticipant });
  await prisma.participant.create({
    data: {
      userId: userParticipant.id,
    },
  });
  const userParticipant2 = await prisma.user.create({
    data: {
      email: "participant@tiburon.es",
      role: UserRole.PARTICIPANT,
    },
  });
  console.log({ userParticipant });
  await prisma.participant.create({
    data: {
      userId: userParticipant2.id,
    },
  });

  const mercadona = await prisma.user.create({
    data: {
      email: "mercadona@someprovider.com",
      role: UserRole.BRAND,
      brand: {
        create: {
          name: "Mercadona",
          description:
            "Mercadona is a leading Spanish supermarket chain known for its 'Always Low Prices' model. It offers a wide range of high-quality food, personal care, and home products, with a strong focus on its popular and trusted private labels like Hacendado.",
          logoUrl:
            "https://logos-world.net/wp-content/uploads/2022/04/Mercadona-Logo-700x394.jpg",
          status: BrandStatus.ACTIVE,
          challenges: {
            create: [
              // Challenge 1
              {
                label: "Hacendado Recycling Hero",
                status: "active",
                endDate: new Date("2025-12-31T23:59:59Z"),
                description:
                  "Don't let your milk bottle go to waste. Join the drive by recycling all your Hacendado milk bottle and pour yourself some great rewards",
                goal: 50,
                // Reward for Challenge 1
                rewards: {
                  create: [
                    {
                      label: "€15 Voucher",
                      amount: 1,
                      imageUrl:
                        "https://www.pngall.com/wp-content/uploads/12/Voucher-PNG-Pic.png",
                    },
                  ],
                },
                challengeProducts: {
                  create: [
                    {
                      product: {
                        create: {
                          label: "hacendado milk",
                          material: "plastic",
                          brand: {
                            connect: {
                              name: "Mercadona",
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              },
              // Challenge 2
              {
                label: "Hacendado Zero Plastic",
                status: "active",
                endDate: new Date("2026-03-31T23:59:59Z"),
                description:
                  "Help us to have all of our Hacendado yoghurts recycled",
                goal: 50,
                // Reward for Challenge 2
                rewards: {
                  create: [
                    {
                      label: "hacendado tshirt",
                      amount: 1,
                      imageUrl:
                        "https://static.vecteezy.com/system/resources/previews/012/628/220/original/plain-black-t-shirt-on-transparent-background-free-png.png",
                    },
                    {
                      label: "Hacendado canvas tote bag",
                      amount: 1,
                      imageUrl:
                        "https://promomachine.com.au/shared/img/baseProducts/9583c1b1512dfa38006d107b772ad670.jpg",
                    },
                  ],
                },
                // Product for Challenge 2
                challengeProducts: {
                  create: [
                    {
                      product: {
                        create: {
                          label: "hacendado yoghurt",
                          material: "plastic",
                          brand: {
                            connect: {
                              name: "Mercadona",
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              },
              // Challenge 3
              {
                label: "Hacendado Packaging Blitz",
                status: "inactive",
                endDate: new Date("2026-03-31T23:59:59Z"),
                description:
                  "Join the ultimate recycling showdown! Scan and drop off any Hacendado carton packaging to earn rewards",
                goal: 100,
                // Reward for Challenge 3
                rewards: {
                  create: [
                    {
                      label: "Hacendado eco water bottle",
                      amount: 1,
                      imageUrl:
                        "https://www.ecowatch.com/wp-content/uploads/2021/11/1291951955-origin.jpg",
                    },
                  ],
                },
                // Product for Challenge 3
                challengeProducts: {
                  create: [
                    {
                      product: {
                        create: {
                          label: "hacendado packaging",
                          material: "paper",
                          brand: {
                            connect: {
                              name: "Mercadona",
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      },
    },
    include: {
      brand: {
        include: {
          challenges: {
            include: {
              rewards: true,
              challengeProducts: {
                include: {
                  product: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const amazon = await prisma.user.create({
    data: {
      email: "amazon@someprovider.com",
      role: UserRole.BRAND,
      brand: {
        create: {
          name: "Amazon",
          description:
            "Amazon is a global e-commerce and cloud computing leader, offering everything from A to Z, with a strong commitment to sustainability through its ‘Shipment Zero’ initiative and recyclable packaging programs.",
          logoUrl:
            "https://logos-world.net/wp-content/uploads/2020/06/Amazon-Logo.jpg",
          status: BrandStatus.ACTIVE,
          challenges: {
            create: [
              // Challenge 1
              {
                label: "Amazon Recycling Sprint",
                status: "active",
                endDate: new Date("2025-12-31T23:59:59Z"),
                description:
                  "Race to recycle Amazon cardboard mailer envelopes. Scan and drop off 50 envelopes to unlock exclusive voucher rewards.",
                goal: 200,
                // Reward for Challenge 1
                rewards: {
                  create: [
                    {
                      label: "A ride in space with Blue Origin",
                      amount: 1,
                      imageUrl:
                        "https://cdn.mos.cms.futurecdn.net/mVdaknZ6JrvW2s5Dsyx2ET.jpeg",
                    },
                    {
                      label: "AWS Gold jacket",
                      amount: 1,
                      imageUrl:
                        "https://jiripik.com/wp-content/uploads/2022/07/AWSGoldenJacket.jpg",
                    },
                  ],
                },
                challengeProducts: {
                  create: [
                    {
                      product: {
                        create: {
                          label: "amazon packaging",
                          material: "carton",
                          brand: {
                            connect: {
                              name: "Amazon",
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      },
    },
    include: {
      brand: {
        include: {
          challenges: {
            include: {
              rewards: true,
              challengeProducts: {
                include: {
                  product: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const carrefour = await prisma.user.create({
    data: {
      email: "carrefour@someprovider.com",
      role: UserRole.BRAND,
      brand: {
        create: {
          name: "Carrefour",
          description:
            "Carrefour, French retail giant, runs hypermarkets, supermarkets and online shops across Spain, offering groceries, electronics and services, loyalty rewards and competitive prices, and eco moves. Too.",
          logoUrl:
            "https://logos-world.net/wp-content/uploads/2020/11/Carrefour-Logo-1982-2010.png",
          status: BrandStatus.ACTIVE,
          challenges: {
            create: [
              // Challenge 1
              {
                label: "Carrefour Shampoo Bottle",
                status: "active",
                endDate: new Date("2025-12-31T23:59:59Z"),
                description:
                  "Race to recycle as fast as you can: Carrefour-branded shampoo bottle.",
                goal: 15,
                // Reward for Challenge 1
                rewards: {
                  create: [
                    {
                      label: "Custom Mug",
                      amount: 1,
                      imageUrl:
                        "https://www.pngall.com/wp-content/uploads/2/Mug-Transparent.png",
                    },
                  ],
                },
                challengeProducts: {
                  create: [
                    {
                      product: {
                        create: {
                          label: "carrefour shampoo",
                          material: "plastic",
                          brand: {
                            connect: {
                              name: "Carrefour",
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      },
    },
    include: {
      brand: {
        include: {
          challenges: {
            include: {
              rewards: true,
              challengeProducts: {
                include: {
                  product: true,
                },
              },
            },
          },
        },
      },
    },
  });

  console.log(mercadona, amazon, carrefour);

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
        type: "carton",
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
