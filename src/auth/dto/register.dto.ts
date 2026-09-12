import { IsEmail, IsIn, IsOptional, IsString, MinLength } from 'class-validator';
import { DOCUMENT_TYPES } from '../../users/dto/create-user.dto';
import type { DocumentTypeDto } from '../../users/dto/create-user.dto';

export class RegisterDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  firstName?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  lastName?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

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
}
