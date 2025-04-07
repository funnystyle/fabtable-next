// pages/month.js
import React, { useEffect, useState } from "react";
import { Flex, Layout, } from "antd";
import "dayjs/locale/ko";
import MonthLeftContent from "@components/calendar/month/MonthLeftContent";
import MonthRightContent from "@components/calendar/month/MonthRightContent";

const MonthComponent = () => {
	const today = new Date();
	const [year, setYear] = useState(today.getFullYear());
	const [month, setMonth] = useState(today.getMonth() + 1);
	const [visibleItems, setVisibleItems] = useState([true, true, true, true]);
	const [monthTotalList, setMonthTotalList] = useState([0, 0, 0, 0, 0, 0])

	useEffect(() => {
		console.log(monthTotalList);
	}, [monthTotalList]);

	return (
		<Layout>
			<Flex
				gap="large"
				align="start"
				justify="space-between"
				className="contents-flex"
			>
				<MonthLeftContent visibleItems={visibleItems} setVisibleItems={setVisibleItems} setTotalList={setMonthTotalList} year={year} setYear={setYear} month={month} setMonth={setMonth} />

				<MonthRightContent visibleItems={visibleItems} setVisibleItems={setVisibleItems} monthTotalList={monthTotalList} year={year} month={month} />
			</Flex>
			<div className="info-wrap-last" />
		</Layout>
	);
};

export default MonthComponent;
