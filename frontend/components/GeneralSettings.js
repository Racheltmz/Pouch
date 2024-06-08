import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GeneralSettings = () => (
  <View style={styles.container}>
    <View style={styles.option}>
      <Text>Push Notifications</Text>
      {/* Add your switch or toggle component here */}
    </View>
    <View style={styles.option}>
      <Text>Delete Account</Text>
      {/* Add your navigation or functionality here */}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    width: '100%',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default GeneralSettings;
