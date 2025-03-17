// pages/year.js
import React from "react";
import { LeftOutlined, } from "@ant-design/icons";
import "dayjs/locale/ko";

const YearPrevButton = ({ year, setYear }) => {

	const handlePrevYear = () => {
		setYear(year - 1);
	}

	return (
		<button onClick={handlePrevYear} className="btn-page">
			<LeftOutlined />
		</button>
	);
};

export default YearPrevButton;
