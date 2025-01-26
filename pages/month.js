// pages/index.js
import React from "react";
import {
	Layout,
	Typography,
	Tabs,
	Select,
	DatePicker,
	ConfigProvider,
	Button,
	Input,
	Flex,
	Card,
	Space,
} from "antd";
import {
	CheckOutlined,
	SearchOutlined,
	PieChartOutlined,
	CloseOutlined,
} from "@ant-design/icons";
import koKR from "antd/es/locale/ko_KR";
import "dayjs/locale/ko";

const { Title } = Typography;
const { Search } = Input;

const onChange = (key) => {
	console.log(key);
};

const handleChange = (value) => {
	console.log(`selected ${value}`);
};

const TabItems = [
	{
		key: "1",
		label: "부서별 일정",
		children: (
			<Flex align="start" justify="space-between">
				<Flex gap="small" align="center">
					<Select
						defaultValue="2024"
						style={{
							width: 80,
						}}
						onChange={handleChange}
						options={[
							{
								value: "2024",
								label: "2024",
							},
							{
								value: "2023",
								label: "2023",
							},
							{
								value: "2022",
								label: "2022",
							},
							{
								value: "2021",
								label: "2022",
							},
							{
								value: "2020",
								label: "2020",
							},
							{
								value: "2019",
								label: "2019",
							},
							{
								value: "2018",
								label: "2018",
							},
						]}
					/>

					<ConfigProvider locale={koKR}>
						<DatePicker
							onChange={onChange}
							picker="month"
							format="M 월"
							placeholder="선택"
							style={{
								width: 80,
							}}
						/>
					</ConfigProvider>

					<Button color="primary" variant="text" size="small">
						이번달
					</Button>
				</Flex>

				<Flex align="center">
					<Flex className="team-btn">
						<Button
							variant="outlined"
							icon={<CheckOutlined />}
							iconPosition="end"
							size="small"
							shape="round"
						>
							영업팀
						</Button>

						<Button
							variant="outlined"
							icon={<CheckOutlined />}
							iconPosition="end"
							size="small"
							shape="round"
						>
							생산팀
						</Button>

						<Button
							variant="outlined"
							icon={<CheckOutlined />}
							iconPosition="end"
							size="small"
							shape="round"
						>
							품질팀
						</Button>
					</Flex>

					<Flex gap="small">
						<Button variant="outlined" icon={<SearchOutlined />}>
							조건 검색
						</Button>

						<Button variant="outlined" icon={<PieChartOutlined />}>
							총 현황 뷰
						</Button>
					</Flex>
				</Flex>
			</Flex>
		),
	},
	{
		key: "2",
		label: "현재 상태별 일정",
		children: "Content of Tab Pane 2",
	},
	{
		key: "3",
		label: "고객사별 일정",
		children: "Content of Tab Pane 3",
	},
	{
		key: "4",
		label: "모델별 일정",
		children: "Content of Tab Pane 4",
	},
];

const month = () => {
	return (
		<Layout>
			<Flex
				gap="large"
				align="start"
				justify="space-between"
				className="contents-flex"
			>
				<div className="contents-left">
					<Title level={4} className="title-page">
						월간 일정 달력
					</Title>

					<Tabs defaultActiveKey="1" items={TabItems} onChange={onChange} />
				</div>

				<div className="contents-right">
					<Flex align="center" justify="space-between" className="title-total">
						<Title level={4} className="title-page">
							총 현황
						</Title>

						<Button shape="circle" icon={<CloseOutlined />} size="small" />
					</Flex>

					<p className="total-date">
						<strong>2024</strong> 년 <strong>5</strong> 월
					</p>

					<Space direction="vertical" size={12} className="total-date-list">
						<Card title="영업일정">
							<Flex justify="space-between">
								<p className="txt-date">납품계획</p>
								<strong className="txt-num">880</strong>
							</Flex>
							<Flex justify="space-between">
								<p className="txt-date">납품완료</p>
								<strong className="txt-num">56</strong>
							</Flex>
						</Card>
						<Card title="생산일정">
							<Flex justify="space-between">
								<p className="txt-date">생산계획</p>
								<strong className="txt-num">880</strong>
							</Flex>
							<Flex justify="space-between">
								<p className="txt-date">생산완료</p>
								<strong className="txt-num">56</strong>
							</Flex>
						</Card>
						<Card title="검사일정">
							<Flex justify="space-between">
								<p className="txt-date">검사계획</p>
								<strong className="txt-num">880</strong>
							</Flex>
							<Flex justify="space-between">
								<p className="txt-date">검사완료</p>
								<strong className="txt-num">56</strong>
							</Flex>
						</Card>
					</Space>
				</div>
			</Flex>
		</Layout>
	);
};

export default month;
