export type Role = 'ADMIN' | 'USER' | 'SUPERVISOR';

// Nivel de autorización de cada rango dentro de Nexus.
// A mayor número, más alto el rango (Comandante por encima de Oficial de turno,
// que a su vez está por encima de Tripulante).
export const ROLE_LEVEL: Record<Role, number> = {
  USER: 1,
  SUPERVISOR: 2,
  ADMIN: 3,
};

// Devuelve true si el rol del usuario alcanza (o supera) el rango mínimo exigido.
export function meetsMinRole(userRole: Role, minRole: Role): boolean {
  return ROLE_LEVEL[userRole] >= ROLE_LEVEL[minRole];
}
