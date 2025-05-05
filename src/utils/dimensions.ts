import { Dimensions, Platform } from 'react-native';

// Capturamos el ancho del dispositivo una vez
const { width: DEVICE_WIDTH } = Dimensions.get('window');

// Establecemos una escala basada en un ancho base de diseño (375)
const baseWidth = 375;
const proportion = DEVICE_WIDTH / baseWidth;

/**
 * Ajusta una medida según el tamaño de la pantalla
 * @param value - Número que se desea escalar
 * @returns Valor ajustado para mantener proporciones en distintos tamaños de pantalla
 */
export const normalize = (value: number): number => {
  const adjusted = value * proportion;
  // En Android se recomienda usar valores redondeados para mayor precisión visual
  return Platform.OS === 'android' ? Math.round(adjusted) : adjusted;
};

// Valor del ancho que puede ser reutilizado en distintas partes del proyecto
export const screenWidth = DEVICE_WIDTH;
