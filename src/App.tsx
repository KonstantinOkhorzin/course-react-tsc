import styled from '@emotion/styled';
import { BsFillSendFill } from 'react-icons/bs';

import Button from './components/Button';

const Container = styled.div`
  display: flex;
  gap: 15px;
`;

function App() {
  return (
    <Container>
      <Button>Search</Button>
      <Button disabled>Disabled</Button>
      <Button icon={BsFillSendFill} type='submit'>
        Send
      </Button>
    </Container>
  );
}

export default App;
