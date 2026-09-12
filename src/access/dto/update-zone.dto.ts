import { IsBoolean, IsIn, IsOptional, IsString, MinLength } from 'class-validator';
import { ZONE_ROLES } from './create-zone.dto';
import type { ZoneRoleDto } from './create-zone.dto';

export class UpdateZoneDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsIn(ZONE_ROLES)
  minRole?: ZoneRoleDto;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
