// pages/order.js
import React, { useEffect } from "react";
import { Layout, } from "antd";

import DrawerComponent from "@publish/components/drawer";
import ListTitle from "@components/list/ListTitle";
import ListSearchTags from "@components/list/ListSearchTags";
import OrderListButtonArea from "@components/order/list/OrderListButtonArea";
import useDrawerStore from "@store/useDrawerStore";
import { useGetRecords } from "@components/api/useGetRecords";
import { useGetCodeList } from "@components/api/useGetCodeList";
import useProduceListSearchRecordModalStore from "@store/useProduceListSearchRecordModalStore";
import SearchModal from "@components/searchModal/SearchModal";
import ProduceListTable from "@components/produce/list/ProduceListTable";
import useTableSelectKeysProduceListStore from "@store/useTableSelectKeysProduceListStore";


const ProduceComponent = ({ isActive=true }) => {

	const { handleReload, isPending } = useGetRecords(useProduceListSearchRecordModalStore);

	// --------- 드로어 관련
	const { openDrawer } = useDrawerStore();
	// --------- 드로어 관련

	// --------- 상태 리스트 상수
	const { setSearchStatusList } = useProduceListSearchRecordModalStore();
	const { codeNameList, isSuccess } = useGetCodeList("현재상태");

	useEffect(() => {
		if (isSuccess) {
			setSearchStatusList(codeNameList);
		}
	}, [isSuccess]);

	return (
		<Layout>
			<div className="contents-flex">
				<ListTitle title="생산 관리" isActive={isActive} modalStore={useProduceListSearchRecordModalStore}/>

				{/*  검색결과 */}
				<ListSearchTags modalStore={useProduceListSearchRecordModalStore} />

				{/* 상단 버튼 */}
				<OrderListButtonArea keysStore={useTableSelectKeysProduceListStore} modalStore={useProduceListSearchRecordModalStore} type={"produce"}/>

				{/* 태그 없음, 헤더 관련 정리 event */}
				<ProduceListTable handleReload={handleReload} isPending={isPending} />
			</div>

			<SearchModal searchLocation={"produce"} searchType={"LIST"} isActive={isActive} modalStore={useProduceListSearchRecordModalStore} />

			{/* DrawerComponent 추가 - 상태와 닫기 핸들러 전달 */}
			<div style={{ display: openDrawer ? "block" : "none" }}>
				<DrawerComponent drawerStore={useDrawerStore} />
			</div>
		</Layout>
	);
};

export default ProduceComponent;
