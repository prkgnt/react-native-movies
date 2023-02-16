import React, { useEffect } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import Poster from "../components/poster";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBGcolor};
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
      title:
        "original_title" in params
          ? params.original_title
          : params.original_name,
    });
  }, []);
  return (
    <Container>
      <Poster path={params.backdrop_path} />
    </Container>
  );
};

export default Detail;
