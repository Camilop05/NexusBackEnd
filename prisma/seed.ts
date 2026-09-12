import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '../src/generated/prisma/client';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const passwordHash = await bcrypt.hash('Admin123456!', 12);

  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: { passwordHash, isActive: true },
    create: {
      email: 'admin@example.com',
      firstName: 'Admin',
      lastName: 'Nexus',
      phone: '3000000000',
      documentType: 'CC',
      documentNumber: '0000000000',
      nationality: 'Colombiana',
      passwordHash,
      role: 'ADMIN',
      isActive: true,
    },
  });

  const zones: Array<{ name: string; description: string; minRole: 'ADMIN' | 'USER' | 'SUPERVISOR' }> = [
    { name: 'Cubierta común', description: 'Área de acceso general para toda la tripulación', minRole: 'USER' },
    { name: 'Laboratorio', description: 'Zona de investigación y experimentos', minRole: 'SUPERVISOR' },
    { name: 'Puente de mando', description: 'Control central de la estación', minRole: 'ADMIN' },
  ];

  for (const zone of zones) {
    await prisma.accessZone.upsert({
      where: { name: zone.name },
      update: {},
      create: zone,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });