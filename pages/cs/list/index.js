// pages/order.js
import React from "react";
import { Layout, } from "antd";

import DrawerComponent from "@publish/components/drawer";
import useDrawerStore from "@store/useDrawerStore";
import CsListTable from "@components/cs/list/CsListTable";
import CsListButtonArea from "@components/cs/list/CsListButtonArea";
import { useGetCsList } from "@components/api/useGetCsList";
import useCsListSearchCsModalStore from "@store/useCsListSearchCsModalStore";
import SearchModal from "@components/searchModal/SearchModal";
import useCsListHistoryCsModalStore from "@store/useCsListHistoryCsModalStore";
import ListSearchTags from "@components/list/ListSearchTags";
import ListTitle from "@components/list/ListTitle";

const CsListComponent = ({ isActive=true }) => {

	const { handleReload, isPending } = useGetCsList(useCsListSearchCsModalStore);

	// --------- 드로어 관련
	const { openDrawer } = useDrawerStore();
	// --------- 드로어 관련

	return (
		<Layout>
			<div className="contents-flex">
				<ListTitle title="C/S 관리" isActive={isActive} modalStore={useCsListSearchCsModalStore}/>

				{/*<CsCreateTab activeKey={1} />*/}

				{/*  검색결과 */}
				<ListSearchTags modalStore={useCsListSearchCsModalStore} />

				{/* 상단 버튼 */}
				<CsListButtonArea />

				{/* 태그 없음, 헤더 관련 정리 event */}
				<CsListTable handleReload={handleReload} isPending={isPending}/>

				<SearchModal searchLocation={"cs"} searchType={"LIST"} isActive={isActive} modalStore={useCsListSearchCsModalStore} />

				<SearchModal searchLocation={"cs"} searchType={"HISTORY"} isActive={isActive} modalStore={useCsListHistoryCsModalStore} inBoxType={"csListHistoryModal"} />

				{/* DrawerComponent 추가 - 상태와 닫기 핸들러 전달 */}
				<div style={{ display: openDrawer ? "block" : "none" }}>
					<DrawerComponent />
				</div>
			</div>
		</Layout>
	);
};

export default CsListComponent;
