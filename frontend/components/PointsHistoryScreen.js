import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { AppContext } from "../context/AppContext";

const PointsHistoryScreen = () => {
  const { curUser } = useContext(AppContext);
  const [selectedView, setSelectedView] = useState("Week");
  const [filteredData, setFilteredData] = useState([]);
  const [dataRecords, setDataRecords] = useState([]);

  useEffect(() => {
    filterData(selectedView);
  }, [curUser, selectedView]);

  const filterData = (view) => {
    let filtered;
    const now = new Date();

    switch (view) {
      case "Week":
        filtered = curUser.history.filter((item) => {
          const itemDate = new Date(item.date);
          const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
          return itemDate >= oneWeekAgo && itemDate <= now;
        });
        break;
      case "Month":
        filtered = curUser.history.filter((item) => {
          const itemDate = new Date(item.date);
          const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
          return itemDate >= oneMonthAgo && itemDate <= now;
        });
        break;
      default:
        filtered = curUser.history;
    }

    const aggregatedData = aggregatePointsByDate(filtered);
    setFilteredData(aggregatedData);
    setDataRecords(filtered);
  };

  const aggregatePointsByDate = (data) => {
    const aggregated = data.reduce((acc, item) => {
      const date = new Date(item.date).toDateString();
      if (!acc[date]) {
        acc[date] = { date: item.date, points: 0 };
      }
      acc[date].points += parseInt(item.points, 10);
      return acc;
    }, {});

    return Object.values(aggregated).sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const handleViewChange = (view) => {
    setSelectedView(view);
    filterData(view);
  };

  const formatFullDate = (dateString) => {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const formatShortDate = (dateString) => {
    const options = { day: '2-digit', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const dates = filteredData.map((item) => formatShortDate(item.date));
  const points = filteredData.map((item) => item.points);

  const validPoints = points.every((point) => !isNaN(point) && isFinite(point));

  const chartData = {
    labels: dates.length > 0 ? dates : ["No Data"],
    datasets: [
      {
        data: validPoints && points.length > 0 ? points : [0],
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
      <Text style={styles.date}>{formatFullDate(item.date)}</Text>
    </View>
  );

  const renderHeader = () => (
    <View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedView === "Week" && styles.selectedButton,
          ]}
          onPress={() => handleViewChange("Week")}
        >
          <Text style={styles.buttonText}>Week</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedView === "Month" && styles.selectedButton,
          ]}
          onPress={() => handleViewChange("Month")}
        >
          <Text style={styles.buttonText}>Month</Text>
        </TouchableOpacity>
      </View>
      <LineChart
        data={chartData}
        width={Dimensions.get("window").width - 40}
        height={220}
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#88C34A",
          },
          yAxisInterval: 50, 
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
          shadowColor: "#000",
          borderWidth: 0.5,
          borderColor: "#ccc",
          shadowOpacity: 0.3,
          shadowRadius: 0.5,
          shadowOffset: { width: 0, height: 2 },
          elevation: 3,
        }}
        formatXLabel={(label, index) => {
          const numberOfLabels = dates.length;
          if (numberOfLabels > 7 && index % 2 === 0) {
            return label;
          }
          if (numberOfLabels <= 7) {
            return label;
          }
          return "";
        }}
        fromZero={true}
        xLabelsOffset={-10}
        yLabelsOffset={10}
      />
    </View>
  );

  return (
    <FlatList
      data={dataRecords}
      renderItem={renderItem}
      keyExtractor={(item) => item.date.toString()}
      contentContainerStyle={styles.listContainer}
      ListHeaderComponent={renderHeader}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  listContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 0.5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  storeName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#88C34A",
  },
  points: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#88C34A",
  },
  date: {
    fontSize: 14,
    color: "#495057",
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 5,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#ddd",
    width: 160,
  },
  selectedButton: {
    backgroundColor: "#88C34A",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    textAlign: 'center',
  },
});

export default PointsHistoryScreen;
