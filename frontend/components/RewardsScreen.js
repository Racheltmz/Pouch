import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView } from "react-native";
import { db } from '../firebase/config.js';
import { ref, onValue } from 'firebase/database';

const rewardsLayout = [
  {
    id: "1",
    category: "Under 999 Points"
  },
  {
    id: "2",
    category: "1000 Points & Above"
  },
]

const images = {
  1: require("../assets/stuffd-logo.jpeg"),
  2: require("../assets/makisan-logo.jpeg"),
  3: require("../assets/namkeepau-logo.jpeg"),
  4: require("../assets/pezzo-logo.png"),
};

const RewardsScreen = () => {
  // Initialise states
  const [points, setPoints] = useState(0);
  const [rewards, setRewards] = useState([]);

  // Get user's points
  // useEffect(() => {
  //   return onValue(ref(db, '/users'), querySnapShot => {
  //     let data = querySnapShot.val() || {};
  //   })
  // }, []);
  // Get list of rewards
  useEffect(() => {
    return onValue(ref(db, '/rewards'), querySnapShot => {
      let data = querySnapShot.val() || {};
      let listing = { ...data };
      let over1000 = [];
      let under1000 = [];
      let count = 0;
      Object.entries(listing).map(entry => {
        let record = entry[1];
        record.id = count + 1;
        if (record.points < 1000) {
          under1000.push(record);
        } else {
          over1000.push(record);
        }
        count++;
      });
      rewardsLayout[0].data = under1000;
      rewardsLayout[1].data = over1000;
      setRewards(rewardsLayout);
    })
  }, []);

  const renderRewardItem = ({ item }) => (
    <View style={styles.rewardCard}>
      <Image source={images[item.id]} style={styles.rewardImage} />
      <Text style={styles.rewardName}>{item.name}</Text>
      <Text style={styles.rewardDescription}>{item.description}</Text>
      <Text style={styles.rewardPoints}>{item.points}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.memberStatus}>You are a Green Member!</Text>
        <View style={styles.greenRectangle}>
          <View style={styles.pointsContainer}>
            <Text style={styles.points}>1000</Text>
            <Text style={styles.pointsLabel}>Points</Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.overallContainer}>
        {rewards.map((section, index) => (
          <View key={section.id} style={[styles.sectionContainer, index === 0 ? styles.firstSection : null]}>
            <Text style={styles.categoryTitle}>{section.category}</Text>
            <FlatList
              horizontal
              data={section.data}
              renderItem={renderRewardItem}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.rewardList}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  overallContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 10,
  },
  header: {
    alignItems: "center",
    marginBottom: 150,
  },
  greenRectangle: {
    backgroundColor: "#88C34A",
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 70,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  memberStatus: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  pointsContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#88C34A",
    borderRadius: 100,
    width: 150,
    height: 150,
    borderWidth: 5,
    borderColor: "#fff",
  },
  points: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
  },
  pointsLabel: {
    fontSize: 18,
    color: "#fff",
  },
  sectionContainer: {
    marginBottom: 20,
  },
  firstSection: {
    marginBottom: 10, // Reduce bottom margin for the first section
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 7,
    color: "#000",
    marginLeft: 10,
  },
  rewardList: {
    paddingHorizontal: 10,
  },
  rewardCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 7,
    marginBottom: 7,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    height: 170,
    width: 160,
  },
  rewardImage: {
    width: 80,
    height: 70,
    marginBottom: 10,
    borderRadius: 5,
  },
  rewardName: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  rewardDescription: {
    fontSize: 11,
    textAlign: "center",
    marginBottom: 5,
    marginRight: 0.5,
    marginLeft: 0.5,
  },
  rewardPoints: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#88C34A",
  },
});

export default RewardsScreen;
