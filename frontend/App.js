// App.js
import React, { useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import HomeScreen from './components/HomeScreen';
import StoresScreen from './components/StoresScreen';
import RewardsScreen from './components/RewardsScreen';
import AccountScreen from './components/AccountScreen';
import AppContext from './context/AppProvider';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  // const { loggedIn } = useContext(AppContext);
  const [loggedIn, setLoggedIn] = useState('');
  return (
    loggedIn ?
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Stores') {
                iconName = focused ? 'location' : 'location-outline';
              } else if (route.name == 'Rewards') {
                iconName = focused ? 'ticket' : 'ticket-outline';
              } else if (route.name == 'Account') {
                iconName = focused ? 'person' : 'person-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#88C34A',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Stores" component={StoresScreen} />
          <Tab.Screen name="Rewards" component={RewardsScreen} />
          <Tab.Screen name="Account" component={AccountScreen} />
        </Tab.Navigator>
      </NavigationContainer>
      :
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Sign Up" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
