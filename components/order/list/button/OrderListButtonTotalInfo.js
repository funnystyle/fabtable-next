// pages/order/create/index.js
import React from "react";
import { Button, } from "antd";
import { handleRecordInfoPopup } from "@components/popup/handleOpenPopup";

const OrderListButtonTotalInfo = ({ datas }) => {

	return (
		<Button variant="outlined" onClick={()=> handleRecordInfoPopup(window, datas)} >수주 종합정보</Button>
	);
};

export default OrderListButtonTotalInfo;
