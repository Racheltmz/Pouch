import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const QRCodeScreen = () => (
  <View style={styles.container}>
    <Text>QR Code Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QRCodeScreen;