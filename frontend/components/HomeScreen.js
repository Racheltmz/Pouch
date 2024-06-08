import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Button, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import QRCode from 'react-native-qrcode-svg';
import StoresScreen from './StoresScreen';

const Tab = createBottomTabNavigator();

const HomeScreen = () => (
  <View style={styles.container}>
    <Text>Home Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
