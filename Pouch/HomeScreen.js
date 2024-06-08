import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Button, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import QRCode from 'react-native-qrcode-svg';

const Tab = createBottomTabNavigator();

const ScreenOne = () => (
  <View style={styles.screenContainer}>
    <Text>Screen One</Text>
  </View>
);

const ScreenTwo = () => (
  <View style={styles.screenContainer}>
    <Text>Screen Two</Text>
  </View>
);

const ScreenThree = () => (
  <View style={styles.screenContainer}>
    <Text>Screen Three</Text>
  </View>
);

const ScreenFour = () => (
  <View style={styles.screenContainer}>
    <Text>Screen Four</Text>
  </View>
);

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator 
      tabBarOptions={{
        activeTintColor: '#88C34A', // Color when tab is selected
        inactiveTintColor: '#000',   // Color when tab is not selected
      }} >
        <Tab.Screen 
          name="Home"
          component={ScreenOne}
          options={() => ({
            tabBarIcon: ({ focused }) => (
              <Image
                source={focused ? require('./assets/home-icon-1.png') : require('./assets/home-icon.png')}
                style={{ width: 20, height: 20 }}
              />
            ),
          })}
        />
        <Tab.Screen 
          name="Stores" 
          component={ScreenTwo}
          options={() => ({
            tabBarIcon: ({ focused }) => (
              <Image
                source={focused ? require('./assets/stores-icon-1.png') : require('./assets/stores-icon.png')}
                style={{ width: 20, height: 20 }}
              />
            ),
          })} 
        />
        <Tab.Screen 
          name="Rewards" 
          component={ScreenThree}
          options={() => ({
            tabBarIcon: ({ focused }) => (
              <Image
                source={focused ? require('./assets/rewards-icon-1.png') : require('./assets/rewards-icon.png')}
                style={{ width: 25, height: 25 }}
              />
            ),
          })} 
        />
        <Tab.Screen 
          name="Account" 
          component={ScreenFour} 
          options={() => ({
            tabBarIcon: ({ focused }) => (
              <Image
                source={focused ? require('./assets/account-icon-1.png') : require('./assets/account-icon.png')}
                style={{ width: 30, height: 30 }}
              />
            ),
          })} 
        />
      </Tab.Navigator>
       <View style={styles.qrButtonContainer}>
        <TouchableOpacity
          style={styles.qrButton}
          onPress={() => setModalVisible(true)}
        >
          <Image source={require('./assets/qr-icon.png')} style={styles.qrIcon} />
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Image source={require('./assets/close-icon.png')} style={styles.closeIcon} />
            </TouchableOpacity>
            <Text style={styles.modalText}>My Pouch QR</Text>
            <QRCode value="https://www.youtube.com/watch?v=BbeeuzU5Qc8" size={200} />
            <Text style={styles.modalText}>P 128 039</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  qrButtonContainer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrButton: {
    width: 50,  // Ensure width and height are equal
    height: 50,
    backgroundColor: '#88C34A',
    borderRadius: 30,  // Half of the height/width value
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 280,
    height: 400,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  qrIcon: {
    position: 'absolute',
    width: 40,
    height: 40,
    top: '40%', // Align the top of the icon to the middle of the button
    left: '44%', // Align the left of the icon to the middle of the button
    marginTop: -15, // Adjust the negative margin to center the icon vertically
    marginLeft: -15, // Adjust the negative margin to center the icon horizontally
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 30,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1, // Ensure the close button is above other content
  },
  closeIcon: {
    width: 30,
    height: 30,
  },
});

export default HomeScreen;
