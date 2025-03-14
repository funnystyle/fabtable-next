// pages/month.js
import React from "react";
import "dayjs/locale/ko";

const MonthTableHeader = () => {

	return (
		<thead>
			<tr>
				<th className="sun">일</th>
				<th>월</th>
				<th>화</th>
				<th>수</th>
				<th>목</th>
				<th>금</th>
				<th className="sat">토</th>
			</tr>
		</thead>
	);
};

export default MonthTableHeader;
