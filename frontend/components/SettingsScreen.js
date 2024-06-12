import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../context/AppContext";

const SettingsScreen = () => {
  const { curUser, setUID, updateUsername, updateContactNumber, updateContactEmail } = useContext(AppContext);
  const [usernameModalVisible, setUsernameModalVisible] = useState(false);
  const [contactNumberModalVisible, setContactNumberModalVisible] =
    useState(false);
  const [contactEmailModalVisible, setContactEmailModalVisible] =
    useState(false);
  const [usernameConfirmModalVisible, setUsernameConfirmModalVisible] =
    useState(false);
  const [
    contactNumberConfirmModalVisible,
    setContactNumberConfirmModalVisible,
  ] = useState(false);
  const [contactEmailConfirmModalVisible, setContactEmailConfirmModalVisible] =
    useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newContactNumber, setNewContactNumber] = useState("");
  const [newContactEmail, setNewContactEmail] = useState("");
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate("Register");
    setUID(null);
  };

  const handleSaveUsername = () => {
    updateUsername(newUsername);
    setUsernameModalVisible(false);
    setNewUsername("");
  };

  const handleSaveContactNumber = () => {
    updateContactNumber(newContactNumber);
    setContactNumberModalVisible(false);
    setNewContactNumber("");
  };

  const handleSaveContactEmail = () => {
    updateContactEmail(newContactEmail);
    setContactEmailModalVisible(false);
    setNewContactEmail("");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.settingOption}
        onPress={() => setUsernameConfirmModalVisible(true)}
      >
        <Text style={styles.settingText}>Username</Text>
        <Text style={styles.arrow}>&gt;</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingOption}
        onPress={() => setContactNumberConfirmModalVisible(true)}
      >
        <Text style={styles.settingText}>Contact Number</Text>
        <Text style={styles.arrow}>&gt;</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingOption}
        onPress={() => setContactEmailConfirmModalVisible(true)}
      >
        <Text style={styles.settingText}>Contact Email</Text>
        <Text style={styles.arrow}>&gt;</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity
        style={styles.settingOption}
        onPress={() => navigation.navigate("GeneralSettings")}
      >
        <Text style={styles.settingText}>General Settings</Text>
        <Text style={styles.arrow}>&gt;</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingOption}
        onPress={() => alert("FAQs clicked")}
      >
        <Text style={styles.settingText}>Frequently Asked Questions</Text>
        <Text style={styles.arrow}>&gt;</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Confirmation Modals */}
      <Modal
        visible={usernameConfirmModalVisible}
        transparent={true}
        animationIn="zoomIn"
        animationOut="zoomOut"
        useNativeDriver={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.textUpdate}>Current Username: {curUser.username}</Text>
            <Text style={styles.textUpdate}>Are you sure you want to change it?</Text>
            <View style={styles.modalButtonsContainer}>
              <Button
                title="Yes"
                onPress={() => {
                  setUsernameConfirmModalVisible(false);
                  setUsernameModalVisible(true);
                }}
              />
              <Button
                title="No"
                onPress={() => setUsernameConfirmModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={contactNumberConfirmModalVisible}
        transparent={true}
        animationIn="zoomIn"
        animationOut="zoomOut"
        useNativeDriver={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.textUpdate}>Current Contact Number: 87654321</Text>
            <Text style={styles.textUpdate}>Are you sure you want to change it?</Text>
            <View style={styles.modalButtonsContainer}>
              <Button
                title="Yes"
                onPress={() => {
                  setContactNumberConfirmModalVisible(false);
                  setContactNumberModalVisible(true);
                }}
              />
              <Button
                title="No"
                onPress={() => setContactNumberConfirmModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={contactEmailConfirmModalVisible}
        transparent={true}
        animationIn="zoomIn"
        animationOut="zoomOut"
        useNativeDriver={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.textUpdate}>Current Contact Email: {curUser.contactEmail}</Text>
            <Text style={styles.textUpdate}>Are you sure you want to change it?</Text>
            <View style={styles.modalButtonsContainer}>
              <Button
                title="Yes"
                onPress={() => {
                  setContactEmailConfirmModalVisible(false);
                  setContactEmailModalVisible(true);
                }}
              />
              <Button
                title="No"
                onPress={() => setContactEmailConfirmModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Modals for editing user info */}
      <Modal
        visible={usernameModalVisible}
        transparent={true}
        animationIn="zoomIn"
        animationOut="zoomOut"
        useNativeDriver={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.textUpdate}>Edit Username</Text>
            <TextInput
              style={styles.input}
              value={newUsername}
              onChangeText={setNewUsername}
              placeholder="Enter new username"
            />
            <View style={styles.modalButtonsContainer}>
              <Button title="Save" onPress={handleSaveUsername} />
              <Button title="Cancel" onPress={() => { setUsernameModalVisible(false); }} />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={contactNumberModalVisible}
        transparent={true}
        animationIn="zoomIn"
        animationOut="zoomOut"
        useNativeDriver={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.textUpdate}>Edit Contact Number</Text>
            <TextInput
              style={styles.input}
              value={newContactNumber}
              onChangeText={setNewContactNumber}
              placeholder="Enter new contact number"
            />
            <View style={styles.modalButtonsContainer}>
              <Button title="Save" onPress={handleSaveContactNumber} />
              <Button title="Cancel" onPress={() => { setContactNumberModalVisible(false); }} />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={contactEmailModalVisible}
        transparent={true}
        animationIn="zoomIn"
        animationOut="zoomOut"
        useNativeDriver={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.textUpdate}>Edit Contact Email</Text>
            <TextInput
              style={styles.input}
              value={newContactEmail}
              onChangeText={setNewContactEmail}
              placeholder="Enter new contact email"
            />
            <View style={styles.modalButtonsContainer}>
              <Button title="Save" onPress={handleSaveContactEmail} />
              <Button title="Cancel" onPress={() => { setContactEmailModalVisible(false); }} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  settingOption: {
    backgroundColor: "#fff",
    borderRadius: 10,
    maxHeight: 50,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 0.5,
    borderRadius: 17,
    borderColor: "#ccc",
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 0.5,
    shadowOffset: { width: 0, height: 2 },
  },
  settingText: {
    fontSize: 16,
    color: "#495057",
  },
  arrow: {
    fontSize: 16,
    color: "#88C34A",
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 20,
  },
  logoutButton: {
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 10,
    width: "60%",
    justifyContent: "center",
    alignSelf: "center",
    borderWidth: 1.5,
    borderColor: "#88C34A",
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 0.5,
    shadowOffset: { width: 0, height: 2.3 },
  },
  logoutText: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    marginTop: 10,
  },
  modalContent: {
    width: 300,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  input: {
    height: 40,
    width: 250,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  textUpdate: {
    padding: 10,
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "70%",
  },
});

export default SettingsScreen;