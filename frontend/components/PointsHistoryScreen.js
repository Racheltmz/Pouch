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
  const [selectedView, setSelectedView] = useState("Day");
  const [filteredData, setFilteredData] = useState(curUser.history);

  useEffect(() => {
    filterData(selectedView);
  }, [curUser, selectedView]);

  const filterData = (view) => {
    let filtered;
    const now = new Date();

    switch (view) {
      case "Day":
        filtered = curUser.history.filter((item) => {
          const itemDate = new Date(item.date);
          return now.toDateString() === itemDate.toDateString();
        });
        break;
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
    setFilteredData(filtered);
  };

  const handleViewChange = (view) => {
    setSelectedView(view);
    filterData(view);
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options).replace(/ /g, ' ');
  };

  const dates = filteredData.map((item) => item.date);
  const points = filteredData.map((item) => parseInt(item.points));

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
      <Text style={styles.date}>{formatDate(item.date)}</Text>
    </View>
  );

  const renderHeader = () => (
    <View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedView === "Day" && styles.selectedButton,
          ]}
          onPress={() => handleViewChange("Day")}
        >
          <Text style={styles.buttonText}>Day</Text>
        </TouchableOpacity>
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
        formatXLabel={(label, index) =>
          index % Math.ceil(dates.length / 1) === 0 ? label : ""
        }
      />
    </View>
  );

  return (
    <FlatList
      data={filteredData}
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
    marginVertical: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#ddd",
  },
  selectedButton: {
    backgroundColor: "#88C34A",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default PointsHistoryScreen;