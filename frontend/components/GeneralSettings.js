import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const GeneralSettings = () => {
  const [isPushEnabled, setIsPushEnabled] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const navigation = useNavigation();

  const toggleSwitch = async () => {
    const newValue = !isPushEnabled;
    setIsPushEnabled(newValue);
    try {
      await AsyncStorage.setItem('pushNotificationsEnabled', JSON.stringify(newValue));
    } catch (error) {
      console.error('Error saving push notification setting:', error);
    }
  };

  const handleDeleteAccount = () => {
    setDeleteModalVisible(false);
    navigation.navigate("Register");
  };

  useEffect(() => {
    const loadSwitchState = async () => {
      try {
        const storedValue = await AsyncStorage.getItem('pushNotificationsEnabled');
        if (storedValue !== null) {
          setIsPushEnabled(JSON.parse(storedValue));
        }
      } catch (error) {
        console.error('Error loading push notification setting:', error);
      }
    };

    loadSwitchState();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.option}>
        <Text style={styles.settingText}>Push Notifications</Text>
        <View style={styles.switchContainer}>
          <Switch
            trackColor={{ false: "#767577", true: "#88C34A" }}
            thumbColor={isPushEnabled ? "#fff" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isPushEnabled}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.option}
        onPress={() => setDeleteModalVisible(true)}
      >
        <Text style={[styles.settingText, { color: 'red' }]}>Delete Account</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={deleteModalVisible}
        animationType="slide"
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Would you like to delete your account permanently?
            </Text>
            <View style={styles.modalButtonsContainer}>
              <Button title="Yes" onPress={handleDeleteAccount} />
              <Button title="No" onPress={() => setDeleteModalVisible(false)} />
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
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  settingText: {
    fontSize: 16,
    color: "#495057",
  },
  option: {
    width: "100%",
    maxHeight: 50,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 17,
    borderWidth: 0.5,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 0.5,
    shadowOffset: { width: 0, height: 1 },
    backgroundColor: "#fff",
  },
  switchContainer: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 270,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 17,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 7,
    marginTop: 7,
    textAlign: "center",
    lineHeight: 23,
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "70%",    
  },
});

export default GeneralSettings;
