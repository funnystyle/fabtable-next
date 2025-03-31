// pages/order/create/index.js
import React from "react";
import { Button, } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import useRecordDataStore from "@store/useRecordDataStore";
import useRecordModalStore from "@store/useRecordModalStore";

const OrderListButtonAllList = ({ statusList }) => {

	const { setDeleteTagKeyName, setSearchStatusList } = useRecordModalStore();
	const { tags, setTags } = useRecordDataStore();

	const handleTagDeleteAll = () => {
		tags.forEach((tag) => {
			setDeleteTagKeyName(tag.key);
		});
		setTags([]);
	};

	const handleStatusSelectAll = () => {
		setSearchStatusList([...statusList]);
	};

	const handleAllList = () => {
		handleTagDeleteAll();
		handleStatusSelectAll();
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
