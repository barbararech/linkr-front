import styled from "styled-components";
import { Oval } from "react-loader-spinner";

export default function LoadingAnimation() {
  let loadingAnimation = (
    <Oval
      height={80}
      width={80}
      color="#FFFFFF"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#000000"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );

  return (
    <>
      <LoadingDiv>
        <h1
          style={{
            color: "#FFFFFF",
            fontFamily: "Oswald",
            marginTop: "100px",
            marginBottom: "10px",
          }}
        >
          Loading
        </h1>
        {loadingAnimation}
      </LoadingDiv>
    </>
  );
}

const LoadingDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
