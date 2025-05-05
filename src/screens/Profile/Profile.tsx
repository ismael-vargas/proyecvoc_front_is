// src/screens/Profile/Profile.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  Modal,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "./ProfileStyles";
import { AntDesign } from "@expo/vector-icons";
import CustomSidebar from "../../components/Sidebar/Sidebar";
import { Profesor, ProfileScreenProps } from "./types";
import { API_URL } from "../../api/config";
import { useProfesor } from '../../context/ProfesorContext';


const ProfileScreen = ({ route, navigation }: ProfileScreenProps) => {
  const { profesor } = useProfesor(); // ⬅️ usamos el profesor del contexto


  if (!profesor) {
    return (
      <ImageBackground
        source={require("../../assets/regis.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
          <Text style={{ color: "white", fontSize: 18 }}>Cargando perfil...</Text>
        </View>
      </ImageBackground>
    );
  }

  const [nombre, setNombre] = useState(profesor.nombre);
  const [correo, setCorreo] = useState(profesor.correo);
  const [contrasena, setContrasena] = useState(profesor.contrasena);
  const [fechaNacimiento, setFechaNacimiento] = useState(profesor.fechaNacimiento);
  const [genero, setGenero] = useState(profesor.genero);

  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage] = useState(require("../../assets/perfi.png"));
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);

  const handleEditPress = () => setIsEditing(true);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSavePress = async () => {
    const updatedProfesor: Profesor = {
      ...profesor,
      nombre,
      correo,
      contrasena,
      fechaNacimiento,
      genero,
    };
    try {
      const resp = await fetch(`${API_URL}/profesor/${profesor.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProfesor),
      });
      if (!resp.ok) throw new Error(`Status ${resp.status}`);
      await resp.json();
      setIsEditing(false);
    } catch (e) {
      console.error(e);
      alert("No se pudo guardar el perfil.");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/regis.jpg")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.profileContainer}>
            <View style={localStyles.profileImageContainer}>
              <Image source={profileImage} style={styles.profileImage} />
              {!isEditing && (
                <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
                  <Text style={styles.editButtonText}>Editar Perfil</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
              editable={isEditing}
            />

            <Text style={styles.label}>Correo</Text>
            <TextInput
              style={styles.input}
              value={correo}
              onChangeText={setCorreo}
              editable={isEditing}
              keyboardType="email-address"
            />

            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={contrasena}
                onChangeText={setContrasena}
                secureTextEntry={!showPassword}
                editable={isEditing}
              />
              {isEditing && (
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeButton}>
                  <AntDesign
                    name={showPassword ? "eye" : "eyeo"}
                    size={24}
                    color="gray"
                  />
                </TouchableOpacity>
              )}
            </View>

            <Text style={styles.label}>Fecha de Nacimiento</Text>
            <TextInput
              style={styles.input}
              value={fechaNacimiento}
              onChangeText={setFechaNacimiento}
              editable={isEditing}
              placeholder="YYYY-MM-DD"
            />

            <Text style={styles.label}>Género</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setIsGenderModalVisible(true)}
              disabled={!isEditing}
            >
              <Text style={{ color: genero ? "#000" : "#888" }}>
                {genero || "Selecciona género"}
              </Text>
            </TouchableOpacity>

            {isEditing && (
              <TouchableOpacity style={styles.button} onPress={handleSavePress}>
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={isGenderModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsGenderModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Picker
              selectedValue={genero}
              onValueChange={(val) => {
                setGenero(val);
                setIsGenderModalVisible(false);
              }}
              style={styles.picker}
            >
              <Picker.Item label="Masculino" value="Masculino" />
              <Picker.Item label="Femenino" value="Femenino" />
            </Picker>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setIsGenderModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <CustomSidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
    </ImageBackground>
  );
};

const localStyles = StyleSheet.create({
  profileImageContainer: {
    position: "relative",
  },
});

export default ProfileScreen;
