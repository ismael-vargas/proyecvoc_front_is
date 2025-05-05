import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RegisterScreenNavigationProp } from './RegisterTypes';
import { RegisterStyles } from './RegisterStyles';
import { Picker } from '@react-native-picker/picker';
import { crearProfesor } from '../../api/profesorService';
import { useProfesor } from '../../context/ProfesorContext';

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [genero, setGenero] = useState('');

  const { setProfesor } = useProfesor();

  const handleRegister = async () => {
    if (nombre && correo && contraseña && fechaNacimiento && genero) {
      try {
        const nuevoProfesor = await crearProfesor({
          nombre,
          correo,
          contrasena: contraseña,
          fechaNacimiento,
          genero,
        });

        setProfesor(nuevoProfesor); // 👉 GUARDAR EL PROFESOR EN CONTEXTO
        Alert.alert('Éxito', 'Registro completado correctamente');
        navigation.navigate('Home', { profesor: nuevoProfesor });



      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Hubo un problema al registrar, intenta más tarde');
      }
    } else {
      Alert.alert('Error', 'Por favor, completa todos los campos');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/reg.jpg')}
      style={RegisterStyles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={RegisterStyles.container}>
        <ScrollView contentContainerStyle={RegisterStyles.scrollContent}>
          <View style={RegisterStyles.headerContainer}>
            <Text style={RegisterStyles.title}>Crear Cuenta</Text>
            <Text style={RegisterStyles.subtitle}>Ingresa tus datos para registrarte</Text>
          </View>

          <View style={RegisterStyles.formContainer}>
            <View style={RegisterStyles.inputGroup}>
              <Text style={RegisterStyles.label}>Nombre completo</Text>
              <TextInput
                style={RegisterStyles.input}
                value={nombre}
                onChangeText={setNombre}
                placeholder="Nombre completo"
              />
            </View>

            <View style={RegisterStyles.inputGroup}>
              <Text style={RegisterStyles.label}>Correo electrónico</Text>
              <TextInput
                style={RegisterStyles.input}
                value={correo}
                onChangeText={setCorreo}
                placeholder="Correo electrónico"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={RegisterStyles.inputGroup}>
              <Text style={RegisterStyles.label}>Contraseña</Text>
              <TextInput
                style={RegisterStyles.input}
                value={contraseña}
                onChangeText={setContraseña}
                placeholder="Contraseña"
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            <View style={RegisterStyles.inputGroup}>
              <Text style={RegisterStyles.label}>Fecha de nacimiento</Text>
              <TextInput
                style={RegisterStyles.input}
                value={fechaNacimiento}
                onChangeText={setFechaNacimiento}
                placeholder="YYYY-MM-DD"
              />
            </View>

            <View style={RegisterStyles.inputGroup}>
              <Text style={RegisterStyles.label}>Género</Text>
              <View style={RegisterStyles.pickerContainer}>
                <Picker
                  selectedValue={genero}
                  onValueChange={(itemValue) => setGenero(itemValue)}
                  style={RegisterStyles.picker}
                >
                  <Picker.Item label="Seleccione una opción" value="" />
                  <Picker.Item label="Masculino" value="Masculino" />
                  <Picker.Item label="Femenino" value="Femenino" />
                </Picker>
              </View>
            </View>

            <TouchableOpacity style={RegisterStyles.registerButton} onPress={handleRegister}>
              <Text style={RegisterStyles.registerButtonText}>Registrarse</Text>
            </TouchableOpacity>

            <View style={RegisterStyles.loginContainer}>
              <Text style={RegisterStyles.loginText}>¿Ya tienes una cuenta?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={RegisterStyles.loginLink}>Inicia sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
