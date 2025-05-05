export interface Tarea {
  id: string;
  titulo: string;
  descripcion: string;
  enlaceExterno?: string;
  materiaId: string;
  materia?: Materia; // Añade esta línea si estás recibiendo la materia completa
}

export interface Materia {
  id: string;
  nombre: string;
  descripcion: string;
  profesorId: string;
}
