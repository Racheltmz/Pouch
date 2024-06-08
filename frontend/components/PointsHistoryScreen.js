import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PointsHistoryScreen = () => (
  <View style={styles.container}>
    <Text>Points History Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PointsHistoryScreen;