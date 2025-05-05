import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/Navigator';

// Props del screen de perfil, usando correctamente el tipo desde el stack navigator
export type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;

// Props si alguna vez necesitas una pantalla de edición separada
export type EditScreenProps = {
  navigation: {
    goBack: () => void;
  };
};

// Modelo de datos del profesor
export type Profesor = {
  id: string;
  nombre: string;
  correo: string;
  contrasena: string;
  fechaNacimiento: string; // Formato: YYYY-MM-DD
  genero: string;
};
