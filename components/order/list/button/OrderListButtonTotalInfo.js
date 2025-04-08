// pages/order/create/index.js
import React from "react";
import { Button, } from "antd";
import { handleOpenPopup } from "@components/popup/handleOpenPopup";

const OrderListButtonTotalInfo = () => {

	return (
		<Button variant="outlined" onClick={()=> handleOpenPopup(window, {
			url: '/order/info/1',
			name: 'order_popup',
		})} >수주 종합정보</Button>
	);
};

export default OrderListButtonTotalInfo;
