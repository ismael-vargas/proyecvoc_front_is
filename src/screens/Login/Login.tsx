import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LoginScreenNavigationProp } from './LoginTypes';
import { LoginStyles } from './LoginStyles';
import { loginProfesor } from '../../api/profesorService';
import { useProfesor } from '../../context/ProfesorContext';

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setProfesor } = useProfesor();

  const sanitizeInput = (input: string): string => {
    return input.replace(/[<>"/';]/g, '');
  };

  const handleLogin = async () => {
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);

    if (sanitizedEmail && sanitizedPassword) {
      try {
        const profesor = await loginProfesor(sanitizedEmail, sanitizedPassword);
        if (profesor) {
          console.log('Login exitoso:', profesor);
          setProfesor(profesor); // 👉 GUARDAR EL PROFESOR EN CONTEXTO
          navigation.navigate('Home', { profesor });


        } else {
          Alert.alert('Error', 'Correo o contraseña incorrectos.');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Ocurrió un problema al intentar iniciar sesión.');
      }
    } else {
      Alert.alert('Alerta', 'Por favor ingresa un correo y una contraseña válidos.');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/fondo1.jpg')}
      style={LoginStyles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={LoginStyles.container}>
        <View style={LoginStyles.logoContainer}>
          <Image
            source={require('../../assets/icon.png')}
            style={LoginStyles.logo}
            resizeMode="contain"
          />
          <View style={LoginStyles.title}>
            <Text style={LoginStyles.sosText}>Task</Text>
            <Text style={LoginStyles.nineElevenText}>Time</Text>
          </View>
          <Text style={LoginStyles.subtitle}>Inicia sesión para continuar</Text>
        </View>

        <View style={LoginStyles.inputContainer}>
          <TextInput
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            style={LoginStyles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={LoginStyles.input}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={handleLogin} style={LoginStyles.loginButton}>
            <Text style={LoginStyles.loginButtonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <View style={LoginStyles.registerContainer}>
            <Text style={LoginStyles.registerText}>
              ¿No tienes una cuenta?
              <Text
                style={LoginStyles.registerLink}
                onPress={() => navigation.navigate('Register')}
              >
                {' '}Regístrate
              </Text>
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
