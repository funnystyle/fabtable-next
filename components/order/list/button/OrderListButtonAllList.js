// pages/order/create/index.js
import React from "react";
import { Button, } from "antd";
import { RedoOutlined } from "@ant-design/icons";

const OrderListButtonAllList = () => {

	return (
		<Button
			variant="outlined"
			icon={<RedoOutlined />}
			className="icon-redo"
		>
			전체 목록
		</Button>
	);
};

export default OrderListButtonAllList;
