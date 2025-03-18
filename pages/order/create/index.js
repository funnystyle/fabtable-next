// pages/order/create/index.js
import React, { useEffect, useState } from "react";
import { Flex, Form, Layout, } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getAxios } from "@api/apiClient";
import { handleInputBoxRow } from "@components/inputForm/handleInputBoxRow";
import OrderCreateHeaderNew from "@components/order/create/OrderCreateHeaderNew";
import OrderCreateAnchor from "@components/order/create/OrderCreateAnchor";
import OrderCreateTab from "@components/order/create/OrderCreateTab";
import OrderCreateTitle from "@components/order/create/OrderCreateTitle";

const OrderInfoCreate = ({ contentHeight }) => {

	// 입력 박스 리스트 호출
	const [inputBoxList, setInputBoxList] = useState([]);
	const [queryKey, setQueryKey] = useState(["input-box-list", Math.random()]);
	const { data:inputBoxResponse, isLoading, isSuccess, isError } = useQuery({
		queryKey,
		queryFn: () => getAxios("/user/input-box", {type:"recordCreate"}),
	});
	useEffect(() => {
		if (isSuccess) {
			setInputBoxList(inputBoxResponse.data.list);
		}
	}, [isSuccess]);

	// 저장값
	const [form] = Form.useForm();
	const codeRelationSet = new Set();
	const [selectedCodes, setSelectedCodes] = useState([]); // 선택된 코드 상태 저장

	return (
		<Layout>
			<div className="contents-top">
				<OrderCreateTitle title="영업 관리" />

				<OrderCreateTab activeKey={2} />

				<OrderCreateHeaderNew form={form} />
			</div>

			<Flex gap={32}>
				<div className="anchor-contents">
					<div
						style={{ paddingTop: contentHeight }}
						className="contents-scroll"
					>
						{inputBoxList.map((item, index) => handleInputBoxRow(form, codeRelationSet, selectedCodes, setSelectedCodes, item, index))}
					</div>
				</div>
				<OrderCreateAnchor contentHeight={contentHeight} list={inputBoxList} />
			</Flex>
		</Layout>
	);
};

export default OrderInfoCreate;
