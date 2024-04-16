import React, { useState, useEffect } from "react";
import 'react-native-url-polyfill/auto';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AppNavigator from "./src/navigators/AppNavigator";
import WelcomeScreen from "./src/screens/WelcomeScreen";

const RootStack = createStackNavigator();

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsUserLoggedIn(true);
  };
  
  useEffect(() => {}, []);

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="WelcomeScreen" screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="WelcomeScreen" component={WelcomeScreen}/>
        <RootStack.Screen name="App" component={AppNavigator}/>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}