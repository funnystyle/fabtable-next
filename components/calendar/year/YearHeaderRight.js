// pages/year.js
import React from "react";
import { Button, Flex, } from "antd";
import { SearchOutlined, } from "@ant-design/icons";
import "dayjs/locale/ko";
import YearExcelDownloadButton from "@components/calendar/year/YearExcelDownloadButton";
import YearSelectButton from "@components/calendar/year/YearSelectButton";

const YearHeaderRight = ({ year, setYear }) => {

	return (
		<Flex gap="small" align="center">
			<Button color="primary" variant="text" size="small" className="all-delete-tag">
				조건 초기화
			</Button>

			<Flex gap="small">
				<Button variant="outlined" icon={<SearchOutlined />}>
					조건 검색
				</Button>
			</Flex>

			<YearSelectButton setYear={setYear} />
			<YearExcelDownloadButton year={year} />
		</Flex>
	);
};

export default YearHeaderRight;
