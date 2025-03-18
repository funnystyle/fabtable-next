// pages/order/create/index.js
import React, { useEffect, useState } from "react";
import { Button, } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { handleCopyModal } from "@components/list/handleCopyModal";
import { useQuery } from "@tanstack/react-query";
import { getAxios } from "@api/apiClient";

const OrderListButtonCopy = ({setCopyModalBoxList, showCopyModal}) => {

	const [queryKey4, setQueryKey4] = useState(["input-box-list", "recordListCopyModal", Math.random()]);
	const { data:copyModalBoxResponse, isSuccess:isSuccess4 } = useQuery({
		queryKey: queryKey4,
		queryFn: () => getAxios("/user/input-box", {type:"recordListCopyModal"}),
	});
	useEffect(() => {
		if (isSuccess4) {
			setCopyModalBoxList(copyModalBoxResponse.data.list);
		}
	}, [isSuccess4]);

	return (
		<Button onClick={showCopyModal}>수주 복제하기</Button>
	);
};

export default OrderListButtonCopy;
