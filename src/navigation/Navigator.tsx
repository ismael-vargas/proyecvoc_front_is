import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet, Text } from 'react-native';

import LoginScreen from '../screens/Login/Login';
import RegisterScreen from '../screens/Register/Register';
import HomeScreen from '../screens/Home/Home';
import ProfileScreen from '../screens/Profile/Profile';
import SubjectsScreen from '../screens/Subjects/Subjects';
import TasksScreen from '../screens/Tasks/Tasks';
import MissionScreen from '../screens/Mission/Mission';
import { Profesor } from '../screens/Profile/types';
import { Materia } from '../screens/Tasks/types';

import Header from '../components/Header/Header';
import CustomSidebar from '../components/Sidebar/Sidebar';
import AllTasksScreen from '../screens/AllTasks/AllTasks'; 

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Profile: undefined;
  Tasks: { materia: Materia };
  Subjects: undefined;
  Mission: undefined;
  AllTasks: undefined; // Aquí agregamos AllTasks
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleOpenMenu = () => setSidebarOpen(true);
  const handleCloseMenu = () => setSidebarOpen(false);

  const ScreenWithLayout = ({
    children,
    title,
  }: {
    children: React.ReactNode;
    title: string;
  }) => (
    <View style={styles.container}>
      <Header onMenuPress={handleOpenMenu} customTitle={title} />
      <CustomSidebar isOpen={sidebarOpen} onClose={handleCloseMenu} />
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  );

  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen
        name="Home"
        children={() => (
          <ScreenWithLayout title="🏠 Inicio">
            <HomeScreen />
          </ScreenWithLayout>
        )}
      />
      <Stack.Screen
        name="Profile"
        children={({ navigation, route }) => (
          <ScreenWithLayout title="👤 Mi Perfil">
            <ProfileScreen navigation={navigation} route={route} />
          </ScreenWithLayout>
        )}
      />
      <Stack.Screen
        name="Subjects"
        children={() => (
          <ScreenWithLayout title="📚 Materias">
            <SubjectsScreen />
          </ScreenWithLayout>
        )}
      />
      <Stack.Screen
        name="Tasks"
        children={({ route }) => {
          const materia = route?.params?.materia;

          if (!materia) {
            return (
              <ScreenWithLayout title="📌 Tareas">
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 16 }}>❌ No se proporcionó la materia.</Text>
                </View>
              </ScreenWithLayout>
            );
          }

          return (
            <ScreenWithLayout title="📌 Tareas">
              <TasksScreen materia={materia} />
            </ScreenWithLayout>
          );
        }}
      />
      <Stack.Screen
        name="Mission"
        children={() => (
          <ScreenWithLayout title="🎯 Misión y Visión">
            <MissionScreen />
          </ScreenWithLayout>
        )}
      />
      {/* Asegúrate de agregar AllTasksScreen */}
      <Stack.Screen
        name="AllTasks"
        children={() => (
          <ScreenWithLayout title="📋 Tareas General">
            <AllTasksScreen />
          </ScreenWithLayout>
        )}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Navigator;
