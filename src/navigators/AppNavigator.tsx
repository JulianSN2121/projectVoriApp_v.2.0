import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';

import DiscoverScreen from "../screens/DiscoverScreen";
import EventsScreen from "../screens/EventsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import EntityInfoScreen from "../screens/EntityInfoScreen";
import CategoryEntitiesScreen from "../screens/CategoryEntitiesScreen";
import EventInfoScreen from "../screens/EventInfoScreen";
import NewsScreen from "../screens/NewsScreen";

const Tab = createBottomTabNavigator();
const DiscoverStack = createStackNavigator();
const EventStack = createStackNavigator();
const NewsStack = createStackNavigator();

function DiscoverStackNavigator() {
  return (
    <DiscoverStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
      <DiscoverStack.Screen name="DiscoverScreen" component={DiscoverScreen}/>
      <DiscoverStack.Screen name="CategoryEntitiesScreen" component={CategoryEntitiesScreen}/>
      <DiscoverStack.Screen name="EntityInfoScreen" component={EntityInfoScreen}/>
      <DiscoverStack.Screen name="EventsScreen" component={EventsScreen}/>
      <DiscoverStack.Screen name="EventInfoScreen" component={EventInfoScreen}/>
    </DiscoverStack.Navigator>
  );
}
function EventsStackNavigator() {
  return (
    <EventStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
      <EventStack.Screen name="EventsScreen" component={EventsScreen}/>
      <EventStack.Screen name="EventInfoScreen" component={EventInfoScreen}/>
    </EventStack.Navigator>
  );
}
function NewsStackNavigator() {
  return (
    <NewsStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
      <NewsStack.Screen name="NewsScreen" component={NewsScreen}/>
      <NewsStack.Screen name="EntityInfoScreen" component={EntityInfoScreen}/>
    </NewsStack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#000" },
      }}
    >
      <Tab.Screen
        name="Discover"
        component={DiscoverStackNavigator}
        options={{
          tabBarLabel: "Entdecken",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="compass-outline"
              color={color}
              size={size}
            />
          ),
          tabBarActiveTintColor: "#ce1119",
          tabBarInactiveTintColor: "#ffffff",
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventsStackNavigator}
        options={{
          tabBarLabel: "Events",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={size} />
          ),
          tabBarActiveTintColor: "#ce1119",
          tabBarInactiveTintColor: "#ffffff",
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsStackNavigator}
        options={{
          tabBarLabel: "News",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="feed" color={color} size={size} />
          ),
          tabBarActiveTintColor: "#ce1119",
          tabBarInactiveTintColor: "#ffffff",
        }}
      />
      {/* <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: "Konto",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          tabBarActiveTintColor: "#ce1119",
          tabBarInactiveTintColor: "#ffffff",
        }}
      /> */}
      {/* <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          tabBarLabel: "Login",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="login" color={color} size={size} />
          ),
          tabBarActiveTintColor: "#ce1119",
          tabBarInactiveTintColor: "#ffffff",
        }}
      />
      <Tab.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{
          tabBarLabel: "Registration",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="login" color={color} size={size} />
          ),
          tabBarActiveTintColor: "#ce1119",
          tabBarInactiveTintColor: "#ffffff",
        }}
      /> */}
      
    </Tab.Navigator>
  );
}
