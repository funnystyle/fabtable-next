// pages/orderwrite.js
import React, { useState, useEffect, useRef } from "react";
import {
	Anchor,
	Layout,
	Typography,
	Tabs,
	Button,
	Flex,
	Dropdown,
	Space,
	Tag,
	message,
	Form,
	Select,
	Empty,
	DatePicker,
	Input,
	Radio,
	Affix,
	Modal,
	InputNumber,
	Pagination,
	Table,
} from "antd";
import {
	CloseOutlined,
	EditFilled,
	CheckOutlined,
	DownOutlined,
	SettingOutlined,
	FilterOutlined,
	RedoOutlined,
	PlusOutlined,
	VerticalRightOutlined,
	VerticalLeftOutlined,
	LeftOutlined,
	RightOutlined,
} from "@ant-design/icons";

import Link from "next/link";
import { useRouter } from "next/router";
import Draggable from "react-draggable";

const { RangePicker } = DatePicker;

const { Title } = Typography;

const onOk = (value) => {
	console.log("onOk: ", value);
};

const onChange = (e) => {
	console.log(`checked = `);
};

const TabItems = [
	{
		key: "1",
		label: "수주 현황 목록",
	},
	{
		key: "2",
		label: "수주 등록 · 상세",
	},
];

const handleMenuClick = (e) => {
	message.info("Click on menu item.");
	console.log("click", e);
};

const stateItems = [
	{
		label: "납품완료",
		key: "1",
	},
	{
		label: "반출대기",
		key: "2",
	},
	{
		label: "반출완료",
		key: "3",
	},
];

const printItems = [
	{
		label: "라벨 인쇄",
		key: "1",
		onClick: () => showDrawer("label"), // 클릭 시 라벨 인쇄 Drawer 열기
	},
	{
		label: "성적서 인쇄",
		key: "2",
		onClick: () => showDrawer("report"), // 클릭 시 성적서 인쇄 Drawer 열기
	},
];

const handleChange = (pagination, filters, sorter = {}) => {
	console.log("Various parameters", pagination, filters, sorter);
	setSortedInfo(sorter.columnKey ? sorter : {});
};

