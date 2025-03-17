// pages/year.js
import React from "react";
import { Button, Flex, } from "antd";
import "dayjs/locale/ko";
import { useMutation } from "@tanstack/react-query";
import { postBlobAxios } from "@api/apiClient";

const YearExcelDownloadButton = ({ year }) => {

	const { mutate: downloadExcel } = useMutation({
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
		<Flex gap="small">
			<Button variant="outlined" onClick={() => downloadExcel()}>엑셀 다운로드</Button>
		</Flex>
	);
};

export default YearExcelDownloadButton;
