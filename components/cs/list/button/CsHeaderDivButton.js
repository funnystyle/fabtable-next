// pages/order/create/index.js
import React from "react";
import { Button, Dropdown, Space, } from "antd";
import { DownOutlined } from "@ant-design/icons";
import useCsListConstantStore from "@store/useCsListConstantStore";

const operationItems = [
  {
    label: "전체보기",
    key: "0",
  },
  {
    label: "접수내용",
    key: "1",
  },
  {
    label: "진행내역",
    key: "2",
  },
  {
    label: "출장내역",
    key: "3",
  },
  {
    label: "후속조치",
    key: "4",
  },
];

const CsHeaderDivButton = () => {

  const { setShowList } = useCsListConstantStore();


  const handleMenuClick = (e) => {
    const selectedKey = e.key;
    if (selectedKey === "0") {
      setShowList([true, true, true, true, true]);
    } else if (selectedKey === "1") {
      setShowList([true, true, false, false, false]);
    } else if (selectedKey === "2") {
      setShowList([true, false, true, false, false]);
    } else if (selectedKey === "3") {
      setShowList([true, false, false, true, false]);
    } else if (selectedKey === "4") {
      setShowList([true, false, false, false, true]);
    }
  }

  return (
    <Dropdown
      menu={{ items: operationItems, onClick: handleMenuClick }}
    >
      <Button>
        <Space>
          구분별 보기
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default CsHeaderDivButton;
