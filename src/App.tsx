import styled from '@emotion/styled';
import Button from '@mui/material/Button';

const Container = styled.div`
  display: flex;
  gap: 15px;
`;

function App() {
  return (
    <Container>
      <Button href='https://www.youtube.com/' color='secondary'>
        Secondary
      </Button>
    </Container>
  );
}

export default App;
