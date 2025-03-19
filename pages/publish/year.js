// pages/year.js
import React, { useState } from "react";
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
} from "antd";
import {
	CheckOutlined,
	SearchOutlined,
	PieChartOutlined,
	CloseOutlined,
	LeftOutlined,
	RightOutlined,
} from "@ant-design/icons";
import koKR from "antd/es/locale/ko_KR";
import "dayjs/locale/ko";

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
	const [open, setOpen] = useState(false); // 팝업 상태 관리

	// 📌 날짜 변경 핸들러
	const onChange = (date) => {
			if (date) {
					setSelectedYear(date);
			}
	};

	// 📌 이전 해로 변경
	const handlePrevYear = () => {
			setSelectedYear((prev) => prev.subtract(1, "year"));
	};

	// 📌 다음 해로 변경
	const handleNextYear = () => {
			setSelectedYear((prev) => prev.add(1, "year"));
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
									<DatePicker
										value={selectedYear}
										onChange={onChange}
										picker="year"
										format="YYYY"
										placeholder="선택"
										style={{ width: 80, height: 32 }}
										allowClear={false} // X 버튼 제거
                    // suffixIcon={null} // 아이콘 제거
										open={open}
										onOpenChange={setOpen} // 팝업 상태 관리
										renderExtraFooter={() => (
											<div style={{ textAlign: "center", padding: "8px" }}>
												<Button
													type="link"
													onClick={() => {
														setSelectedYear(dayjs());
														setTimeout(() => setOpen(false), 100); // ✅ 100ms 후 닫기 (딜레이 추가)
													}}
												>
													올해
												</Button>
											</div>
										)}
									/>
								</ConfigProvider>

								<button onClick={handleNextYear} className="btn-page">
									<RightOutlined />
								</button>
							</Flex>

							<Flex gap="small" align="center">
								<Button
									color="primary"
									variant="text"
									size="small"
									className="all-delete-tag"
									// onClick={handleTagDeleteAll}
								>
									조건 초기화
								</Button>

								<Flex gap="small">
									<Button variant="outlined" icon={<SearchOutlined />}>
										조건 검색
									</Button>
								</Flex>
								<Flex gap="small" className="btn-spacing-area">
									<Button variant="outlined">올해</Button>
									<Button variant="outlined">작년</Button>
									<Button variant="outlined">내년</Button>
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
		</Layout>
	);
};

export default YearComponent;
