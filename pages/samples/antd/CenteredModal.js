import { Modal, Button } from 'antd';
import { useState } from 'react';

const CenteredModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button type="primary" onClick={openModal}>
        Open Modal
      </Button>
      <Modal
        title="Centered Modal"
        visible={isModalOpen}
        onCancel={closeModal}
        footer={null}
        centered // 화면 중앙에 위치하게 해주는 Ant Design의 속성
      >
        모달 내용이 중앙에 위치합니다.
      </Modal>
    </div>
  );
};

export default CenteredModal;
