// pages/year.js
import React from "react";
import { RightOutlined, } from "@ant-design/icons";
import "dayjs/locale/ko";

const YearNextButton = ({ year, setYear }) => {

	const handleNextYear = () => {
		setYear([year[0] + 1, year[1] + 1]);
	}

	return (
		<button onClick={handleNextYear} className="btn-page">
			<RightOutlined />
		</button>
	);
};

export default YearNextButton;
