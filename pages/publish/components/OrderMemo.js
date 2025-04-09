import React from "react";
import { Button, Flex, Form, Input } from "antd";
import { SettingOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const OrderMemo = () => {
	return (
		<div className="tab-content-in top-h">
			<Flex align="center" justify="space-between" className="title-bg-blue">
				<p className="titie-info">부서별 메모</p>

				<p>
					<Button icon={<SettingOutlined />} size="small" />
				</p>
			</Flex>

			<div className="order-info-wrap">
				<Form.Item label="영업팀 메모">
					<TextArea rows={5} />
				</Form.Item>

				<Form.Item label="제조팀 메모">
					<TextArea rows={5} />
				</Form.Item>

				<Form.Item label="품질팀 메모">
					<TextArea rows={5} />
				</Form.Item>

				<Flex justify="flex-end">
					<Button type="primary" style={{ width: "84px" }}>
						메모 저장
					</Button>
				</Flex>
			</div>
		</div>
	);
};

export default OrderMemo;
