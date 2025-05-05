import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ChevronLeft, Menu } from 'lucide-react-native';
import { headerStyles } from './HeaderStyles';
import { HeaderProps } from './types';

const Header: React.FC<HeaderProps> = ({
  onMenuPress,
  customTitle,
  showBackButton,
  onBackPress,
}) => {
  const route = useRoute();

  const getTitleByRoute = (): string => {
    if (customTitle) return customTitle;

    switch (route.name) {
      case 'Home':
        return '🏠 Inicio';
      case 'Profile':
        return '👨‍🏫 Mi Perfil';
      case 'Materias':
        return '📚 Materias';
      case 'Tareas':
        return '📝 Tareas';
      case 'MisionVision':
        return '🎯 Misión y Visión';
      default:
        return '🏠 Inicio';
    }
  };

  return (
    <View style={headerStyles.header}>
      <TouchableOpacity
        onPress={showBackButton ? onBackPress : onMenuPress}
        style={headerStyles.menuButton}
        activeOpacity={0.7}
      >
        {showBackButton ? (
          <ChevronLeft size={24} color="#FFFFFF" />
        ) : (
          <Menu size={24} color="#FFFFFF" />
        )}
      </TouchableOpacity>
      <Text numberOfLines={1} style={headerStyles.headerTitle}>
        {getTitleByRoute()}
      </Text>
    </View>
  );
};

export default Header;
