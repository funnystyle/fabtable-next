import React from "react";
import { Button, Flex, Form, Input } from "antd";
import { SettingOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const ProduceBasic7 = () => {
	return (
		<div className="tab-content-in">
			<Flex align="center" justify="space-between" className="title-bg-blue">
				<p className="titie-info">메모</p>

				<p>
					<Button icon={<SettingOutlined />} size="small" />
				</p>
			</Flex>

			<div className="order-info-wrap">
				<Form.Item label="영업팀 메모">
					<TextArea rows={5} />
				</Form.Item>

				<Form.Item label="생산팀 메모">
					<TextArea rows={5} />
				</Form.Item>

				<Form.Item label="품질팀 메모">
					<TextArea rows={5} />
				</Form.Item>
			</div>
		</div>
	);
};

export default ProduceBasic7;
