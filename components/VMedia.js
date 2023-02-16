import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Poster from "./poster";
const HMovie = styled.View`
  flex-direction: row;
  margin-left: 30px;
`;
const HColumn = styled.View`
  margin-left: 10px;
  width: 80%;
`;
const Overview = styled.Text`
  color: white;
  opacity: 0.7;
  width: 80%;
`;
const Release = styled.Text`
  color: white;
  margin-left: 10px;
  margin-right: 10px;
`;
const Title = styled.Text`
  color: white;
  font-size: 14px;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;
const VMedia = ({
  poster_path,
  original_title,
  release_date,
  overview,
  fullData,
}) => {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", {
      screen: "Detail",
      params: { ...fullData },
    });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <HMovie>
        <Poster path={poster_path} />
        <HColumn>
          <Title>{original_title}</Title>
          <Release>
            {new Date(release_date).toLocaleDateString("ko", {
              month: "long",
              year: "numeric",
              day: "numeric",
            })}
          </Release>
          <Overview>
            {overview !== "" && overview.length > 140
              ? `${overview.slice(0, 140)}...`
              : overview}
          </Overview>
        </HColumn>
      </HMovie>
    </TouchableOpacity>
  );
};

export default VMedia;
