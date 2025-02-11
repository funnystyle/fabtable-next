import React, { useRef, useState } from "react";
import { Button, Modal, Select } from "antd";
import { useReactToPrint } from "react-to-print";

const PrintPreview = () => {
  const printRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [padding, setPadding] = useState({
    top: 3,
    bottom: 3,
    left: 3,
    right: 3,
  });

  // 미리보기 기능
  const handlePreview = () => {
    setIsModalOpen(true);
  };

  // 인쇄 기능
  const handlePrint = useReactToPrint({
    documentTitle: "Print Preview1",
    contentRef: printRef,
  });

  return (
    <div>
      {/* 미리보기 버튼 */}
      <Button type="primary" onClick={handlePreview}>
        Print 미리보기
      </Button>

      {/* 모달로 미리보기 창 구현 */}
      <Modal
        title="Print Preview"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            닫기
          </Button>,
          <Button key="print" type="primary" onClick={handlePrint}>
            다음 (인쇄)
          </Button>,
        ]}
      >
        {/* 마진 설정 옵션 */}
        <div style={{ paddingBottom: "10px" }}>
          <span>상 마진: </span>
          <Select
            defaultValue={3}
            style={{ width: 80, marginRight: "10px" }}
            onChange={(value) => setPadding((prev) => ({ ...prev, top: value }))}
            options={[
              { value: 3, label: "3px" },
              { value: 5, label: "5px" },
              { value: 10, label: "10px" },
              { value: 20, label: "20px" },
            ]}
          />
          <span>하 마진: </span>
          <Select
            defaultValue={3}
            style={{ width: 80, marginRight: "10px" }}
            onChange={(value) => setPadding((prev) => ({ ...prev, bottom: value }))}
            options={[
              { value: 3, label: "3px" },
              { value: 5, label: "5px" },
              { value: 10, label: "10px" },
              { value: 20, label: "20px" },
            ]}
          />
          <span>좌 마진: </span>
          <Select
            defaultValue={3}
            style={{ width: 80, marginRight: "10px" }}
            onChange={(value) => setPadding((prev) => ({ ...prev, left: value }))}
            options={[
              { value: 3, label: "3px" },
              { value: 5, label: "5px" },
              { value: 10, label: "10px" },
              { value: 20, label: "20px" },
            ]}
          />
          <span>우 마진: </span>
          <Select
            defaultValue={3}
            style={{ width: 80 }}
            onChange={(value) => setPadding((prev) => ({ ...prev, right: value }))}
            options={[
              { value: 3, label: "3px" },
              { value: 5, label: "5px" },
              { value: 10, label: "10px" },
              { value: 20, label: "20px" },
            ]}
          />
        </div>

        {/* 미리보기 영역 */}
        <div
          ref={printRef}
          style={{
            border: "1px solid #ddd",
            paddingTop: `${padding.top}px`,
            paddingBottom: `${padding.bottom}px`,
            paddingLeft: `${padding.left}px`,
            paddingRight: `${padding.right}px`,
          }}
        >
          <h2>미리보기 내용</h2>
          <p>이 부분이 프린트될 내용입니다.</p>
        </div>
      </Modal>
    </div>
  );
};

export default PrintPreview;
