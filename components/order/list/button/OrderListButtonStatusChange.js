// pages/order/create/index.js
import React from "react";
import { Button, Dropdown, Space, } from "antd";
import { DownOutlined } from "@ant-design/icons";

const OrderListButtonStatusChange = ({ statusList, nowStatusUpdate, keysStore }) => {

	const stateStatusList = statusList.map((item, i) => ({label: item, key: `${i}`}));

	const { datas } = keysStore();

	const handleStatusChange = async (e) => {
		if (datas.length <= 0) return;

		nowStatusUpdate(datas.map((data) => data.id), statusList[e.key]);
	}

	return (
		<Dropdown
			menu={{ items: stateStatusList, onClick: handleStatusChange }}
		>
			<Button>
				<Space>
					상태변경
					<DownOutlined />
				</Space>
			</Button>
		</Dropdown>
	);
};

export default OrderListButtonStatusChange;
