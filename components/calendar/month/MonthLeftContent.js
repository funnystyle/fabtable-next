// pages/month.js
import React, { useState } from "react";
import "dayjs/locale/ko";
import MonthHeader from "@components/calendar/month/MonthHeader";
import MonthTableHeader from "@components/calendar/month/MonthTableHeader";
import MonthTableBody from "@components/calendar/month/MonthTableBody";

const MonthLeftContent = ({visibleItems, setVisibleItems, setTotalList, year, setYear, month, setMonth}) => {

	return (
		<div className="contents-left">
			<MonthHeader visibleItems={visibleItems} setVisibleItems={setVisibleItems} currentYear={year} setCurrentYear={setYear} currentMonth={month} setCurrentMonth={setMonth} />

			<div className="contents-scroll">
				<table className="calendar-tb">
					<MonthTableHeader />
					<MonthTableBody visibleItems={visibleItems} year={year} month={month} setTotalList={setTotalList} />
				</table>
			</div>
		</div>

	);
};

export default MonthLeftContent;
