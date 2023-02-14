import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import makeImgPath from "../utils";

const Image = styled.Image`
  border-radius: 5px;
  width: 100px;
  height: 160px;
  background-color: rgba(255, 255, 255, 0.5);
`;

//props 넘길때는 소괄호 안에 중괄호 넣어주기!!!!!!!!!!!
//(path) X -> ({path}) O
const Poster = ({ path }) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", { screen: "Detail" });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <Image source={{ uri: makeImgPath(path) }} />
    </TouchableOpacity>
  );
};

export default Poster;
