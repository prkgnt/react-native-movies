import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBGcolor};
`;

const Detail = () => (
  <Container>
    <Text> Detail </Text>
  </Container>
);
export default Detail;
