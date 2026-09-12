import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Role } from './role-hierarchy';

@Injectable()
export class AccessRepository {
  constructor(private readonly prisma: PrismaService) {}

  findZones() {
    return this.prisma.accessZone.findMany({
      orderBy: { name: 'asc' },
    });
  }

  findZoneById(id: string) {
    return this.prisma.accessZone.findUnique({ where: { id } });
  }

  findZoneByName(name: string) {
    return this.prisma.accessZone.findUnique({ where: { name } });
  }

  createZone(data: { name: string; description?: string; minRole: Role; isActive?: boolean }) {
    return this.prisma.accessZone.create({ data });
  }

  updateZone(
    id: string,
    data: Partial<{ name: string; description: string; minRole: Role; isActive: boolean }>,
  ) {
    return this.prisma.accessZone.update({ where: { id }, data });
  }

  deactivateZone(id: string) {
    return this.prisma.accessZone.update({ where: { id }, data: { isActive: false } });
  }

  createLog(data: { userId: string; zoneId: string; granted: boolean }) {
    return this.prisma.accessLog.create({ data });
  }

  // Bitácora completa, con datos básicos de usuario y zona para mostrar en pantalla.
  findLogs() {
    return this.prisma.accessLog.findMany({
      orderBy: { attemptedAt: 'desc' },
      include: {
        user: {
          select: { id: true, firstName: true, lastName: true, email: true, role: true },
        },
        zone: {
          select: { id: true, name: true, minRole: true },
        },
      },
    });
  }
}
