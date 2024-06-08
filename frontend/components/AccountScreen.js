import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Stack = createNativeStackNavigator();
const AccountHomeScreen = ({ navigation }) => {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.greenCard} onPress={() => navigation.navigate('Rewards')}>
          <Text style={styles.greenCardText}>Green</Text>
          <Text style={styles.greenCardText}>Claim rewards</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pointsBar} onPress={() => navigation.navigate('PointsHistory')}>
          <Text style={styles.points}>1000 points</Text>
          <Text style={styles.pointsProgress}>21.15 points to Silver!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('MyRewards')}>
          <Text style={styles.cardTitle}>My Rewards</Text>
          <Text style={styles.cardPoints}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('MyReferrals')}>
          <Text style={styles.cardTitle}>My Referrals</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };
  const AccountScreen = ({ navigation }) => {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Afreen</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Icon name="settings-outline" size={30} color="#000" style={styles.settingsIcon} />
          </TouchableOpacity>
        </View>
        <AccountHomeScreen navigation={navigation} />
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f9f9f9',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#fff',
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000',
    },
    settingsIcon: {
      marginRight: 10,
    },
    greenCard: {
      backgroundColor: '#88C34A',
      marginHorizontal: 10,
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      marginVertical: 10,
    },
    greenCardText: {
      fontSize: 18,
      color: '#fff',
      fontWeight: 'bold',
    },
    pointsBar: {
      backgroundColor: '#fff',
      marginHorizontal: 10,
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      marginVertical: 10,
    },
    points: {
      fontSize: 18,
      color: '#000',
      fontWeight: 'bold',
    },
    pointsProgress: {
      fontSize: 14,
      color: '#666',
    },
    card: {
      backgroundColor: '#fff',
      marginHorizontal: 10,
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      marginVertical: 10,
    },
    cardTitle: {
      fontSize: 18,
      color: '#000',
      fontWeight: 'bold',
    },
    cardPoints: {
      fontSize: 24,
      color: '#88C34A',
      fontWeight: 'bold',
      marginTop: 10,
    },
  });
  
  export default AccountScreen;