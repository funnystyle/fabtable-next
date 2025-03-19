// pages/year.js
import React, { useRef, useState } from "react";
import {
	Layout,
	Typography,
	Table,
	DatePicker,
	ConfigProvider,
	Button,
	Input,
	Flex,
	Card,
	Modal,
	Form,
	Select,
	Radio,
	InputNumber,
	Pagination,
} from "antd";
import {
	CheckOutlined,
	SearchOutlined,
	PieChartOutlined,
	CloseOutlined,
	LeftOutlined,
	RightOutlined,
	RedoOutlined,
	PlusOutlined,
	VerticalRightOutlined,
	VerticalLeftOutlined,
	SettingOutlined,
	MinusOutlined,
} from "@ant-design/icons";
import koKR from "antd/es/locale/ko_KR";
import "dayjs/locale/ko";

const { RangePicker } = DatePicker;

// ✅ 테이블 컬럼 정의
const columns = [
	{
		title: "구분",
		dataIndex: "div",
		key: "div",
		ellipsis: true,
	},
	{
		title: "1월",
		dataIndex: "month01",
		key: "month01",
		ellipsis: true,
	},
	{
		title: "2월",
		dataIndex: "month02",
		key: "month02",
		ellipsis: true,
	},
	// 3월부터 12월까지 다
	{
		title: "3월",
		dataIndex: "month03",
		key: "month03",
		ellipsis: true,
	},
	{
		title: "4월",
		dataIndex: "month04",
		key: "month04",
		ellipsis: true,
	},
	{
		title: "5월",
		dataIndex: "month05",
		key: "month05",
		ellipsis: true,
	},
	{
		title: "6월",
		dataIndex: "month06",
		key: "month06",
		ellipsis: true,
	},
	{
		title: "7월",
		dataIndex: "month07",
		key: "month07",
		ellipsis: true,
	},
	{
		title: "8월",
		dataIndex: "month08",
		key: "month08",
		ellipsis: true,
	},
	{
		title: "9월",
		dataIndex: "month09",
		key: "month09",
		ellipsis: true,
	},
	{
		title: "10월",
		dataIndex: "month10",
		key: "month10",
		ellipsis: true,
	},
	{
		title: "11월",
		dataIndex: "month11",
		key: "month11",
		ellipsis: true,
	},
	{
		title: "12월",
		dataIndex: "month12",
		key: "month12",
		ellipsis: true,
	},
];

const subColumns = [
	{
		title: "구분",
		dataIndex: "div",
		key: "div",
		ellipsis: true,
	},
	{
		title: "1월",
		dataIndex: "month01",
		key: "month01",
		ellipsis: true,
	},
	{
		title: "2월",
		dataIndex: "month02",
		key: "month02",
		ellipsis: true,
	},
	// 3월부터 12월까지 다
	{
		title: "3월",
		dataIndex: "month03",
		key: "month03",
		ellipsis: true,
	},
	{
		title: "4월",
		dataIndex: "month04",
		key: "month04",
		ellipsis: true,
	},
	{
		title: "5월",
		dataIndex: "month05",
		key: "month05",
		ellipsis: true,
	},
	{
		title: "6월",
		dataIndex: "month06",
		key: "month06",
		ellipsis: true,
	},
	{
		title: "7월",
		dataIndex: "month07",
		key: "month07",
		ellipsis: true,
	},
	{
		title: "8월",
		dataIndex: "month08",
		key: "month08",
		ellipsis: true,
	},
	{
		title: "9월",
		dataIndex: "month09",
		key: "month09",
		ellipsis: true,
	},
	{
		title: "10월",
		dataIndex: "month10",
		key: "month10",
		ellipsis: true,
	},
	{
		title: "11월",
		dataIndex: "month11",
		key: "month11",
		ellipsis: true,
	},
	{
		title: "12월",
		dataIndex: "month12",
		key: "month12",
		ellipsis: true,
	},
];

