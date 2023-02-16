import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import Poster from "../components/poster";
import makeImgPath from "../utils";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery } from "react-query";
import { moviesApi, tvApi } from "../api";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBGcolor};
`;

const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0px 20px;
`;
const Background = styled.Image``;

const Column = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;
const Title = styled.Text`
  color: white;
  font-size: 36px;
  margin-left: 10px;
  font-weight: 600;
  width: 80%;
`;
const OverView = styled.Text`
  color: white;
  margin: 20px;
`;

// 부모 오브젝트 안에 있는 자식 오브젝트를 꺼내 쓰려면
//Parents : { Children } == Parents.Children
const Detail = ({
  //자동으로 오는 파라미터인 네비게이션은 스택 스크린의 여러가지 설정을 줄 수 있다
  navigation: { setOptions },
  route: { params },
}) => {
  useEffect(() => {
    setOptions({
      title: "original_title" in params ? "Moive" : "TV Show",
    });
  }, []);
  const { isLoading: movieLoading, data: movieData } = useQuery(
    ["movies", params.id],
    moviesApi.detail,
    { enabled: "original_title" in params }
  );
  const { isLoading: tvLoading, data: tvData } = useQuery(
    ["tv", params.id],
    tvApi.detail,
    { enabled: "original_name" in params }
  );
  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(params.backdrop_path || "") }}
        />
        <LinearGradient
          // Background Linear Gradient
          colors={["transparent", "#1e272e"]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path} />
          <Title>
            {"original_title" in params
              ? params.original_title
              : params.original_name}
          </Title>
        </Column>
      </Header>
      <OverView>{params.overview}</OverView>
    </Container>
  );
};

export default Detail;
