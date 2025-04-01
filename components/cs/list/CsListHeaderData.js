// pages/order/create/index.js
import React, { useEffect, useState } from "react";
import { AutoComplete, Button, Flex, Form, Input, Layout, Typography, } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getAxios } from "@api/apiClient";
import InputBoxRow from "@components/inputForm/InputBoxRow";
import OrderCreateHeaderNew from "@components/order/create/OrderCreateHeaderNew";
import OrderCreateAnchor from "@components/order/create/OrderCreateAnchor";
import OrderCreateTab from "@components/order/create/OrderCreateTab";
import { CloseOutlined, FilterOutlined } from "@ant-design/icons";
import {getCsColumns} from "@components/cs/list/data/getCsColumns";

const CsListHeaderData = ({ setHeaderList, headerDiv }) => {

	const [sortedInfo, setSortedInfo] = useState({});

	const stringSorter = (a, b, key) => {
		const textA = a[key]?.toString() || "";
		const textB = b[key]?.toString() || "";
		return textA.localeCompare(textB, "ko-KR");
	};

	// 날짜 정렬
	const dateSorter = (a, b, key) => {
		const getTime = (date) => {
			const parsed = Date.parse(date);
			return isNaN(parsed) ? Infinity : parsed;
		};
		return getTime(a[key]) - getTime(b[key]);
	};

	function transformColumns(jsonResult, sortedInfo) {
		return jsonResult.map(item => {
			const { recordColumn, displayName, width, fixedDiv, alignDiv } = item;
			const dataIndex = recordColumn == null ? "id" : recordColumn.name;

			let sorterFunction = null;
			if (recordColumn == null || recordColumn.dataType === "Integer" || recordColumn.dataType === "Double" || recordColumn.dataType === "Long" || recordColumn.dataType === "Float") {
				sorterFunction = (a, b) => a[dataIndex] - b[dataIndex];
			} else if (recordColumn.dataType === "String") {
				sorterFunction = (a, b) => stringSorter(a, b, dataIndex);
			} else if (recordColumn.dataType === "Date" || recordColumn.dataType === "Datetime") {
				sorterFunction = (a, b) => dateSorter(a, b, dataIndex);
			}

			return {
				title: displayName,
				showSorterTooltip: { title: displayName },
				dataIndex: dataIndex,
				key: dataIndex,
				sorter: sorterFunction,
				sortOrder: sortedInfo.columnKey === dataIndex ? sortedInfo.order : null,
				ellipsis: true,
				width: width || 100,
				align: alignDiv === "LEFT" ? "left" : alignDiv === "RIGHT" ? "right" : "center",
				fixed: fixedDiv === "LEFT" ? "left" : fixedDiv === "RIGHT" ? "right" : false,
			};
		});
	}

	const [queryKey, setQueryKey] = useState(["columns", Math.random()]);
	const { data:headerResponse, isSuccess:isSuccess } = useQuery({
		queryKey,
		queryFn: () => getAxios("/user/header", {headerDiv}),
	});
	useEffect(() => {
		if (isSuccess) {
			// setHeaderList(transformColumns(headerResponse.data.list, sortedInfo));
			setHeaderList(getCsColumns(sortedInfo, dateSorter));
		}
	}, [isSuccess]);

	return (
		<></>
	);
};

export default CsListHeaderData;
