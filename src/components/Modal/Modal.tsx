import { Component, ReactElement, MouseEvent } from 'react';
import { IconButton } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { createPortal } from 'react-dom';

import { Backdrop, Content } from './Modal.styled';

interface IModalProps {
  children: ReactElement;
  onToggleModal: () => void;
}

interface KeyboardEvent {
  code: string;
}

const modalRoot = document.querySelector('#modal-root')!;

class Modal extends Component<IModalProps> {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      this.props.onToggleModal();
    }
  };

  onBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      this.props.onToggleModal();
    }
  };

  render() {
    const { children, onToggleModal } = this.props;
    return createPortal(
      <Backdrop onClick={this.onBackdropClick}>
        <Content>
          <IconButton
            aria-label='close modal'
            onClick={onToggleModal}
            sx={{ position: 'absolute', top: '-24px', right: '-24px' }}
          >
            <HighlightOffIcon />
          </IconButton>
          {children}
        </Content>
      </Backdrop>,
      modalRoot
    );
  }
}

export default Modal;
