// pages/order/create/index.js
import React, { useEffect, useState } from "react";
import { Flex, Form, Layout, Spin, } from "antd";
import OrderCreateHeaderNew from "@components/order/create/OrderCreateHeaderNew";
import OrderCreateAnchor from "@components/order/create/OrderCreateAnchor";
import OrderCreateTitle from "@components/order/create/OrderCreateTitle";
import useRecordDataStore from "@store/useRecordDataStore";
import useRecordSelectCodesStore from "@store/useRecordSelectCodesStore";
import OrderCreateHeaderUpdate from "@components/order/create/OrderCreateHeaderUpdate";
import { loadFormValues } from "@components/inputForm/loadFormValues";
import { useGetInputBoxList } from "@components/api/useGetInputBoxList";
import InputBoxRow from "@components/inputForm/InputBoxRow";
import OrderCreateLoadRecordModal from "@components/searchModal/OrderCreateLoadRecordModal";

const OrderInfoCreate = ({ isActive=true }) => {

	const [loading, setLoading] = useState(true);

	// 입력 박스 리스트 호출
	const { data, list } = useGetInputBoxList("recordCreate");

	// 저장값
	const [form] = Form.useForm();
	const codeRelationSet = new Set();

	const { record, resetFlag, setNowState, isCopy, setIsChange } = useRecordDataStore();
	const { selectedCodes, setSelectedCodes } = useRecordSelectCodesStore();

	useEffect(() => {
		if (list && list.length > 0 && record) {
			setNowState(record?.nowState);
			setTimeout(() => {
				loadFormValues(record, data, form, selectedCodes, setSelectedCodes)
			}, 10);

			setTimeout(() => {
				setIsChange(false);
			}, 1000);
		}


		setTimeout(() => {
			setIsChange(false);
		}, 2000);
		setLoading(!list || list.length === 0);
	}, [record, list, resetFlag]);

	const [anchorContainer, setAnchorContainer] = useState(null);

	useEffect(() => {
		const container = document.querySelector(".order-anchor-wrapper");
		if (container) {
			setAnchorContainer(container);
		}
	}, [loading]);

	const values = Form.useWatch([], form); // 폼 전체 값을 watch

	useEffect(() => {
		setIsChange(true);
	}, [values]);

	return (
		<Layout>
			<div className="contents-flex">
				<OrderCreateTitle title="영업 관리" />

				{/* <OrderCreateTab activeKey={2} /> */}

				{ !record?.id || isCopy ? <OrderCreateHeaderNew form={form} />
				: <OrderCreateHeaderUpdate form={form} /> }
			</div>

			<Spin
				spinning={loading}
				style={{ width: "100%", textAlign: "center", paddingTop: 80 }}
			>
				{!loading && (
					<Flex style={{ height: 'calc(100vh - 228px)', overflowY: 'auto' }} className="order-anchor-wrapper">
								<div className="anchor-contents">
									<div
										// style={{ paddingTop: contentHeight }}
										// className="contents-scroll"
									>
										{list.map((item, index) => <InputBoxRow
											key={`input-box-row-${index}`}
											form={form}
											codeRelationSet={codeRelationSet}
											itemList={item}
											index={index}
											type={"order"}
											/>
											)}
									</div>
								</div>
						{anchorContainer && (
							<OrderCreateAnchor list={list} anchorContainer={anchorContainer}/>
						)}
					</Flex>
				)}
			</Spin>
	
			{/* 검색 모달(버튼이 있는 곳으로 옮기면 깨져서 원복) */}
			<OrderCreateLoadRecordModal isActive={isActive} />

		</Layout>
	);
};

export default OrderInfoCreate;
