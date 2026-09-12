import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { RegisterDto } from './register.dto';

describe('RegisterDto', () => {
  it('accepts a single name field and leaves it optional for legacy payloads', () => {
    const dto = plainToInstance(RegisterDto, {
      name: 'Carlos Perez',
      email: 'carlos@example.com',
      phone: '3001234567',
      documentType: 'CC',
      documentNumber: '123456789',
      nationality: 'Colombia',
      password: 'Secret123',
    });

    const errors = validateSync(dto);

    expect(errors).toHaveLength(0);
    expect(dto.name).toBe('Carlos Perez');
  });

  it('accepts the full split name fields', () => {
    const dto = plainToInstance(RegisterDto, {
      firstName: 'Ana',
      lastName: 'García',
      email: 'ana@example.com',
      phone: '3001234567',
      documentType: 'CC',
      documentNumber: '987654321',
      nationality: 'Colombia',
      password: 'Secret123',
    });

    const errors = validateSync(dto);

    expect(errors).toHaveLength(0);
    expect(dto.firstName).toBe('Ana');
    expect(dto.lastName).toBe('García');
  });

  it('accepts numeric-like fields and lower-case document types by normalizing them', () => {
    const dto = plainToInstance(RegisterDto, {
      firstName: 'Luis',
      lastName: 'Pérez',
      email: 'luis@example.com',
      phone: 3001234567,
      documentType: 'cc',
      documentNumber: 987654321,
      nationality: 'Colombia',
      password: 'Secret123',
    });

    const errors = validateSync(dto);

    expect(errors).toHaveLength(0);
    expect(dto.phone).toBe('3001234567');
    expect(dto.documentType).toBe('CC');
    expect(dto.documentNumber).toBe('987654321');
  });
});
