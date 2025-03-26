// pages/order/create/index.js
import React, {useState} from "react";
import {AutoComplete, Button, Flex, Input,} from "antd";
import {CloseOutlined} from "@ant-design/icons";

const SearchAutoComplete = ({ setSearchKeyword }) => {

	const [searchItems, setSearchItems] = useState([
		{ title: "검색어1", date: "02.04" },
		{ title: "검색어2", date: "02.05" },
		{ title: "키워드3", date: "02.06" },
	]);

	// 개별 검색어 삭제
	const handleDelete = (title) => {
		setSearchItems(searchItems.filter((item) => item.title !== title));
	};

	// 전체 검색어 삭제
	const handleDeleteAll = () => {
		setSearchItems([]);
	};

	// 검색어 렌더링
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
				onSearch={(value) => setSearchKeyword(value)}
			/>
		</AutoComplete>
	);
};

export default SearchAutoComplete;
