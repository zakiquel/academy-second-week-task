import { memo } from 'react';

import { Modal } from "@/shared/ui/Modal";

import cls from './FormModal.module.scss';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FormModal = memo((props: FormModalProps) => {
  const { isOpen, onClose } = props;
  return (
    <Modal
      className={cls.FormModal}
      isOpen={isOpen}
      onClose={onClose}
      lazy
    >
      <p>Форма отправлена!</p>
    </Modal>
  );
});