// ✅ 테이블 데이터 정의
const data = [
	// 납품계뢱, 발주계획, 자재입고, 조립완료, 리크완료, PID 완료, 교정완료, 생산완료, 검사완료, 입고완료, 납품완료
	// 납품계획은 나머지의 합과 같아야 함
	// 1월부터 12월까지의 데이터
	{
		key: "1",
		div: "납품계획",
		month01: 500,
		month02: 700,
		month03: 800,
		month04: 600,
		month05: 1000,
		month06: 1200,
		month07: 1400,
		month08: 1300,
		month09: 900,
		month10: 1100,
		month11: 1500,
		month12: 1600,
	},
	// 나머지 항목 모두
	{
		key: "2",
		div: "발주계획",
		month01: 100,
		month02: 200,
		month03: 300,
		month04: 400,
		month05: 500,
		month06: 600,
		month07: 700,
		month08: 800,
		month09: 900,
		month10: 1000,
		month11: 1100,
		month12: 1200,
	},
	{
		key: "3",
		div: "자재입고",
		month01: 50,
		month02: 70,
		month03: 80,
		month04: 60,
		month05: 100,
		month06: 120,
		month07: 140,
		month08: 130,
		month09: 90,
		month10: 110,
		month11: 150,
		month12: 160,
	},
	{
		key: "4",
		div: "조립완료",
		month01: 50,
		month02: 70,
		month03: 80,
		month04: 60,
		month05: 100,
		month06: 120,
		month07: 140,
		month08: 130,
		month09: 90,
		month10: 110,
		month11: 150,
		month12: 160,
	},
	{
		key: "5",
		div: "리크완료",
		month01: 50,
		month02: 70,
		month03: 80,
		month04: 60,
		month05: 100,
		month06: 120,
		month07: 140,
		month08: 130,
		month09: 90,
		month10: 110,
		month11: 150,
		month12: 160,
	},
	// 나머지 항목 모두
	{
		key: "6",
		div: "PID 완료",
		month01: 50,
		month02: 70,
		month03: 80,
		month04: 60,
		month05: 100,
		month06: 120,
		month07: 140,
		month08: 130,
		month09: 90,
		month10: 110,
		month11: 150,
		month12: 160,
	},
	{
		key: "7",
		div: "교정완료",
		month01: 50,
		month02: 70,
		month03: 80,
		month04: 60,
		month05: 100,
		month06: 120,
		month07: 140,
		month08: 130,
		month09: 90,
		month10: 110,
		month11: 150,
		month12: 160,
	},
	{
		key: "8",
		div: "생산완료",
		month01: 50,
		month02: 70,
		month03: 80,
		month04: 60,
		month05: 100,
		month06: 120,
		month07: 140,
		month08: 130,
		month09: 90,
		month10: 110,
		month11: 150,
		month12: 160,
	},
	{
		key: "9",
		div: "검사완료",
		month01: 50,
		month02: 70,
		month03: 80,
		month04: 60,
		month05: 100,
		month06: 120,
		month07: 140,
		month08: 130,
		month09: 90,
		month10: 110,
		month11: 150,
		month12: 160,
	},
	// 나머지 항목 모두
	{
		key: "10",
		div: "입고완료",
		month01: 50,
		month02: 70,
		month03: 80,
		month04: 60,
		month05: 100,
		month06: 120,
		month07: 140,
		month08: 130,
		month09: 90,
		month10: 110,
		month11: 150,
		month12: 160,
	},
	{
		key: "11",
		div: "납품완료",
		month01: 50,
		month02: 70,
		month03: 80,
		month04: 60,
		month05: 100,
		month06: 120,
		month07: 140,
		month08: 130,
		month09: 90,
		month10: 110,
		month11: 150,
		month12: 160,
	},
];

const subData = [
	// 납품완료 내의 하위 데이터들
	{
		key: "1",
		div: "납품완료",
		month01: 500,
		month02: 700,
		month03: 800,
		month04: 600,
		month05: 1000,
		month06: 1200,
		month07: 1400,
		month08: 1300,
		month09: 900,
		month10: 1100,
		month11: 1500,
		month12: 1600,
	},
	// 나머지 항목 모두
	{
		key: "2",
		div: "발주대기",
		month01: 100,
		month02: 200,
		month03: 300,
		month04: 400,
		month05: 500,
		month06: 600,
		month07: 700,
		month08: 800,
		month09: 900,
		month10: 1000,
		month11: 1100,
		month12: 1200,
	},
	{
		key: "3",
		div: "발주완료",
		month01: 50,
		month02: 70,
		month03: 80,
		month04: 60,
		month05: 100,
		month06: 120,
		month07: 140,
		month08: 130,
		month09: 90,
		month10: 110,
		month11: 150,
		month12: 160,
	},
];

