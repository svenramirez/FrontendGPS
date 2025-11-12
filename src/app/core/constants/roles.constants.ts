export enum UserRole {
  DOCENTE = 'DOCENTE',
  ESTUDIANTE = 'ESTUDIANTE',
  ADMIN = 'ADMIN'
}

export const AVAILABLE_ROLES = [
  { name: UserRole.DOCENTE },
  { name: UserRole.ESTUDIANTE },
  { name: UserRole.ADMIN }
];