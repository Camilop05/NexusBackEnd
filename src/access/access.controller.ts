import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../auth/types/authenticated-user.type';
import { AccessService } from './access.service';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';

@Controller()
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  // GET /api/v1/access-zones — cualquier usuario autenticado puede ver qué zonas existen.
  @Get('access-zones')
  findZones() {
    return this.accessService.findZones();
  }

  // POST /api/v1/access-zones — solo Comandante (ADMIN) puede crear zonas.
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Post('access-zones')
  createZone(@Body() dto: CreateZoneDto) {
    return this.accessService.createZone(dto);
  }

  // PATCH /api/v1/access-zones/:id — solo Comandante (ADMIN).
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Patch('access-zones/:id')
  updateZone(@Param('id') id: string, @Body() dto: UpdateZoneDto) {
    return this.accessService.updateZone(id, dto);
  }

  // PATCH /api/v1/access-zones/:id/deactivate — solo Comandante (ADMIN).
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Patch('access-zones/:id/deactivate')
  deactivateZone(@Param('id') id: string) {
    return this.accessService.deactivateZone(id);
  }

  // POST /api/v1/access-zones/:id/enter — cualquier usuario autenticado puede intentarlo.
  // El resultado (otorgado/denegado) depende de su rango vs. el mínimo de la zona.
  @Post('access-zones/:id/enter')
  enterZone(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.accessService.enterZone(id, user);
  }

  // GET /api/v1/access-logs — bitácora completa, solo para Comandante y Oficial de turno.
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPERVISOR')
  @Get('access-logs')
  findLogs() {
    return this.accessService.findLogs();
  }
}
