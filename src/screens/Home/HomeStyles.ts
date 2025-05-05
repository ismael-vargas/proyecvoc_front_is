import { StyleSheet } from 'react-native';
import { normalize, screenWidth } from '../../utils/dimensions';

const COLORS = {
  background: '#121C1C',
  light: '#1C2A2A',
  white: '#FFFFFF',
  accent: '#a3f7bf',
  text: '#d4d4d4',
  secondary: '#a0a0a0',
  highlight: '#00b894',
};

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: normalize(20),
    alignItems: 'center',
  },

  header: {
    alignItems: 'center',
    marginBottom: normalize(25),
  },

  logo: {
    width: normalize(80),
    height: normalize(80),
    borderRadius: normalize(40),
    marginBottom: normalize(15),
    backgroundColor: '#fff3',
  },

  title: {
    fontSize: normalize(22),
    fontWeight: '700',
    color: COLORS.white,
    letterSpacing: 1,
  },

  subtitle: {
    fontSize: normalize(14),
    color: COLORS.secondary,
    marginTop: normalize(5),
    textAlign: 'center',
  },

  section: {
    width: '100%',
    backgroundColor: COLORS.light,
    borderRadius: normalize(12),
    padding: normalize(15),
    marginBottom: normalize(20),
    borderColor: '#ffffff11',
    borderWidth: 1,
  },

  sectionTitle: {
    fontSize: normalize(18),
    color: COLORS.accent,
    fontWeight: '600',
    marginBottom: normalize(8),
  },

  text: {
    fontSize: normalize(14),
    color: COLORS.text,
    marginBottom: normalize(4),
    lineHeight: normalize(20),
  },

  footer: {
    marginTop: normalize(30),
    padding: normalize(10),
  },

  footerText: {
    fontSize: normalize(12),
    color: COLORS.secondary,
    textAlign: 'center',
  },
});
