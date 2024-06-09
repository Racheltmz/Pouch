import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { AppContext } from '../context/AppContext';

const StoresScreen = () => {
  // Initialise states
  const { stores } = useContext(AppContext);
  const [displayStores, setDisplayStores] = useState(stores);
  const [searchQuery, setSearchQuery] = useState("");


  const renderStore = ({ item }) => (
    <View style={styles.storeCard}>
      <Text style={styles.storeName}>{item.name}</Text>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.storeImage} />
      </View>
      <View style={styles.storeDetails}>
        <Text style={styles.storeLocation}>{item.location}</Text>
        <Text style={styles.storeDistance}>{item.distance + "km away"}</Text>
      </View>
    </View>
  );

  const handleSearch = (text) => {
    const filteredStores = stores.filter((store) =>
      store.name.toLowerCase().includes(text.toLowerCase())
    );
    setSearchQuery(text);
    setDisplayStores(filteredStores);
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.searchBar} placeholder="Search" placeholderTextColor="#000" value={searchQuery}
        onChangeText={handleSearch} />
      <FlatList
        data={displayStores}
        renderItem={renderStore}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  storeCard: {
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  imageContainer: {
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  storeImage: {
    width: "95%",
    alignSelf: "center",
    height: 150,
    borderRadius: 10,
  },
  storeName: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  storeDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 10,
  },
  storeLocation: {
    fontSize: 14,
  },
  storeDistance: {
    fontSize: 14,
  },
});

export default StoresScreen;