import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabNavigator from './utils/Navigation';
import LoginScreen from './components/LoginScreen';
import RewardsScreen from './components/RewardsScreen';
import RegisterScreen from './components/RegisterScreen';
import SettingsScreen from './components/SettingsScreen';
import PointsHistoryScreen from './components/PointsHistoryScreen';
import MyRewardsScreen from './components/MyRewardsScreen';
import MyReferralsScreen from './components/MyReferralsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Rewards" component={RewardsScreen} />
        <Stack.Screen name="PointsHistory" component={PointsHistoryScreen} />
        <Stack.Screen name="MyRewards" component={MyRewardsScreen} />
        <Stack.Screen name="MyReferrals" component={MyReferralsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
