import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRCodeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.qrTitle}>Voucher QR</Text>
      <View style={styles.qrContainer}>
        <QRCode value="https://www.example.com" size={270} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  qrTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    bottom: 100,
  },
  qrContainer: {
    bottom: 90,
  },
});

export default QRCodeScreen;
