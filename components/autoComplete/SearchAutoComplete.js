// pages/order/create/index.js
import React, {useEffect, useState} from "react";
import {AutoComplete, Button, Flex, Input,} from "antd";
import {CloseOutlined} from "@ant-design/icons";

const STORAGE_KEY = "search_history";

const SearchAutoComplete = ({ searchKeyword, setSearchKeyword }) => {

	const [searchItems, setSearchItems] = useState([]);

	// 🔹 localStorage에서 검색어 목록 불러오기
	useEffect(() => {
		const storedItems = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
		setSearchItems(storedItems);
	}, []);

	// 🔹 검색어를 localStorage에 저장하는 함수
	const saveToLocalStorage = (items) => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
		setSearchItems(items);
	};

	// 🔹 개별 검색어 삭제
	const handleDelete = (title) => {
		const updatedItems = searchItems.filter((item) => item.title !== title);
		saveToLocalStorage(updatedItems);
	};

	// 🔹 전체 검색어 삭제
	const handleDeleteAll = () => {
		localStorage.removeItem(STORAGE_KEY);
		setSearchItems([]);
	};

	// 🔹 검색 실행 시 검색어 추가
	const handleSearch = (value) => {
		if (!value.trim()) return; // 빈 값 방지

		// 중복 제거 후 최신 검색어가 가장 위로 가도록 정렬
		const updatedItems = [
			{ title: value, date: new Date().toLocaleDateString("ko-KR") },
			...searchItems.filter((item) => item.title !== value),
		].slice(0, 10); // 최대 10개까지만 저장

		saveToLocalStorage(updatedItems);
		setSearchKeyword(value);
	};

	// 🔹 검색어 렌더링
	const renderItem = (title, date) => ({
		value: title,
		label: (
			<Flex align="center" justify="space-between">
				<span>{title}</span>
				<Flex align="center" gap="small">
					<span>{date}</span>
					<CloseOutlined
						className="close-x"
						onClick={(e) => {
							e.stopPropagation(); // 드롭다운 닫힘 방지
							handleDelete(title);
						}}
					/>
				</Flex>
			</Flex>
		),
	});

	// AutoComplete options 구성
	const options =
		searchItems.length > 0
			? [
				{
					label: (
						<Flex align="center" justify="space-between">
							<span>최근 검색어</span>
							<Button
								color="primary"
								variant="text"
								size="default"
								onClick={handleDeleteAll}
								className="all-delete"
							>
								모두 삭제
							</Button>
						</Flex>
					),
					options: searchItems.map((item) =>
						renderItem(item.title, item.date)
					),
				},
			]
			: [];

	useEffect(() => {
		console.log("searchKeyword", searchKeyword);
	}, [searchKeyword]);
// TODO:여기 안바뀌는 이유를 모르겠음

	return (
		<AutoComplete
			popupClassName="certain-category-search-dropdown"
			popupMatchSelectWidth={400}
			style={{
				width: 400,
			}}
			options={options}
		>
			<Input.Search
				size="large"
				placeholder="검색어를 입력하세요"
				allowClear
				className="input-search"
				value={searchKeyword}
				onSearch={handleSearch}
			/>
		</AutoComplete>
	);
};

export default SearchAutoComplete;
