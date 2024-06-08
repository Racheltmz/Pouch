import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Button, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const HomeScreen = ({navigation}) => {
  const handleProfilePress = () => {
    // Navigate to AccountScreen
    navigation.navigate('Account');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profileContainer} onPress={handleProfilePress}>
        <Image source={require('../assets/profile-icon.png')} style={styles.profileIcon} />
        <Text style={styles.profileText}>Welcome{'\n'}Afreen!</Text>
      </TouchableOpacity>
      <View style={styles.pointsContainer}>
          <Text style={styles.pointsContainerText}>Box Text</Text>
        </View>
      <Text>Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  profileContainer: {
    position: 'absolute',
    top: 0,
    left: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  profileIcon: {
    width: 50,
    height: 50,
    marginLeft: 10,
    marginTop: 10,
  },
  profileText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 17,
    marginTop: 5,
  },
  pointsContainer: {
    height: 30,
    width: 60,
    backgroundColor: '#88C34A',
    borderRadius: 5,
    position: 'absolute',
    top: 30,
    right: 80,
    padding: 10,
  },
  pointsContainerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default HomeScreen;
