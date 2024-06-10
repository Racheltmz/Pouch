import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { AppContext } from '../context/AppContext';

const PointsHistoryScreen = () => {
  const { curUser } = useContext(AppContext);

  const dates = curUser.history.map(item => item.date);
  const points = curUser.history.map(item => parseInt(item.points));

  const chartData = {
    labels: dates,
    datasets: [
      {
        data: points,
        color: (opacity = 1) => `#88C34A`, 
        strokeWidth: 2,
      },
    ],
  };
  
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.storeName}>{item.name}</Text>
        <Text style={styles.points}>{item.points}</Text>
      </View>
      <Text style={styles.date}>{item.date}</Text>
    </View>
  );

  const renderHeader = () => (
    <View>
      <LineChart
        data={chartData}
        width={Dimensions.get('window').width - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#88C34A',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );

  return (
    <FlatList
      data={curUser.history}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      ListHeaderComponent={renderHeader}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
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