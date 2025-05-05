// api/tareaService.ts
import { API_URL } from './config';
import { Tarea } from '../screens/Tasks/types'; // Asegúrate de tener este tipo definido


// Obtener todas las tareas de todas las materias
export const getTodasLasTareas = async (): Promise<Tarea[]> => {
  try {
    const url = `${API_URL}/tarea/`;
    console.log('🌐 Llamando a:', url);

    const response = await fetch(url);
    console.log('📡 Código de respuesta:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('🚨 Respuesta de error:', errorText);
      throw new Error('Error al obtener tareas');
    }

    const tareas = await response.json();
    console.log('✅ Tareas obtenidas:', tareas);

    return tareas;
  } catch (error) {
    console.error('🔥 Error en getTodasLasTareas:', error);
    throw error;
  }
};

// Obtener tareas por ID de materia
export const getTareasPorMateria = async (materiaId: string): Promise<Tarea[]> => {
  try {
    const url = `${API_URL}/tarea/`; // No hay endpoint para buscar por materiaId en tu backend
  

    const res = await fetch(url);
    if (!res.ok) {
      const errorText = await res.text();
      console.error('🚨 Error al obtener tareas:', errorText);
      throw new Error('Error al obtener tareas');
    }

    const tareas = await res.json();
    const filtradas = tareas.filter((t: Tarea) => t.materiaId === materiaId);
    console.log('✅ Tareas filtradas por materiaId:', filtradas);
    return filtradas;
  } catch (error) {
    console.error('🔥 Error en getTareasPorMateria:', error);
    throw error;
  }
};

// Crear una nueva tarea
export const createTarea = async (tarea: Omit<Tarea, 'id'>): Promise<Tarea> => {
  try {
    const url = `${API_URL}/tarea/`;
    console.log('🛠️ Creando tarea en:', url);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tarea),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('🚨 Error al crear tarea:', errorText);
      throw new Error('Error al crear tarea');
    }

    const nuevaTarea = await response.json();
    console.log('✅ Tarea creada:', nuevaTarea);

    return nuevaTarea;
  } catch (error) {
    console.error('🔥 Error en createTarea:', error);
    throw error;
  }
};

// Actualizar una tarea existente
export const updateTarea = async (id: string, tarea: Omit<Tarea, 'id'>): Promise<Tarea> => {
  try {
    const url = `${API_URL}/tarea/${id}`;
    console.log('✏️ Actualizando tarea en:', url);

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tarea),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('🚨 Error al actualizar tarea:', errorText);
      throw new Error('Error al actualizar tarea');
    }

    const tareaActualizada = await response.json();
    console.log('✅ Tarea actualizada:', tareaActualizada);

    return tareaActualizada;
  } catch (error) {
    console.error('🔥 Error en updateTarea:', error);
    throw error;
  }
};

// Eliminar una tarea
export const deleteTarea = async (id: string): Promise<void> => {
  try {
    const url = `${API_URL}/tarea/${id}`;
    console.log('🗑️ Eliminando tarea en:', url);

    const response = await fetch(url, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('🚨 Error al eliminar tarea:', errorText);
      throw new Error('Error al eliminar tarea');
    }

    console.log('✅ Tarea eliminada correctamente');
  } catch (error) {
    console.error('🔥 Error en deleteTarea:', error);
    throw error;
  }

  
};
