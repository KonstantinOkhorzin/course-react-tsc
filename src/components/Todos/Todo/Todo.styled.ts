import styled from '@emotion/styled';

interface IWrapperProps {
  completed: boolean;
}

export const Wrapper = styled.li<IWrapperProps>`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 15px;
  border-radius: 4px;
  border: 1px #c4c4c4 solid;
  background-color: ${props => (props.completed ? props.theme.colors.muted : 'inherit')};
  :hover {
    border-color: #000;
  }
`;
