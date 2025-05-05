import { API_URL } from './config'; // Cambié la ruta, va a salir de src/api y buscar config

export interface Profesor {
  id?: string;
  nombre: string;
  correo: string;
  contrasena: string;
  fechaNacimiento: string; // Formato ISO (YYYY-MM-DD)
  genero: string;
}

// Guardar un nuevo profesor
export const crearProfesor = async (profesor: Profesor) => {
  const response = await fetch(`${API_URL}/profesor/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profesor),
  });
  if (!response.ok) {
    throw new Error('Error al crear el profesor');
  }
  return response.json();
};

// Obtener profesor por ID
export const obtenerProfesorPorId = async (id: string) => {
  const response = await fetch(`${API_URL}/profesor/${id}`);
  if (!response.ok) {
    throw new Error('Error al obtener el profesor');
  }
  return response.json();
};

// Obtener todos los profesores
export const obtenerProfesores = async () => {
  const response = await fetch(`${API_URL}/profesor/`);
  if (!response.ok) {
    throw new Error('Error al obtener los profesores');
  }
  return response.json();
};

// Actualizar un profesor
export const actualizarProfesor = async (id: string, profesor: Profesor) => {
  const response = await fetch(`${API_URL}/profesor/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profesor),
  });
  if (!response.ok) {
    throw new Error('Error al actualizar el profesor');
  }
  return response.json();
};

// Eliminar un profesor
export const eliminarProfesor = async (id: string) => {
  const response = await fetch(`${API_URL}/profesor/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error al eliminar el profesor');
  }
  return response.json();
};

// Login del profesor (buscar por correo y contraseña)
export const loginProfesor = async (correo: string, contrasena: string) => {
  const profesores = await obtenerProfesores();
  return profesores.find(
    (profesor: Profesor) => 
      profesor.correo === correo && profesor.contrasena === contrasena
  );
};
