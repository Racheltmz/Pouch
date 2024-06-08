import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PointsMeter = ({ points, totalPoints, containerWidth }) => {
  // Calculate the percentage of points achieved
  const percentage = (points / totalPoints) * 100;

  return (
    <View style={[styles.container, { width: containerWidth }]}>
      <View style={styles.meterContainer}>
        <View style={[styles.meter, { width: `${percentage}%` }]} />
      </View>
      <View style={styles.labelsContainer}>
        <View style={[styles.labelContainer, { left: '0%' }]}>
          <Text style={styles.label}>Green</Text>
        </View>
        <View style={[styles.labelContainer, { left: '5%' }]}>
          <Text style={styles.label}>Silver</Text>
        </View>
        <View style={[styles.labelContainer, { left: '100%' }]}>
          <Text style={styles.label}>Gold</Text>
        </View>
        <View style={[styles.labelContainer, { left: '130%' }]}>
          <Text style={styles.label}>Emerald</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  meterContainer: {
    backgroundColor: '#ddd',
    height: 10,
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 5,
  },
  meter: {
    backgroundColor: '#88C34A',
    height: '100%',
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  labelContainer: {
    width: '20%', // Adjust based on the number of labels
  },
  label: {
    fontSize: 12,
    color: '#666',
  },
});

export default PointsMeter;
