import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const ConfirmModal = ({handleConfirm, isModalOpen, setIsModalOpen}) => {

  const handleOk = () => {
    setIsModalOpen(false);
    handleConfirm();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal title="Are you sure" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>You are going to reset database with new cats</p>
      </Modal>
    </>
  );
};
export default ConfirmModal;