// pages/order/create/index.js
import React from "react";
import { Button, Dropdown, message, Space, } from "antd";
import { DownOutlined, RedoOutlined } from "@ant-design/icons";

const handleMenuClick = (e) => {
	message.info("Click on menu item.");
	console.log("click", e);
};

const excelItems = [
	{
		label: "편집 항목만",
		key: "1",
		children: [
			{
				key: "1-1",
				label: "선택한 행",
			},
			{
				key: "1-2",
				label: "전체 행",
			},
		],
	},
	{
		label: "전체 항목",
		key: "2",
		children: [
			{
				key: "2-1",
				label: "선택한 행",
			},
			{
				key: "2-2",
				label: "전체 행",
			},
		],
	},
];

const OrderListButtonExcel = () => {

	return (
		<Dropdown
			menu={{ items: excelItems, onClick: handleMenuClick }}
			className="excel-menu"
		>
			<Button>
				<Space>
					엑셀 다운로드
					<DownOutlined />
				</Space>
			</Button>
		</Dropdown>
	);
};

export default OrderListButtonExcel;
