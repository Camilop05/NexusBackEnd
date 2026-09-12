import { Transform } from 'class-transformer';
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

  @Transform(({ value }) => {
    if (value === null || value === undefined) {
      return value;
    }

    return String(value).trim();
  })
  @IsString()
  @MinLength(7)
  phone!: string;

  @Transform(({ value }) => {
    if (value === null || value === undefined) {
      return value;
    }

    return String(value).trim().toUpperCase();
  })
  @IsIn(DOCUMENT_TYPES)
  documentType!: DocumentTypeDto;

  @Transform(({ value }) => {
    if (value === null || value === undefined) {
      return value;
    }

    return String(value).trim();
  })
  @IsString()
  @MinLength(4)
  documentNumber!: string;

  @Transform(({ value }) => {
    if (value === null || value === undefined) {
      return value;
    }

    return String(value).trim();
  })
  @IsString()
  @MinLength(2)
  nationality!: string;

  @Transform(({ value }) => {
    if (value === null || value === undefined) {
      return value;
    }

    return String(value).trim();
  })
  @IsString()
  @MinLength(8)
  password!: string;
}
