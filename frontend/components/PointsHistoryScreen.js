import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { AppContext } from '../context/AppContext';

const PointsHistoryScreen = () => {
  const { curUser } = useContext(AppContext);
  
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.storeName}>{item.name}</Text>
        <Text style={styles.points}>{item.points}</Text>
      </View>
      <Text style={styles.date}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={curUser.history}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: "#ccc",
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 0.5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#88C34A',
  },
  points: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#88C34A',
  },
  date: {
    fontSize: 14,
    color: '#495057',
    marginTop: 5,
  },
});

export default PointsHistoryScreen;