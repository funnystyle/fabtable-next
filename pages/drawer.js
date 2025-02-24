// pages/month.js
import React, { useState } from "react";
import {
	PlusOutlined,
	CheckOutlined,
	ZoomInOutlined,
	ZoomOutOutlined,
} from "@ant-design/icons";
import {
	Button,
	Col,
	Drawer,
	Form,
	Input,
	Row,
	Select,
	Space,
	Layout,
	Flex,
	Tag,
	Divider,
	Radio,
	Checkbox,
} from "antd";
import Link from "next/link";

const handleChange = (value) => {
	console.log(`selected ${value}`);
};

const DrawerComponent = ({}) => {
	const [open, setOpen] = useState(true);
	const showDrawer = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};

	return (
		<Layout>
			<div className="drawer-wrap">
				{/* 드로어 헤더 */}
				<Flex align="center" justify="space-between" className="drawer-top">
					<Flex align="center" gap={10}>
						<h1 className="title-drawer">드로어 타이틀 텍스트</h1>

						<p className="drawer-descript">헤더 내 설명 텍스트</p>
					</Flex>

					<Flex gap={8} className="drawer-top-btn">
						<Button>버튼</Button>
						<Button type="primary">버튼</Button>
					</Flex>
				</Flex>
				{/* //드로어 헤더 */}

				<div
					className="drawer-container"
					style={{
						paddingRight: open ? "400px" : "0",
						transition: "padding-right 0.2s ease-in-out",
					}}
				>
					<Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
						New account
					</Button>

					<div
						className="zoom-r-btn"
						style={{
							right: open ? "440px" : "40px",
							transition: "right 0.2s ease-in-out",
						}}
					>
						<Button size="large" icon={<ZoomInOutlined />} shape="round" />

						<Button size="large" icon={<ZoomOutOutlined />} shape="round" />
					</div>
				</div>
			</div>

			<Drawer
				title="Drawer Title"
				width={400}
				onClose={onClose}
				open={open}
				mask={false}
				extra={
					<Space>
						<Button onClick={onClose}>취소</Button>
						<Button onClick={onClose} type="primary">
							다음
						</Button>
					</Space>
				}
			>
				<Flex align="center" gap={4} className="tit-area">
					<p className="tit-type">불릿있는 타이틀</p>

					<CheckOutlined />

					<Tag>태그</Tag>

					<Button>버튼</Button>

					<Button type="link" className="btn-reset-txt">
						입력 초기화
					</Button>
				</Flex>

				<p className="modal-txt">
					팝업 내 설명. 기본 사이즈. 2줄 이상일 때 2줄 이상일 때, 2줄 이상일 때,
					2줄 이상일 때, 2줄 이상일 때, 2줄 이상일 때, 2줄 이상일 때, 2줄 이상일
					때,
					<br />
					<span className="highlight">
						span 인라인 텍스트. 하이라이트 스타일. 클래스로 만들어주세요
					</span>
					<br />
					<Link href={"/"} className="link-txt">
						언더라인 있는 링크
					</Link>
				</p>

				<p className="modal-txt sm">
					팝업 내 설명. 기본 사이즈. 2줄 이상일 때 2줄 이상일 때, 2줄 이상일 때,
					2줄 이상일 때, 2줄 이상일 때, 2줄 이상일 때, 2줄 이상일 때, 2줄 이상일
					때,
				</p>

				<Divider />

				<Flex align="center" gap={4} className="tit-area">
					<p className="tit-type no-bullet">일반 타이틀</p>

					<CheckOutlined />

					<Tag>태그</Tag>

					<Button>버튼</Button>

					<Button type="link" className="btn-reset-txt">
						입력 초기화
					</Button>
				</Flex>

				<Form layout="vertical">
					<Row gutter={16}>
						<Col span={8}>
							<Form.Item label="기본 인풋" name="input1">
								<Input placeholder="입력" />
							</Form.Item>
						</Col>

						<Col span={8}>
							<Form.Item
								label="필수(필수)"
								name="input2"
								rules={[
									{
										required: true,
									},
								]}
							>
								<Input placeholder="입력" />
							</Form.Item>
						</Col>

						<Col span={8}>
							<Form.Item label="셀렉트" tooltip="This is a required field">
								<Select
									defaultValue="select1"
									onChange={handleChange}
									options={[
										{
											value: "select1",
											label: "select1",
										},
										{
											value: "select2",
											label: "select2",
										},
									]}
								/>
							</Form.Item>
						</Col>
					</Row>

					<Row gutter={16}>
						<Col span={24}>
							<Form.Item label="셀렉트" tooltip="This is a required field">
								<Select
									defaultValue="select1"
									onChange={handleChange}
									options={[
										{
											value: "select1",
											label: "select1",
										},
										{
											value: "select2",
											label: "select2",
										},
									]}
								/>
							</Form.Item>
						</Col>
					</Row>

					<Row gutter={16}>
						<Col span={24}>
							<Form.Item
								label="라디오 가로 정렬"
								tooltip={{
									title: "Tooltip with customize icon",
								}}
								name="radio1"
							>
								<Radio.Group>
									<Radio value="radio1-1">Radio</Radio>
									<Radio value="radio1-2">Radio</Radio>
									<Radio value="radio1-3">Radio</Radio>
								</Radio.Group>
							</Form.Item>
						</Col>
					</Row>

					<Row gutter={16}>
						<Col span={24}>
							<Form.Item
								label="라디오 세로 정렬"
								tooltip={{
									title: "Tooltip with customize icon",
								}}
								name="radio2"
							>
								<Radio.Group
									style={{
										display: "flex",
										flexDirection: "column",
										gap: 8,
									}}
								>
									<Radio value="radio2-1">Radio</Radio>
									<Radio value="radio2-2">Radio</Radio>
									<Radio value="radio2-3">Radio</Radio>
								</Radio.Group>
							</Form.Item>
						</Col>
					</Row>

					<Divider style={{ marginTop: 16, marginBottom: 16 }} />

					<Row gutter={16}>
						<Col span={24}>
							<Form.Item label="체크박스 가로 정렬" name="checkbox1">
								<Checkbox.Group>
									<Checkbox value="checkbox1-1">Checkbox</Checkbox>
									<Checkbox value="checkbox1-2">Checkbox</Checkbox>
									<Checkbox value="checkbox1-3">Checkbox</Checkbox>
								</Checkbox.Group>
							</Form.Item>
						</Col>
					</Row>

					<Row gutter={16}>
						<Col span={24}>
							<Form.Item label="체크박스 세로 정렬" name="checkbox1">
								<Checkbox.Group
									style={{
										display: "flex",
										flexDirection: "column",
										gap: 8,
									}}
								>
									<Checkbox value="checkbox2-1">Checkbox</Checkbox>
									<Checkbox value="checkbox2-2">Checkbox</Checkbox>
									<Checkbox value="checkbox2-3">Checkbox</Checkbox>
								</Checkbox.Group>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Drawer>
		</Layout>
	);
};

DrawerComponent.getLayout = (page) => page;

export default DrawerComponent;
