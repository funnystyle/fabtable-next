// pages/month.js
import React, { useRef, useState } from "react";
import {
	Layout,
	Button,
	Modal,
	Flex,
	Form,
	Input,
	Select,
	InputNumber,
	Radio,
	Checkbox,
	Tag,
} from "antd";
import {
	ClockCircleOutlined,
	CalendarOutlined,
	InfoCircleOutlined,
	CheckOutlined,
} from "@ant-design/icons";
import Draggable from "react-draggable";
import Link from "next/link";

const handleChange = (value) => {
	console.log(`selected ${value}`);
};

const onChange = (value) => {
	console.log("changed", value);
};

const ModalComponent = ({}) => {
	const [open, setOpen] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const [bounds, setBounds] = useState({
		left: 0,
		top: 0,
		bottom: 0,
		right: 0,
	});
	const draggleRef = useRef(null);
	const showModal = () => {
		setOpen(true);
	};
	const handleOk = (e) => {
		console.log(e);
		setOpen(false);
	};
	const handleCancel = (e) => {
		console.log(e);
		setOpen(false);
	};
	const onStart = (_event, uiData) => {
		const { clientWidth, clientHeight } = window.document.documentElement;
		const targetRect = draggleRef.current?.getBoundingClientRect();
		if (!targetRect) {
			return;
		}
		setBounds({
			left: -targetRect.left + uiData.x,
			right: clientWidth - (targetRect.right - uiData.x),
			top: -targetRect.top + uiData.y,
			bottom: clientHeight - (targetRect.bottom - uiData.y),
		});
	};

	return (
		<Layout>
			<Flex gap="small">
				<Button onClick={showModal}>Open Draggable Modal</Button>
				{/* <Button onClick={showModal}>Open custom Modal</Button> */}
			</Flex>

			<Modal
				title={
					<div
						className="modal-title"
						onMouseOver={() => {
							if (disabled) {
								setDisabled(false);
							}
						}}
						onMouseOut={() => {
							setDisabled(true);
						}}
						onFocus={() => {}}
						onBlur={() => {}}
						// end
					>
						Modal title
					</div>
				}
				width={640}
				open={open}
				onOk={handleOk}
				onCancel={handleCancel}
				okText="확인"
				cancelText="취소"
				modalRender={(modal) => (
					<Draggable
						disabled={disabled}
						bounds={bounds}
						nodeRef={draggleRef}
						onStart={(event, uiData) => onStart(event, uiData)}
					>
						<div ref={draggleRef}>{modal}</div>
					</Draggable>
				)}
			>
				<div
					className="modal-container"
					style={
						{
							// height: "200px"  필요시 높이값 설정
						}
					}
				>
					<Flex align="center" justify="space-between">
						<p className="total-txt">
							total <strong>number</strong> text
						</p>

						<Button type="link" className="btn-reset-txt">
							입력 초기화
						</Button>
					</Flex>

					<p className="modal-txt">
						팝업 내 설명. 기본 사이즈. 2줄 이상일 때 2줄 이상일 때, 2줄 이상일
						때, 2줄 이상일 때, 2줄 이상일 때, 2줄 이상일 때, 2줄 이상일 때, 2줄
						이상일 때,
						<br />
						<span className="highlight">
							span 인라인 텍스트. 하이라이트 스타일. 클래스로 만들어주세요
						</span>
						<br />
						<Link href={"/"} className="link-txt">
							언더라인 있는 링크
						</Link>
					</p>

					<Flex align="center" gap={4} className="tit-modal-area">
						<p className="tit-modal-input">입력 폼 타이틀</p>

						<CheckOutlined />

						<Tag>태그</Tag>

						<Button>버튼</Button>
					</Flex>

					<Flex gap="middle" className="modal-input-area">
						<Form layout="vertical">
							<Form.Item label="기본 인풋" name="input1">
								<Input placeholder="입력" />
							</Form.Item>
						</Form>

						<Form layout="vertical">
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
						</Form>

						<Form layout="vertical">
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
						</Form>

						<Form layout="vertical">
							<Form.Item label="시간선택" name="input3">
								<Input
									placeholder="시간"
									suffix={
										<ClockCircleOutlined
											style={{ color: "rgba(0,0,0,0.25)" }}
										/>
									}
								/>
							</Form.Item>
						</Form>

						<Form layout="vertical">
							<Form.Item
								label={<Link href={"/"}>날짜 선택</Link>}
								name="input4"
							>
								<Input
									placeholder="날짜"
									suffix={
										<CalendarOutlined style={{ color: "rgba(0,0,0,0.25)" }} />
									}
								/>
							</Form.Item>
						</Form>
					</Flex>

					<Flex gap="middle" className="modal-input-area">
						<Form layout="vertical">
							<Form.Item label="숫자 인풋 기본" name="num-input1">
								<InputNumber
									min={1}
									max={10}
									defaultValue={3}
									onChange={onChange}
								/>
							</Form.Item>
						</Form>

						<Form layout="vertical">
							<Form.Item label="인풋 disabled" name="num-input2">
								<InputNumber
									min={1}
									max={10}
									defaultValue={3}
									onChange={onChange}
									disabled
								/>
							</Form.Item>
						</Form>

						<Form layout="vertical">
							<Form.Item
								label="숫자 인풋 hover"
								name="num-input3"
								help="캡션 텍스트 있음"
							>
								<InputNumber
									min={1}
									max={10}
									defaultValue={3}
									onChange={onChange}
								/>
							</Form.Item>
						</Form>

						<Form layout="vertical">
							<Form.Item
								label="숫자 인풋 타이핑 중"
								name="num-input4"
								validateStatus="error"
								help="에러일 때 캡션 텍스트"
							>
								<InputNumber
									min={1}
									max={10}
									defaultValue={3}
									onChange={onChange}
								/>
							</Form.Item>
						</Form>
					</Flex>

					<Flex gap="middle" className="modal-input-area">
						<Form layout="vertical">
							<Form.Item
								label="라디오"
								tooltip={{
									title: "Tooltip with customize icon",
									icon: <InfoCircleOutlined />,
								}}
								name="radio1"
							>
								<Radio.Group>
									<Radio value="radio1-1">Radio</Radio>
									<Radio value="radio1-2">Radio</Radio>
									<Radio value="radio1-3">Radio</Radio>
								</Radio.Group>
							</Form.Item>
						</Form>

						<Form layout="vertical">
							<Form.Item
								label="체크박스"
								tooltip={{
									title: "Tooltip with customize icon",
									icon: <InfoCircleOutlined />,
								}}
								name="checkbox1"
							>
								<Checkbox.Group>
									<Checkbox value="checkbox1-1">Checkbox</Checkbox>
									<Checkbox value="checkbox1-2">Checkbox</Checkbox>
									<Checkbox value="checkbox1-3">Checkbox</Checkbox>
								</Checkbox.Group>
							</Form.Item>
						</Form>
					</Flex>

					<Flex gap="middle" className="modal-input-area">
						<Form layout="vertical">
							<Form.Item label="라벨" name="input5">
								<Input placeholder="placeholder" />
							</Form.Item>
						</Form>

						<Form layout="vertical">
							<Form.Item
								label="라벨"
								name="input5"
								validateStatus="error"
								help="에러일 때 캡션 텍스트"
							>
								<Input placeholder="placeholder" />
							</Form.Item>
						</Form>
					</Flex>

					<p className="modal-txt sm">
						팝업 내 설명. 기본 사이즈. 2줄 이상일 때 2줄 이상일 때, 2줄 이상일
						때, 2줄 이상일 때, 2줄 이상일 때, 2줄 이상일 때, 2줄 이상일 때, 2줄
						이상일 때,
					</p>
				</div>
			</Modal>
		</Layout>
	);
};

export default ModalComponent;
