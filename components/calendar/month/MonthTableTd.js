// pages/month.js
import React from "react";
import "dayjs/locale/ko";
import MonthTableCount from "@components/calendar/month/MonthTableCount";

const MonthTableTd = ({ visibleItems, item }) => {

	const list = ["delivery", "produce", "test"];
	const text = ["scheduledDelivery", "productionPlan", "inspectionPlan"];
	const status = [["납품계획", "납품완료"], ["생산계획", "생산완료"], ["검사계획", "검사완료"]];
	return (
		<td className={item.isThisMonth ? null : "other"}>
			<p className="day-txt">{item.date.substring(8, 10)}</p>

			{list.map((className, index) => (
				<MonthTableCount
					key={index}
					visible={visibleItems[index]}
					item={item}
					total={`${text[index]}Total`}
					count={`${text[index]}Count`}
					className={className}
					text={status[index]}
				/>
			))}
		</td>
	);
};

export default MonthTableTd;
