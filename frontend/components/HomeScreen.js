import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { db } from '../firebase/config.js';
import { ref, onValue } from 'firebase/database';

const storesImages = {
  1: require("../assets/stuffd.jpeg"),
  2: require("../assets/wokhey.webp"),
  3: require("../assets/maki-san.jpeg"),
};

const rewardsImages = {
  1: require("../assets/stuffd-logo.jpeg"),
  2: require("../assets/makisan-logo.jpeg"),
  3: require("../assets/namkeepau-logo.jpeg"),
  4: require("../assets/pezzo-logo.png"),
};

const HomeScreen = ({navigation}) => {
  const [stores, setStores] = useState([]);
  const [rewards, setRewards] = useState([]);
 
  // Get list of stores
  useEffect(() => {
    return onValue(ref(db, '/stores'), querySnapShot => {
      let data = querySnapShot.val() || {};
      let listing = { ...data };
      let storeList = [];
      let count = 0;
      Object.entries(listing).map(entry => {
        let record = entry[1];
        record.id = count + 1;
        count++;
        storeList.push(record);
      });
      setStores(storeList);
    })
  }, []);

  // Get list of rewards
  useEffect(() => {
    return onValue(ref(db, '/rewards'), querySnapShot => {
      let data = querySnapShot.val() || {};
      let listing = { ...data };
      let rewardList = [];
      let count = 0;
      Object.entries(listing).map(entry => {
        let record = entry[1];
        record.id = count + 1;
        count++;
        rewardList.push(record);
      });
      setRewards(rewardList);
    })
  }, []);

  const renderStore = ({ item }) => (
    <View style={styles.storeCard}> 
      <View style={styles.imageContainer}>
        <Image source={storesImages[item.id]} style={styles.storeImage} />
      </View>     
        <Text style={styles.storeName}>{item.name}</Text>
        <View style={styles.storeLocationContainer}>
          <Icon name="location-on" size={20} color="#888" />
          <Text style={styles.storeLocation}>{item.location}</Text>
        </View>
      </View>
  );

  const renderRewards = ({ item }) => (
    <View style={styles.rewardCard}> 
    <View style={styles.rewardImageContainer}>
      <Image source={rewardsImages[item.id]} style={styles.rewardImage} />
      <View style={styles.croppedBottom} />
    </View>
    <View style={styles.rewardDetailsContainer}>
      <Text style={styles.rewardName}>{item.name}</Text>
      <Text style={styles.rewardDiscount}>{item.description}</Text>
    </View>
    <Text style={styles.storeLocation}>{item.location}</Text>
  </View>
  );

  const handleProfilePress = () => {
    // Navigate to AccountScreen
    navigation.navigate("Account");
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={() => handleProfilePress}>
          <Image source={require('../assets/profile-icon.png')} style={styles.profileIcon} />
        </TouchableOpacity>
        <Text style={styles.profileText}>Welcome Afreen!</Text>
        <View style={styles.pointsBox}>
          <Text style={styles.pointsText}>1000 Points</Text>
        </View>
      </View>

      <ScrollView style={styles.overallContainer}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Suggested for you</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Stores")}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList horizontal 
          data={stores}
          renderItem={renderStore}
          keyExtractor={(item) => item.id} 
          contentContainerStyle={styles.flatListContainer}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Rewards</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Rewards')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList horizontal 
          data={rewards}
          renderItem={renderRewards}
          keyExtractor={(item) => item.id} 
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
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
    paddingTop: 20,
    paddingLeft: 20,
    backgroundColor: "#fff",
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  profileText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  pointsBox: {
    marginLeft: 'auto',
    backgroundColor: '#88C34A',
    padding: 10,
    borderRadius: 5,
    paddingRight: 20,
    marginRight: 20,
    alignItems: 'center',
  },
  pointsText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    marginTop: 20,
  },
  flatListContainer: {
    paddingVertical: 10, // Adjust the padding to give space around the FlatList items
    paddingHorizontal: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  seeAll: {
    color: '#007BFF',
    paddingBottom: 15,
    paddingRight: 20,
  },
  storeCard: {
    width: 280,
    height: 225,
    backgroundColor: '#fff',
    marginRight: 10,
    borderRadius: 5,
    borderColor: '#000',
    borderOpacity: 0.1,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  imageContainer: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  storeImage: {
    marginTop: 10,
    marginHorizontal: 10,
    width: 260,
    alignSelf: "center",
    height: 150,
    borderRadius: 10,
  },
  storeName: {
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 7,
    paddingBottom: 5,
    paddingLeft: 10,
    textAlign: 'left',
  },
  storeLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 6,
  },
  storeLocation: {
    fontSize: 14,
    paddingHorizontal: 4,
    textAlign: 'left', 
  },
  rewardCard: {
    width: 190,
    height: 210,
    backgroundColor: '#fff',
    marginRight: 10,
    borderRadius: 5,
    borderColor: '#000',
    borderOpacity: 0.1,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  rewardImage: {
    height: 155,
    width: 190,
    alignSelf: "center",
  },
  rewardImageContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  croppedBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 5, // Adjust this value to control the height of the cropped effect
    backgroundColor: "#fff", // Change this to match your background color
  },
  rewardDetailsContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  rewardName: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 5,
  },
  rewardDiscount: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5, 
  },
});

export default HomeScreen;