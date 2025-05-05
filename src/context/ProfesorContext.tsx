import React, { createContext, useState, useContext, useEffect } from 'react';
import { Profesor } from '../screens/Profile/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProfesorContextProps {
  profesor: Profesor | null;
  setProfesor: (profesor: Profesor | null) => void;
}

const ProfesorContext = createContext<ProfesorContextProps>({
  profesor: null,
  setProfesor: () => {},
});

export const ProfesorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profesor, setProfesorState] = useState<Profesor | null>(null);

  useEffect(() => {
    // Cargar profesor almacenado al iniciar app
    const cargarProfesor = async () => {
      try {
        const profesorGuardado = await AsyncStorage.getItem('profesor');
        if (profesorGuardado) {
          setProfesorState(JSON.parse(profesorGuardado));
        }
      } catch (error) {
        console.error('Error al cargar profesor:', error);
      }
    };

    cargarProfesor();
  }, []);

  const setProfesor = async (nuevoProfesor: Profesor | null) => {
    try {
      if (nuevoProfesor) {
        await AsyncStorage.setItem('profesor', JSON.stringify(nuevoProfesor));
      } else {
        await AsyncStorage.removeItem('profesor');
      }
      setProfesorState(nuevoProfesor);
    } catch (error) {
      console.error('Error al guardar profesor:', error);
    }
  };

  return (
    <ProfesorContext.Provider value={{ profesor, setProfesor }}>
      {children}
    </ProfesorContext.Provider>
  );
};

export const useProfesor = () => useContext(ProfesorContext);
