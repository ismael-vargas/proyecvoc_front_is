import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const RegisterStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',    // antes: '#f5f5f5'
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',    // agrega esto
  },
  headerContainer: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40, // Bajamos el título 1cm aprox
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00ACAC',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  formContainer: {
    width: '100%',
    paddingTop: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    height: 54, // Aumentado un poco más para mostrar bien la opción
    justifyContent: 'center', // Centrar verticalmente el contenido
  },
  picker: {
    height: 54, // Coincidir con el contenedor
    width: '100%',
    color: '#333',
    fontSize: 16, // Asegura que el texto sea legible
  },
  
  registerButton: {
    backgroundColor: '#00ACAC',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  loginText: {
    color: '#666',
    fontSize: 14,
  },
  loginLink: {
    color: '#00ACAC',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 4,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  
});
