import { Prisma, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/pt_BR';

const prisma = new PrismaClient();

interface User {
  nome: string;
  email: string;
  senha: string;
  endereco: string;
  telefone: string;
  tipo_usuario: string;
}

const data: User[] = [];

export async function userSeed() {

  for (let i = 0; i < 30; i++) {
    data.push({
      nome: faker.person.fullName(),
      email: faker.internet.email(),
      senha: faker.internet.password(),
      endereco: faker.location.streetAddress(), 
      telefone: faker.phone.number(),
      tipo_usuario: faker.helpers.arrayElement(['comprador', 'vendedor']),

  })
  }
  await prisma.usuario.createMany({data})
}
