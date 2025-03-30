// pages/month.js
import React, { useEffect, useState } from "react";
import { Button, Flex, Select, Tabs, Typography, } from "antd";
import { CheckOutlined, PieChartOutlined, SearchOutlined, } from "@ant-design/icons";
import "dayjs/locale/ko";
import dayjs from "dayjs";
import MonthPicker from "@components/calendar/MonthPicker";
import CurrentMonthButton from "@components/calendar/CurrentMonthButton";

const { Title } = Typography;




const TabItems = [
	{
		key: "1",
		label: "부서별 일정",
	},
	{
		key: "2",
		label: "현재 상태별 일정",
	},
	{
		key: "3",
		label: "고객사별 일정",
	},
	{
		key: "4",
		label: "모델별 일정",
	},
];

const MonthHeader = ({visibleItems, setVisibleItems, currentYear, setCurrentYear, currentMonth, setCurrentMonth}) => {
	const toggleItem = (index) => {
		setVisibleItems((prev) =>
			prev.map((item, i) => (i === index ? !item : item))
		);
	};

	const [years, setYears] = useState([]);

	const handleChange = (value) => {
		setCurrentYear(value);
	};

	const onChange = (key) => {
		setCurrentMonth(key ? key.month() + 1 : currentMonth);
	}

	useEffect(() => {
		const yearList = Array.from({ length: 21 }, (_, index) => {
			const year = currentYear + 10 - index;
			return { value: year, label: String(year) };
		});
		setYears(yearList);
	}, [currentYear]);

	return (
		<div className="contents-top">
			<Title level={2} className="title-page">
				월간 일정 달력
			</Title>

			<Tabs defaultActiveKey="1" items={TabItems} onChange={onChange} />

			<Flex align="start" justify="space-between">
				<Flex gap="small" align="center">
					<Select
						showSearch
						value={currentYear}
						defaultValue={currentYear}
						style={{
							width: 80,
						}}
						onChange={handleChange}
						options={years}
					/>

					<MonthPicker month={currentMonth} setMonth={setCurrentMonth} />

					<CurrentMonthButton setYear={setCurrentYear} setMonth={setCurrentMonth} />
				</Flex>

				<Flex align="center">
					<Flex className="team-btn">
						<Button
							variant="outlined"
							icon={<CheckOutlined />}
							iconPosition="end"
							size="small"
							shape="round"
							className={`${visibleItems[0] ? "active" : ""}`}
							onClick={() => toggleItem(0)}
						>
							영업팀
						</Button>

						<Button
							variant="outlined"
							icon={<CheckOutlined />}
							iconPosition="end"
							size="small"
							shape="round"
							className={`${visibleItems[1] ? "active" : ""}`}
							onClick={() => toggleItem(1)}
						>
							생산팀
						</Button>

						<Button
							variant="outlined"
							icon={<CheckOutlined />}
							iconPosition="end"
							size="small"
							shape="round"
							className={`${visibleItems[2] ? "active" : ""}`}
							onClick={() => toggleItem(2)}
						>
							품질팀
						</Button>
					</Flex>

					<Flex gap="small">
						<Button variant="outlined" icon={<SearchOutlined />}>
							조건 검색
						</Button>

						<Button
							variant="outlined"
							icon={<PieChartOutlined />}
							className={`${visibleItems[3] ? "active" : ""}`}
							onClick={() => toggleItem(3)}
						>
							총 현황 뷰
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</div>
	);
};

export default MonthHeader;
