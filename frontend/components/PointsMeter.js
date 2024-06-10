import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PointsMeter = ({ points }) => {
  const totalPoints = 4084.6;
  
  const percentage = (points / totalPoints) * 100;

  const thresholds = {
    green: 0,
    silver: 1300,
    gold: 2450,
    emerald: 4084.6,
  };

  const getLeftPosition = (threshold) => {
    return (threshold / totalPoints) * 100;
  };

  return (
    <View style={styles.container}>
      <View style={styles.meterContainer}>
        <View style={[styles.meter, { width: `${percentage}%` }]} />
      </View>
      <View style={styles.labelsContainer}>
        <View style={[styles.labelContainer, { left: `${getLeftPosition(thresholds.green)}%` }]}>
          <Text style={styles.label}>Green</Text>
        </View>
        <View style={[styles.labelContainer, { left: `${getLeftPosition(thresholds.silver)}%` }]}>
          <Text style={styles.label}>Silver</Text>
        </View>
        <View style={[styles.labelContainer, { left: `${getLeftPosition(thresholds.gold)}%` }]}>
          <Text style={styles.label}>Gold</Text>
        </View>
        <View style={[styles.labelContainer, { left: `${getLeftPosition(thresholds.emerald)}%` }]}>
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
    position: 'relative',
  },
  labelContainer: {
    width: '20%', 
  },
  label: {
    fontSize: 12,
    color: '#666',
  },
});

export default PointsMeter;
