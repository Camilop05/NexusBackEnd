import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { AccessRepository } from './access.repository';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { meetsMinRole } from './role-hierarchy';
import type { AuthenticatedUser } from '../auth/types/authenticated-user.type';

@Injectable()
export class AccessService {
  constructor(private readonly accessRepository: AccessRepository) {}

  findZones() {
    return this.accessRepository.findZones();
  }

  async findZone(id: string) {
    const zone = await this.accessRepository.findZoneById(id);

    if (!zone) {
      throw new NotFoundException('Zona no encontrada');
    }

    return zone;
  }

  async createZone(dto: CreateZoneDto) {
    const existing = await this.accessRepository.findZoneByName(dto.name);

    if (existing) {
      throw new ConflictException('Ya existe una zona con ese nombre');
    }

    return this.accessRepository.createZone(dto);
  }

  async updateZone(id: string, dto: UpdateZoneDto) {
    await this.findZone(id);
    return this.accessRepository.updateZone(id, dto);
  }

  async deactivateZone(id: string) {
    await this.findZone(id);
    return this.accessRepository.deactivateZone(id);
  }

  // Intento de entrada: compara el rango del usuario contra el mínimo exigido
  // por la zona y siempre deja registro en la bitácora, sea otorgado o denegado.
  async enterZone(zoneId: string, user: AuthenticatedUser) {
    const zone = await this.findZone(zoneId);

    const granted = zone.isActive && meetsMinRole(user.role, zone.minRole);

    const log = await this.accessRepository.createLog({
      userId: user.id,
      zoneId: zone.id,
      granted,
    });

    return {
      granted,
      reason: !zone.isActive
        ? 'La zona está fuera de servicio'
        : granted
          ? 'Acceso otorgado'
          : `Se requiere rango ${zone.minRole} o superior`,
      log,
    };
  }

  findLogs() {
    return this.accessRepository.findLogs();
  }
}
