import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import Search from "../screens/Search";

const NativeStack = createNativeStackNavigator();

const StackOne = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Two")}>
    <Text>One</Text>
  </TouchableOpacity>
);
const StackTwo = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Three")}>
    <Text>Two</Text>
  </TouchableOpacity>
);
const StackThree = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Tabs", { screen: "Search" })}>
    <Text>Three</Text>
  </TouchableOpacity>
);

const Stack = () => (
  <NativeStack.Navigator screenOptions={{ presentation: "card" }}>
    <NativeStack.Screen name="One" component={StackOne} />
    <NativeStack.Screen name="Two" component={StackTwo} />
    <NativeStack.Screen name="Three" component={StackThree} />
  </NativeStack.Navigator>
);

export default Stack;
