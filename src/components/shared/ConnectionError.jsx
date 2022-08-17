import styled from "styled-components";
export default function ConnectionError({ pageName }) {
  return (
    <H1
      style={{
        color: "#FFFFFF",
        fontFamily: "Oswald",
        marginTop: "100px",
        textAlign: "center",
        fontSize: "40px",
      }}
    >
      An error occured while trying to fetch the posts, please refresh the page
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
