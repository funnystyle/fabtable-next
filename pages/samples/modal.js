// pages/modal.js
import React, { useState, useRef } from "react";
import {
	Layout,
	Button,
	Modal,
	Flex,
	Form,
	Input,
	Select,
	Row,
	Col,
	InputNumber,
	DatePicker,
} from "antd";
import Link from "next/link";
import Draggable from "react-draggable";

const onChange = (e) => {
	// console.log(`checked = ${e.target.checked}`);
};

const ModalComponent = ({}) => {
	const handleChange = (pagination, filters, sorter = {}) => {
		console.log("Various parameters", pagination, filters, sorter);
		// setSortedInfo(sorter.columnKey ? sorter : {});
	};

	// --------- 모달 관련
	const [openCopyModal, setOpenCopyModal] = useState(false); // Modal 열림 상태
	const [modalContent, setModalContent] = useState(null); // Modal 내용
	const [modal, contextHolder] = Modal.useModal();

	// 복제 모달 열기
	const showCopyModal = () => {
		setModalContent(
			<>
				<Flex align="center" justify="space-between">
					<p className="total-txt">
						선택 총 <strong>1</strong> 건
					</p>

					<Button type="link" className="btn-reset-txt">
						입력 초기화
					</Button>
				</Flex>

				<p className="modal-txt">복수의 수주 복제 시 수량을 꼭 확인하세요.</p>

				<Flex align="center" gap={4} className="tit-area">
					<p className="tit-type">복제 설정</p>
				</Flex>

				<Form layout="vertical" className="modal-input-area">
					<Row gutter={16}>
						<Col span={6}>
							<Form.Item label="복제수량" name="num-input1">
								<InputNumber
									min={1}
									max={10}
									defaultValue={3}
									onChange={onChange}
								/>
							</Form.Item>
						</Col>

						<Col span={6}>
							<Form.Item
								label="분류코드"
								tooltip={
									<>
										제조2팀 (0) <br />
										R&D혁신센터 (1) <br />
										제조2팀 (2)
									</>
								}
							>
								<Select
									defaultValue="groupCode1"
									onChange={handleChange}
									options={[
										{
											value: "groupCode1",
											label: "0",
										},
										{
											value: "groupCode2",
											label: "1",
										},
										{
											value: "groupCode3",
											label: "2",
										},
									]}
								/>
							</Form.Item>
						</Col>

						<Col span={6}>
							<Form.Item
								label={<Link href={"/"}>납품계획일</Link>}
								name="input4"
							>
								<DatePicker onChange={onChange} placeholder="날짜 선택" />
							</Form.Item>
						</Col>

						<Col span={6}>
							<Form.Item label="출고종류">
								<Select
									defaultValue="release1"
									onChange={handleChange}
									options={[
										{
											value: "release1",
											label: "제품 매출",
										},
										{
											value: "release2",
											label: "수리 (유상)",
										},
										{
											value: "release3",
											label: "수리 (무상)",
										},
										{
											value: "release4",
											label: "DEMO (유상)",
										},
										{
											value: "release5",
											label: "DEMO (무상)",
										},
										{
											value: "release6",
											label: "CS 대체품",
										},
										{
											value: "release7",
											label: "STOCK (CS)",
										},
										{
											value: "release8",
											label: "STOCK (양산)",
										},
										{
											value: "release9",
											label: "사내활용",
										},
										{
											value: "release10",
											label: "ETC",
										},
									]}
								/>
							</Form.Item>
						</Col>
					</Row>

					<Row gutter={16}>
						<Col span={12}>
							<Form.Item label="P/O 번호" name="po_num">
								<Input placeholder="미해당 시 비워두세요" />
							</Form.Item>
						</Col>

						<Col span={12}>
							<Form.Item label="프로젝트 번호" name="project_num">
								<Input placeholder="미해당 시 비워두세요" />
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</>
		);

		setOpenCopyModal(true);
	};

	// 모달 닫기
	const closeModal = () => {
		setOpenCopyModal(false);
		setOpenEditModal(false);
	};

	const [disabled, setDisabled] = useState(true);
	const [bounds, setBounds] = useState({
		left: 0,
		top: 0,
		bottom: 0,
		right: 0,
	});
	const draggleRef = useRef(null);

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
	// --------- 모달 관련

	return (
		<Layout>
			<br />
			<Button onClick={showCopyModal} style={{ width: "100px" }}>
				수주 복제하기
			</Button>

			{/* ModalComponent 추가 - "수주 복제하기" 클릭 시 열림 */}
			<div style={{ display: openCopyModal ? "block" : "none" }}>
				<Modal
					title={
						<div
							className="modal-title"
							onMouseOver={() => setDisabled(false)}
							onMouseOut={() => setDisabled(true)}
						>
							수주 복제하기
						</div>
					}
					open={openCopyModal}
					onCancel={() => setOpenCopyModal(false)}
					onOk={() => setOpenCopyModal(false)}
					okText="복제"
					cancelText="취소"
					width={640}
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
					{modalContent}
				</Modal>
			</div>

			{/* contextHolder를 포함해야 modal.confirm이 정상 작동 */}
			{contextHolder}
		</Layout>
	);
};

export default ModalComponent;
