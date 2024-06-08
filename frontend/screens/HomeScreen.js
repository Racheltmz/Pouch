import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import QRCode from "react-native-qrcode-svg";
import StoresScreen from "./StoresScreen";
import RewardsScreen from "./RewardsScreen";
import AccountScreen from "./AccountScreen";

const Tab = createBottomTabNavigator();

const Home = () => (
  <View style={styles.screenContainer}>
    <Text>Home Screen</Text>
  </View>
);

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          if (route.name === "QRButton") {
            setModalVisible(true);
          } else {
            const event = navigation.emit({
              type: "tabPress",
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
            type: "tabLongPress",
            target: route.key,
          });
        };

        const iconName = options.tabBarIcon
          ? options.tabBarIcon(isFocused)
          : "circle";

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
            {route.name === "QRButton" ? (
              <View style={styles.qrButton}>
                <Image
                  source={require("../assets/qr-icon.png")}
                  style={styles.qrIcon}
                />
              </View>
            ) : (
              <Image source={iconName} style={{ width: 35, height: 35 }} />
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
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Image
                source={require("../assets/close-icon.png")}
                style={styles.closeIcon}
              />
            </TouchableOpacity>
            <Text style={styles.modalText}>My Pouch QR</Text>
            <QRCode
              value="https://www.youtube.com/watch?v=BbeeuzU5Qc8"
              size={200}
            />
            <Text style={styles.modalText}>P 128 039</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const HomeScreen = () => {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) =>
            focused
              ? require("../assets/home-icon-1.png")
              : require("../assets/home-icon.png"),
        }}
      />
      <Tab.Screen
        name="Stores"
        component={StoresScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused
              ? require("../assets/stores-icon-1.png")
              : require("../assets/stores-icon.png"),
        }}
      />
      <Tab.Screen
        name="QRButton"
        component={View} // Placeholder component
        options={{ tabBarButton: () => null }} // Hides the tab, button will be manually placed
      />
      <Tab.Screen
        name="Rewards"
        component={RewardsScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused
              ? require("../assets/rewards-icon-1.png")
              : require("../assets/rewards-icon.png"),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused
              ? require("../assets/account-icon-1.png")
              : require("../assets/account-icon.png"),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarContainer: {
    flexDirection: "row",
    height: 75,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#fff",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tabBarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  qrButton: {
    position: "absolute",
    bottom: 0.5,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#88C34A",
    padding: 25,
    borderRadius: 60,
    width: 70,  // Ensure width and height are equal
    height: 70,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: 30,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },
  closeIcon: {
    width: 30,
    height: 30,
  },
  qrIcon: {
    width: 40,
    height: 40,
    alignSelf: "center",
  },
});

export default HomeScreen;
