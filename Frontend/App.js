import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Icon from "react-native-vector-icons/Ionicons";
import { Ionicons } from "react-native-vector-icons";

import LoginScreen from "./src/Screens/LoginScreen";
import RegisterScreen from "./src/Screens/RegisterScreen";
import HomeScreen from "./src/Screens/HomeScreen";
import ForgotPasswordScreen from "./src/Screens/ForgotPasswordScreen";
import OTPScreen from "./src/Screens/OTPScreen";
import ProductScreen from "./src/Screens/ProductScreen";
import CoffeePackScreen from "./src/Screens/CoffeePackScreen";
import CoffeeScreen from "./src/Screens/CoffeeScreen";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Tùy chỉnh icon theo tên của route
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline"; // Icon của Ionicons
          } else if (route.name === "Coffee") {
            iconName = focused ? "cafe" : "cafe-outline";
          } else if (route.name === "CoffeePack") {
            iconName = focused ? "bag" : "bag-outline";
          }

          // Trả về component icon từ react-native-vector-icons
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarHideOnKeyboard: true,
        tabBarLabel: () => null,
      })}
    >
      <Tab.Screen name="Home" component={ProductScreen} />
      <Tab.Screen name="Coffee" component={CoffeeScreen} />
      <Tab.Screen name="CoffeePack" component={CoffeePackScreen} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tabs">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen
          name="Tabs"
          component={MyTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
