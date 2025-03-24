// pages/year.js
import React from "react";
import { Button, Flex, } from "antd";
import "dayjs/locale/ko";
import { useMutation } from "@tanstack/react-query";
import { postAxios } from "@api/apiClient";
import useModalStore from "@store/useModalStore";

const SearchModalButton = ({ form }) => {

	const { setList, setOpenSearchModal } = useModalStore();

	const { mutate: getRecords } = useMutation({
		mutationKey: "getRecords",
		mutationFn: (values) => postAxios("/user/record/search", values),
		onSuccess: (response) => {
			setList(response.data.list);
		}
	});

	const handleSubmit = () => {
		const groupedData = {};
		const rawData = form.getFieldsValue();
		console.log(JSON.stringify(rawData, null, 2));

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
			} else {
				groupedData[key] = value;
			}
		});

		console.log(JSON.stringify(groupedData, null, 2));
		getRecords({searchData: groupedData});
	}

	return (
		<Flex
			gap={8}
			align="center"
			justify="center"
			className="layer-btn-area"
		>
			<Button onClick={() => setOpenSearchModal(false)}>닫기</Button>
			<Button type="primary"
				onClick={handleSubmit}
			>검색</Button>
		</Flex>
	);
};


export default SearchModalButton;
