import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';

const ModalWithMaximize = () => {
  const [visible, setVisible] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Modal Title</span>
            <Button
              type="text"
              icon={isMaximized ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
              onClick={toggleMaximize}
            />
          </div>
        }
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        style={isMaximized ? { top: 0, left: 0, width: '100vw', height: '100vh', padding: 0 } : {}}
        bodyStyle={isMaximized ? { height: 'calc(100vh - 108px)' } : {}}
        width={isMaximized ? '100vw' : 520} // 기본 모달 너비는 520
      >
        <p>This is a modal with maximize functionality.</p>
        <p>Click the button to maximize or restore the modal.</p>
      </Modal>
    </>
  );
};

export default ModalWithMaximize;
