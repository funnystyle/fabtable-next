// pages/year.js
import React from "react";
import { Button, ConfigProvider, DatePicker, Flex, } from "antd";
import { LeftOutlined, RightOutlined, SearchOutlined, } from "@ant-design/icons";
import "dayjs/locale/ko";
import MonthPicker from "@components/calendar/MonthPicker";
import CurrentMonthButton from "@components/calendar/CurrentMonthButton";
import dayjs from "dayjs";
import koKR from "antd/es/locale/ko_KR";
import { useMutation } from "@tanstack/react-query";
import { postAxios, postBlobAxios } from "@api/apiClient";

const YearHeader = ({ year, setYear, month, setMonth }) => {

	console.log("YearHeader", year, month);

	const handlePrevYear = () => {
		setYear(year - 1);
	}

	const handleNextYear = () => {
		setYear(year + 1);
	}

	const onChange = (date, dateString) => {
		setYear(Number(dateString));
	}

	const { mutate: downloadExcel, isLoading } = useMutation({
		mutationKey: "downloadCalendarYearExcel",
		mutationFn: () => postBlobAxios("/user/calendar/year/excel", {year}),
		onSuccess: (data) => {
				// 파일 다운로드 처리
				const url = window.URL.createObjectURL(data);
				const link = document.createElement("a");
				link.href = url;
				link.setAttribute("download", `Yearly_Schedule_${year}.xlsx`);
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			},
			onError: (error) => {
				console.error("엑셀 다운로드 오류:", error);
			},
		}
	);

	return (
		<Flex align="start" justify="space-between">
			<Flex gap="small" align="center">

				<button onClick={handlePrevYear} className="btn-page">
					<LeftOutlined />
				</button>

				<ConfigProvider locale={koKR}>
					<DatePicker
						value={dayjs(`${year}-01-01`)}
						onChange={onChange}
						picker="year"
						format="YYYY"
						placeholder="선택"
						style={{ width: 80 }}
						allowClear={false} // X 버튼 제거
						// suffixIcon={null} // 아이콘 제거
					/>
				</ConfigProvider>

				<button onClick={handleNextYear} className="btn-page">
					<RightOutlined />
				</button>
			</Flex>

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
					<Button variant="outlined"
					onClick={() => downloadExcel()}
					>엑셀 다운로드</Button>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default YearHeader;
