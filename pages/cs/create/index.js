// pages/samples/orderInfo/OrderCreateNewFinal.js
import React, { useEffect, useState } from "react";
import { Flex, Form, Layout, } from "antd";
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

const CsCreate = ({ contentHeight }) => {

	const { data, list } = useGetInputBoxList("csCreate");

	const [form] = Form.useForm();
	const codeRelationSet = new Set();

	const [asKeys, setAsKeys] = useState([0]);
	const [asCheckedKeySet, setAsCheckedKeySet] = useState(new Set());

	const { setAsKeys:setConstantAsKeys, setIsAsDetailCommon, setIsFollowUpCommon } = useCsCreateConstantStore();

	useEffect(() => {
		setConstantAsKeys(asKeys);
	}, [asKeys]);

	const { cs , setCsDetail} = useCsDataStore();
	const { selectedCodes, setSelectedCodes } = useRecordSelectCodesStore();

	const { data:csDetail, handleReload:csDetailLoad } = useGetCsDetail();

	useEffect(() => {
		loadFormValues( cs, data, form, selectedCodes, setSelectedCodes)

		if (cs?.id) {
			csDetailLoad(cs.id)
		}
	}, [cs]);

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

	return (
		<Layout>
			<div className="contents-top">
				<CsCreateTitle title="C/S 관리" />

				<CsCreateTab activeKey={2} />

				<CsCreateHeader form={form} />
			</div>

			<Flex gap={32}>
				<div className="anchor-contents">
					<div
						style={{ paddingTop: contentHeight }}
						className="contents-scroll"
					>
						{list.map((item, index) => handleInputBoxRow(form, codeRelationSet, item, index))}

						<CsRecordInputBoxes form={form} codeRelationSet={codeRelationSet} />

						{handleCsAsInputBox(form, asKeys, setAsKeys, asCheckedKeySet, setAsCheckedKeySet)}
						
						<CsAsDetailInputBox form={form} />

						<CsFollowUplInputBox form={form} />
					</div>
				</div>
				<CsCreateAnchor contentHeight={contentHeight} />
			</Flex>

			<CsSearchModal searchLocation={"cs"} searchType={"OPEN"}/>

			<SearchModal searchLocation={"order"} searchType={"OPEN"}/>
		</Layout>
	);
};

export default CsCreate;
