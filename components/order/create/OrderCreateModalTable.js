// pages/order.js
import React, {useEffect, useState} from "react";
import {Dropdown, Tag,} from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAxios, postAxios } from "@api/apiClient";
import TableOnRowSelect2 from "@components/TableOnRowSelect2";
import {orderListRightItem} from "@components/order/list/data/orderListRightItem";
import OrderListHeaderData from "@components/order/list/OrderListHeaderData";
import useOrderListQueryStore from "@store/useOrderListQueryStore";
import useModalStore from "@store/useModalStore";

const OrderCreateModalTable = ({ contentHeight }) => {

	const [sortedInfo, setSortedInfo] = useState({});

	const [headerList, setHeaderList] = useState([]);

	function transformTagData(data) {
		// data == {} 일때 에러 발생
		if (data === undefined || data === null || data.list === undefined || data.list === null) {
			return [];
		}



		const tagInfoMap = new Map();

		// tagInfoList에서 모든 태그 코드 매핑 생성
		data.tagInfoList.forEach(tagInfo => {
			tagInfo.codeList.forEach(code => {
				tagInfoMap.set(`${tagInfo.name}_${code.codeName}`, code.className);
			});
		});

		// list 데이터를 변환 (기존 데이터 유지하면서 태그 변환)
		return data.list.map((item) => {
			const updatedItem = { ...item };

			Object.keys(item).forEach(key => {
				const tagKey = `${key}_${item[key]}`;
				if (tagInfoMap.has(tagKey)) {
					updatedItem[key] = <Tag className={tagInfoMap.get(tagKey)}>{item[key]}</Tag>;
				}
			});

			return updatedItem;
		});
	}

	const {
		page
		, size
		, searchKeyword
		, searchStatusList
		, searchData
		, data
		, setData
		, setList
		, setSize } = useModalStore();

	const { mutate: getRecords } = useMutation({
		mutationKey: "getRecords",
		mutationFn: (values) => postAxios("/user/record/search", values),
		onSuccess: (response) => {
			setData(response.data);
			setList(response.data.list);
		}
	});

	useEffect(() => {
		console.log("searchStatusList", searchStatusList);
		getRecords({ page, size, searchKeyword, searchStatusList, searchData });
	}, [page, size, searchKeyword, searchStatusList, searchData]);

	return (
		<>
			{/* 태그 없음, 헤더 관련 정리 event */}
			<OrderListHeaderData setHeaderList={setHeaderList} sortedInfo={sortedInfo} />
			<div style={{ marginTop: contentHeight }} className="contents-scroll">
				{/* 테이블 */}
				<TableOnRowSelect2 header={headerList} serverData={transformTagData(data)} size={size} setSize={setSize} />
			</div>
		</>
	);
};

export default OrderCreateModalTable;
