import { IsEmail, IsIn, IsOptional, IsString, MinLength } from 'class-validator';

export const USER_ROLES = ['ADMIN', 'USER', 'SUPERVISOR'] as const;
export type UserRoleDto = (typeof USER_ROLES)[number];

export const DOCUMENT_TYPES = ['CC', 'CE', 'TI', 'PASAPORTE'] as const;
export type DocumentTypeDto = (typeof DOCUMENT_TYPES)[number];

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  firstName!: string;

  @IsString()
  @MinLength(2)
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(7)
  phone!: string;

  @IsIn(DOCUMENT_TYPES)
  documentType!: DocumentTypeDto;

  @IsString()
  @MinLength(4)
  documentNumber!: string;

  @IsString()
  @MinLength(2)
  nationality!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsOptional()
  @IsIn(USER_ROLES)
  role?: UserRoleDto;
}
