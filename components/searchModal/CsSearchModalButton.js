// pages/year.js
import React, {useEffect} from "react";
import {Button, Flex,} from "antd";
import "dayjs/locale/ko";
import useCsSearchModalStore from "@store/useCsSearchModalStore";

const SearchModalButton = ({ form }) => {

	const { setSearchData, setOpenSearchModal, setFormData, deleteTagKeyName } = useCsSearchModalStore();

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
			} else {
				groupedData[key] = value;
			}
		});

		setFormData(rawData);
		setSearchData(groupedData);
	}

	useEffect(() => {
		if (deleteTagKeyName === "") {
			return;
		}
		form.resetFields([`${deleteTagKeyName}-input`, `${deleteTagKeyName}-input2`]);
		handleSubmit();
	}, [deleteTagKeyName]);

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
