// pages/year.js
import React from "react";
import { Button, Flex, } from "antd";
import { SearchOutlined, } from "@ant-design/icons";
import "dayjs/locale/ko";
import YearExcelDownloadButton from "@components/calendar/year/YearExcelDownloadButton";
import YearSelectButton from "@components/calendar/year/YearSelectButton";
import YearSearchBtn from "@components/calendar/year/YearSearchBtn";

const YearHeaderRight = ({ year, setYear, handleListUpdate }) => {

	return (
		<Flex gap="small" align="center">
			<YearSearchBtn year={year} setYear={setYear} handleListUpdate={handleListUpdate} />

			<YearExcelDownloadButton year={year} />
		</Flex>
	);
};

export default YearHeaderRight;
