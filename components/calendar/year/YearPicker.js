// pages/month.js
import React from "react";
import {ConfigProvider,} from "antd";
import koKR from "antd/es/locale/ko_KR";
import "dayjs/locale/ko";
import YearDateFormRangePicker from "@components/calendar/year/searchModal/date/YearDateFormRangePicker";

const YearPicker = ({ year, setYear }) => {

	return (
		<ConfigProvider locale={koKR}>
			<YearDateFormRangePicker year={year} setYear={setYear} style={{ width: 160, height: 32 }} />
		</ConfigProvider>
	);
};

export default YearPicker;
