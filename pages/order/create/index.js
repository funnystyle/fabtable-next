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
import SearchModal from "@components/searchModal/SearchModal";
import useRecordDataStore from "@store/useRecordDataStore";
import useRecordSelectCodesStore from "@store/useRecordSelectCodesStore";
import OrderCreateHeaderUpdate from "@components/order/create/OrderCreateHeaderUpdate";
import { loadFormValues } from "@components/inputForm/loadFormValues";

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

	const { record } = useRecordDataStore();
	const { selectedCodes, setSelectedCodes } = useRecordSelectCodesStore();

	useEffect(() => {
		loadFormValues( record, inputBoxResponse?.data, form, selectedCodes, setSelectedCodes)
	}, [record]);

	useEffect(() => {
		console.log("selectedCodes: ", selectedCodes);
	}, [selectedCodes]);



	return (
		<Layout>
			<div className="contents-top">
				<OrderCreateTitle title="영업 관리" />

				<OrderCreateTab activeKey={2} />

				{ !record?.id ? <OrderCreateHeaderNew form={form} />
				: <OrderCreateHeaderUpdate form={form} /> }
			</div>

			<Flex gap={32}>
				<div className="anchor-contents">
					<div
						style={{ paddingTop: contentHeight }}
						className="contents-scroll"
					>
						{inputBoxList.map((item, index) => handleInputBoxRow(form, codeRelationSet, item, index))}
					</div>
				</div>
				<OrderCreateAnchor contentHeight={contentHeight} list={inputBoxList} />
			</Flex>

			{/* 검색 모달(버튼이 있는 곳으로 옮기면 깨져서 원복) */}
			<SearchModal searchLocation={"order"} searchType={"OPEN"}/>
		</Layout>
	);
};

export default OrderInfoCreate;
