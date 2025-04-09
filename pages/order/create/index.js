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
import SearchModal from "@components/searchModal/SearchModal";
import useOrderCreateLoadRecordModalStore from "@store/useOrderCreateLoadRecordModalStore";
import { useGetMgmrBinList } from "@components/api/useGetMgmrBinList";

const OrderInfoCreate = ({ isActive=true, tabRemove }) => {

	const [loading, setLoading] = useState(true);

	// 입력 박스 리스트 호출
	const { data, list } = useGetInputBoxList("recordCreate");

	// 저장값
	const [form] = Form.useForm();
	const codeRelationSet = new Set();

	const { record, resetFlag, setNowState, isCopy, setIsChange, serialNumber, setSerialNumber, isNew, setIsNew } = useRecordDataStore();
	const { selectedCodes, setSelectedCodes } = useRecordSelectCodesStore();

	const [productionDepartment , setProductionDepartment] = useState(null);
	const [scheduledDeliveryDate, setScheduledDeliveryDate] = useState(null);

	// 불러오기, 혹은 상세 조회 시 실행됨
	useEffect(() => {
		if (list && list.length > 0 && record) {
			setNowState(record?.nowState);
			setSerialNumber(record?.serialNumber);
			setProductionDepartment(record?.productionDepartment);
			setScheduledDeliveryDate(record?.scheduledDeliveryDate);
			setTimeout(() => {
				loadFormValues({...record,
					customer: (typeof(record.customer) === "object" ? record.customer.props.codeName : record.customer),
					buyer: (typeof(record.buyer) === "object" ? record.buyer.props.codeName : record.buyer),
					specialOrderNumber: (typeof(record.specialOrderNumber) === "object" ? record.specialOrderNumber.props.codeName : record.specialOrderNumber),
				}, data, form, selectedCodes, setSelectedCodes)
			}, 50);
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
	const { list:mgmrBinList } = useGetMgmrBinList();


	useEffect(() => {
		setIsChange(true);

		// mgmrBin
		const mgmrBin = mgmrBinList.find((item) =>
			item.modelName.includes(form.getFieldValue("productCategory") + form.getFieldValue("productModel"))
			&& item.gasName === form.getFieldValue("fluid")
			&& item.gasMin <= form.getFieldValue("flowrate")
			&& item.gasMax >= form.getFieldValue("flowrate")
		);

		if (mgmrBin) {
			form.setFieldValue("mgmrBin", mgmrBin?.valueNo);
			form.setFieldValue("maxFlowMgmr", mgmrBin?.gasMax);
		} else {
			form.setFieldValue("mgmrBin", "None");
		}

	}, [values]);


	/// 부서 변경시 시리얼 넘버에 반영 ///
	/// 납품 계획일 변경 시 생산계획일, 검사계획일에 반영 ///
	useEffect(() => {
		const productionDepartmentFormValue = form.getFieldValue("productionDepartment");
		if (productionDepartment !== productionDepartmentFormValue) {
			setProductionDepartment(productionDepartmentFormValue);
		}
		const scheduledDeliveryDateFormValue = form.getFieldValue("scheduledDeliveryDate");
		if (scheduledDeliveryDate !== scheduledDeliveryDateFormValue) {
			setScheduledDeliveryDate(scheduledDeliveryDateFormValue);
		}
	}, [values]);

	useEffect(() => {
		if (serialNumber && productionDepartment && serialNumber.length > 11 && productionDepartment.length > 1) {
			const newSerialNumber = serialNumber.slice(0, 11) + productionDepartment.slice(productionDepartment.length - 2, productionDepartment.length - 1);
			setSerialNumber(newSerialNumber);
			form.setFieldValue("serialNumber", newSerialNumber);
		}
	}, [productionDepartment]);

	useEffect(() => {
		if (scheduledDeliveryDate) {
			console.log(scheduledDeliveryDate);
			// scheduledDeliveryDate는 dayjs 객체임
			// 여기서 -3일
			const productionPlanDate = scheduledDeliveryDate.subtract(5, "day");
			const inspectionPlanDate = scheduledDeliveryDate.subtract(3, "day");
			form.setFieldsValue({
				productionPlanDate: productionPlanDate,
				inspectionPlanDate: inspectionPlanDate,
			});
		}
	}, [scheduledDeliveryDate]);
	/// 부서 변경시 시리얼 넘버에 반영 ///

	useEffect(() => {
		const flowrate = form.getFieldValue("flowrate") || 0;
		const conversionFactor = form.getFieldValue("conversionFactor") || 1;
		const convertedFlowrate = parseFloat((flowrate / conversionFactor).toFixed(2));
		form.setFieldsValue({ convertedFlowrate });
	}, [values]);


	useEffect(() => {
		if (isCopy) {
			form.resetFields(["oldSerialNumber", "serialNumber"]);
		}
	}, [isCopy]);

	useEffect(() => {
		setIsNew(!record?.id || isCopy)
	}, [record, isCopy]);

	return (
		<Layout>
			<div className="contents-flex">
				<OrderCreateTitle title="영업 관리" />

				{/* <OrderCreateTab activeKey={2} /> */}

				{ isNew ? <OrderCreateHeaderNew form={form} tabRemove={tabRemove} />
				: <OrderCreateHeaderUpdate form={form} tabRemove={tabRemove} /> }
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
			<SearchModal searchLocation={"order"} searchType={"OPEN"} isActive={isActive} modalStore={useOrderCreateLoadRecordModalStore} inBoxType={"recordCreateOpenModal"} />
		</Layout>
	);
};

export default OrderInfoCreate;
