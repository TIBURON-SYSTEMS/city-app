import { BrandStatus, UserRole } from "@/generated/prisma";
import prisma from "./db";

async function main() {
  const demoBrand = await prisma.user.create({
    data: {
      email: "brand@brand.com",
      role: UserRole.BRAND,
    },
  });
  console.log({ demoBrand });

  const testBrand = await prisma.brand.create({
    data: {
      name: "Demo Brand",
      userId: demoBrand.id,
      status: BrandStatus.ACTIVE,
    },
  });
  console.log({ testBrand });

  const challenge1 = await prisma.challenge.create({
    data: {
      label: "Plastic Bottle Blitz",
      status: "active",
      endDate: new Date("2025-08-31T23:59:59"),
      goal: 30,
      description:
        "Recycle plastic bottles to earn rewards. Hit 30 bottles and win a 1000 reward points!",
      brandId: testBrand.id,
      products: {
        create: {
          label: "Plastic bottle",
          material: "plastic",
          brandId: testBrand.id,
        },
      },
    },
  });
  console.log({ challenge1 });

  const challenge2 = await prisma.challenge.create({
    data: {
      label: "Can Crusher Challenge",
      status: "active",
      endDate: new Date("2025-09-15T23:59:59"),
      goal: 50,
      description:
        "Collect and recycle aluminum cans Reach 50 and get 400 reward points!!",
      brandId: testBrand.id,
      products: {
        create: {
          label: "Aluminum Can",
          material: "aluminium",
          brandId: testBrand.id,
        },
      },
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
      brandId: testBrand.id,
      products: {
        create: {
          label: "A4 Office Paper",
          material: "paper",
          brandId: testBrand.id,
        },
      },
    },
  });
  console.log({ challenge3 });
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

// async function main() {
//   console.log("🌱 Starting database seeding...");

//   // Create Admins
//   // const adminUsers = await Promise.all([
//   //   prisma.user.create({
//   //     data: {
//   //       email: "vkirandonis@gmail.com",
//   //       password: "admin_password_1",
//   //       role: [UserRole.ADMIN],
//   //     },
//   // }),
//   //   prisma.user.create({
//   //     data: {
//   //       email: "trev@outlook.com",
//   //       password: "admin_password_2",
//   //       role: [UserRole.ADMIN],
//   //     },
//   //   }),
//   //   prisma.user.create({
//   //     data: {
//   //       email: "the.ardent.arian@gmail.com",
//   //       password: "admin_password_3",
//   //       role: [UserRole.ADMIN],
//   //     },
//   //   }),
//   // ]);

//   // console.log("✅ Created admin users");

//   // Create Brands + brand users
//   const brandUsers = await Promise.all([
//     prisma.user.create({
//       data: {
//         email: "brand@brand.com",
//         role: [UserRole.BRAND],
//       },
//     }),
//     // prisma.user.create({
//     //   data: {
//     //     email: "brand_beta@example.com",
//     //     password: "brand_password_2",
//     //     role: [UserRole.BRAND],
//     //   },
//     // }),
//   ]);

//   await Promise.all([
//     prisma.brand.create({
//       data: {
//         name: "Brand Demo",
//         user: {
//           connect: { id: brandUsers[0].id },
//         },
//       },
//     }),
//     // prisma.brand.create({
//     //   data: {
//     //     name: "EcoBrand Beta",
//     //     user: {
//     //       connect: { id: brandUsers[1].id },
//     //     },
//     //   },
//     // }),
//   ]);

//   console.log("✅ Created brands");

//   // Create Participants
//   // const participants = await Promise.all([
//   //   prisma.user.create({
//   //     data: {
//   //       email: "participant_one@example.com",
//   //       password: "participant_password_1",
//   //       role: [UserRole.PARTICIPANT],
//   //     },
//   //   }),
//   //   prisma.user.create({
//   //     data: {
//   //       email: "participant_two@example.com",
//   //       password: "participant_password_2",
//   //       role: [UserRole.PARTICIPANT],
//   //     },
//   //   }),
//   // ]);

//   // console.log("✅ Created participants");

//   // Create Challenge
//   // const challenge = await prisma.challenge.create({
//   //   data: {
//   //     label: "Recycle 10 Bottles",
//   //     status: "active",
//   //     goal: 10,
//   //     brandId: brands[0].id,
//   //     users: {
//   //       connect: participants.map((p) => ({ id: p.id })),
//   //     },
//   //   },
//   // });

//   // console.log("✅ Created challenge");

//   // Create Reward
//   // const reward = await prisma.reward.create({
//   //   data: {
//   //     label: "Free Coffee Coupon",
//   //     challenge: {
//   //       connect: { id: challenge.id },
//   //     },
//   //   },
//   // });

//   // console.log("✅ Created reward");

//   // Link reward to users
//   // await Promise.all(
//   //   participants.map((p) =>
//   //     prisma.userReward.create({
//   //       data: {
//   //         userId: p.id,
//   //         rewardId: reward.id,
//   //         assignedAt: new Date(),
//   //       },
//   //     })
//   //   )
//   // );

//   // console.log("✅ Assigned rewards to participants");

//   // Create Bin
//   // const bin = await prisma.bin.create({
//   //   data: {
//   //     label: "Plastic Bin",
//   //     type: "plastic",
//   //     location: "Main Lobby",
//   //   },
//   // });

//   // console.log("✅ Created bin");

//   // Create Product
//   // const product = await prisma.product.create({
//   //   data: {
//   //     label: "Plastic Bottle",
//   //     type: "plastic",
//   //     userId: participants[0].id,
//   //     brandId: brands[0].id,
//   //     challengeId: challenge.id,
//   //   },
//   // });

//   // console.log("✅ Created product");

//   // Create Disposal
//   // const disposal = await prisma.disposal.create({
//   //   data: {
//   //     date: new Date(),
//   //     userId: participants[0].id,
//   //     binId: bin.id,
//   //   },
//   // });

//   // Create DisposedProduct
//   //   await prisma.disposedProduct.create({
//   //     data: {
//   //       productId: product.id,
//   //       disposalId: disposal.id,
//   //       amount: 5,
//   //     },
//   //   });

//   //   console.log("✅ Created disposal and disposed product");
//   //   console.log("🎉 Database seeding completed!");
//   // }

//   main()
//     .catch(async (e) => {
//       console.error("❌ Error during seeding:", e);
//       process.exit(1);
//     })
//     .finally(async () => {
//       await prisma.$disconnect();
//     });
// }
