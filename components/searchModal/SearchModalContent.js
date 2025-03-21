// pages/year.js
import React from "react";
import {Button, Flex, Form,} from "antd";
import "dayjs/locale/ko";
import SearchModalHead from "@components/calendar/year/searchModal/SearchModalHead";
import SearchModalNormal from "@components/calendar/year/searchModal/normal/SearchModalNormal";
import SearchModalNumber from "@components/calendar/year/searchModal/number/SearchModalNumber";
import {useMutation} from "@tanstack/react-query";
import {postAxios} from "@api/apiClient";
import SearchModalDate from "@components/calendar/year/searchModal/date/SearchModalDate";

const SearchModalContent = ({ closeModal, searchLocation, handleListUpdate }) => {

	const [form] = Form.useForm();

	const { mutate: getRecords } = useMutation({
		mutationKey: "getRecords",
		mutationFn: (values) => postAxios("/user/record/search", values),
		onSuccess: (response) => {
			handleListUpdate(response.data.list);
			closeModal();
		}
	});

	const handleSubmit = () => {
		const groupedData = {};
		const rawData = form.getFieldsValue();

		Object.entries(rawData).forEach(([key, value]) => {
			const match = key.match(/search-(\d+)-(\d+)-(.+)/);
			if (match) {
				const [, group, index, field] = match;
				const groupKey = `search-${group}`;
				const itemIndex = parseInt(index, 10) - 1; // 배열 인덱스로 변환

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
		});

		console.log(JSON.stringify(groupedData, null, 2));
		getRecords({searchData: groupedData});
	}

	return (
		<>
			<SearchModalHead form={form} />

			<div className="layer-scroll">
				<SearchModalNormal form={form} title={"일반"} order={1} searchLocation={searchLocation} searchDiv={"NORMAL"} />
				<SearchModalNumber form={form} title={"숫자/수치"} order={2} searchLocation={searchLocation} searchDiv={"NUMBER"} />
				<SearchModalDate form={form} title={"기간/날짜"} order={3} searchLocation={searchLocation} searchDiv={"DATE"} />
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


export default SearchModalContent;
