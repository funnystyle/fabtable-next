// pages/samples/orderInfo/OrderCreateNewFinal.js
import React, { useEffect, useState } from "react";
import { Flex, Form, Layout, Spin, } from "antd";
import { handleInputBoxRow } from "@components/inputForm/handleInputBoxRow";
import { handleCsAsInputBox } from "@components/inputForm/cs/handleCsAsInputBox";
import CsFollowUplInputBox from "@components/inputForm/cs/CsFollowUplInputBox";
import CsRecordInputBoxes from "@components/cs/create/CsRecordInputBoxes";
import CsAsDetailInputBox from "@components/inputForm/cs/CsAsDetailInputBox";
import SearchModal from "@components/searchModal/SearchModal";
import CsCreateHeader from "@components/cs/create/CsCreateHeader";
import useCsCreateConstantStore from "@store/useCsCreateConstantStore";
import CsCreateTab from "@components/cs/create/CsCreateTab";
import CsCreateTitle from "@components/cs/create/CsCreateTitle";
import CsSearchModal from "@components/searchModal/CsSearchModal";
import useCsDataStore from "@store/useCsDataStore";
import dayjs from "dayjs";
import CsCreateAnchor from "@components/cs/create/CsCreateAnchor";
import { loadFormValues } from "@components/inputForm/loadFormValues";
import useRecordSelectCodesStore from "@store/useRecordSelectCodesStore";
import { useGetInputBoxList } from "@components/api/useGetInputBoxList";
import { useGetCsDetail } from "@components/api/useGetCsDetail";
import CsCreateHeaderUpdate from "@components/cs/create/CsCreateHeaderUpdate";

const CsCreate = ({ isActive=true }) => {
	const { data, list } = useGetInputBoxList("csCreate");

	const [form] = Form.useForm();
	const codeRelationSet = new Set();

	const [asKeys, setAsKeys] = useState([0]);
	const [asCheckedKeySet, setAsCheckedKeySet] = useState(new Set());
	const [loading, setLoading] = useState(true);

	const { setAsKeys:setConstantAsKeys, setIsAsDetailCommon, setIsFollowUpCommon } = useCsCreateConstantStore();

	useEffect(() => {
		setConstantAsKeys(asKeys);
	}, [asKeys]);

	const { cs , setCsDetail} = useCsDataStore();
	const { selectedCodes, setSelectedCodes } = useRecordSelectCodesStore();

	const { data:csDetail, handleReload:csDetailLoad } = useGetCsDetail();

	useEffect(() => {
		if (list && list.length > 0 && cs?.id) {
			setTimeout(() => {
				loadFormValues(cs, data, form, selectedCodes, setSelectedCodes)
			}, 10);

			if (cs?.id) {
				csDetailLoad(cs.id)
			}
		}

		setLoading(!list || list.length === 0);
	}, [cs, list]);

	const { setRecordKeys } = useCsCreateConstantStore();
	useEffect(() => {
		setCsDetail(csDetail);
		if (csDetail) {
			const ids = csDetail.csRecords.map((csRecord, index) => csRecord.recordId);
			setRecordKeys(ids);

			setTimeout(() => {
				csDetail.csRecords.forEach((csRecord, index) => {
					const result = Object.entries(csRecord).reduce((acc, [key, value]) => {
						const dateFields = ["defectMfcWithdrawalDate", "actionCompletionDate", "productCertificationDate"];
						const isDateField = dateFields.includes(key);
						acc[key + "-" + (index + 1)] = isDateField ? (value == null ? null : dayjs(value)) : value;
						return acc;
					}, {});
					form.setFieldsValue(result);
				});
			}, 10);

			form.setFieldsValue(csDetail.csAsWork);

			const asKeys = csDetail.csAsWorkContents.map((csAsWorkContent, index) => {
				const result = Object.entries(csAsWorkContent).reduce((acc, [key, value]) => {
					const dateFields = ["responseDate"];
					const isDateField = dateFields.includes(key);
					acc[key + "-" + (index + 1)] = isDateField ? (value == null ? null : dayjs(value)) : value;
					return acc;
				}, {});
				form.setFieldsValue(result);

				return index;
			});
			setAsKeys(asKeys);

			setIsAsDetailCommon(csDetail.isAsDetailCommon);
			setIsFollowUpCommon(csDetail.isFollowUpCommon);

			csDetail.csAsDetails.forEach((csAsDetail, index) => {
				const result = Object.entries(csAsDetail).reduce((acc, [key, value]) => {
					const dateFields = ["responseDate"];
					const isDateField = dateFields.includes(key);
					acc[key + "-" + (csDetail.isAsDetailCommon ? 0 : index + 1)] = isDateField ? (value == null ? null : dayjs(value)) : value;
					return acc;
				}, {});
				form.setFieldsValue(result);
			});

			csDetail.csFollowUps.forEach((csFollowUp, index) => {
				const result = Object.entries(csFollowUp).reduce((acc, [key, value]) => {
					const dateFields = ["analysisRequestDate", "analysisDueDate", "analysisCompleteDate"];
					const isDateField = dateFields.includes(key);
					acc[key + "-" + (csDetail.isFollowUpCommon ? 0 : index + 1)] = isDateField ? (value == null ? null : dayjs(value)) : value;
					return acc;
				}, {});
				form.setFieldsValue(result);
			});
		}
	}, [csDetail]);

	const [anchorContainer, setAnchorContainer] = useState(null);

	useEffect(() => {
		const container = document.querySelector(".anchor-wrapper");
		if (container) {
			setAnchorContainer(container);
		}
	}, [loading]);

	return (
		<Layout>
			<div className="contents-flex">
				<CsCreateTitle title="C/S 관리" />

				{/*<CsCreateTab activeKey={2} />*/}

				{!cs?.id ? <CsCreateHeader form={form} />
				: <CsCreateHeaderUpdate form={form} /> }
			</div>

			<Spin
				spinning={loading}
				style={{ width: "100%", textAlign: "center", paddingTop: 80 }}
			>
				{!loading && (
					<Flex style={{ height: 'calc(100vh - 301px)', overflowY: 'auto' }} className="anchor-wrapper">
						<div className="anchor-contents">
							<div
								// style={{ paddingTop: contentHeight }}
								// className="contents-scroll"
							>
								{list.map((item, index) => handleInputBoxRow(form, codeRelationSet, item, index, "cs"))}

								<CsRecordInputBoxes form={form} codeRelationSet={codeRelationSet} type="cs" />

								{handleCsAsInputBox(form, asKeys, setAsKeys, asCheckedKeySet, setAsCheckedKeySet)}
								
								<CsAsDetailInputBox form={form} />

								<CsFollowUplInputBox form={form} />
							</div>
						</div>
						{anchorContainer && (
							<CsCreateAnchor list={list} anchorContainer={anchorContainer}/>
						)}
					</Flex>
				)}
			</Spin>

			<CsSearchModal searchLocation={"cs"} searchType={"OPEN"}/>

			<SearchModal searchLocation={"order"} searchType={"OPEN"} isActive={isActive} />
		</Layout>
	);
};

export default CsCreate;
