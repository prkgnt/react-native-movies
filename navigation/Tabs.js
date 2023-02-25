import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, TouchableOpacity, useColorScheme } from "react-native";
import styled from "styled-components/native";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { Ionicons } from "@expo/vector-icons";
import Stack from "./Stack";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const MoiveButton = styled.TouchableOpacity``;
const MoiveText = styled.Text`
  color: gray;
`;

const Tabs = () => {
  var scrollUp = false;
  const isDark = useColorScheme() === "dark";
  const navigation = useNavigation();

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
          tabBarIcon: ({ color, size }) => {
            const goToMovie = () => {
              navigation.navigate("Movies");
            };
            return (
              <Ionicons
                onPress={goToMovie}
                name="film-outline"
                color={color}
                size={size}
              ></Ionicons>
            );
          },
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
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? "search" : "search-outline"}
                color={color}
                size={size}
              ></Ionicons>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
