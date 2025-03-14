// pages/month.js
import React from "react";
import { ConfigProvider, DatePicker, } from "antd";
import koKR from "antd/es/locale/ko_KR";
import "dayjs/locale/ko";
import dayjs from "dayjs";

const MonthPicker = ({month, setMonth}) => {

	const onChange = (key) => {
		setMonth(key ? key.month() + 1 : month);
	}

	return (
		<ConfigProvider locale={koKR}>
			<DatePicker
				onChange={onChange}
				picker="month"
				format="M 월"
				placeholder="선택"
				style={{
					width: 80,
				}}
				value={month ? dayjs().month(month - 1) : null}
			/>
		</ConfigProvider>
	);
};

export default MonthPicker;
