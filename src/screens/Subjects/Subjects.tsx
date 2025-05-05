import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ImageBackground,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { styles } from './SubjectStyles';
import { Materia } from './types';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { getMaterias, createMateria, updateMateria, deleteMateria } from '../../api/materiaService';
import { useProfesor } from '../../context/ProfesorContext'; // Importamos tu context

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const Subjects: React.FC = () => {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editando, setEditando] = useState<Materia | null>(null);
  const navigation = useNavigation<any>();
  const { profesor } = useProfesor(); // Obtenemos el profesor logeado

  useEffect(() => {
    if (profesor?.id) {
      cargarMaterias();
    }
  }, [profesor?.id]); // Cuando haya profesor, carga materias

  const cargarMaterias = async () => {
    try {
      if (!profesor?.id) return; // Asegurarse de que existe el ID
      const data = await getMaterias(profesor.id); // Traemos materias de ese profesor
      setMaterias(data);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudieron cargar las materias');
    }
  };

  const toggleFormulario = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setMostrarFormulario(!mostrarFormulario);
    setEditando(null);
    setNombre('');
    setDescripcion('');
  };

  const guardarMateria = async () => {
    if (!nombre || !descripcion) {
      Alert.alert('Campos incompletos', 'Por favor completa todos los campos');
      return;
    }
  
    try {
      if (!profesor?.id) {
        Alert.alert('Error', 'No se encontró el profesor');
        return;
      }
  
      if (editando) {
        // ✅ Ahora también mandamos profesorId
        await updateMateria(editando.id, { nombre, descripcion, profesorId: profesor.id });
      } else {
        const nuevaMateria = { nombre, descripcion, profesorId: profesor.id };
        await createMateria(nuevaMateria, profesor.id);
      }
      await cargarMaterias();
      toggleFormulario();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo guardar la materia');
    }
  };
  
  const editarMateria = (materia: Materia) => {
    setEditando(materia);
    setNombre(materia.nombre);
    setDescripcion(materia.descripcion);
    setMostrarFormulario(true);
  };

  const eliminarMateria = (id: string) => {
    Alert.alert('¿Eliminar?', 'Esta acción no se puede deshacer', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteMateria(id);
            await cargarMaterias();
          } catch (error) {
            console.error(error);
            Alert.alert('Error', 'No se pudo eliminar la materia');
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: Materia }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Tasks', { materia: item })}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={require('../../assets/mater.jpg')}
        style={styles.cardBackground}
        imageStyle={{ borderRadius: 10 }}
      >
        <View style={styles.cardOverlay}>
          <Text style={styles.cardTitle}>{item.nombre}</Text>
          <Text style={styles.cardSubtitle}>{item.descripcion}</Text>
          <View style={styles.cardActions}>
            <TouchableOpacity onPress={() => editarMateria(item)} style={styles.iconButton}>
              <Ionicons name="create-outline" size={22} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => eliminarMateria(item.id)} style={styles.iconButton}>
              <Ionicons name="trash-outline" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={toggleFormulario}>
        <MaterialIcons
          name={mostrarFormulario ? 'close' : 'add'}
          size={24}
          color="#fff"
        />
        <Text style={styles.addButtonText}>
          {mostrarFormulario ? 'Cancelar' : 'Agregar Materia'}
        </Text>
      </TouchableOpacity>

      {mostrarFormulario && (
        <View style={styles.form}>
          <Text style={styles.formTitle}>
            {editando ? 'Editar Materia' : 'Nueva Materia'}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            style={styles.input}
            placeholder="Descripción"
            value={descripcion}
            onChangeText={setDescripcion}
          />
          <TouchableOpacity style={styles.saveButton} onPress={guardarMateria}>
            <FontAwesome name="save" size={18} color="#fff" />
            <Text style={styles.saveButtonText}>
              {editando ? 'Actualizar' : 'Guardar'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={materias}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

export default Subjects;
