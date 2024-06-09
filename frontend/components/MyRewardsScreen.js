import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppContext } from '../context/AppContext';

const MyRewardsScreen = () => {
  const { curUser } = useContext(AppContext);
  console.log(curUser.rewards);
  return (
    <View style={styles.container}>
      <Text>My Rewards Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyRewardsScreen;