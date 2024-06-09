import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import PointsMeter from './PointsMeter';
import { AppContext } from '../context/AppContext';

const AccountHomeScreen = ({ navigation, curUser }) => {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.greenCard} onPress={() => navigation.navigate('Rewards')}>
        <View style={styles.greenCardContent}>
          <Text style={styles.greenCardText}>Green</Text>
          <TouchableOpacity style={styles.claimRewardsContainer} onPress={() => navigation.navigate('Rewards')}>
            <Text style={styles.claimRewardsText}>Claim rewards</Text>
            <Icon name="chevron-forward-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.expiresText}>Expires on 07/08/2027</Text>
        <View style={styles.userNameText}>
          <Text style={styles.greenCardText}>{curUser.username}</Text>
        </View>
        <View style={styles.croppedImageContainer}>
          <Image source={require('../assets/groceries-icon.png')} style={styles.groceriesIcon} />
          <View style={styles.croppedBottom} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.pointsBar} onPress={() => navigation.navigate('PointsHistory')}>
        <View style={styles.pointsContainer}>
          <Text style={styles.points}>{curUser.points} points</Text>
          <Text style={styles.pointsProgress}>21.15 points to Silver!</Text>
        </View>
        <PointsMeter points={1220} totalPoints={4084.6} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('MyRewards')}>
        <Text style={styles.cardTitle}>My Rewards</Text>
        <Text style={styles.cardPoints}>{curUser.rewards.length}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('MyReferrals')}>
        <Text style={styles.cardTitle}>My Referrals</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const AccountScreen = ({ navigation }) => {
  const { curUser } = useContext(AppContext);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image source={require('../assets/profile-icon.png')} style={styles.profileIcon} />
          <Text style={styles.profileText}>{curUser.username}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Icon name="settings-outline" size={30} color="#000" style={styles.settingsIcon} />
        </TouchableOpacity>
      </View>
      <AccountHomeScreen navigation={navigation} curUser={curUser} />
    </View>
  );
};
const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
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
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  settingsIcon: {
    marginRight: 10,
  },
  greenCard: {
    backgroundColor: '#88C34A',
    marginHorizontal: 10,
    padding: 20,
    paddingHorizontal: 5,
    height: 200,
    width: 360,
    borderRadius: 10,
    marginVertical: 8,
    paddingLeft: 20,
    alignSelf: 'center',
  },
  greenCardText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  pointsBar: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  points: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  pointsProgress: {
    fontSize: 14,
    color: '#666',
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  cardTitle: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  cardPoints: {
    fontSize: 24,
    color: '#88C34A',
    fontWeight: 'bold',
    marginTop: 10,
  },
  greenCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  claimRewardsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  claimRewardsText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 5,
  },
  expiresText: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  userNameText: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'transparent',
    padding: 20,
  },
  croppedImageContainer: {
    position: 'absolute',
    bottom: -20,
    right: 20,
    overflow: 'hidden',
    borderRadius: 15,
  },
  groceriesIcon: {
    width: 170,
    height: 170,
  },
  croppedBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 20, // Adjust this value to control the height of the cropped effect
    backgroundColor: "#fff", // Change this to match your background color
  },
  pointsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default AccountScreen;