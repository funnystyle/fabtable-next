// pages/order/create/index.js
import React, { useEffect, useState } from "react";
import { Button, } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { handleCopyModal } from "@components/list/handleCopyModal";
import { useQuery } from "@tanstack/react-query";
import { getAxios } from "@api/apiClient";

const OrderListButtonEdit = ({setEditModalBoxList, showEditModal}) => {

	const [queryKey5, setQueryKey5] = useState(["input-box-list", "recordListEditModal", Math.random()]);
	const { data:editModalBoxResponse, isSuccess:isSuccess5 } = useQuery({
		queryKey: queryKey5,
		queryFn: () => getAxios("/user/input-box", {type:"recordListEditModal"}),
	});
	useEffect(() => {
		if (isSuccess5) {
			setEditModalBoxList(editModalBoxResponse.data.list);
		}
	}, [isSuccess5]);

	return (
		<Button onClick={showEditModal}>수주 일괄수정</Button>
	);
};

export default OrderListButtonEdit;
