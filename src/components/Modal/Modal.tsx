import { Component, ReactElement, MouseEvent } from 'react';
import { createPortal } from 'react-dom';

import CloseIcon from '../../icons/close.svg?react';
import { Backdrop, Content, CloseButton } from './Modal.styled';

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
          <CloseButton aria-label='close modal' onClick={onToggleModal}>
            <CloseIcon width='20px' height='20px' />
          </CloseButton>
          {children}
        </Content>
      </Backdrop>,
      modalRoot
    );
  }
}

export default Modal;
