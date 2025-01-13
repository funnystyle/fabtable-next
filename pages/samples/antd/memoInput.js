import React, { useState } from "react";
import { Space, Input, Tooltip } from "antd";

const { Search } = Input;

const MemoWithTooltip = () => {
  const [memo, setMemo] = useState(""); // 입력된 메모 상태 관리

  const onSearch = (value) => {
    console.log("저장된 메모:", value);
  };

  const handleChange = (e) => {
    setMemo(e.target.value);
  };

  return (
    <div style={{ padding: "200px 0 0 200px" }}>
      <Space direction="vertical">
        <Tooltip
          title={memo || null}
          placement="topLeft"
          color={"#DEEFFF"}
          overlayInnerStyle={{ color: "#000" }}
        >
          <Search
            placeholder="메모를 입력하세요"
            value={memo}
            onChange={handleChange}
            onSearch={onSearch}
            enterButton="저장"
          />
        </Tooltip>
      </Space>
    </div>
  );
};

export default MemoWithTooltip;
