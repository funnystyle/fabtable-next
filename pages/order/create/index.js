// pages/order/create/index.js
import React, { useEffect, useRef, useState } from "react";
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
import DrawerComponent from "@publish/components/drawer";
import useOrderCreateDrawerStore from "@store/useOrderCreateDrawerStore";
import useAutoSelectMgmrBin from "@components/order/create/hook/useAutoSelectMgmrBin";

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

	const productCategoryWatch = Form.useWatch("productCategory", form);
	const productModelWatch = Form.useWatch("productModel", form);
	const fluidWatch = Form.useWatch("fluid", form);
	const flowrateWatch = Form.useWatch("flowrate", form);
	const productionDepartmentWatch = Form.useWatch("productionDepartment", form);
	const scheduledDeliveryDateWatch = Form.useWatch("scheduledDeliveryDate", form);
	const conversionFactorWatch = Form.useWatch("conversionFactor", form);

	const { list:mgmrBinList } = useGetMgmrBinList();
	// mgmrBin, 최대유량 자동 선택
	useAutoSelectMgmrBin(form, mgmrBinList, [
		productCategoryWatch,
		productModelWatch,
		fluidWatch,
		flowrateWatch,
	]);


	/// 부서 변경시 시리얼 넘버에 반영 ///
	/// 납품 계획일 변경 시 생산계획일, 검사계획일에 반영 ///
	useEffect(() => {
		const productionDepartmentFormValue = form.getFieldValue("productionDepartment");
		if (productionDepartment !== productionDepartmentFormValue) {
			setProductionDepartment(productionDepartmentFormValue);
		}
	}, [productionDepartmentWatch]);
	useEffect(() => {
		const scheduledDeliveryDateFormValue = form.getFieldValue("scheduledDeliveryDate");
		if (scheduledDeliveryDate !== scheduledDeliveryDateFormValue ) {
			console.log(scheduledDeliveryDateFormValue);
			if (scheduledDeliveryDateFormValue === null || scheduledDeliveryDateFormValue === undefined) {
				return;
			}

			if (typeof scheduledDeliveryDate === "string") {
				if (scheduledDeliveryDate === scheduledDeliveryDateFormValue.format("YYYY-MM-DD")) {
					return;
				}
			}

			setScheduledDeliveryDate(scheduledDeliveryDateFormValue);
		}
	}, [scheduledDeliveryDateWatch]);

	useEffect(() => {
		if (serialNumber && productionDepartment && serialNumber.length >= 11 && serialNumber.length <= 12 && productionDepartment.length > 1) {
			const newSerialNumber = serialNumber.slice(0, 11) + productionDepartment.slice(productionDepartment.length - 2, productionDepartment.length - 1);
			setSerialNumber(newSerialNumber);
			form.setFieldValue("serialNumber", newSerialNumber);
		}
	}, [productionDepartment]);

	useEffect(() => {
		if (scheduledDeliveryDate) {
			// scheduledDeliveryDate는 dayjs 객체일수도 있고, YYYY-MM-DD 형식의 문자열일수도 있음
			// 만약 문자열이라면 중지
			if (typeof scheduledDeliveryDate === "string") {
				return;
			}
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

	const lastValueRef = useRef(null);
	useEffect(() => {
		const flowrate = form.getFieldValue("flowrate") || 0;
		const conversionFactor = form.getFieldValue("conversionFactor") || 1;
		const convertedFlowrate = parseFloat((flowrate / conversionFactor).toFixed(2));
		if (convertedFlowrate !== lastValueRef.current) {
			form.setFieldsValue({ convertedFlowrate });
			lastValueRef.current = convertedFlowrate;
		}
	}, [flowrateWatch, conversionFactorWatch]);


	useEffect(() => {
		if (isCopy) {
			form.resetFields(["oldSerialNumber", "serialNumber"]);
		}
	}, [isCopy]);

	useEffect(() => {
		setIsNew(!record?.id || isCopy)
	}, [record, isCopy]);

	const { openDrawer } = useOrderCreateDrawerStore();

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

			{/* DrawerComponent 추가 - 상태와 닫기 핸들러 전달 */}
			<div style={{ display: openDrawer ? "block" : "none" }}>
				<DrawerComponent drawerStore={useOrderCreateDrawerStore} />
			</div>
		</Layout>
	);
};

export default OrderInfoCreate;
