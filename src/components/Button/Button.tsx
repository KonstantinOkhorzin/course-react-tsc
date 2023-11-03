import { FC, ReactElement } from 'react';

import { StyledButton } from './Button.styled';

interface IButtonProps {
  children?: string | ReactElement;
  type?: 'button' | 'submit';
  disabled?: boolean;
  icon?: FC | null;
}

const Button: FC<IButtonProps> = ({
  children,
  type = 'button',
  disabled = false,
  icon: Icon = null,
}) => {
  return (
    <StyledButton disabled={disabled} type={type}>
      {children}
      {Icon && <Icon />}
    </StyledButton>
  );
};

export default Button;
