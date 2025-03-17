// pages/year.js
import React from "react";
import { Button, Flex, } from "antd";
import { SearchOutlined, } from "@ant-design/icons";
import "dayjs/locale/ko";
import dayjs from "dayjs";
import YearExcelDownloadButton from "@components/calendar/year/YearExcelDownloadButton";
import YearHeaderLeft from "@components/calendar/year/YearHeaderLeft";

const YearHeader = ({ year, setYear }) => {

	return (
		<Flex align="start" justify="space-between">
			<YearHeaderLeft year={year} setYear={setYear} />

			<Flex gap="small" align="center">
				<Button
					color="primary"
					variant="text"
					size="small"
					className="all-delete-tag"
					// onClick={handleTagDeleteAll}
				>
					조건 초기화
				</Button>

				<Flex gap="small">
					<Button variant="outlined" icon={<SearchOutlined />}>
						조건 검색
					</Button>

				</Flex>
				<Flex gap="small" className="btn-spacing-area">
					<Button variant="outlined" onClick={() => setYear(dayjs().year())}>올해</Button>
					<Button variant="outlined" onClick={() => setYear(dayjs().year() - 1)}>작년</Button>
					<Button variant="outlined" onClick={() => setYear(dayjs().year() + 1)}>내년</Button>
				</Flex>
				<Flex gap="small">
					<YearExcelDownloadButton year={year} />
				</Flex>
			</Flex>
		</Flex>
	);
};

export default YearHeader;
