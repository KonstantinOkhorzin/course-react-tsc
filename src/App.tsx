import styled from '@emotion/styled';
import Todos from './components/Todos';

const Container = styled.div`
  display: flex;
  gap: 10px;
`;

function App() {
  return (
    <Container>
      <Todos/>
    </Container>
  );
}

export default App;
