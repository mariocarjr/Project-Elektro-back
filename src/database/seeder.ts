import { PrismaClient } from '@prisma/client';
import { userSeed } from '../database/models/userSeed';
import { productSeed } from '../database/models/productSeed';

const prisma = new PrismaClient();

async function main() {
  await userSeed();
  await productSeed();
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
