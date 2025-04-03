// pages/year.js
import React from "react";
import { Button, Flex, } from "antd";
import YearHeaderLeft from "@components/calendar/year/YearHeaderLeft";
import YearHeaderRight from "@components/calendar/year/YearHeaderRight";

const YearHeader = ({ year, setYear, setSearchData }) => {

	return (
		<Flex align="start" justify="space-between">
			<YearHeaderLeft year={year} setYear={setYear} />

			<YearHeaderRight year={year} setYear={setYear} setSearchData={setSearchData} />
		</Flex>
	);
};

export default YearHeader;
