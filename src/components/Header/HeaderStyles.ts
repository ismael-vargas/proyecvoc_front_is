import { StyleSheet, Platform, StatusBar } from 'react-native';
import { normalize } from '../../utils/dimensions';

export const headerStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: normalize(16),
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 12 : normalize(32),

    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: '#1c1c1c', // Fondo oscuro visible y elegante
  },
  menuButton: {
    padding: normalize(8),
    borderRadius: normalize(8),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  headerTitle: {
    fontSize: normalize(20),
    fontWeight: '500',
    marginLeft: normalize(16),
    color: '#FFFFFF',
    letterSpacing: 0.5,
    flex: 1,
  },
});
 