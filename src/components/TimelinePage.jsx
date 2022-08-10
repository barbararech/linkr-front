import Header from './Header.jsx';
import NewPost from './NewPost.jsx';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

export default function TimelinePage() {
  return (
    <>
      <Helmet>
        <style>{'body { background-color: #333333; }'}</style>
      </Helmet>
      <Header />
      <Container>
        <NewPost />
      </Container>
    </>
  );
}

const Container = styled.div`
  margin-top: 185px;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;
