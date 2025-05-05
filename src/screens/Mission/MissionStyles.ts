// src/screens/Mission/MissionStyles.ts

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f8ff', // azulito claro
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#003366',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#333',
    textAlign: 'justify',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  goalText: {
    fontSize: 18,
    color: '#008080',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default styles;