// ✅ Chart.js 관련
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	LineElement,
	PointElement,
	Title,
	Tooltip,
	Legend,
	LineController,
	BarController,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import dayjs from "dayjs";
import { height, textAlign } from "@mui/system";
import Draggable from "react-draggable";

// Chart.js 플러그인 등록
ChartJS.register(
	LineController,
	BarController,
	CategoryScale,
	LinearScale,
	BarElement,
	LineElement,
	PointElement,
	Title,
	Tooltip,
	Legend
);

// ✅ 차트 컴포넌트 (막대그래프 + 꺾은선 그래프)
const Chart = () => {
	// 데이터셋 정의
	const data = {
		labels: [
			"1월",
			"2월",
			"3월",
			"4월",
			"5월",
			"6월",
			"7월",
			"8월",
			"9월",
			"10월",
			"11월",
			"12월",
		],
		datasets: [
			{
				type: "line",
				label: "납품 완료",
				data: [
					450, 650, 750, 550, 950, 1150, 1350, 1200, 850, 1050, 1400, 1550,
				],
				borderColor: "rgba(255, 99, 132, 1)",
				backgroundColor: "rgba(255, 99, 132, 0.5)",
				fill: false,
				tension: 0.3, // 선 부드럽게
			},
			{
				type: "bar",
				label: "납품 계획",
				data: [
					500, 700, 800, 600, 1000, 1200, 1400, 1300, 900, 1100, 1500, 1600,
				],
				backgroundColor: "rgba(54, 162, 235, 0.5)",
				borderColor: "rgba(54, 162, 235, 1)",
				borderWidth: 3,
			},
		],
	};

	// 차트 옵션 설정
	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: "top",
			},
		},
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	};

	return (
		<Card style={{ width: "100%", textAlign: "center", marginBottom: "20px" }}>
			<div style={{ width: "100%", height: "400px" }}>
				<Bar data={data} options={options} height={80} />
			</div>
		</Card>
	);
};

const { Title: PageTitle } = Typography;
const { Search } = Input;

const onChange = (key) => {
	console.log(key);
};

const handleChange = (value) => {
	console.log(`selected ${value}`);
};

