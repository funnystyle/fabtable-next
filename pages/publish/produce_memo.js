// pages/product_memo.js
import React, { useEffect } from "react";
import { Flex, Typography, Form, Input, Button } from "antd";

const { TextArea } = Input;
const { Title } = Typography;

const ProduceMemoComponent = () => {
	useEffect(() => {
		document.documentElement.classList.add("f-html");
		document.body.classList.add("f-body");

		// Cleanup: 페이지가 변경될 때 클래스 제거
		return () => {
			document.documentElement.classList.remove("f-html");
			document.body.classList.remove("f-body");
		};
	}, []);

	return (
		<div className="system-popup-wrap memo">
			<Flex
				align="center"
				justify="space-between"
				className="system-title-area"
			>
				<Title level={3} className="title-page">
					부서별 메모
				</Title>

				<Flex
					align="center"
					justify="space-between"
					className="control-info-area"
				>
					<p>530240902012</p>
					<p>A24-00019</p>
					<p>MARU 7001</p>
				</Flex>
			</Flex>

			<div className="popup-contents">
				<div className="order-info-wrap memo">
					<Form.Item label="영업팀 메모">
						<TextArea rows={5} style={{ resize: "none" }} />
					</Form.Item>

					<Form.Item label="제조팀 메모">
						<TextArea rows={5} style={{ resize: "none" }} />
					</Form.Item>

					<Form.Item label="품질팀 메모">
						<TextArea rows={5} style={{ resize: "none" }} />
					</Form.Item>
				</div>

				<Flex gap={8} justify="center" align="center" className="popup-f-btn">
					<Button>닫기</Button>
					<Button type="primary">저장</Button>
				</Flex>
			</div>
		</div>
	);
};

ProduceMemoComponent.getLayout = (page) => page;

export default ProduceMemoComponent;
