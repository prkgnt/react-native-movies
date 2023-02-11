import React from "react";
import Poster from "./poster";
import Votes from "./Votes";
import styled from "styled-components/native";

const Movie = styled.View`
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  color: white;
  font-size: 14px;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const HMedia = ({ backdrop_path, original_title, vote_average }) => {
  return (
    <Movie>
      <Poster path={backdrop_path} />
      <Title>
        {original_title.slice(0, 13)}
        {original_title.length > 13 ? "..." : null}
      </Title>
      <Votes vote_average={vote_average} />
    </Movie>
  );
};

export default HMedia;
