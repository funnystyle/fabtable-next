import { Modal, Button } from 'antd';
import Draggable from 'react-draggable';
import { useState } from 'react';

const DraggablePopup = ({ title, content, visible, onClose }) => {
  return (
    <Modal
      title={
        <div style={{ cursor: 'move' }}>{title}</div>
      }
      visible={visible}
      onCancel={onClose}
      footer={null}
      mask={false} // Modaless 설정
      maskClosable={false} // 배경 클릭시 닫히지 않도록 설정
      wrapClassName='draggable-modal' // 드래그 가능하도록 설정
      centered // 중앙에 위치하도록 설정
      modalRender={(modal) => (
        <Draggable handle=".ant-modal-title">
          <div>{modal}</div>
        </Draggable>
      )}
      style={{ top: 20 }}
    >
      {content}
    </Modal>
  );
};

const App = () => {
  const [isPopup1Visible, setIsPopup1Visible] = useState(false);
  const [isPopup2Visible, setIsPopup2Visible] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsPopup1Visible(true)}>팝업 1 열기</Button>
      <Button onClick={() => setIsPopup2Visible(true)}>팝업 2 열기</Button>

      <DraggablePopup
        title="팝업 1"
        content={<p>팝업 1의 내용입니다.</p>}
        visible={isPopup1Visible}
        onClose={() => setIsPopup1Visible(false)}
      />
      <DraggablePopup
        title="팝업 2"
        content={<p>팝업 2의 내용입니다.</p>}
        visible={isPopup2Visible}
        onClose={() => setIsPopup2Visible(false)}
      />
    </div>
  );
};

export default App;
