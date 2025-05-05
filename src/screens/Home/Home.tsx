import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { styles } from './HomeStyles';

const Home = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>¡Bienvenido a Task Time!</Text>
        <Text style={styles.subtitle}>
          Una app sencilla y eficiente para gestionar tus tareas diarias
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🛠️ Funcionalidades</Text>
        <Text style={styles.text}>• Crea nuevas tareas de forma rápida</Text>
        <Text style={styles.text}>• Edita tareas existentes cuando lo necesites</Text>
        <Text style={styles.text}>• Elimina tareas que ya no necesites</Text>
        <Text style={styles.text}>• Visualiza tu lista de tareas</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📌 Consejo del Día</Text>
        <Text style={styles.text}>
          Gestionar tus tareas a tiempo es la clave para mantenerte organizado y sin estrés.
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>📝 Tarea Time - Organiza, edita y cumple tus metas</Text>
      </View>
    </ScrollView>
  );
};

export default Home;
