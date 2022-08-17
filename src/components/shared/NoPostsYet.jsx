import styled from "styled-components";
export default function NoPostsyet() {
  return (
    <H1
      style={{
        color: "#FFFFFF",
        fontFamily: "Oswald",
        marginTop: "100px",
      }}
    >
      There's no posts yet!
    </H1>
  );
}

const H1 = styled.h1`
  font-size: 30px;
  text-align: center;
  word-wrap: wrap;
  width: 100%;
  margin-right: 20px;

  @media (max-width: 935px) {
    width: 100%;
  }
`;
