// pages/order/create/index.js
import React from "react";
import { Button, Flex, } from "antd";

const OrderListPrintLabelTitle = ({form, setSelectedLabel}) => {

	// 📌 라벨 설정 초기화 핸들러
	const handleLabelReset = () => {
		form.resetFields();
		setSelectedLabel("radio1-1"); // 선택된 값 업데이트
	};

	return (
		<Flex align="center" gap={4} className="tit-area">
			<p className="tit-type no-bullet">라벨 설정</p>

			<Button type="link" className="btn-reset-txt" onClick={handleLabelReset}>
				설정 초기화
			</Button>
		</Flex>
	);
};

export default OrderListPrintLabelTitle;
