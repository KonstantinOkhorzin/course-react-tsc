import { FC, ReactElement, ButtonHTMLAttributes } from 'react';

import { StyledButton } from './Button.styled';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: string | ReactElement;
  icon?: FC | null;
}

const Button: FC<IButtonProps> = ({ children, icon: Icon = null, ...restProps }) => {
  return (
    <StyledButton {...restProps}>
      {children}
      {Icon && <Icon />}
    </StyledButton>
  );
};

export default Button;
