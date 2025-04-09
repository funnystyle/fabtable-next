// pages/order.js
import React from "react";
import { Layout, } from "antd";

import DrawerComponent from "@publish/components/drawer";
import ListTitle from "@components/list/ListTitle";
import ListSearchTags from "@components/list/ListSearchTags";
import OrderListButtonArea from "@components/order/list/OrderListButtonArea";
import OrderListTable from "@components/order/list/OrderListTable";
import useDrawerStore from "@store/useDrawerStore";
import { useGetRecords } from "@components/api/useGetRecords";
import useOrderListSearchRecordModalStore from "@store/useOrderListSearchRecordModalStore";
import SearchModal from "@components/searchModal/SearchModal";
import useTableSelectKeysOrderListStore from "@store/useTableSelectKeysOrderListStore";
import { useWebsocket } from "@components/ws/useWebsocket";


const OrderComponent = ({ isActive=true }) => {

	const { handleReload, isPending } = useGetRecords(useOrderListSearchRecordModalStore);

	// --------- 드로어 관련
	const { openDrawer } = useDrawerStore();
	// --------- 드로어 관련

	return (
		<Layout>
			<div className="contents-flex">
				<ListTitle title="영업 관리" isActive={isActive} modalStore={useOrderListSearchRecordModalStore}/>

				{/*  검색결과 */}
				<ListSearchTags modalStore={useOrderListSearchRecordModalStore} />

				{/* 상단 버튼 */}
				<OrderListButtonArea keysStore={useTableSelectKeysOrderListStore} modalStore={useOrderListSearchRecordModalStore} type={"order"}/>

				{/* 태그 없음, 헤더 관련 정리 event */}
				<OrderListTable handleReload={handleReload} isPending={isPending} />
			</div>

			<SearchModal searchLocation={"order"} searchType={"LIST"} isActive={isActive} modalStore={useOrderListSearchRecordModalStore} inBoxType={"recordCreateOpenModal"} />

			{/* DrawerComponent 추가 - 상태와 닫기 핸들러 전달 */}
			<div style={{ display: openDrawer ? "block" : "none" }}>
				<DrawerComponent />
			</div>
		</Layout>
	);
};

export default OrderComponent;
