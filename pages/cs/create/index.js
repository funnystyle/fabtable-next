// pages/samples/orderInfo/OrderCreateNewFinal.js
import React, { useEffect, useState } from "react";
import { Flex, Form, Layout, } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getAxios } from "@api/apiClient";
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
import { extractDateFieldNames } from "@components/inputForm/extractDateFieldNames";
import { loadFormValues } from "@components/inputForm/loadFormValues";
import useRecordSelectCodesStore from "@store/useRecordSelectCodesStore";

const CsCreate = ({ contentHeight }) => {

	const [inputBoxList, setInputBoxList] = useState([]);
	const [queryKey, setQueryKey] = useState(["input-box-list", Math.random()]);
	const { data:inputBoxResponse, isLoading, isSuccess, isError } = useQuery({
		queryKey,
		queryFn: () => getAxios("/user/input-box", {type:"csCreate"}),
	});

	useEffect(() => {
		if (isSuccess) {
			setInputBoxList(inputBoxResponse.data.list);
		}
	}, [isSuccess]);

	const [form] = Form.useForm();
	const codeRelationSet = new Set();

	const [asKeys, setAsKeys] = useState([0]);
	const [asCheckedKeySet, setAsCheckedKeySet] = useState(new Set());

	const { setAsKeys:setConstantAsKeys } = useCsCreateConstantStore();

	useEffect(() => {
		setConstantAsKeys(asKeys);
	}, [asKeys]);

	const { cs } = useCsDataStore();
	const { selectedCodes, setSelectedCodes } = useRecordSelectCodesStore();

	useEffect(() => {
		loadFormValues( cs, inputBoxResponse?.data, form, selectedCodes, setSelectedCodes)
	}, [cs]);

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
						{inputBoxList.map((item, index) => handleInputBoxRow(form, codeRelationSet, item, index))}

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
