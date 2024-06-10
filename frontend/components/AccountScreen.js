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
  const points = parseFloat(curUser.points);
  const pointsNeededForNextTier = (points) => {
    if (points < 1300) return (1300 - points).toFixed(2) + " points to Silver!";
    else if (points < 2450) return (2450 - points).toFixed(2) + " points to Gold!";
    else if (points < 4084.6) return (4084.6 - points).toFixed(2) + " points to Emerald!";
    return "Emerald tier reached!";
  };

  const getGreenCardInfo = (points) => {
    if (points >= 4084.6) {
      return { color: "#004d24", text: "Emerald" };
    } else if (points >= 2450) {
      return { color: "#d4af37", text: "Gold" };
    } else if (points >= 1300) {
      return { color: "#939296", text: "Silver" };
    }
    return { color: "#88C34A", text: "Green" }; // Default color and text
  };

  const { color: greenCardColor, text: greenCardText } = getGreenCardInfo(points);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.greenCard} onPress={() => navigation.navigate('Rewards')}>
        <View style={styles.greenCardContent}>
        <Text style={styles.greenCardText}>{greenCardText}</Text>
          <TouchableOpacity style={styles.claimRewardsContainer} onPress={() => navigation.navigate('Rewards')}>
            <Text style={styles.claimRewardsText}>Claim rewards</Text>
            <Icon name="chevron-forward-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.expiresText}>Expires on 07/08/2027</Text>
        <View style={styles.userNameText}>
          <Text style={styles.greenCardText}>{curUser.username}</Text>
        </View>
        <View style={styles.groceriesIcon}>
          <Image source={require('../assets/groceries-icon.png')} style={styles.groceriesIcon} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.pointsBar} onPress={() => navigation.navigate('PointsHistory')}>
        <View style={styles.pointsContainer}>
          <Text style={styles.points}>{points} points</Text>
          <Text style={styles.pointsProgress}>{pointsNeededForNextTier(points)}</Text>
        </View>
        <PointsMeter points={points} meterColor={greenCardColor} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('MyRewards')}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>My Rewards</Text>
          <Icon name="chevron-forward-outline" size={30} color="#88C34A" />
        </View>
        <Text style={styles.cardPoints}>{curUser.rewards.length}</Text>
        <Image source={require('../assets/myrewards-icon.png')} style={styles.rewardsCardImage} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('MyReferrals')}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>My Referrals</Text>
          <Icon name="chevron-forward-outline" size={30} color="#88C34A" />
        </View>
        <Text style={styles.cardPoints}>2</Text>
        <Image source={require('../assets/myreferrals-icon.png')} style={styles.referralsCardImage} />
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
    top: 6,
    left: 4,
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
    backgroundColor: '#fff',
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
    top: 6,
  },
  greenCard: {
    backgroundColor: '#88C34A',
    marginHorizontal: 10,
    padding: 20,
    paddingHorizontal: 5,
    height: 200,
    width: 360,
    borderRadius: 10,
    marginTop: 8,
    paddingLeft: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
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
    height: 200,
    width: 360,
    marginHorizontal: 10,
    padding: 20,
    bottom: 20,
    borderRadius: 10,
    alignItems: 'flex-start',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    alignSelf: 'center',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '102%',
  },
  rewardsCardImage: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 176,
    height: 120,
  },
  referralsCardImage: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 139,
    height: 130,
  },
  cardTitle: {
    fontSize: 24,
    color: '#88C34A',
    fontWeight: 'bold',
  },
  cardPoints: {
    fontSize: 24,
    color: '#88C34A',
    fontWeight: 'bold',
    paddingTop: 105,
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
  groceriesIcon: {
    width: 162,
    height: 139,
    paddingLeft: 160,
    bottom: 2,
  },
  pointsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default AccountScreen;