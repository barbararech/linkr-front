import styled from "styled-components";
export default function WithoutPosts() {
  return (
    <H1
      style={{
        color: "#FFFFFF",
        fontFamily: "Oswald",
        marginTop: "100px",
      }}
    >
      No posts found from your friends!
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
