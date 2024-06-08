import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyRewardsScreen = () => (
  <View style={styles.container}>
    <Text>My Rewards Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyRewardsScreen;