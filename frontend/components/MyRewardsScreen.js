import React, { useContext} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AppContext } from '../context/AppContext';

const MyRewardsScreen = ({ navigation }) => {
  const { curUser } = useContext(AppContext);

  const handlePress = () => {
    navigation.navigate("QRCode");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {curUser.rewards.map((item, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Use Now</Text>
          </TouchableOpacity>
        </View>
      ))}
      </ScrollView>
    </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 17,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    alignItems: 'flex-start',
    width: 350,
    alignSelf: 'center',
    borderRadius: 30,
  },
  cardContent: {
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    color: '#88C34A',
    fontWeight: 'bold',
    bottom: 5,
    left: 4,
    top: 1,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#000',
    left: 5,
    top: 5,
  },
  button: {
    borderWidth: 1,
    borderColor: '#88C34A',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 20,
    shadowColor: '#88C34A',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    width: 200,
    height: 35,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 17,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});

export default MyRewardsScreen;