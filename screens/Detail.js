import React, { useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Share,
  Platform,
  Alert,
} from "react-native";
import { Linking } from "react-native";
import styled from "styled-components/native";
import Poster from "../components/poster";
import makeImgPath from "../utils";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery } from "react-query";
import { moviesApi, tvApi } from "../api";
import Loader from "../components/loader";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";

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
const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
`;
//line-height 를 아이콘 크기에 맞추면 아이콘 크기에 맞춰서 정렬됨
const BtnText = styled.Text`
  color: white;
  font-weight: 600;
  margin-bottom: 10px;
  margin-left: 10px;
  line-height: 24px;
`;
const Data = styled.View`
  padding: 0px 20px;
`;

// 부모 오브젝트 안에 있는 자식 오브젝트를 꺼내 쓰려면
//Parents : { Children } == Parents.Children
const Detail = ({
  //자동으로 오는 파라미터인 네비게이션은 스택 스크린의 여러가지 설정을 줄 수 있다
  navigation: { setOptions },
  route: { params },
}) => {
  const isMovie = "original_title" in params;

  const { isLoading, data } = useQuery(
    [isMovie ? "movies" : "tv", params.id],
    isMovie ? moviesApi.detail : tvApi.detail
  );

  const shareMedia = async () => {
    const isAndroid = Platform.OS === "android";
    const homepage = isMovie
      ? `https://www.imdb.com/title/${data.imdb_id}`
      : data.homepage;
    if (isAndroid) {
      await Share.share({
        message: `${params.overview} /n Check It Out: ${homepage}`,
        title:
          "original_title" in params
            ? params.original_title
            : params.original_name,
      });
    } else {
      await Share.share({
        url: homepage,
        title:
          "original_title" in params
            ? params.original_title
            : params.original_name,
      });
    }
  };

  const ShareButton = () => (
    <TouchableOpacity onPress={shareMedia}>
      <Ionicons name="share-outline" color="white" size={24}></Ionicons>
    </TouchableOpacity>
  );

  useEffect(() => {
    setOptions({
      title: "original_title" in params ? "Moive" : "TV Show",
      //여기에 ShareButton을 넣으면 앱이 시작할 때 헤더를 렌더링 하므로 이 시점에서는 data가 존재하지 않음
      //그래서 에러가 나게됨
      headerRight: () => <ShareButton />,
    });
  }, []);

  //그래서 data값이 변경될때 새로 렌더링 하도록 useEffect 추가
  useEffect(() => {
    setOptions({
      headerRight: () => <ShareButton />,
    });
  }, [data]);

  const openYTLink = async (videoID) => {
    const baseUrl = `http://m.youtube.com/watch?v=${videoID}`;
    await WebBrowser.openBrowserAsync(baseUrl);
    //await Linking.openURL(baseUrl);
  };

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
      {isLoading ? <Loader /> : null}
      <Data>
        {/* 변수명? 는 해당 변수가 없을 시 생략하라는 뜻*/}
        {data?.videos?.results?.map((video) => (
          //콜백함수에 인자를 넘겨줘야 하는 경우 화살표 함수 안에 넣기
          //리액트 콜백함수 매개변수 전달 이라고 구글에 검색
          <VideoBtn key={video.key} onPress={() => openYTLink(video.key)}>
            <Ionicons name="logo-youtube" color="white" size={24}></Ionicons>
            <BtnText>{video.name}</BtnText>
          </VideoBtn>
        ))}
      </Data>
    </Container>
  );
};

export default Detail;
