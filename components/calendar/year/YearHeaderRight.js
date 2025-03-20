// pages/year.js
import React from "react";
import { Button, Flex, } from "antd";
import { SearchOutlined, } from "@ant-design/icons";
import "dayjs/locale/ko";
import YearExcelDownloadButton from "@components/calendar/year/YearExcelDownloadButton";
import YearSelectButton from "@components/calendar/year/YearSelectButton";
import YearSearchBtn from "@components/calendar/year/YearSearchBtn";

const YearHeaderRight = ({ year, setYear }) => {

	return (
		<Flex gap="small" align="center">
			<Button color="primary" variant="text" size="small" className="all-delete-tag">
				조건 초기화
			</Button>

			<YearSearchBtn year={year} setYear={setYear} />

			<YearSelectButton setYear={setYear} />
			<YearExcelDownloadButton year={year} />
		</Flex>
	);
};

export default YearHeaderRight;
