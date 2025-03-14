// pages/month.js
import React from "react";
import "dayjs/locale/ko";
import MonthTableTd from "@components/calendar/month/MonthTableTd";

const MonthTableTr = ({ visibleItems, list }) => {
	return (
		<tr>
			{list.map((item, index) => (
			<MonthTableTd key={index} visibleItems={visibleItems} item={item}/>
			))}
		</tr>
	);
};

export default MonthTableTr;
