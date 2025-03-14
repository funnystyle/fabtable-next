// pages/month.js
import React, { useEffect, useState } from "react";
import "dayjs/locale/ko";
import MonthTableTr from "@components/calendar/month/MonthTableTr";
import { useQuery } from "@tanstack/react-query";
import { getAxios } from "@api/apiClient";

const MonthTableBody = ({ visibleItems, year, month, setTotalList }) => {
	const [list, setList] = useState([]);

	const [queryKey, setQueryKey] = useState(["calendar-month", year, month, Math.random()]);
	const { data:calendarMonthResponse, isSuccess} = useQuery({
		queryKey,
		queryFn: () => getAxios("/user/calendar/month", {year, month}),
	});

	const handleReload = () => {
		setQueryKey(["calendar-month", year, month, Math.random()]);
	}

	useEffect(() => {
		if (isSuccess && calendarMonthResponse?.data?.list?.length > 0) {
			setList(calendarMonthResponse.data.list);
			console.log("calendarMonthResponse", calendarMonthResponse.data);
			setTotalList([
				calendarMonthResponse.data.scheduledDeliveryMonthCount,
				calendarMonthResponse.data.scheduledDeliveryMonthTotal,
				calendarMonthResponse.data.productionPlanMonthCount,
				calendarMonthResponse.data.productionPlanMonthTotal,
				calendarMonthResponse.data.inspectionPlanMonthCount,
				calendarMonthResponse.data.inspectionPlanMonthTotal
			])
		}
	}, [isSuccess]);

	useEffect(() => {
		handleReload();
	}, [year, month]);

	return (
		<tbody>
			{list.length === 0 ?
				<tr>
					<td colSpan="7">데이터가 로딩중입니다.</td>
				</tr>
				:
				list.map((item, index) => (
					<MonthTableTr key={index} visibleItems={visibleItems} list={item}/>
				))
			}
		</tbody>
	);
};

export default MonthTableBody;
