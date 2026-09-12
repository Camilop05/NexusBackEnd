import { SetMetadata } from '@nestjs/common';

// Llave interna que usará RolesGuard para buscar la metadata.
export const ROLES_KEY = 'roles';

// Decorador para restringir un endpoint a ciertos roles.
// Ejemplo: @Roles('ADMIN') o @Roles('ADMIN', 'SUPERVISOR').
export const Roles = (...roles: Array<'ADMIN' | 'USER' | 'SUPERVISOR'>) =>
  SetMetadata(ROLES_KEY, roles);
