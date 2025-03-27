// pages/order.js
import React, { useEffect, useState } from "react";
import { Layout, } from "antd";

import DrawerComponent from "@publish/components/drawer";
import { useQuery } from "@tanstack/react-query";
import { getAxios } from "@api/apiClient";
import useDrawerStore from "@store/useDrawerStore";
import CsListTitle from "@components/cs/list/CsListTitle";
import CsCreateTab from "@components/cs/create/CsCreateTab";
import CsListTable from "@components/cs/list/CsListTable";
import useCsSearchModalStore from "@store/useCsSearchModalStore";
import CsListSearchTags from "@components/cs/create/CsListSearchTags";

const OrderComponent = ({ contentHeight }) => {

	// --------- 드로어 관련
	const { openDrawer } = useDrawerStore();
	// --------- 드로어 관련

	// --------- 상태 리스트 상수
	const { setSearchStatusList } = useCsSearchModalStore();
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
			<div className="contents-top">
				<CsListTitle title="C/S 관리" />

				<CsCreateTab activeKey={1} />

				{/*  검색결과 */}
				<CsListSearchTags />

				{/* 상단 버튼 */}
				{/*<OrderListButtonArea statusList={statusList} />*/}

				{/* 태그 없음, 헤더 관련 정리 event */}
				<CsListTable contentHeight={contentHeight} />

				{/* DrawerComponent 추가 - 상태와 닫기 핸들러 전달 */}
				<div style={{ display: openDrawer ? "block" : "none" }}>
					<DrawerComponent />
				</div>
			</div>
		</Layout>
	);
};

export default OrderComponent;
