// pages/order/create/index.js
import React, { useState } from "react";
import { Button, Flex, Tag, } from "antd";

const OrderListSearchTags = () => {

	const [tags, setTags] = useState([
		"2024-01-01 ~ 2025-02-22",
		"MARU",
		"7000s",
		"9000s",
		"2024-01-01 ~ 2025-02-22",
		"MARU",
		"7000s",
		"9000s",
		"2024-01-01 ~ 2025-02-22",
		"MARU",
		"7000s",
		"9000s",
		"2024-01-01 ~ 2025-02-22",
		"MARU",
		"7000s",
		"9000s",
		"2024-01-01 ~ 2025-02-22",
		"MARU",
		"7000s",
		"9000s",
	]);

	// 개별 태그 삭제 핸들러
	const handleTagClose = (tagToRemove) => {
		setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
	};

	const handleTagDeleteAll = () => {
		setTags([]);
	};

	return (
		<Flex align="center" className="search-result-area">
			<strong className="tit-search-result">검색결과 :</strong>

			{tags.map((tag, index) => (
				<Tag key={index} closeIcon onClose={() => handleTagClose(tag)}>
					{tag}
				</Tag>
			))}

			<Button
				color="primary"
				variant="text"
				size="small"
				className="all-delete-tag"
				onClick={handleTagDeleteAll}
			>
				모두 삭제
			</Button>
		</Flex>
	);
};

export default OrderListSearchTags;
