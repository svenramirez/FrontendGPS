export enum UserRole {
  DOCENTE = 'DOCENTE',
  ESTUDIANTE = 'ESTUDIANTE',
  ADMINISTRADOR = 'ADMINISTRADOR'
}

export const AVAILABLE_ROLES = [
  { name: UserRole.DOCENTE },
  { name: UserRole.ESTUDIANTE },
  { name: UserRole.ADMINISTRADOR }
];