import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppContext } from '../context/AppContext';

const PointsHistoryScreen = () => {
  const { curUser } = useContext(AppContext);
  console.log(curUser.history);
  return (
    <View style={styles.container}>
      <Text>Points History Screen</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PointsHistoryScreen;