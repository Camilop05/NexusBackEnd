import { IsBoolean, IsEmail, IsIn, IsOptional, IsString, MinLength } from 'class-validator';
import { DOCUMENT_TYPES, USER_ROLES } from './create-user.dto';
import type { DocumentTypeDto, UserRoleDto } from './create-user.dto';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  firstName?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(7)
  phone?: string;

  @IsOptional()
  @IsIn(DOCUMENT_TYPES)
  documentType?: DocumentTypeDto;

  @IsOptional()
  @IsString()
  @MinLength(4)
  documentNumber?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  nationality?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;

  @IsOptional()
  @IsIn(USER_ROLES)
  role?: UserRoleDto;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
