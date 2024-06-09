import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyReferralsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Share Pouch with a friend and earn 30 points per referral!
      </Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Referral Code</Text>
        <Text style={styles.referralCode}>P 128 039</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Successful Referrals</Text>
        <Text style={styles.referralCount}>2</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#88C34A',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#ccc",
    padding: 20,
    marginBottom: 20,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 5 },
    borderRadius: 30,
    shadowRadius: 5,
    width: 350,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#88C34A',
    marginBottom: 10,
    alignSelf: "left",
  },
  referralCode: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
    alignSelf: "center",
  },
  referralCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
    alignSelf: "center",
  },
});

export default MyReferralsScreen;