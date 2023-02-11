import React from "react";
import styled from "styled-components/native";

const Text = styled.Text`
  color: rgba(255, 255, 255, 0.8);
`;
const Votes = ({ vote_average }) => {
  return (
    <Text>
      {vote_average > 0 ? `🎖️ ${vote_average.toFixed(1)}/10` : "coming soon"}
    </Text>
  );
};

export default Votes;
