// pages/order/create/index.js
import React, { useEffect, useState } from "react";
import { Button, Col, Divider, Dropdown, Flex, Form, Radio, Row, Select, Space, } from "antd";
import { DownOutlined, RedoOutlined } from "@ant-design/icons";

const OrderListPrintLabelRadio = ({ list, index }) => {

	return (
		<>
			<Divider style={{ marginTop: 16, marginBottom: 16 }} />

			<Row gutter={8}>
				<Flex align="center" gap={4} className="tit-area">
					<p className="tit-type no-bullet">라벨{index + 1} 설정</p>
				</Flex>

				{list.map((d, i) => (
					<Col span={24} key={`col-${index + 1}-${i + 1}`}>
						<Form.Item 
							label={d.name} 
							name={`radio${index + 1}-${i + 1}`} 
							initialValue={`radio${index + 1}-${i + 1}-1`}
						>
							<Radio.Group
								style={{
									display: "flex",
									flexDirection: "column",
									gap: 8,
								}}
								// defaultValue={`radio${index + 1}-${i + 1}-1`}
							>
								{d.list.map((r, j) => (
									<Radio value={`radio${index + 1}-${i + 1}-${j + 1}`} key={`radio${index + 1}-${i + 1}-${j + 1}`}>{r}</Radio>
								))}
							</Radio.Group>
						</Form.Item>
					</Col>
				))}

			</Row>
		</>
	);
};

export default OrderListPrintLabelRadio;
