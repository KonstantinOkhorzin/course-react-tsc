import { FC, ReactElement } from 'react';

import { StyledIconButton } from './IconButton.styled';

interface IconButtonProps {
  onClick: () => void;
  children: ReactElement;
  type?: 'button' | 'submit' | 'reset';
  'aria-label': string;
}

const IconButton: FC<IconButtonProps> = ({ onClick, children, type = 'button', ...allyProps }) => {
  return (
    <StyledIconButton onClick={onClick} type={type} {...allyProps}>
      {children}
    </StyledIconButton>
  );
};

export default IconButton;
