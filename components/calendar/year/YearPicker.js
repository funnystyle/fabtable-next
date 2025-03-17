// pages/month.js
import React from "react";
import { ConfigProvider, DatePicker, } from "antd";
import koKR from "antd/es/locale/ko_KR";
import "dayjs/locale/ko";
import dayjs from "dayjs";

const YearPicker = ({ year, setYear }) => {

	const onChange = (date, dateString) => {
		setYear(Number(dateString));
	}

	return (
		<ConfigProvider locale={koKR}>
			<DatePicker
				value={dayjs(`${year}-01-01`)}
				onChange={onChange}
				picker="year"
				format="YYYY"
				placeholder="선택"
				style={{ width: 80 }}
				allowClear={false} // X 버튼 제거
				// suffixIcon={null} // 아이콘 제거
			/>
		</ConfigProvider>
	);
};

export default YearPicker;
