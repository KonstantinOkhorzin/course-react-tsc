import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

import AppBar from './components/AppBar';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Layout = () => {
  return (
    <Wrapper>
      <AppBar/>
      <Main>
        <Outlet />
      </Main>
    </Wrapper>
  );
};

export default Layout;
