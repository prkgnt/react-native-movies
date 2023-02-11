import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "react-native";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { Ionicons } from "@expo/vector-icons";
import Stack from "./Stack";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <Tab.Navigator
      //sceneContainerStyle == 전체 뷰의 스타일
      sceneContainerStyle={{
        //모든 화면의 기본 백그라운드 컬러 설정
        backgroundColor: isDark ? "#353535" : "white",
      }}
      screenOptions={{
        unmountOnBlur: true,
        tabBarStyle: {
          backgroundColor: isDark ? "#353535" : "white",
        },
        tabBarActiveTintColor: isDark ? "gold" : "black",
        headerStyle: {
          backgroundColor: isDark ? "#353535" : "white",
        },
        headerTitleStyle: {
          color: isDark ? "gold" : "#353535",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="film-outline" color={color} size={size}></Ionicons>
          ),
        }}
      />
      <Tab.Screen
        name="Tv"
        component={Tv}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="tv-outline" color={color} size={size}></Ionicons>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              color={color}
              size={size}
            ></Ionicons>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
