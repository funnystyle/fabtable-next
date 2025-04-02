// pages/order.js
import React, { useEffect, useState } from "react";
import { Layout, } from "antd";

import DrawerComponent from "@publish/components/drawer";
import { useQuery } from "@tanstack/react-query";
import { getAxios } from "@api/apiClient";
import OrderListTitle from "@components/order/list/OrderListTitle";
import OrderListSearchTags from "@components/order/list/OrderListSearchTags";
import OrderListButtonArea from "@components/order/list/OrderListButtonArea";
import OrderListTable from "@components/order/list/OrderListTable";
import useDrawerStore from "@store/useDrawerStore";
import useRecordModalStore from "@store/useRecordModalStore";
import SearchModal from "@components/searchModal/SearchModal";
import { useGetRecords } from "@components/api/useGetRecords";


const OrderComponent = ({ isActive=true }) => {

	const { handleReload, isPending } = useGetRecords();

	// --------- 드로어 관련
	const { openDrawer } = useDrawerStore();
	// --------- 드로어 관련

	// --------- 상태 리스트 상수
	const { setSearchStatusList } = useRecordModalStore();
	const [statusList, setStatusList] = useState([]);
	const [queryKey, setQueryKey] = useState(["status-list", Math.random()]);
	const { data:statusListResponse, isSuccess:isSuccess } = useQuery({
		queryKey,
		queryFn: () => getAxios("/user/code", {groupName: "현재상태"}),
	});

	useEffect(() => {
		if (isSuccess) {
			const stList = statusListResponse.data.list.map((item) => item.codeName);
			setStatusList(stList);
			setSearchStatusList(stList);
		}
	}, [isSuccess]);

	return (
		<Layout>
			<div className="contents-flex">
				<OrderListTitle title="영업 관리" isActive={isActive} />

				{/* <OrderCreateTab activeKey={1} /> */}

				{/* <Space direction="vertical" size={12} style={{ width: "100%" }}> */}
					{/*  검색결과 */}
					<OrderListSearchTags />

					{/* 상단 버튼 */}
					<OrderListButtonArea statusList={statusList} handleReload={handleReload} />
				{/* </Space> */}

			{/* 태그 없음, 헤더 관련 정리 event */}
			<OrderListTable handleReload={handleReload} isPending={isPending} />
			</div>

			<SearchModal searchLocation={"order"} searchType={"LIST"} isActive={isActive} />

			{/* DrawerComponent 추가 - 상태와 닫기 핸들러 전달 */}
			<div style={{ display: openDrawer ? "block" : "none" }}>
				<DrawerComponent />
			</div>
		</Layout>
	);
};

export default OrderComponent;
