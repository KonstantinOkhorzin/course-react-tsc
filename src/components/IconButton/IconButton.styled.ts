import styled from '@emotion/styled';

export const StyledIconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  color: ${({ theme }) => theme.colors.primary};
  svg {
    fill: currentColor;
  }
`;
