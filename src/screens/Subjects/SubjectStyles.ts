import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafe',
    padding: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5C9EFF',
    padding: 12,
    borderRadius: 10,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
  form: {
    backgroundColor: '#fff',
    marginTop: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fefefe',
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: '#5C9EFF',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 4,
    backgroundColor: '#ddd',
  },
  cardBackground: {
    height: 120,
    justifyContent: 'flex-end',
  },
  cardOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 14,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 4,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: 10,
  },
  iconButton: {
    paddingHorizontal: 8,
  },
});
