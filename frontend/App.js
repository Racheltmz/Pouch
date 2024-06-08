import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState }  from 'react';
import { StyleSheet, View, TouchableOpacity, Modal, Button, Image, Text } from 'react-native';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import QRCode from 'react-native-qrcode-svg';
import StoresScreen from './components/StoresScreen';
import RewardsScreen from './components/RewardsScreen';
import AccountScreen from './components/AccountScreen';
import RegisterScreen from './components/RegisterScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          if (route.name === 'QRButton') {
            setModalVisible(true);
          } else {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const iconName = options.tabBarIcon ? options.tabBarIcon(isFocused) : 'circle';

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarItem}
          >
            {route.name === 'QRButton' ? (
              <View style={styles.qrButton}>
                <Icon name="qr-code" color="#fff" size={30} />
              </View>
            ) : (
              <Icon name={iconName} color={isFocused ? '#88C34A' : '#222'} size={30} />
            )}
          </TouchableOpacity>
        );
      })}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Image source={require('./assets/close-icon.png')} style={styles.closeIcon} />
            </TouchableOpacity>
            <Text style={styles.modalText}>My Pouch QR</Text>
            <QRCode value="https://www.youtube.com/watch?v=BbeeuzU5Qc8" size={200} />
            <Text style={styles.modalText}>P 128 039</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const MainTabNavigator = () => (
  <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{ tabBarIcon: ({ focused }) => focused ? 'home' : 'home-outline' }}
    />
    <Tab.Screen
      name="Stores"
      component={StoresScreen}
      options={{ tabBarIcon: ({ focused }) => focused ? 'storefront' : 'storefront-outline' }}
    />
    <Tab.Screen
      name="QRButton"
      component={View} // Placeholder component
      options={{ tabBarButton: () => null }} // Hides the tab, button will be manually placed
    />
    <Tab.Screen
      name="Rewards"
      component={RewardsScreen}
      options={{ tabBarIcon: ({ focused }) => focused ? 'gift' : 'gift-outline' }}
    />
    <Tab.Screen
      name="Account"
      component={AccountScreen}
      options={{ tabBarIcon: ({ focused }) => focused ? 'person' : 'person-outline' }}
    />
  </Tab.Navigator>
);

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    height: 90,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabBarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrButton: {
    position: 'absolute',
    bottom: 5,
    alignSelf: 'center',
    backgroundColor: '#88C34A',
    padding: 25,
    borderRadius: 50,
    zIndex: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 280,
    height: 400,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 30,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1, // Ensure the close button is above other content
  },
  closeIcon: {
    width: 30,
    height: 30,
  },
});