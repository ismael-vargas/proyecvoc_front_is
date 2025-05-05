// src/screens/Profile/ProfileStyles.ts

import { StyleSheet } from "react-native";
import { normalize } from "../../utils/dimensions";

export const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    paddingTop: normalize(20),
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  profileImageContainer: {
    position: "relative",
    alignItems: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  editButton: {
    marginTop: 10,
    backgroundColor: "#76BCE5",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  form: {
    marginTop: 30,
    paddingHorizontal: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    color: "#fff",
  },
  input: {
    backgroundColor: "rgba(118, 188, 229, 0.6)",
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
    color: "#000",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(118, 188, 229, 0.6)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginTop: 8,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: "#000",
  },
  eyeButton: {
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#1D7DA4",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  scrollContainer: {
    paddingBottom: 60,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  picker: {
    width: "100%",
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: "#76BCE5",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
