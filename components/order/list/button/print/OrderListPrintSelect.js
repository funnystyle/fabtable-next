// pages/order/create/index.js
import React, { useEffect, useState } from "react";
import { Button, Col, Divider, Dropdown, Flex, Form, Radio, Row, Select, Space, } from "antd";
import { DownOutlined, RedoOutlined } from "@ant-design/icons";
import OrderListPrintLabel from "@components/order/list/button/print/OrderListPrintLabel";

const OrderListPrintSelect = ({ selectedPrint, setSelectedPrint }) => {

	// 📌 인쇄 구분 선택 핸들러
	const handlePrintChange = (value) => {
		setSelectedPrint(value); // 선택된 값 업데이트
	};

	return (
		<Form.Item>
			<Select
				showSearch
				allowClear
				filterOption={(input, option) =>
					(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
				}
				onChange={handlePrintChange}
				value={selectedPrint}
				options={[
					{
						value: "label",
						label: "라벨 인쇄",
					},
					{
						value: "report",
						label: "성적서 인쇄",
					},
				]}
			/>
		</Form.Item>
	);

};

export default OrderListPrintSelect;
