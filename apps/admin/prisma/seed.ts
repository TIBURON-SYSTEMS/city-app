// prisma/seed.ts

import { UserRole } from '../src/generated/prisma';
import prisma from './db';

async function main() {
  console.log('Starting database seeding with `create` operations...');

  await prisma.user.create({
    data: {
      email: 'vkirandonis@gmail.com',
      password: 'admin_password_1',
      role: [UserRole.ADMIN],
    },
  });
  console.log('Created admin user: vkirandonis@gmail.com');

  await prisma.user.create({
    data: {
      email: 'trev@outlook.com',
      password: 'admin_password_2',
      role: [UserRole.ADMIN],
    },
  });
  console.log('Created admin user: trev@outlook.com');

  await prisma.user.create({
    data: {
      email: 'the.ardent.arian@gmail.com',
      password: 'admin_password_3',
      role: [UserRole.ADMIN],
    },
  });
  console.log('Created admin user: the.ardent.arian@gmail.com');

  await prisma.user.create({
    data: {
      email: 'brand_alpha@example.com',
      password: 'brand_password_1',
      role: [UserRole.BRAND],
    },
  });
  console.log('Created brand user: brand_alpha@example.com');

  await prisma.user.create({
    data: {
      email: 'brand_beta@example.com',
      password: 'brand_password_2',
      role: [UserRole.BRAND],
    },
  });
  console.log('Created brand user: brand_beta@example.com');

  await prisma.user.create({
    data: {
      email: 'participant_one@example.com',
      password: 'participant_password_1',
      role: [UserRole.PARTICIPANT],
    },
  });
  console.log('Created participant user: participant_one@example.com');

  await prisma.user.create({
    data: {
      email: 'participant_two@example.com',
      password: 'participant_password_2',
      role: [UserRole.PARTICIPANT],
    },
  });
  console.log('Created participant user: participant_two@example.com');

  console.log('Database seeding completed!');
}

main()
  .catch(async (e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
