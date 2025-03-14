// pages/month.js
import React from "react";
import "dayjs/locale/ko";

const MonthTableCount = ({ visible, item, total, count, className, text }) => {

	return (
		<>
			{visible && (item[total] > 0 || item[count] > 0) && (
				<ul className={`schedule-txt-list ${className}`}>
					<li>
						<span>{text[0]}</span>
						<strong>{item[total]}</strong>
					</li>
					<li>
						<span>{text[1]}</span>
						<strong>{item[count]}</strong>
					</li>
				</ul>
			)}
		</>
	);
};

export default MonthTableCount;
