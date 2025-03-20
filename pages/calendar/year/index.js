// pages/year.js
import React, { useEffect, useState } from "react";
import { Flex, Layout, Typography, } from "antd";
import "dayjs/locale/ko";
import { YearChart } from "@components/calendar/year/YearChart";
import YearHeader from "@components/calendar/year/YearHeader";
import { useQuery } from "@tanstack/react-query";
import { getAxios } from "@api/apiClient";
import { YearTable } from "@components/calendar/year/YearTable";

const { Title: PageTitle } = Typography;

const YearComponent = ({ contentHeight }) => {

	// year
	const today = new Date();
	const [year, setYear] = useState(today.getFullYear());
	const [list, setList] = useState([]);

	const [queryKey, setQueryKey] = useState(["calendar-year", year, Math.random()]);
	const { data:calendarYearResponse, isSuccess} = useQuery({
		queryKey,
		queryFn: () => getAxios("/user/calendar/year", {year}),
	});

	useEffect(() => {
		if (isSuccess && calendarYearResponse?.data?.list?.length > 0) {
			setList(calendarYearResponse.data.list.map((item, index) => { return {key: index+1, ...item} }));
		}
	}, [isSuccess]);

	const handleReload = () => {
		setQueryKey(["calendar-year", year, Math.random()]);
	}

	useEffect(() => {
		handleReload();
	}, [year]);

	return (
		<Layout>
			<Flex gap="large" align="start" justify="space-between" className="contents-flex">
				<div className="contents-left">
					<div className="contents-top">
						<PageTitle level={2} className="title-page">
							연간 종합 일정
						</PageTitle>

						<YearChart list={list}/>

						<YearHeader year={year} setYear={setYear} />
					</div>
				</div>
			</Flex>

			<Flex gap="large" align="start" justify="center" className="contents-flex">
				<YearTable list={list} />
			</Flex>
		</Layout>
	);
};

export default YearComponent;
