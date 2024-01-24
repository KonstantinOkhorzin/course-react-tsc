import { FC, useEffect, ReactElement, MouseEvent } from 'react';
import { createPortal } from 'react-dom';

import CloseIcon from '../../icons/close.svg?react';
import { Backdrop, Content, CloseButton } from './Modal.styled';

interface IModalProps {
  children: ReactElement;
  onCloseModal: () => void;
}

interface KeyboardEvent {
  code: string;
}

const modalRoot = document.querySelector('#modal-root')!;

const Modal: FC<IModalProps> = ({ children, onCloseModal }) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onCloseModal]);

  const onBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };

  return createPortal(
    <Backdrop onClick={onBackdropClick}>
      <Content>
        <CloseButton aria-label='close modal' onClick={onCloseModal}>
          <CloseIcon width='20px' height='20px' />
        </CloseButton>
        {children}
      </Content>
    </Backdrop>,
    modalRoot
  );
};

export default Modal;
