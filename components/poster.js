import React from "react";
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
const Poster = ({ path }) => <Image source={{ uri: makeImgPath(path) }} />;

export default Poster;
