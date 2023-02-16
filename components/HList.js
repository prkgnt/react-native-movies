import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import HMedia from "./HMedia";

const ListContainer = styled.View``;
const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-top: 30px;
  margin-left: 30px;
  margin-bottom: 10px;
`;
export const HListSeparator = styled.View`
  width: 20px;
`;
const HList = ({ title, data }) => (
  <ListContainer>
    <ListTitle>{title}</ListTitle>
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal
      ItemSeparatorComponent={HListSeparator}
      keyExtractor={(item) => item.id + ""}
      contentContainerStyle={{ paddingHorizontal: 30 }}
      data={data}
      renderItem={({ item }) => (
        <HMedia
          poster_path={item.poster_path}
          // == item.original_title ? item.original_title : item.original_name
          original_title={item.original_title ?? item.original_name}
          vote_average={item.vote_average}
          fullData={item}
        />
      )}
    />
  </ListContainer>
);

export default HList;
