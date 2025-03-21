// pages/year.js
import React from "react";
import {Button, Flex,} from "antd";
import "dayjs/locale/ko";
import YearPicker from "@components/calendar/year/YearPicker";
import YearPrevButton from "@components/calendar/year/YearPrevButton";
import YearNextButton from "@components/calendar/year/YearNextButton";
import YearSelectButton from "@components/calendar/year/YearSelectButton";

const YearHeaderLeft = ({ year, setYear }) => {

	return (
		<Flex gap="small" align="center">
			<YearPrevButton year={year} setYear={setYear} />

			<YearPicker year={year} setYear={setYear} />

			<YearNextButton year={year} setYear={setYear} />

			<YearSelectButton setYear={setYear} />

			<Button color="primary" variant="text" size="small" className="all-delete-tag">
				초기화
			</Button>
		</Flex>
	);
};

export default YearHeaderLeft;
