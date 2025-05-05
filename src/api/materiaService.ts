import { API_URL } from './config';
import { Materia } from '../screens/Subjects/types';


// Obtener todas las materias de un profesor específico
export const getMaterias = async (profesorId: string): Promise<Materia[]> => {
  try {
    const url = `${API_URL}/materia/`; // Obtener todas las materias sin filtrar en el backend
    console.log('🌐 Llamando a:', url);

    const response = await fetch(url);

    console.log('📡 Código de respuesta:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('🚨 Respuesta de error:', errorText);
      throw new Error('Error al obtener materias');
    }

    const materias = await response.json();
    console.log('✅ Materias recibidas:', materias);

    // Filtrar las materias por el profesorId
    const materiasFiltradas = materias.filter((materia: Materia) => materia.profesorId === profesorId);

    console.log('📋 Materias filtradas:', materiasFiltradas);
    
    return materiasFiltradas;
  } catch (error) {
    console.error('🔥 Error en getMaterias:', error);
    throw error;
  }
};

// Crear una nueva materia
export const createMateria = async (materia: Omit<Materia, 'id'>, profesorId: string) => {
  try {
    const url = `${API_URL}/materia/`;
    console.log('🛠️ Creando materia en:', url);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...materia,
        profesorId: profesorId, // Se asigna el profesorId al crear la materia
      }),
    });

    console.log('📡 Código de respuesta (createMateria):', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('🚨 Respuesta de error en createMateria:', errorText);
      throw new Error('Error al crear materia');
    }

    const nuevaMateria = await response.json();
    console.log('✅ Materia creada:', nuevaMateria);

    return nuevaMateria;
  } catch (error) {
    console.error('🔥 Error en createMateria:', error);
    throw error;
  }
};

// Actualizar una materia existente
export const updateMateria = async (id: string, materia: Omit<Materia, 'id'>) => {
  try {
    const url = `${API_URL}/materia/${id}`;
    console.log('✏️ Actualizando materia en:', url);

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(materia),
    });

    console.log('📡 Código de respuesta (updateMateria):', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('🚨 Respuesta de error en updateMateria:', errorText);
      throw new Error('Error al actualizar materia');
    }

    const materiaActualizada = await response.json();
    console.log('✅ Materia actualizada:', materiaActualizada);

    return materiaActualizada;
  } catch (error) {
    console.error('🔥 Error en updateMateria:', error);
    throw error;
  }
};

// Eliminar una materia
export const deleteMateria = async (id: string) => {
    try {
      const url = `${API_URL}/materia/${id}`;
      console.log('🗑️ Eliminando materia en:', url);
  
      const response = await fetch(url, {
        method: 'DELETE',
      });
  
      console.log('📡 Código de respuesta (deleteMateria):', response.status);
  
      // Comprobamos si la respuesta fue exitosa
      if (!response.ok) {
        const errorText = await response.text(); // Leemos el cuerpo de la respuesta como texto
        console.error('🚨 Respuesta de error en deleteMateria:', errorText);
        throw new Error('Error al eliminar materia');
      }
  
      // Si el código es 204, no hay contenido, y no necesitamos hacer JSON.parse
      if (response.status === 204) {
        console.log('✅ Materia eliminada correctamente (sin contenido en la respuesta)');
        return {}; // Retornamos un objeto vacío, ya que no hay datos
      }
  
      // Si el código es 200, pero no hay contenido en la respuesta, la respuesta estará vacía
      if (response.status === 200) {
        const text = await response.text(); // Leemos el cuerpo como texto
        if (!text) {
          console.log('✅ Materia eliminada, pero la respuesta está vacía');
          return {}; // Retornamos un objeto vacío si no hay datos
        }
        const resultado = JSON.parse(text); // Parseamos si hay datos
        console.log('✅ Materia eliminada:', resultado);
        return resultado;
      }
  
    } catch (error) {
      console.error('🔥 Error en deleteMateria:', error);
      throw error;
    }
  };
  