const YearComponent = ({ contentHeight }) => {
	const [selectedYear, setSelectedYear] = useState(dayjs()); // 현재 연도 기본값
	const [selectedYears, setSelectedYears] = useState([dayjs(), dayjs()]); // 현재 연도 기본값
	const [open, setOpen] = useState(false); // 팝업 상태 관리

	const [openSearchModal, setOpenSearchModal] = useState(false); // Modal 열림 상태
	const [modalContent, setModalContent] = useState(null); // Modal 내용
	const [modal, contextHolder] = Modal.useModal();

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

	// 페이지 변경 핸들러
	const onPageChange = (page) => {
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
	
	// 📌 날짜 변경 핸들러
	const onChange = (date) => {
			if (date) {
					setSelectedYear(date);
			}
	};

  // 📌 연도 변경 핸들러 (Prev / Next 버튼)
  const handlePrevYear = () => {
    setSelectedYears(([start, end]) => [
      start.subtract(1, "year"),
      end.subtract(1, "year")
    ]);
  };

  const handleNextYear = () => {
    setSelectedYears(([start, end]) => [
      start.add(1, "year"),
      end.add(1, "year")
    ]);
  };

	// 📌 버튼 핸들러 (올해, 작년, 내년, 최근 3년)
	const handleYearSelect = (type) => {
		switch (type) {
			case "thisYear":
				setSelectedYears([dayjs(), dayjs()]);
				break;
			case "lastYear":
				setSelectedYears([dayjs().subtract(1, "year"), dayjs().subtract(1, "year")]);
				break;
			case "nextYear":
				setSelectedYears([dayjs().add(1, "year"), dayjs().add(1, "year")]);
				break;
			case "last3Years":
				setSelectedYears([dayjs().subtract(2, "year"), dayjs()]);
				break;
			default:
				break;
		}
	};	
	
	const toggleItem = (index) => {
		setVisibleItems((prev) =>
			prev.map((item, i) => (i === index ? !item : item))
		);
	};

	const closeItem = (index) => {
		setVisibleItems((prev) =>
			prev.map((item, i) => (i === index ? false : item))
		);
	};

	const subTable = () => (
		<Table columns={columns} dataSource={subData} pagination={false} />
	);

	const disabled3Years = (current, { from, type }) => {
		if (from) {
			const minYear = from.add(-2, 'years');
			const maxYear = from.add(2, 'years');
	
			switch (type) {
				case 'year':
					return current.year() < minYear.year() || current.year() > maxYear.year();
			}
		}
	
		return false;
	};

	const onSearch = (value) => {
		console.log("search:", value);
	};

	const onOk = (value) => {
		console.log("onOk: ", value);
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
						전체 초기화
					</Button>
				</Flex>

				<div className="layer-scroll">
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

									<Button icon={<MinusOutlined />} size="small" />
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

									<Button icon={<MinusOutlined />} size="small" />
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

									<Button icon={<MinusOutlined />} size="small" />
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

				</div>
			</>
		);
	
			setOpenSearchModal(true);
		};
	

	return (
		<Layout>
			<Flex
				gap="large"
				align="start"
				justify="space-between"
				className="contents-flex"
			>
				<div className="contents-left">
					<div className="contents-top">
						<PageTitle level={2} className="title-page">
							연간 종합 일정
						</PageTitle>

						<Chart />

						<Flex align="start" justify="space-between">
							<Flex gap="small" align="center">

								<button onClick={handlePrevYear} className="btn-page">
									<LeftOutlined />
								</button>
							
								<ConfigProvider locale={koKR}>
									<RangePicker
										picker="year"
										value={selectedYears}
										onChange={(values) => {
											if (!values) {
												// 📌 X 버튼 클릭 시 올해~올해로 초기화
												setSelectedYears([dayjs(), dayjs()]);
											} else {
												setSelectedYears(values);
											}
										}}
										placeholder={["시작 연도", "종료 연도"]}
										style={{ width: 160, height: 32 }}
										styles= {{ input: { textAlign: "center" } }}
										format="YYYY"
										disabledDate={disabled3Years}
									/>
								</ConfigProvider>

								<button onClick={handleNextYear} className="btn-page">
									<RightOutlined />
								</button>

								<Flex gap="small" className="btn-spacing-area">
									<Button variant="outlined" onClick={() => handleYearSelect("thisYear")}>올해</Button>
									<Button variant="outlined" onClick={() => handleYearSelect("lastYear")}>작년</Button>
									<Button variant="outlined" onClick={() => handleYearSelect("nextYear")}>내년</Button>
									<Button variant="outlined" onClick={() => handleYearSelect("last3Years")}>최근 3년</Button>
								</Flex>

								<Flex gap="small" align="center">
								<Button
									color="primary"
									variant="text"
									size="small"
									className="all-delete-tag"
									onClick={() => setSelectedYears([dayjs(), dayjs()]) }
								>
									초기화
								</Button>
								</Flex>

							</Flex>

							<Flex gap="small" align="center">
								{/* <Button
									color="primary"
									variant="text"
									size="small"
									className="all-delete-tag"
									// onClick={handleTagDeleteAll}
								>
									조건 초기화
								</Button> */}

								<Flex gap="small">
									<Button variant="outlined" icon={<SearchOutlined />} onClick={showSearchModal} >
										조건 검색
									</Button>
								</Flex>
								<Flex gap="small">
									<Button variant="outlined">엑셀 다운로드</Button>
								</Flex>
							</Flex>
						</Flex>
					</div>
				</div>
			</Flex>

			<Flex
				gap="large"
				align="start"
				justify="center"
				className="contents-flex"
				// style={{ width: "100%" }}
			>
				<Table
					columns={columns}
					dataSource={data}
					bordered
					size="small"
					// scroll={{ x: "max-content" }}
					pagination={false}
					style={{ width: "100%" }}
					expandable={{
						expandedRowRender: (record) => (
							// record.key === (data.length).toString() ? (
							<Table
								columns={columns} // 확장 테이블의 컬럼을 따로 지정
								dataSource={subData} // 확장 데이터
								pagination={false}
								bordered
								size="small"
								// style={{ width: "0%" }} // 🔹 테이블 폭 줄이기 (부모와 동일한 폭 유지)
							/>
						),
						// ) : null,
						rowExpandable: (record) => record.key === data.length.toString(),
					}}
				/>
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
		</Layout>
	);
};

export default YearComponent;
