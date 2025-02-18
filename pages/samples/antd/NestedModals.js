import { Modal, Button } from 'antd';
import { useState } from 'react';

const NestedModals = () => {
  const [isLargeModalOpen, setIsLargeModalOpen] = useState(false);
  const [isSmallModalOpen, setIsSmallModalOpen] = useState(false);

  const openLargeModal = () => {
    setIsLargeModalOpen(true);
  };

  const closeLargeModal = () => {
    setIsLargeModalOpen(false);
  };

  const openSmallModal = () => {
    setIsSmallModalOpen(true);
  };

  const closeSmallModal = () => {
    setIsSmallModalOpen(false);
  };

  return (
    <div>
      <Button type="primary" onClick={openLargeModal}>
        Open Large Modal
      </Button>
      <Modal
        title="Large Centered Modal"
        visible={isLargeModalOpen}
        onCancel={closeLargeModal}
        footer={null}
        centered
        width={800} // 넓은 모달 크기 설정
      >
        <p>This is a large modal.</p>
        <Button type="primary" onClick={openSmallModal}>
          Open Small Modal
        </Button>
      </Modal>

      <Modal
        title="Small Modal"
        visible={isSmallModalOpen}
        onCancel={closeSmallModal}
        footer={null}
        centered
      >
        <p>This is a small modal inside the large modal.</p>
      </Modal>
    </div>
  );
};

export default NestedModals;
