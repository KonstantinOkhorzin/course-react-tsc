import { FC, useEffect, ReactElement, MouseEvent } from 'react';
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

const Modal: FC<IModalProps> = ({ children, onToggleModal }) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        onToggleModal();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onToggleModal]);

  const onBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onToggleModal();
    }
  };

  return createPortal(
    <Backdrop onClick={onBackdropClick}>
      <Content>
        <CloseButton aria-label='close modal' onClick={onToggleModal}>
          <CloseIcon width='20px' height='20px' />
        </CloseButton>
        {children}
      </Content>
    </Backdrop>,
    modalRoot
  );
};

export default Modal;
