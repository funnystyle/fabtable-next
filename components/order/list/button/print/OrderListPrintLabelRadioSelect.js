// pages/order/create/index.js
import React, { useEffect, useState } from "react";
import { Button, Col, Divider, Dropdown, Flex, Form, Radio, Row, Select, Space, } from "antd";
import { DownOutlined, RedoOutlined } from "@ant-design/icons";

const OrderListPrintLabelRadioSelect = ({ setSelectedLabel }) => {

	// 📌 라벨 종류 선택 핸들러
	const handleLabelChange = (e) => {
		setSelectedLabel(e.target.value); // 선택된 값 업데이트
	};

	return (
		<Row gutter={8}>
			<Col span={24}>
				<Form.Item label="라벨 종류" name="radio1">
					<Radio.Group
						onChange={handleLabelChange} // ✅ 라벨 선택 이벤트 핸들러 추가
						style={{
							display: "flex",
							flexDirection: "column",
							gap: 8,
						}}
						defaultValue="radio1-1"
					>
						<Radio value="radio1-1">라벨 1 --&gt; 2 --&gt; 3</Radio>
						<Radio value="radio1-2">라벨 1</Radio>
						<Radio value="radio1-3">라벨 2</Radio>
						<Radio value="radio1-4">라벨 3</Radio>
					</Radio.Group>
				</Form.Item>
			</Col>
		</Row>
	);
};

export default OrderListPrintLabelRadioSelect;
