// src/components/Sidebar/Sidebar.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  BackHandler,
  Image,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './SidebarStyles';
import { CustomSidebarProps, MenuItem, RootStackParamList } from './types';
import { normalize } from '../../utils/dimensions';
import { useProfesor } from '../../context/ProfesorContext'; // Importamos el contexto

const CustomSidebar: React.FC<CustomSidebarProps> = ({ isOpen, onClose }) => {
  const [slideAnim] = useState(new Animated.Value(-styles.sidebar.width));
  const [overlayAnim] = useState(new Animated.Value(0));

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { profesor } = useProfesor(); // Traemos el profesor desde el contexto

  const menuItems: MenuItem[] = [
    { title: 'Inicio', screen: 'Home', icon: 'home' },
    { title: 'Mi Perfil', screen: 'Profile', icon: 'account-circle' },
    { title: 'Materias', screen: 'Subjects', icon: 'book-open-page-variant' },
    { title: 'Tareas', screen: 'AllTasks', icon: 'file-document-edit' },  // Cambié a AllTasks
    { title: 'Misión y Visión', screen: 'Mission', icon: 'target' },
  ];

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (isOpen) {
        onClose();
        return true;
      }
      return false;
    });
    return () => backHandler.remove();
  }, [isOpen, onClose]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: isOpen ? 0 : -styles.sidebar.width,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnim, {
        toValue: isOpen ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isOpen]);

  const handleMenuPress = (item: MenuItem) => {
    onClose();

    if (item.screen === 'Profile') {
      if (profesor) {
        navigation.navigate('Profile', { profesor });
      } else {
        navigation.navigate('Login');
      }
    } else {
      // Cambié aquí para que Tareas dirija a 'AllTasks'
      navigation.navigate(item.screen);
    }
  };

  const handleLogout = () => {
    onClose();
    navigation.navigate('Login');
  };

  return (
    <>
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: overlayAnim,
            pointerEvents: isOpen ? 'auto' : 'none',
          },
        ]}
      >
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={onClose} />
      </Animated.View>

      <Animated.View
        style={[
          styles.sidebar,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Image
              source={require('../../assets/icon.png')}
              style={styles.headerImage}
              resizeMode="contain"
            />
            <View style={styles.headerContent}>
              <Text style={styles.headerText}>Task Time</Text>
              <Text style={styles.headerSubText}>Bienvenido</Text>
            </View>
          </View>

          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => handleMenuPress(item)}
              >
                <MaterialCommunityIcons
                  name={item.icon}
                  size={normalize(24)}
                  color="#fff"
                  style={{ marginRight: normalize(10) }}
                />
                <Text style={styles.menuText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <MaterialCommunityIcons
              name="logout"
              size={normalize(24)}
              color="#fff"
              style={{ marginRight: normalize(10) }}
            />
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Animated.View>
    </>
  );
};

export default CustomSidebar;
