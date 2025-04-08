// pages/order/create/index.js
import React from "react";
import { Button, } from "antd";
import { handleOpenCsHistory } from "@components/cs/list/button/handleOpenCsHistory";

const CsHistoryButton = ({ openLength, modalStore }) => {


	return (
		<Button variant="outlined" onClick={() => handleOpenCsHistory(openLength, modalStore)}>C/S 이력</Button>
	);
};

export default CsHistoryButton;
