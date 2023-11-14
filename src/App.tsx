import styled from '@emotion/styled';
import Pokemon from './components/Pokemon';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding-top: 15px;
`;

function App() {
  return (
    <Container>
      <Pokemon />
    </Container>
  );
}

export default App;
