// pages/year.js
import React from "react";
import { Flex, } from "antd";
import "dayjs/locale/ko";
import YearPicker from "@components/calendar/year/YearPicker";
import YearPrevButton from "@components/calendar/year/YearPrevButton";
import YearNextButton from "@components/calendar/year/YearNextButton";

const YearHeaderLeft = ({ year, setYear }) => {

	return (
		<Flex gap="small" align="center">
			<YearPrevButton year={year} setYear={setYear} />

			<YearPicker year={year} setYear={setYear} />

			<YearNextButton year={year} setYear={setYear} />
		</Flex>
	);
};

export default YearHeaderLeft;
