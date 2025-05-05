import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  Pressable,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './TasksStyles';
import { Tarea, Materia } from './types';
import { getTareasPorMateria, createTarea, updateTarea, deleteTarea } from '../../api/tareaService';

type Props = {
  materia: Materia;
};

const Tasks: React.FC<Props> = ({ materia }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [enlaceExterno, setEnlaceExterno] = useState('');
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState<Tarea | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  const limpiarCampos = () => {
    setTitulo('');
    setDescripcion('');
    setEnlaceExterno('');
    setEditandoId(null);
  };

  const guardarTarea = async () => {
    if (!titulo || !descripcion) {
      Alert.alert('Completa todos los campos');
      return;
    }

    const nuevaTarea: Omit<Tarea, 'id'> = {
      titulo,
      descripcion,
      enlaceExterno,
      materiaId: materia.id,
    };

    try {
      if (editandoId) {
        const tareaActualizada = await updateTarea(editandoId, nuevaTarea);
        setTareas((prev) =>
          prev.map((t) => (t.id === editandoId ? tareaActualizada : t))
        );
      } else {
        const tareaCreada = await createTarea(nuevaTarea);
        setTareas((prev) => [...prev, tareaCreada]);
      }
    } catch (error) {
      console.error('Error al guardar tarea:', error);
    }

    limpiarCampos();
  };

  const editarTarea = (tarea: Tarea) => {
    setTitulo(tarea.titulo);
    setDescripcion(tarea.descripcion);
    setEnlaceExterno(tarea.enlaceExterno ?? '');
    setEditandoId(tarea.id);
  };

  const eliminarTarea = (id: string) => {
    Alert.alert('Eliminar tarea', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteTarea(id);
            setTareas(tareas.filter((t) => t.id !== id));
            if (editandoId === id) limpiarCampos();
          } catch (error) {
            console.error('Error al eliminar tarea:', error);
          }
        },
      },
    ]);
  };

  const mostrarDetalles = (tarea: Tarea) => {
    setTareaSeleccionada(tarea);
    setModalVisible(true);
  };

  const totalPages = Math.ceil(tareas.length / tasksPerPage);
  const currentTasks = tareas.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  const fetchTareas = async () => {
    try {
      const tareasPorMateria = await getTareasPorMateria(materia.id);
      setTareas(tareasPorMateria);
    } catch (error) {
      console.error('Error al obtener tareas:', error);
    }
  };

  useEffect(() => {
    fetchTareas();
  }, [materia]);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tareas de {materia.nombre}</Text>

      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <TextInput
        style={styles.input}
        placeholder="Enlace externo (opcional)"
        value={enlaceExterno}
        onChangeText={setEnlaceExterno}
      />

      <TouchableOpacity style={styles.boton} onPress={guardarTarea}>
        <Ionicons name={editandoId ? 'save' : 'add-circle'} size={20} color="white" />
        <Text style={styles.botonTexto}>
          {editandoId ? 'Actualizar Tarea' : 'Agregar Tarea'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={currentTasks}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => mostrarDetalles(item)}>
            <ImageBackground
              source={require('../../assets/mate.jpg')}
              style={styles.tareaItem}
              imageStyle={{ borderRadius: 10 }}
            >
              <View style={styles.tareaOverlay}>
                <View style={styles.tareaHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.tareaTitulo}>{item.titulo}</Text>
                    <Text style={styles.tareaDescripcion}>{item.descripcion}</Text>
                    {item.enlaceExterno ? (
                      <Text style={styles.link}>{item.enlaceExterno}</Text>
                    ) : null}
                  </View>
                  <View style={styles.iconos}>
                    <TouchableOpacity onPress={() => editarTarea(item)}>
                      <Ionicons name="create-outline" size={20} color="#222" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => eliminarTarea(item.id)} style={{ marginLeft: 10 }}>
                      <Ionicons name="trash-outline" size={20} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}
      />

      {/* Paginación */}
      {totalPages > 1 && (
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
          <TouchableOpacity
            onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            style={[styles.boton, { marginHorizontal: 5 }]}
          >
            <Text style={styles.botonTexto}>Anterior</Text>
          </TouchableOpacity>
          <Text style={{ paddingHorizontal: 10, alignSelf: 'center' }}>
            Página {currentPage} de {totalPages}
          </Text>
          <TouchableOpacity
            onPress={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            style={[styles.boton, { marginHorizontal: 5 }]}
          >
            <Text style={styles.botonTexto}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Modal de Detalle */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>Detalle de la tarea</Text>
            {tareaSeleccionada && (
              <>
                <Text style={styles.modalTexto}>Título: {tareaSeleccionada.titulo}</Text>
                <Text style={styles.modalTexto}>Descripción: {tareaSeleccionada.descripcion}</Text>
                {tareaSeleccionada.enlaceExterno ? (
                  <Text style={styles.modalTexto}>Enlace: {tareaSeleccionada.enlaceExterno}</Text>
                ) : null}
              </>
            )}
            <Pressable style={styles.cerrarModal} onPress={() => setModalVisible(false)}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Tasks;
