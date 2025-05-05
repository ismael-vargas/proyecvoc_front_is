// src/screens/Mission/Mission.tsx

import React from 'react';
import { ScrollView, Text, Image } from 'react-native';
import styles from './MissionStyles';

const MissionScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../../assets/mission.png')}
        style={styles.image}
      />

      <Text style={styles.title}>🎯 Misión</Text>
      <Text style={styles.text}>
        Desarrollar una aplicación móvil de gestión de tareas para nuestro proyecto integrador,
        que permita organizar y dar seguimiento a las actividades de forma práctica y eficiente.
      </Text>

      <Text style={styles.title}>👁️ Visión</Text>
      <Text style={styles.text}>
        Convertirnos en la referencia para la gestión de tareas, ofreciendo una experiencia intuitiva y poderosa.
      </Text>

      <Text style={styles.title}>👨‍💻 Desarrolladores</Text>
      <Text style={styles.text}>
        • Ismael Vargas{"\n"}
        • Alejandro Ortiz{"\n"}
        • Kevin Carvajal
      </Text>

      <Text style={styles.goalText}>🎓 Objetivo: Pasar el semestre</Text>
    </ScrollView>
  );
};

export default MissionScreen;
