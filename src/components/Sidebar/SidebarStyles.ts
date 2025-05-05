import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';
import { normalize, screenWidth } from '../../utils/dimensions';

const SIDEBAR_WIDTH = Math.min(screenWidth * 0.8, 300);
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 47 : StatusBar.currentHeight || 0;

const shadowProps = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.3,
  shadowRadius: 6,
  elevation: 8,
};

const COLORS = {
  primary: '#d4d4d4',
  text: '#ffffff',
  textSecondary: '#a0a0a0',
  background: 'rgba(18, 32, 32, 0.95)',
  backgroundLight: 'rgba(28, 42, 42, 0.98)',
  border: 'rgba(255, 255, 255, 0.1)',
  highlight: 'rgba(255, 255, 255, 0.05)',
  logout: '#b94141',
  overlay: 'rgba(12, 22, 22, 0.85)',
};

export const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
    zIndex: 1,
  },
  sidebar: {
    position: 'absolute',
    top: STATUSBAR_HEIGHT,
    left: 0,
    bottom: 0,
    width: SIDEBAR_WIDTH,
    backgroundColor: COLORS.background,
    zIndex: 2,
    ...shadowProps,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: normalize(20),
    backgroundColor: COLORS.backgroundLight,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerImage: {
    width: normalize(65),
    height: normalize(65),
    marginRight: normalize(15),
    borderRadius: normalize(50),
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  headerContent: {
    flex: 1,
  },
  headerText: {
    fontSize: normalize(24),
    fontWeight: '600',
    color: COLORS.text,
    letterSpacing: 0.5,
  },
  headerSubText: {
    fontSize: normalize(14),
    color: COLORS.textSecondary,
    marginTop: normalize(4),
  },
  menuContainer: {
    flex: 1,
    paddingTop: normalize(15),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(15),
    paddingHorizontal: normalize(20),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuText: {
    fontSize: normalize(16),
    color: COLORS.primary,
    marginLeft: normalize(5),
    letterSpacing: 0.3,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: normalize(20),
    backgroundColor: COLORS.backgroundLight,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  logoutText: {
    fontSize: normalize(16),
    color: COLORS.logout,
    fontWeight: '500',
  },
});
