import React from "react";
import { TouchableOpacity, useColorScheme, View } from "react-native";
import styled from "styled-components/native";
import makeImgPath from "../utils";
import { BlurView } from "@react-native-community/blur";
import Poster from "./poster";
import { useNavigation } from "@react-navigation/native";

//다른 컴포넌트가 위에 오게 하려면 포지션 앱솔루트로 해야됨
//그러면 flex 못 쓰니까 width, height 100% 줘야됨
const BgImg = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "white" : "black")};
`;

const Wrapper = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
const Column = styled.View`
  margin: 15px;
  width: 40%;
`;

const Overview = styled.Text`
  margin-top: 10px;
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.8)"};
`;

//이러면 Overview 스타일을 가져와서 씀
const Votes = styled(Overview)``;

const Slide = ({
  backdrop_path,
  poster_path,
  original_title,
  overview,
  vote_average,
}) => {
  const isDark = useColorScheme() === "dark";
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", { screen: "Detail", params: original_title });
  };

  return (
    <View style={{ flex: 1 }}>
      <BgImg source={{ uri: makeImgPath(backdrop_path) }} />
      <BlurView
        blurType={isDark ? "dark" : "light"}
        blurAmount={15}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          //이렇게 안하고 StyleSheet.absoluteFill 쓰면 똑같은거 해줌
        }}
      >
        <TouchableOpacity onPress={goToDetail}>
          <Wrapper>
            <Poster path={poster_path} />
            <Column>
              <Title isDark={isDark}>{original_title}</Title>
              <Overview isDark={isDark}>{overview.slice(0, 100)}...</Overview>
              <Votes isDark={isDark}>🎖️ {vote_average}/10</Votes>
            </Column>
          </Wrapper>
        </TouchableOpacity>
      </BlurView>
    </View>
  );
};

export default Slide;
