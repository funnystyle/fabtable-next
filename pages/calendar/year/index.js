// pages/year.js
import React, { useEffect, useState } from "react";
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
} from "@ant-design/icons";
import koKR from "antd/es/locale/ko_KR";
import "dayjs/locale/ko";
import { YearChart } from "@components/calendar/year/YearChart";
import YearHeader from "@components/calendar/year/YearHeader";
import { yearTableColumns } from "@components/calendar/year/data/yearTableColumns";
import { useQuery } from "@tanstack/react-query";
import { getAxios } from "@api/apiClient";

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

const { Title: PageTitle } = Typography;

const YearComponent = ({ contentHeight }) => {

	const today = new Date();
	const [year, setYear] = useState(today.getFullYear());
	const [month, setMonth] = useState(today.getMonth() + 1);

	const [list, setList] = useState([]);

	const [queryKey, setQueryKey] = useState(["calendar-year", year, Math.random()]);
	const { data:calendarYearResponse, isSuccess} = useQuery({
		queryKey,
		queryFn: () => getAxios("/user/calendar/year", {year}),
	});

	const handleReload = () => {
		setQueryKey(["calendar-year", year, Math.random()]);
	}

	useEffect(() => {
		if (isSuccess && calendarYearResponse?.data?.list?.length > 0) {
			// 리스트에 index +1 로 key를 넣는다
			setList(calendarYearResponse.data.list.map((item, index) => { return {key: index+1, ...item} }));
		}
	}, [isSuccess]);

	useEffect(() => {
		handleReload();
	}, [year]);

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

						<YearChart />

						<YearHeader setYear={setYear} month={month} setMonth={setMonth} />
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
					columns={yearTableColumns}
					dataSource={list}
					bordered
					size="small"
					scroll={{ x: "max-content" }}
					pagination={false}
					style={{ width: "100%" }}
				/>
			</Flex>

		</Layout>
	);
};

export default YearComponent;
