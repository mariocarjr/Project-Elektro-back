import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/pt_BR';

const prisma = new PrismaClient();

interface Product {
  nome: string;
  descricao: string;
  preco: number;
  estado: string;
  id_usuario: number;
}

const data: Product[] = [];

export async function productSeed() {
  const usuarios = await prisma.usuario.findMany();
  
  for (let i = 0; i < 100; i++) {
    const usuario = usuarios[Math.floor(Math.random() * usuarios.length)];
    data.push({
      nome: faker.commerce.product(),
      descricao: faker.commerce.productDescription(),
      preco: parseFloat(faker.commerce.price()),
      estado: faker.helpers.arrayElement(['novo', 'usado']),
      id_usuario: usuario.id_usuario,
    });
  }

  await prisma.produto.createMany({ data });
}
