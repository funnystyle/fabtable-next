// pages/order/create/index.js
import React from "react";
import { Button, } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import useRecordDataStore from "@store/useRecordDataStore";
import useRecordModalStore from "@store/useRecordModalStore";

const OrderListButtonAllList = ({ setDeleteTagKeyName, setSearchStatusList, setSearchKeyword, tags, setTags, statusList }) => {

	const handleTagDeleteAll = () => {
		tags.forEach((tag) => {
			setDeleteTagKeyName(tag.key);
		});
		setTags([]);
	};

	const handleStatusSelectAll = () => {
		setSearchStatusList([...statusList]);
	};

	const handleSearchKeywordReset = () => {
		setSearchKeyword("");
	}

	const handleAllList = () => {
		handleTagDeleteAll();
		handleStatusSelectAll();
		handleSearchKeywordReset();
	}

	return (
		<Button
			variant="outlined"
			icon={<RedoOutlined />}
			className="icon-redo"
			onClick={handleAllList}
		>
			전체 목록
		</Button>
	);
};

export default OrderListButtonAllList;
