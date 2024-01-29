import { FC } from 'react';
import { InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface Props {
  isVisiblePassword: boolean;
  onToggleVisiblePassword: () => void;
}

const InputAdornmentButton: FC<Props> = ({ isVisiblePassword, onToggleVisiblePassword }) => {
  return (
    <InputAdornment position='end'>
      <IconButton aria-label='toggle password visibility' onClick={onToggleVisiblePassword}>
        {isVisiblePassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </IconButton>
    </InputAdornment>
  );
};

export default InputAdornmentButton;
