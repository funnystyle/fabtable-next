// pages/order/create/index.js
import React from "react";
import { Button, Divider, Dropdown, Space, theme } from "antd";
import { DownOutlined } from "@ant-design/icons";
import useCsListConstantStore from "@store/useCsListConstantStore";

const { useToken } = theme;

const operationItems = [
  {
    label: "전체보기",
    key: "0",
  },
  {
    type: "divider" 
  },
  {
    label: "접수내용",
    key: "1",
  },
  {
    label: "제품내역",
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
  {
    label: "출장/조치",
    key: "5",
  },
];

const CsHeaderDivButton = () => {

  const { setShowList } = useCsListConstantStore();

  const { token } = useToken();
	const contentStyle = {
		backgroundColor: token.colorBgElevated,
		borderRadius: token.borderRadiusLG,
		boxShadow: token.boxShadowSecondary,
	};

	const menuStyle = {
		boxShadow: "none",
	};

  const handleMenuClick = (e) => {
    const selectedKey = e.key;
    if (selectedKey === "0") {
      setShowList([true, true, true, true, true, true]);
    } else if (selectedKey === "1") {
      setShowList([true, true, false, false, false, true]);
    } else if (selectedKey === "2") {
      setShowList([true, false, true, false, false, true]);
    } else if (selectedKey === "3") {
      setShowList([true, false, false, true, false, true]);
    } else if (selectedKey === "4") {
      setShowList([true, false, false, false, true, true]);
    } else if (selectedKey === "5") {
      setShowList([true, false, false, true, true, true]);
    }
  }

  return (
    <Dropdown menu={{ 
      items: operationItems, 
      onClick: handleMenuClick ,
      selectable: true,
      defaultSelectedKeys: ['0'],
    }}>
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
