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
import dayjs from "dayjs";
import useRecordSelectCodesStore from "@store/useRecordSelectCodesStore";
import { handleSelectChange } from "@components/inputForm/handleSelectChange";
import { handleCodeListFilter } from "@components/inputForm/handleCodeListFilter";
import OrderCreateHeaderUpdate from "@components/order/create/OrderCreateHeaderUpdate";

const OrderInfoCreate = ({ contentHeight }) => {

	// 입력 박스 리스트 호출
	const [inputBoxList, setInputBoxList] = useState([]);
	const [queryKey, setQueryKey] = useState(["input-box-list", Math.random()]);
	const { data:inputBoxResponse, isLoading, isSuccess, isError } = useQuery({
		queryKey,
		queryFn: () => getAxios("/user/input-box", {type:"recordCreate"}),
	});


// 함수: "Date" 타입 컬럼의 name만 추출
	function extractDateFieldNames(data, type) {
		const result = [];

		data?.list?.forEach(outerList => {
			outerList.forEach(middleList => {
				middleList.forEach(inputBox => {
					inputBox?.components?.forEach(componentRow => {
						componentRow.forEach(component => {
							const column = component?.recordColumn;
							if (column?.dataType === type) {
								result.push(column.name);
							}
						});
					});
				});
			});
		});

		return result;
	}

	useEffect(() => {
		if (isSuccess) {
			setInputBoxList(inputBoxResponse.data.list);
		}
	}, [isSuccess]);



	// 저장값
	const [form] = Form.useForm();
	const codeRelationSet = new Set();

	const { record } = useRecordDataStore();

	const convertToDayjs = (obj, dateFields) => {
		const newObj = { ...obj };
		dateFields.forEach(field => {
			if (obj[field]) {
				newObj[field] = dayjs(obj[field]);
			}
		});
		return newObj;
	};

	// useEffect(() => {
	// 	if (record) {
	// 		const dateFields = extractDateFieldNames(inputBoxResponse?.data, "Date");
	// 		const processedRecord = convertToDayjs(record, dateFields);
	// 		form.setFieldsValue(processedRecord);
	// 	}
	// }, [record]);


	// 함수: "Date" 타입 컬럼의 name만 추출
	function extractCodeFieldRecordColumns(data) {
		const result = [];

		data?.list?.forEach(outerList => {
			outerList.forEach(middleList => {
				middleList.forEach(inputBox => {
					inputBox?.components?.forEach(componentRow => {
						componentRow.forEach(component => {
							const column = component?.recordColumn;
							if (column?.connectionDiv === "CODE") {
								result.push(column);
							}
						});
					});
				});
			});
		});

		return result;
	}

	//setCodeList(handleCodeListFilter(selectedCodes, recordColumn));
	const { selectedCodes, setSelectedCodes } = useRecordSelectCodesStore();

	useEffect(() => {
		console.log(record?.id);

		if (!record) return;

		const dateFields = extractDateFieldNames(inputBoxResponse?.data, "Date");
		const processedRecord = convertToDayjs(record, dateFields);
		form.setFieldsValue(processedRecord);

		const newSelectedCodes = [];
		const recordColumns = extractCodeFieldRecordColumns(inputBoxResponse?.data);
		recordColumns.forEach((recordColumn, i) => {
			const codeList = handleCodeListFilter(selectedCodes, recordColumn);
			if (codeList.length > 0) {
				const selectedOption = (() => {
					const code = codeList.find(code => code.codeName === record[recordColumn.name]);
					return code ? {
						value: code.codeName,
						codeGroupId: recordColumn.codeGroupId,
						commonCodeId: code.id,
						childRelations: code.childRelations
					} : null;
				})();
				if (selectedOption) {
					newSelectedCodes.push(selectedOption);
				}
			}
		});

		console.log("newSelectedCodes: ", newSelectedCodes);
		setSelectedCodes(newSelectedCodes);
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