const OrderWriteComponent = ({ contentHeight }) => {
	const [position, setPosition] = useState("end");
	const router = useRouter();

	const onTabChange = (key) => {
		if (key === "1") {
			router.push("/publish/order");
		} else if (key === "2") {
			router.push("/publish/orderwrite");
		}
	};

	/* Anchor 스크롤 이동 */
	const handleAnchorClick = (e, link) => {
		e.preventDefault(); // 기본 이동 방지

		const targetId = link.href.split("#")[1]; // 타겟 ID 가져오기
		const targetElement = document.getElementById(targetId);

		if (targetElement) {
			// 기본정보(#basic)는 top 0으로 이동, 나머지는 -100px 조정
			const yOffset = -319;
			const y = targetElement.getBoundingClientRect().top + window.scrollY + yOffset;

			console.log(`Scrolling to ${targetId}:`, y);

			setTimeout(() => {
				window.scrollTo({ top: y, behavior: "smooth" });
			}, 100);
		}
	};
	/* //Anchor 스크롤 이동 */

	// --------- 모달 관련
	const [openCopyModal, setOpenCopyModal] = useState(false); // Modal 열림 상태
	const [openSearchModal, setOpenSearchModal] = useState(false); // Modal 열림 상태
	const [modalContent, setModalContent] = useState(null); // Modal 내용
	const [modal, contextHolder] = Modal.useModal();

	// 모달 닫기
	const closeModal = () => {
		setOpenCopyModal(false);
		setOpenSearchModal(false);
	};
	
	const onSearch = (value) => {
		console.log("search:", value);
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
			// width: 170,
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
			// width: 170,
		},
		{
			title: "제품군",
			showSorterTooltip: { title: "제품군" },
			dataIndex: "productgroup",
			key: "productgroup",
			sorter: (a, b) => stringSorter(a, b, "productgroup"),
			sortOrder:
				sortedInfo.columnKey === "productgroup" ? sortedInfo.order : null,
			ellipsis: true,
			// width: 170,
		},
		{
			title: "모델",
			showSorterTooltip: { title: "모델" },
			dataIndex: "model",
			key: "model",
			sorter: (a, b) => stringSorter(a, b, "model"),
			sortOrder:
				sortedInfo.columnKey === "model" ? sortedInfo.order : null,
			ellipsis: true,
			// width: 170,
		},
		{
			title: "세부모델",
			showSorterTooltip: { title: "detailmodel" },
			dataIndex: "detailmodel",
			key: "detailmodel",
			sorter: (a, b) => stringSorter(a, b, "detailmodel"),
			sortOrder:
				sortedInfo.columnKey === "detailmodel" ? sortedInfo.order : null,
			ellipsis: true,
			// width: 170,
		},
		{
			title: "비고",
			showSorterTooltip: { title: "비고" },
			dataIndex: "etc",
			key: "etc",
			ellipsis: true,
			align: "center",
			width: 170,
		},
	];

	const data = [
		{
			key: "1",
			no: 1,
			serialnum: "570241202090",
			productnum: "A2024-00008",
			productgroup: "MARU",
			model: "7000s",
			detailmodel: "7003",
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
			productgroup: "MARU",
			model: "7000s",
			detailmodel: "7003",
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
			productgroup: "MARU",
			model: "7000s",
			detailmodel: "7003",
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
			productgroup: "MARU",
			model: "7000s",
			detailmodel: "7003",
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
			productgroup: "MARU",
			model: "7000s",
			detailmodel: "7003",			
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
			productgroup: "MARU",
			model: "7000s",
			detailmodel: "7003",			
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
									showSizeChanger={false}
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

	const [anchorContainer, setAnchorContainer] = useState(null);

	useEffect(() => {
		const container = document.querySelector(".order-anchor-wrapper");
		if (container) {
			setAnchorContainer(container);
		}
	}, []);

	return (
		<Layout>
			<div className="contents-flex">
				<Flex align="center" justify="space-between" className="title-area">
					<Title level={2} className="title-page">
						영업 관리
					</Title>

					<Button
						icon={<FilterOutlined />}
						iconPosition={position}
						color="primary"
						variant="outlined"
						size="large"
						onClick={showSearchModal}
					>
						수주 불러오기
					</Button>
				</Flex>

				{/* <Tabs defaultActiveKey="2" items={TabItems} onChange={onTabChange} /> */}
				<div className="top-btn-area">
					{/* 신규 수주 등록시 */}
					<Flex align="center" justify="space-between">
						<Tag className="CurrentStatus001">발주기입</Tag>

						<Flex align="center" gap={8}>
							<Flex className="btn-space-area">
								<Button type="text" className="btn-all-reset">
									전체 초기화
								</Button>
							</Flex>

							<Flex gap={8}>
								<Button icon={<CloseOutlined />} iconPosition={position}>
									취소
								</Button>
								<Button
									type="primary"
									icon={<EditFilled />}
									iconPosition={position}
								>
									등록
								</Button>
							</Flex>
						</Flex>
					</Flex>
					{/* //신규 수주 등록시 */}

					{/* 기 등록된 수주 내용 수정시 */}
					<Flex justify="space-between" className="detail-top-area">
						<Flex gap={12}>
							<Tag className="CurrentStatus007">Rework</Tag>

							<ul className="product-info">
								<li>MARU 7001</li>
								<li>5702402113343</li>
							</ul>
						</Flex>

						<Flex align="center" gap={8} className="detail-btn-area">
							<Flex gap={8} className="btn-space-area">
								<Button>수주 종합정보</Button>

								<Dropdown
									menu={{ items: stateItems, onClick: handleMenuClick }}
								>
									<Button>
										<Space>
											상태변경
											<DownOutlined />
										</Space>
									</Button>
								</Dropdown>
							</Flex>

							<Flex gap={8} className="btn-space-area">
								<Button>복제</Button>
								<Button>신규</Button>
								<Button>삭제</Button>

								<Dropdown menu={{ items: printItems }}>
									<Button>
										<Space>
											인쇄
											<DownOutlined />
										</Space>
									</Button>
								</Dropdown>
							</Flex>

							<Flex gap={8}>
								<Button icon={<CloseOutlined />} iconPosition={position}>
									취소
								</Button>
								<Button
									type="primary"
									icon={<CheckOutlined />}
									iconPosition={position}
								>
									저장
								</Button>
							</Flex>
						</Flex>
					</Flex>
					{/* //기 등록된 수주 내용 수정시 */}
				</div>
			</div>

			<Flex style={{ height: 'calc(100vh - 224px)', overflowY: 'auto' }} className="order-anchor-wrapper">
				
				<div  className="anchor-contents">


					<div
						// style={{ paddingTop: contentHeight }}
						// className="contents-scroll"
					>
						<div id="basic">
							<div className="info-area">
								<Flex
									align="center"
									justify="space-between"
									className="info-title-area"
								>
									<Title level={3} className="title-bullet">
										기본정보
									</Title>

									<Button icon={<SettingOutlined />} size="small" />
								</Flex>

								<div className="info-input-box">
									<Form layout="vertical" className="info-input-area">
										<Flex className="gap-size">
											<Form.Item label="제조번호" name="makeNum">
												<Input placeholder="-" />
											</Form.Item>

											<Form.Item label="시리얼번호" name="serialNum">
												<Input placeholder="-" />
											</Form.Item>

											<Form.Item
												label={<Link href={"/"}>납품계획일</Link>}
												name="deliveryDate"
												tooltip={
													<>
														납품계획일(D0) 기준, <br />
														생산계획일 D5,
														<br />
														검사계획일 D3
													</>
												}
											>
												<DatePicker
													onChange={onChange}
													placeholder="날짜 선택"
												/>
											</Form.Item>

											<Form.Item
												label={<Link href={"/"}>생산계획일</Link>}
												name="productDate"
											>
												<DatePicker
													onChange={onChange}
													placeholder="날짜 선택"
												/>
											</Form.Item>

											<Form.Item
												label={<Link href={"/"}>검사계획일</Link>}
												name="testDate"
											>
												<DatePicker
													onChange={onChange}
													placeholder="날짜 선택"
												/>
											</Form.Item>
										</Flex>

										<Flex className="gap-size">
											<Form.Item label="생산부서">
												<Select
													defaultValue="productTeam1"
													onChange={handleChange}
													options={[
														{
															value: "productTeam1",
															label: "-",
														},
													]}
												/>
											</Form.Item>

											<Form.Item label={<Link href={"/"}>등록자</Link>}>
												<Select
													defaultValue="productWriter1"
													onChange={handleChange}
													options={[
														{
															value: "productWriter1",
															label: "-",
														},
													]}
												/>
											</Form.Item>

											<Form.Item
												label={<Link href={"/"}>등록일</Link>}
												name="registDate"
											>
												<DatePicker
													onChange={onChange}
													placeholder="날짜 선택"
												/>
											</Form.Item>

											<Form.Item label={<Link href={"/"}>납품자</Link>}>
												<Select
													defaultValue="vendor1"
													onChange={handleChange}
													options={[
														{
															value: "vendor1",
															label: "-",
														},
													]}
												/>
											</Form.Item>

											<Form.Item
												label={<Link href={"/"}>납품일</Link>}
												name="vendorDate"
											>
												<DatePicker
													onChange={onChange}
													placeholder="날짜 선택"
												/>
											</Form.Item>
										</Flex>

										<Flex className="gap-size">
											<Form.Item label="비고" name="etc">
												<Input placeholder="-" />
											</Form.Item>

											<Form.Item label="영업팀 메모" name="memo">
												<Input placeholder="-" />
											</Form.Item>
										</Flex>
									</Form>
								</div>
							</div>
						</div>
						<div id="customer" className="info-wrap">
							<Flex
								align="center"
								justify="space-between"
								className="info-title-area"
							>
								<Title level={3} className="title-bullet">
									고객정보
								</Title>

								<Button icon={<SettingOutlined />} size="small" />
							</Flex>

							<div className="info-input-box">
								<Form layout="vertical" className="info-input-area">
									<Flex className="gap-size">
										<Form.Item label="납품처">
											<Select
												showSearch
												placeholder="납품처"
												onChange={handleChange}
												filterOption={(input, option) =>
													(option?.label ?? "")
														.toLowerCase()
														.includes(input.toLowerCase())
												}
												notFoundContent={
													<Empty
														image={Empty.PRESENTED_IMAGE_SIMPLE}
														description="내용이 없습니다."
													/>
												}
												options={[
													{
														value: "vendorName1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="고객사">
											<Select
												showSearch
												placeholder="고객사"
												onChange={handleChange}
												filterOption={(input, option) =>
													(option?.label ?? "")
														.toLowerCase()
														.includes(input.toLowerCase())
												}
												notFoundContent={
													<Empty
														image={Empty.PRESENTED_IMAGE_SIMPLE}
														description="내용이 없습니다."
													/>
												}
												options={[
													{
														value: "customerName1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="출고종류">
											<Select
												defaultValue="deliveryCategory1"
												onChange={handleChange}
												options={[
													{
														value: "deliveryCategory1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="P/O" name="poNum">
											<Input placeholder="-" />
										</Form.Item>

										<Form.Item label="프로젝트 번호" name="projectNum">
											<Input placeholder="-" />
										</Form.Item>
									</Flex>
								</Form>
							</div>
						</div>
						<div id="product" className="info-wrap info-wrap-last">
							<Flex
								align="center"
								justify="space-between"
								className="info-title-area"
							>
								<Title level={3} className="title-bullet">
									제품정보
								</Title>

								<Button icon={<SettingOutlined />} size="small" />
							</Flex>

							<Flex className="info-input-wrap">
								<div className="info-input-box">
									<Title level={5}>제품군 정보</Title>

									<Form layout="vertical" className="info-input-area">
										<Form.Item label="제품군">
											<Select
												defaultValue="productCate1"
												onChange={handleChange}
												options={[
													{
														value: "productCate1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="모델">
											<Select
												defaultValue="model1"
												onChange={handleChange}
												options={[
													{
														value: "model1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="세부모델">
											<Select
												defaultValue="detailModel1"
												onChange={handleChange}
												options={[
													{
														value: "detailModel1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="MGMR">
											<Radio.Group>
												<Radio value="n">N</Radio>
												<Radio value="y">Y</Radio>
											</Radio.Group>
										</Form.Item>

										<Form.Item label="채널">
											<Select
												defaultValue="channel1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "channel1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="Unit 구분">
											<Select
												defaultValue="unit1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "unit1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="MFC 사양">
											<Select
												defaultValue="mfc1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "mfc1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="장착위치">
											<Select
												defaultValue="position1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "position1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="Body 타입">
											<Select
												defaultValue="body1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "body1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="유량범위">
											<Select
												defaultValue="discharge1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "discharge1",
														label: "-",
													},
												]}
											/>
										</Form.Item>
									</Form>
								</div>

								<div className="info-input-box">
									<Title level={5}>통신 및 타입 정보</Title>

									<Form layout="vertical" className="info-input-area">
										<Form.Item label="통신방식">
											<Select
												defaultValue="traffic1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "traffic1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="통신코드">
											<Select
												defaultValue="trafficCode1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "trafficCode1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="IO Size">
											<Select
												defaultValue="iosize1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "iosize1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="MAX DATA">
											<Select
												defaultValue="maxData1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "maxData1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="밸브타입">
											<Select
												defaultValue="valve1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "valve1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="Orifice 씰링">
											<Select
												defaultValue="orifice1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "orifice1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="Valve Seat">
											<Select
												defaultValue="valveSeat1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "valveSeat1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="후단 사용조건">
											<Select
												defaultValue="use1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "use1",
														label: "-",
													},
												]}
											/>
										</Form.Item>
									</Form>
								</div>

								<div className="info-input-box">
									<Title level={5}>가스 및 유량 정보</Title>

									<Form layout="vertical" className="info-input-area">
										<Form.Item label="하스텔로이">
											<Radio.Group>
												<Radio value="n2">N</Radio>
												<Radio value="y2">Y</Radio>
											</Radio.Group>
										</Form.Item>

										<Form.Item label="사용가스">
											<Select
												defaultValue="useGas1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "useGas1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="교정가스">
											<Select
												defaultValue="correctGas1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "correctGas1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="Liquid & Precursor">
											<Select
												defaultValue="liquid1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "liquid1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="Cal Liquid">
											<Select
												defaultValue="cal1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "cal1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="유량">
											<Input placeholder="-" disabled />
										</Form.Item>

										<Form.Item label="C.F">
											<Input placeholder="-" disabled />
										</Form.Item>

										<Form.Item label="환산유량">
											<Select
												defaultValue="conversion1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "conversion1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="유량단위">
											<Select
												defaultValue="unit1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "unit1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="MGMR Bin#">
											<Select
												defaultValue="mgmrBin1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "mgmrBin1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="MGMR 최대유량">
											<Select
												defaultValue="mgmrMax1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "mgmrMax1",
														label: "-",
													},
												]}
											/>
										</Form.Item>
									</Form>
								</div>

								<div className="info-input-box">
									<Title level={5}>압력 및 기타 정보</Title>

									<Form layout="vertical" className="info-input-area">
										<Form.Item label="사용압력 단위">
											<Select
												defaultValue="usePressure1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "usePressure1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="최소 압력">
											<Input placeholder="-" disabled />
										</Form.Item>

										<Form.Item label="중심 압력">
											<Input placeholder="-" disabled />
										</Form.Item>

										<Form.Item label="최대 압력">
											<Input placeholder="-" disabled />
										</Form.Item>

										<Form.Item label="제어압력 단위">
											<Select
												defaultValue="pressureUnit1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "pressureUnit1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="제어압력">
											<Input placeholder="-" disabled />
										</Form.Item>

										<Form.Item label="피팅종류">
											<Select
												defaultValue="fit1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "fit1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="사이즈/씰">
											<Select
												defaultValue="size1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "size1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="전원포트 형상">
											<Select
												defaultValue="power1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "power1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="포트위치">
											<Select
												defaultValue="portPosition1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "portPosition1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="제품 Rev">
											<Select
												defaultValue="rev1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "rev1",
														label: "-",
													},
												]}
											/>
										</Form.Item>

										<Form.Item label="특주번호">
											<Select
												defaultValue="specialNum1"
												onChange={handleChange}
												disabled
												options={[
													{
														value: "specialNum1",
														label: "-",
													},
												]}
											/>
										</Form.Item>
									</Form>
								</div>
							</Flex>
						</div>
					</div>
				</div>
				<div className="anchor-area">
					{anchorContainer && (
						<Anchor
							affix={false}
							getContainer={() => anchorContainer}
							items={[
								{ key: "basic", href: "#basic", title: "기본정보" },
								{ key: "customer", href: "#customer", title: "고객정보" },
								{ key: "product", href: "#product", title: "제품정보" },
							]}
						/>
					)}
				</div>
			</Flex>

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

export default OrderWriteComponent;
