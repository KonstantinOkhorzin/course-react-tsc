import styled from '@emotion/styled';
import Todos from './components/Todos';
import Clock from './components/Clock/Clock';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

function App() {
  return (
    <Container>
      <Clock />
      <Todos />
    </Container>
  );
}

export default App;
