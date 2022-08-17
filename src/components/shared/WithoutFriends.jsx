import styled from "styled-components";
export default function WithoutFriends() {
  return (
    <H1
      style={{
        color: "#FFFFFF",
        fontFamily: "Oswald",
        marginTop: "100px",
      }}
    >
      You don't follow anyone yet. Search for new friends!
    </H1>
  );
}

const H1 = styled.h1`
  font-size: 30px;
  text-align: center;
  word-wrap: wrap;
  width: 95%;

  @media (max-width: 935px) {
    width: 100%;
  }
`;
