// pages/year.js
import React from "react";
import { Button, Flex, } from "antd";
import { SearchOutlined, } from "@ant-design/icons";
import "dayjs/locale/ko";
import dayjs from "dayjs";
import YearExcelDownloadButton from "@components/calendar/year/YearExcelDownloadButton";
import YearHeaderLeft from "@components/calendar/year/YearHeaderLeft";
import YearHeaderRight from "@components/calendar/year/YearHeaderRight";

const YearHeader = ({ year, setYear, handleListUpdate }) => {

	return (
		<Flex align="start" justify="space-between">
			<YearHeaderLeft year={year} setYear={setYear} />

			<YearHeaderRight year={year} setYear={setYear} handleListUpdate={handleListUpdate} />
		</Flex>
	);
};

export default YearHeader;
