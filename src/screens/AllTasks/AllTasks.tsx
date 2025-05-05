import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  Pressable,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './AllTasksStyles';
import { Tarea } from '../Tasks/types';
import { getTodasLasTareas, deleteTarea } from '../../api/tareaService';
import { useProfesor } from '../../context/ProfesorContext';
import { getMaterias } from '../../api/materiaService';

const AllTasks: React.FC = () => {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState<Tarea | null>(null);
  const { profesor } = useProfesor();

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  const totalPages = Math.ceil(tareas.length / tasksPerPage);
  const currentTasks = tareas.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  const mostrarDetalles = (tarea: Tarea) => {
    setTareaSeleccionada(tarea);
    setModalVisible(true);
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
            setTareas((prev) => prev.filter((t) => t.id !== id));
          } catch (error) {
            console.error('Error al eliminar tarea:', error);
          }
        },
      },
    ]);
  };

  const fetchTareas = async () => {
    try {
      const [todasLasTareas, materias] = await Promise.all([
        getTodasLasTareas(),
        getMaterias(profesor?.id || '')

      ]);

      const idsMateriasDelProfesor = materias.map((m) => m.id);

      const tareasDelProfesor = todasLasTareas.filter((tarea) =>
        idsMateriasDelProfesor.includes(tarea.materiaId)
      );

      setTareas(tareasDelProfesor);
    } catch (error) {
      console.error('Error al obtener tareas:', error);
    }
  };

  useEffect(() => {
    fetchTareas();
  }, [profesor]);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Todas las Tareas</Text>

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
                    <TouchableOpacity onPress={() => mostrarDetalles(item)}>
                      <Ionicons name="eye-outline" size={20} color="#222" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => eliminarTarea(item.id)}
                      style={{ marginLeft: 10 }}
                    >
                      <Ionicons name="trash-outline" size={20} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}
      />

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

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>Detalle de la tarea</Text>
            {tareaSeleccionada && (
              <>
                <Text style={styles.modalTexto}>Título: {tareaSeleccionada.titulo}</Text>
                <Text style={styles.modalTexto}>Descripción: {tareaSeleccionada.descripcion}</Text>
                {tareaSeleccionada.enlaceExterno && (
                  <Text style={styles.modalTexto}>Enlace: {tareaSeleccionada.enlaceExterno}</Text>
                )}
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

export default AllTasks;
