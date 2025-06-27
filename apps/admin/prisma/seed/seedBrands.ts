import bcrypt from 'bcrypt';
import prisma from '../db';
import { UserRole } from '@/generated/prisma';

export async function seedBrandsWithUsers() {

  const brandData = [
  { name: 'Sony', email: 'sony@brand.com', password: 'sony123' },
  { name: 'PepsiCo', email: 'pepsico@brand.com', password: 'pepsi123' },
  { name: 'Doritos', email: 'doritos@brand.com', password: 'doritos123' },
  { name: 'Oreos', email: 'oreos@brand.com', password: 'oreos123' },
  { name: 'Sweet-Cookie', email: 'sweetcookie@brand.com', password: 'sweet123' },
  { name: 'Coca-Cola', email: 'cocacola@brand.com', password: 'coke123' },
  { name: "McDonald's", email: 'mcdonalds@brand.com', password: 'mc123' },
  ];

  for (const { name, email, password } of brandData) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    let user;

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10); 

      user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          role: { set: [UserRole.BRAND] },
        },
      });
      console.log(`Created user: ${email}`);
    } else {
      user = existingUser;
      console.log(`User exists: ${email}`);
    }

    const existingBrand = await prisma.brand.findUnique({ where: { userId: user.id } });
    if (!existingBrand) {
      await prisma.brand.create({
        data: {
          name,
          userId: user.id,
        },
      });
      console.log(`Created brand: ${name}`);
    } else {
      console.log(`Brand exists: ${name}`);
    }
  }
}
