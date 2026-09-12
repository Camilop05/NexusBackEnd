import { IsBoolean, IsIn, IsOptional, IsString, MinLength } from 'class-validator';

export const ZONE_ROLES = ['ADMIN', 'USER', 'SUPERVISOR'] as const;
export type ZoneRoleDto = (typeof ZONE_ROLES)[number];

export class CreateZoneDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsIn(ZONE_ROLES)
  minRole!: ZoneRoleDto;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
