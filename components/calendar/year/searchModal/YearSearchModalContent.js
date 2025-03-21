// pages/year.js
import React, { useState } from "react";
import { Button, Flex, Form, } from "antd";
import "dayjs/locale/ko";
import SearchModalHead from "@components/calendar/year/searchModal/SearchModalHead";
import SearchModalNormal from "@components/calendar/year/searchModal/normal/SearchModalNormal";
import SearchModalNumber from "@components/calendar/year/searchModal/number/SearchModalNumber";
import SearchModalYear from "@components/calendar/year/searchModal/year/SearchModalYear";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAxios, postAxios } from "@api/apiClient";

const YearSearchModalContent = ({ year, setYear, closeModal, searchLocation, handleListUpdate }) => {

	const [form] = Form.useForm();


	const { mutate: getYear } = useMutation({
		mutationKey: "getYear",
		mutationFn: (values) => postAxios("/user/calendar/year", values),
		onSuccess: (response) => {
			handleListUpdate(response.data.list);
			closeModal();
		}
	});


	const handleSubmit = () => {

		const groupedData = {};
		let yearData = [];
		const rawData = form.getFieldsValue();

		Object.entries(rawData).forEach(([key, value]) => {
			const match = key.match(/search-(\d+)-(\d+)-(.+)/);
			if (match) {
				const [, group, index, field] = match;
				const groupKey = `search-${group}`;
				const itemIndex = parseInt(index, 10) - 1; // 배열 인덱스로 변환

				if (groupKey === "search-3") {
					// value가 datepicker날짜 정보이다
					// 연도 정보를 추출하여 yearData에 추가
					if (value && value.length > 0) {
						yearData = value.map((date) => date.year());
					}
				} else {
					// 그룹이 존재하지 않으면 초기화
					if (!groupedData[groupKey]) {
						groupedData[groupKey] = [];
					}

					// 현재 인덱스에 해당하는 객체가 없으면 새 객체 생성
					if (!groupedData[groupKey][itemIndex]) {
						groupedData[groupKey][itemIndex] = {};
					}

					// 🔥 값 설정
					groupedData[groupKey][itemIndex][field] = value;
				}
			}
		});
		console.log(JSON.stringify({year:year, searchData:groupedData}));

		getYear({year:year, searchData:groupedData});
	}



	return (
		<>
			<SearchModalHead form={form} />

			<div className="layer-scroll">
				<SearchModalNormal form={form} title={"일반"} order={1} searchLocation={searchLocation} searchDiv={"NORMAL"} />
				<SearchModalNumber form={form} title={"숫자/수치"} order={2} searchLocation={searchLocation} searchDiv={"NUMBER"} />
				<SearchModalYear form={form} title={"연도"} order={3} searchLocation={searchLocation} searchDiv={"DATE"}
					year={year} setYear={setYear}
				/>
				<SearchModalNormal form={form} title={"작업자"} order={4} searchLocation={searchLocation} searchDiv={"WORKER"} />

				<Flex
					gap={8}
					align="center"
					justify="center"
					className="layer-btn-area"
				>
					<Button onClick={closeModal}>닫기</Button>
					<Button type="primary"
						onClick={handleSubmit}
					>검색</Button>
				</Flex>
			</div>
		</>
	);
};


export default YearSearchModalContent;
