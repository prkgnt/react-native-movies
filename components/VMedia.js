import React from "react";
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
const VMedia = ({ backdrop_path, original_title, release_date, overview }) => {
  return (
    <HMovie>
      <Poster path={backdrop_path} />
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
  );
};

export default VMedia;
