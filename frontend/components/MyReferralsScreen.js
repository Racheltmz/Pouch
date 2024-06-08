import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyReferralsScreen = () => (
  <View style={styles.container}>
    <Text>My Referrals Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyReferralsScreen;