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
	Radio,
	Pagination,
	Table,
	Tag,
} from "antd";
import {
	RedoOutlined,
	PlusOutlined,
	VerticalRightOutlined,
	VerticalLeftOutlined,
	SettingOutlined,
	LeftOutlined,
	RightOutlined,
	CheckOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Draggable from "react-draggable";

const { RangePicker } = DatePicker;
const onOk = (value) => {
	console.log("onOk: ", value);
};

const onChange = (e) => {
	// console.log(`checked = ${e.target.checked}`);
};

const onSearch = (value) => {
	console.log("search:", value);
};

const data = [
	{
		key: "1",
		no: 1,
		serialnum: "570241202090",
		productnum: "A2024-00008",
		csnum: "2024-0004",
		csstate: <Tag className="tag-receipt">접수</Tag>,
		etc: (
			<>
				<Flex gap={4}>
					<Button size="small">수주정보</Button>
					<Button size="small" icon={<CheckOutlined />} iconPosition="start">
						선택
					</Button>
				</Flex>
			</>
		),
	},
	{
		key: "2",
		no: 2,
		serialnum: "570241202090",
		productnum: "A2024-00008",
		csnum: "2024-0004",
		csstate: <Tag className="tag-ing">진행</Tag>,
		etc: (
			<>
				<Flex gap={4}>
					<Button size="small">수주정보</Button>
					<Button size="small" icon={<CheckOutlined />} iconPosition="start">
						선택
					</Button>
				</Flex>
			</>
		),
	},
	{
		key: "3",
		no: 3,
		serialnum: "570241202090",
		productnum: "A2024-00008",
		csnum: "2024-0004",
		csstate: <Tag className="tag-end">종결</Tag>,
		etc: (
			<>
				<Flex gap={4}>
					<Button size="small">수주정보</Button>
					<Button size="small" icon={<CheckOutlined />} iconPosition="start">
						선택
					</Button>
				</Flex>
			</>
		),
	},
	{
		key: "4",
		no: 4,
		serialnum: "570241202090",
		productnum: "A2024-00008",
		csnum: "2024-0004",
		csstate: <Tag className="tag-cancel">취소</Tag>,
		etc: (
			<>
				<Flex gap={4}>
					<Button size="small">수주정보</Button>
					<Button size="small" icon={<CheckOutlined />} iconPosition="start">
						선택
					</Button>
				</Flex>
			</>
		),
	},
	{
		key: "5",
		no: 5,
		serialnum: "570241202090",
		productnum: "A2024-00008",
		csnum: "2024-0004",
		csstate: "-",
		etc: (
			<>
				<Flex gap={4}>
					<Button size="small">수주정보</Button>
					<Button size="small" icon={<CheckOutlined />} iconPosition="start">
						선택
					</Button>
				</Flex>
			</>
		),
	},
	{
		key: "6",
		no: 6,
		serialnum: "570241202090",
		productnum: "A2024-00008",
		csnum: "2024-0004",
		csstate: "-",
		etc: (
			<>
				<Flex gap={4}>
					<Button size="small">수주정보</Button>
					<Button size="small" icon={<CheckOutlined />} iconPosition="start">
						선택
					</Button>
				</Flex>
			</>
		),
	},
];

const ModalComponent = ({}) => {
	const handleChange = (pagination, filters, sorter = {}) => {
		console.log("Various parameters", pagination, filters, sorter);
		// setSortedInfo(sorter.columnKey ? sorter : {});
	};

	// --------- 모달 관련
	const [openCopyModal, setOpenCopyModal] = useState(false); // Modal 열림 상태
	const [openSearchModal, setOpenSearchModal] = useState(false); // Modal 열림 상태
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
		setOpenSearchModal(false);
	};

	//--------------- 조건 검색 모달 관련
	const [current, setCurrent] = useState(2);
	const [inputValue, setInputValue] = useState("2");
	const totalItems = 50;
	const totalPages = Math.ceil(totalItems / 10);

	// 페이지 변경 핸들러
	const onChange = (page) => {
		setCurrent(page);
		setInputValue(page.toString());
	};

	// Input 핸들러
	const handleInputChange = (e) => {
		const value = e.target.value;
		if (/^\d*$/.test(value)) {
			setInputValue(value);
		}
	};

	// Input 엔터 및 포커스 아웃 핸들러
	const handleInputConfirm = () => {
		const pageNumber = Number(inputValue);
		if (pageNumber >= 1 && pageNumber <= totalPages) {
			setCurrent(pageNumber);
		} else {
			setInputValue(current.toString());
		}
	};

	// 커스터마이즈된 버튼 렌더링
	const itemRender = (page, type, originalElement) => {
		if (type === "prev") {
			return <LeftOutlined />;
		}
		if (type === "next") {
			return <RightOutlined />;
		}
		if (type === "page" && page === current) {
			return (
				<Input
					style={{ width: 50, textAlign: "center" }}
					value={inputValue}
					onChange={handleInputChange}
					onBlur={handleInputConfirm}
					onPressEnter={handleInputConfirm}
					size="small"
				/>
			);
		}
		return originalElement;
	};

	// 조건검색 모달 열기
	const showSearchModal = () => {
		setModalContent(
			<>
				<Flex align="center" justify="space-between">
					<p className="total-txt">
						검색 카테고리별로 입력필드를 여러 개 추가, 삭제할 수 있습니다.
					</p>

					<Button type="link" className="btn-reset-txt">
						입력 초기화
					</Button>
				</Flex>

				<div className="layer-scroll">
					<Flex align="center" gap={4} className="tit-area">
						<p className="tit-type">제품</p>

						<Button type="link" className="btn-reset-txt">
							초기화
						</Button>
					</Flex>

					<Form layout="vertical" className="modal-input-area">
						<Flex gap={8}>
							<Form.Item label="제품군">
								<Select
									showSearch
									defaultValue="product1"
									onChange={handleChange}
									onSearch={onSearch}
									options={[
										{
											value: "product1",
											label: "MARU",
										},
									]}
								/>
							</Form.Item>

							<Form.Item label="모델">
								<Select
									showSearch
									defaultValue="model1"
									onChange={handleChange}
									onSearch={onSearch}
									options={[
										{
											value: "model1",
											label: "7000s",
										},
									]}
								/>
							</Form.Item>

							<Form.Item label="세부모델">
								<Select
									showSearch
									defaultValue="detailModel1"
									onChange={handleChange}
									onSearch={onSearch}
									options={[
										{
											value: "moddetailModel1el1",
											label: "7003",
										},
									]}
								/>
							</Form.Item>

							<Form.Item label="채널">
								<Select
									showSearch
									defaultValue="channel1"
									onChange={handleChange}
									onSearch={onSearch}
									options={[
										{
											value: "channel1",
											label: "2ch",
										},
									]}
								/>
							</Form.Item>
						</Flex>
					</Form>

					<Flex align="center" gap={4} className="tit-area">
						<p className="tit-type">C/S 검색</p>

						<Button type="link" className="btn-reset-txt">
							초기화
						</Button>
					</Flex>

					<Form layout="vertical" className="modal-input-area">
						<Flex gap={8}>
							<Form.Item label="시리얼 번호" name="serial-num">
								<Input />
							</Form.Item>

							<Form.Item label="제조 번호" name="product-num">
								<Input />
							</Form.Item>

							<Form.Item label="C/S 번호" name="cs-num">
								<Input />
							</Form.Item>
						</Flex>
					</Form>

					<Flex align="center" gap={4} className="tit-area">
						<p className="tit-type">일반</p>

						<Button type="link" className="btn-reset-txt">
							초기화
						</Button>
					</Flex>

					<Form layout="vertical" className="modal-input-area">
						<Flex gap={8} align="center">
							<Form.Item
								style={{
									width: "160px",
									flex: "none",
								}}
							>
								<Select
									defaultValue="usegas1"
									onChange={handleChange}
									options={[
										{
											value: "usegas1",
											label: "사용가스",
										},
									]}
								/>
							</Form.Item>

							<Form.Item className="select-radio-area">
								<Radio.Group>
									<Radio value="include1-1">포함</Radio>
									<Radio value="include1-2">미포함</Radio>
									<Radio value="include1-3">일치</Radio>
								</Radio.Group>
							</Form.Item>

							<Form.Item>
								<Input placeholder="-" />
							</Form.Item>

							<Form.Item className="btn-add-area">
								<Flex gap={4}>
									<Button
										icon={<RedoOutlined />}
										size="small"
										className="icon-redo"
									/>

									<Button icon={<PlusOutlined />} size="small" />
								</Flex>
							</Form.Item>
						</Flex>

						<Flex gap={8} align="center">
							<Form.Item
								style={{
									width: "160px",
									flex: "none",
								}}
							>
								<Select
									defaultValue="vendor1"
									onChange={handleChange}
									options={[
										{
											value: "vendor1",
											label: "납품처",
										},
									]}
								/>
							</Form.Item>

							<Form.Item className="select-radio-area">
								<Radio.Group>
									<Radio value="include2-1">포함</Radio>
									<Radio value="include2-2">미포함</Radio>
									<Radio value="include12-3">일치</Radio>
								</Radio.Group>
							</Form.Item>

							<Form.Item>
								<Input placeholder="-" />
							</Form.Item>

							<Form.Item className="btn-add-area">
								<Flex gap={4}>
									<Button
										icon={<RedoOutlined />}
										size="small"
										className="icon-redo"
									/>

									<Button icon={<PlusOutlined />} size="small" />
								</Flex>
							</Form.Item>
						</Flex>
					</Form>

					<Flex align="center" gap={4} className="tit-area">
						<p className="tit-type">숫자/수치</p>

						<Button type="link" className="btn-reset-txt">
							초기화
						</Button>
					</Flex>

					<Form layout="vertical" className="modal-input-area">
						<Flex gap={8} align="center">
							<Form.Item
								style={{
									width: "160px",
									flex: "none",
								}}
							>
								<Select
									defaultValue="oil1"
									onChange={handleChange}
									options={[
										{
											value: "oil1",
											label: "유량",
										},
									]}
								/>
							</Form.Item>

							<Form.Item className="select-radio-area">
								<Radio.Group>
									<Radio value="scope1-1">범위</Radio>
									<Radio value="scope1-2">≤</Radio>
									<Radio value="scope1-3">≥</Radio>
									<Radio value="scope1-4">=</Radio>
								</Radio.Group>
							</Form.Item>

							<Form.Item>
								<Flex gap={4}>
									<InputNumber
										min={1}
										max={10000}
										defaultValue={1000}
										onChange={onChange}
									/>

									<InputNumber
										min={1}
										max={10000}
										defaultValue={1000}
										onChange={onChange}
									/>
								</Flex>
							</Form.Item>

							<Form.Item className="btn-add-area">
								<Flex gap={4}>
									<Button
										icon={<RedoOutlined />}
										size="small"
										className="icon-redo"
									/>

									<Button icon={<PlusOutlined />} size="small" />
								</Flex>
							</Form.Item>
						</Flex>

						<Flex gap={8} align="center">
							<Form.Item
								style={{
									width: "160px",
									flex: "none",
								}}
							>
								<Select
									defaultValue="oil2"
									onChange={handleChange}
									options={[
										{
											value: "oil2",
											label: "유량",
										},
									]}
								/>
							</Form.Item>

							<Form.Item className="select-radio-area">
								<Radio.Group>
									<Radio value="scope2-1">범위</Radio>
									<Radio value="scope2-2">≤</Radio>
									<Radio value="scope2-3">≥</Radio>
									<Radio value="scope2 -4">=</Radio>
								</Radio.Group>
							</Form.Item>

							<Form.Item>
								<Flex gap={4}>
									<InputNumber
										min={1}
										max={10000}
										defaultValue={1000}
										onChange={onChange}
									/>

									<InputNumber
										min={1}
										max={10000}
										defaultValue={1000}
										onChange={onChange}
									/>
								</Flex>
							</Form.Item>

							<Form.Item className="btn-add-area">
								<Flex gap={4}>
									<Button
										icon={<RedoOutlined />}
										size="small"
										className="icon-redo"
									/>

									<Button icon={<PlusOutlined />} size="small" />
								</Flex>
							</Form.Item>
						</Flex>
					</Form>

					<Flex align="center" gap={4} className="tit-area">
						<p className="tit-type">기간/날짜</p>

						<Button type="link" className="btn-reset-txt">
							초기화
						</Button>
					</Flex>

					<Form layout="vertical" className="modal-input-area">
						<Flex gap={8} align="center">
							<Form.Item
								style={{
									width: "160px",
									flex: "none",
								}}
							>
								<Select
									defaultValue="date1"
									onChange={handleChange}
									options={[
										{
											value: "date1",
											label: "납품계획일",
										},
									]}
								/>
							</Form.Item>

							<Form.Item className="select-radio-area select-radio-area2">
								<Radio.Group>
									<Radio value="period1-1">기간</Radio>
									<Radio value="period1-2">이전</Radio>
									<Radio value="period1-3">이후</Radio>
									<Radio value="period1-4">일치</Radio>
								</Radio.Group>
							</Form.Item>

							<Form.Item>
								<RangePicker
									showTime={{
										format: "HH:mm",
									}}
									format="YYYY-MM-DD HH:mm"
									onChange={(value, dateString) => {
										console.log("Selected Time: ", value);
										console.log("Formatted Selected Time: ", dateString);
									}}
									onOk={onOk}
								/>
							</Form.Item>

							<Form.Item className="btn-add-area">
								<Flex gap={4}>
									<Button
										icon={<RedoOutlined />}
										size="small"
										className="icon-redo"
									/>

									<Button icon={<PlusOutlined />} size="small" />
								</Flex>
							</Form.Item>
						</Flex>

						<Flex gap={8} align="center">
							<Form.Item
								style={{
									width: "160px",
									flex: "none",
								}}
							>
								<Select
									defaultValue="date2"
									onChange={handleChange}
									options={[
										{
											value: "date2",
											label: "등록일",
										},
									]}
								/>
							</Form.Item>

							<Form.Item className="select-radio-area select-radio-area2">
								<Radio.Group>
									<Radio value="period2-1">기간</Radio>
									<Radio value="period2-2">이전</Radio>
									<Radio value="period2-3">이후</Radio>
									<Radio value="period2-4">일치</Radio>
								</Radio.Group>
							</Form.Item>

							<Form.Item>
								<DatePicker
									showTime
									onChange={(value, dateString) => {
										console.log("Selected Time: ", value);
										console.log("Formatted Selected Time: ", dateString);
									}}
									onOk={onOk}
									style={{
										width: "100%",
									}}
								/>
							</Form.Item>

							<Form.Item className="btn-add-area">
								<Flex gap={4}>
									<Button
										icon={<RedoOutlined />}
										size="small"
										className="icon-redo"
									/>

									<Button icon={<PlusOutlined />} size="small" />
								</Flex>
							</Form.Item>
						</Flex>

						<Flex
							gap={8}
							align="center"
							justify="space-between"
							className="year-select-area"
						>
							<Form.Item
								style={{
									width: "750px",
								}}
							>
								<RangePicker
									picker="year"
									style={{
										width: "100%",
									}}
									id={{
										start: "startInput",
										end: "endInput",
									}}
									onFocus={(_, info) => {
										console.log("Focus:", info.range);
									}}
									onBlur={(_, info) => {
										console.log("Blur:", info.range);
									}}
								/>
							</Form.Item>

							<Form.Item>
								<Flex gap={4}>
									<Button
										icon={<RedoOutlined />}
										size="small"
										className="icon-redo"
									/>

									<Button size="small">최근 3년</Button>
								</Flex>
							</Form.Item>
						</Flex>
					</Form>

					<Flex align="center" gap={4} className="tit-area">
						<p className="tit-type">작업자</p>

						<Button type="link" className="btn-reset-txt">
							초기화
						</Button>
					</Flex>

					<Form layout="vertical" className="modal-input-area">
						<Flex gap={8} align="center">
							<Form.Item
								style={{
									width: "160px",
									flex: "none",
								}}
							>
								<Select
									defaultValue="writer1"
									onChange={handleChange}
									options={[
										{
											value: "writer1",
											label: "등록자",
										},
									]}
								/>
							</Form.Item>

							<Form.Item className="select-radio-area">
								<Radio.Group>
									<Radio value="include3-1">포함</Radio>
									<Radio value="include3-2">미포함</Radio>
									<Radio value="include3-3">일치</Radio>
								</Radio.Group>
							</Form.Item>

							<Form.Item>
								<Input placeholder="-" />
							</Form.Item>

							<Form.Item className="btn-add-area">
								<Flex gap={4}>
									<Button
										icon={<RedoOutlined />}
										size="small"
										className="icon-redo"
									/>

									<Button icon={<PlusOutlined />} size="small" />
								</Flex>
							</Form.Item>
						</Flex>

						<Flex gap={8} align="center">
							<Form.Item
								style={{
									width: "160px",
									flex: "none",
								}}
							>
								<Select
									defaultValue="fabricate1"
									onChange={handleChange}
									options={[
										{
											value: "fabricate1",
											label: "조립자",
										},
									]}
								/>
							</Form.Item>

							<Form.Item className="select-radio-area">
								<Radio.Group>
									<Radio value="include4-1">포함</Radio>
									<Radio value="include4-2">미포함</Radio>
									<Radio value="include4-3">일치</Radio>
								</Radio.Group>
							</Form.Item>

							<Form.Item>
								<Input placeholder="-" />
							</Form.Item>

							<Form.Item className="btn-add-area">
								<Flex gap={4}>
									<Button
										icon={<RedoOutlined />}
										size="small"
										className="icon-redo"
									/>

									<Button icon={<PlusOutlined />} size="small" />
								</Flex>
							</Form.Item>
						</Flex>
					</Form>

					<Flex
						gap={8}
						align="center"
						justify="center"
						className="layer-btn-area"
					>
						<Button onClick={closeModal}>닫기</Button>
						<Button type="primary">검색</Button>
					</Flex>

					<div className="search-tb-area">
						<Flex
							align="center"
							justify="space-between"
							style={{
								marginBottom: 16,
							}}
						>
							<Flex gap="small" align="center">
								<Flex gap="small" className="list-num">
									총 <strong>12</strong> 건
								</Flex>
							</Flex>

							<Flex align="center" className="paging-area">
								<button
									onClick={() => onChange(1)}
									disabled={current === 1}
									className="btn-page"
								>
									<VerticalRightOutlined />
								</button>

								<Pagination
									simple
									current={current}
									total={totalItems}
									onChange={onChange}
									itemRender={itemRender}
								/>

								{/* 맨 뒤로 */}
								<button
									onClick={() => onChange(totalPages)}
									disabled={current === totalPages}
									className="btn-page"
								>
									<VerticalLeftOutlined />
								</button>
							</Flex>

							<Flex gap="small" align="center">
								<Button
									icon={<RedoOutlined />}
									target="_blank"
									className="icon-redo"
								/>

								<Button>
									<SettingOutlined />
								</Button>
							</Flex>
						</Flex>

						{/* 테이블 */}
						<div className="tb-container">
							<Table
								columns={columns}
								dataSource={data}
								onChange={handleChange}
								pagination={false}
								size="small"
								className="ellipsis-column basic-tb"
								bordered
								scroll={{
									y: "186px",
								}}
								style={{ tableLayout: "fixed" }}
							/>
						</div>
					</div>
				</div>
			</>
		);

		setOpenSearchModal(true);
	};

	const [sortedInfo, setSortedInfo] = useState({
		// columnKey: "deliPlanDate",
		// order: "ascend",
	});

	const stringSorter = (a, b, key) => {
		const textA = a[key]?.toString() || "";
		const textB = b[key]?.toString() || "";
		return textA.localeCompare(textB, "ko-KR");
	};

	const columns = [
		{
			title: "No",
			showSorterTooltip: { title: "No" },
			dataIndex: "no",
			key: "no",
			sorter: (a, b) => a.no - b.no,
			sortOrder: sortedInfo.columnKey === "no" ? sortedInfo.order : null,
			ellipsis: true,
			width: 65,
		},
		{
			title: "시리얼 번호",
			showSorterTooltip: { title: "시리얼 번호" },
			dataIndex: "serialnum",
			key: "serialnum",
			sorter: (a, b) => stringSorter(a, b, "serialnum"),
			sortOrder: sortedInfo.columnKey === "serialnum" ? sortedInfo.order : null,
			ellipsis: true,
			width: 170,
		},
		{
			title: "제조번호",
			showSorterTooltip: { title: "제조번호" },
			dataIndex: "productnum",
			key: "productnum",
			sorter: (a, b) => stringSorter(a, b, "productnum"),
			sortOrder:
				sortedInfo.columnKey === "productnum" ? sortedInfo.order : null,
			ellipsis: true,
			width: 170,
		},
		{
			title: "C/S 번호",
			showSorterTooltip: { title: "C/S 번호" },
			dataIndex: "csnum",
			key: "csnum",
			sorter: (a, b) => stringSorter(a, b, "csnum"),
			sortOrder: sortedInfo.columnKey === "csnum" ? sortedInfo.order : null,
			ellipsis: true,
			width: 170,
		},
		{
			title: "C/S 상태",
			showSorterTooltip: { title: "C/S 상태" },
			dataIndex: "csstate",
			key: "csstate",
			sorter: (a, b) => stringSorter(a, b, "csstate"),
			sortOrder: sortedInfo.columnKey === "csstate" ? sortedInfo.order : null,
			ellipsis: true,
			width: 106,
			align: "center",
		},
		{
			title: "비고",
			showSorterTooltip: { title: "비고" },
			dataIndex: "etc",
			key: "etc",
			ellipsis: true,
			align: "center",
		},
	];
	//--------------- 조건 검색 모달 관련

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

			<Button onClick={showSearchModal} style={{ width: "100px" }}>
				조건 검색
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

			{/* ModalComponent 추가 - "조건 검색" 클릭 시 열림 */}
			<div style={{ display: openSearchModal ? "block" : "none" }}>
				<Modal
					title={
						<div
							className="modal-title"
							onMouseOver={() => setDisabled(false)}
							onMouseOut={() => setDisabled(true)}
						>
							조건 검색
						</div>
					}
					open={openSearchModal}
					onCancel={() => setOpenSearchModal(false)}
					width={900}
					footer={null}
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
