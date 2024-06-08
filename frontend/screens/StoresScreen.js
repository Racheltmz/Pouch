import React from 'react';

import { View, Text, TextInput, StyleSheet, FlatList, Image } from 'react-native';
const stores = [
    { id: '1', name: 'stuffd', location: 'Bugis Junction', distance: '0.4km away', image: require('../assets/stuffd.jpeg') },
    { id: '2', name: 'Wok Hey', location: 'Bugis Junction', distance: '0.4km away', image: require('../assets/wokhey.webp') },
    { id: '3', name: 'Maki-San', location: 'Bugis Junction', distance: '0.4km away', image: require('../assets/maki-san.jpeg') },
  ];
  
  const StoresScreen = () => {
    const renderStore = ({ item }) => (
      <View style={styles.storeCard}>
        <Image source={item.image} style={styles.storeImage} />
        <Text style={styles.storeName}>{item.name}</Text>
        <Text style={styles.storeLocation}>{item.location}</Text>
        <Text style={styles.storeDistance}>{item.distance}</Text>
      </View>
    );
  
    return (
      <View style={styles.container}>
        <TextInput style={styles.searchBar} placeholder="Search" />
        <FlatList
          data={stores}
          renderItem={renderStore}
          keyExtractor={item => item.id}
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
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    storeCard: {
      marginBottom: 10,
      borderRadius: 10,
      overflow: 'hidden',
    },
    storeImage: {
      width: '100%',
      height: 150,
    },
    storeName: {
      fontSize: 18,
      fontWeight: 'bold',
      paddingHorizontal: 10,
      paddingTop: 5,
    },
    storeLocation: {
      fontSize: 14,
      paddingHorizontal: 10,
    },
    storeDistance: {
      fontSize: 14,
      paddingHorizontal: 10,
      paddingBottom: 10,
    },
  });
  
  export default StoresScreen;