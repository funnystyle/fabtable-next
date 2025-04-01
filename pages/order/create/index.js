// pages/order/create/index.js
import React, { useEffect, useState } from "react";
import { Flex, Form, Layout, } from "antd";
import { handleInputBoxRow } from "@components/inputForm/handleInputBoxRow";
import OrderCreateHeaderNew from "@components/order/create/OrderCreateHeaderNew";
import OrderCreateAnchor from "@components/order/create/OrderCreateAnchor";
import OrderCreateTitle from "@components/order/create/OrderCreateTitle";
import SearchModal from "@components/searchModal/SearchModal";
import useRecordDataStore from "@store/useRecordDataStore";
import useRecordSelectCodesStore from "@store/useRecordSelectCodesStore";
import OrderCreateHeaderUpdate from "@components/order/create/OrderCreateHeaderUpdate";
import { loadFormValues } from "@components/inputForm/loadFormValues";
import { useGetInputBoxList } from "@components/api/useGetInputBoxList";

const OrderInfoCreate = ({ isActive=true }) => {

	// 입력 박스 리스트 호출
	const { data, list } = useGetInputBoxList("recordCreate");

	// 저장값
	const [form] = Form.useForm();
	const codeRelationSet = new Set();

	const { record } = useRecordDataStore();
	const { selectedCodes, setSelectedCodes } = useRecordSelectCodesStore();

	useEffect(() => {
		if (list && list.length > 0 && record) {
			setTimeout(() => {
				loadFormValues(record, data, form, selectedCodes, setSelectedCodes)
			}, 10);
		}
	}, [record, list]);

	const [anchorContainer, setAnchorContainer] = useState(null);

	useEffect(() => {
		const container = document.querySelector(".order-anchor-wrapper");
		if (container) {
			setAnchorContainer(container);
		}
	}, []);

	return (
		<Layout>
			<div className="contents-flex">
				<OrderCreateTitle title="영업 관리" />

				{/* <OrderCreateTab activeKey={2} /> */}

				{ !record?.id ? <OrderCreateHeaderNew form={form} />
				: <OrderCreateHeaderUpdate form={form} /> }
			</div>

			<Flex style={{ height: 'calc(100vh - 228px)', overflowY: 'auto' }} className="order-anchor-wrapper">
				<div className="anchor-contents">
					<div
						// style={{ paddingTop: contentHeight }}
						// className="contents-scroll"
					>
						{list.map((item, index) => handleInputBoxRow(form, codeRelationSet, item, index))}
					</div>
				</div>
				{anchorContainer && (
					<OrderCreateAnchor list={list} anchorContainer={anchorContainer}/>
				)}
			</Flex>

			{/* 검색 모달(버튼이 있는 곳으로 옮기면 깨져서 원복) */}
			<SearchModal searchLocation={"order"} searchType={"OPEN"} isActive={isActive} />
		</Layout>
	);
};

export default OrderInfoCreate;
