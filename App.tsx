import React, { useState, useEffect } from "react";
import 'react-native-url-polyfill/auto';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AppNavigator from "./src/navigators/AppNavigator";
import WelcomeScreen from "./src/screens/WelcomeScreen";

import apiClient from "../projectVoriApp_v.2.0/src/services/apiClient";

const RootStack = createStackNavigator();

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsUserLoggedIn(true);
  };
  
  useEffect(() => {
    // //console.log(apiClient.get("entities"))
    // const fetchData = async () => {
    //   console.log("Test")
    //   try {
    //     const response = await fetch('http://192.168.1.124:8055/items/entities', {
    //       method: 'GET', // or 'POST', etc.
    //       headers: {
    //         'Accept': '*/*', // Accept all content types
    //         'Cache-Control': 'no-cache', // Disable caching of the response
    //         // Add any other headers required by your API
    //       },
    //     });
    //     const textResponse = await response.text();
    //     console.log(textResponse);
    //   } catch (error) {
    //     console.error('Failed to fetch data:', error);
    //   }
    // };
    
    // fetchData();
    
    
  }, []);

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="WelcomeScreen" screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="WelcomeScreen" component={WelcomeScreen}/>
        <RootStack.Screen name="App" component={AppNavigator}/>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}