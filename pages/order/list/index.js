// pages/order.js
import React, { useEffect, useState } from "react";
import { Layout, Space, } from "antd";

import DrawerComponent from "@publish/components/drawer";
import { useQuery } from "@tanstack/react-query";
import { getAxios } from "@api/apiClient";
import OrderListTitle from "@components/order/list/OrderListTitle";
import OrderCreateTab from "@components/order/create/OrderCreateTab";
import OrderListSearchTags from "@components/order/list/OrderListSearchTags";
import OrderListButtonArea from "@components/order/list/OrderListButtonArea";
import OrderListTable from "@components/order/list/OrderListTable";
import useDrawerStore from "@store/useDrawerStore";
import useModalStore from "@store/useModalStore";

const OrderComponent = ({ contentHeight }) => {

	// --------- 드로어 관련
	const { openDrawer } = useDrawerStore();
	// --------- 드로어 관련

	// --------- 상태 리스트 상수
	const { setSearchStatusList } = useModalStore();
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
				<OrderListTitle title="영업 관리" />

				{/* <OrderCreateTab activeKey={1} /> */}

				{/* <Space direction="vertical" size={12} style={{ width: "100%" }}> */}
					{/*  검색결과 */}
					<OrderListSearchTags />

					{/* 상단 버튼 */}
					<OrderListButtonArea statusList={statusList} />
				{/* </Space> */}

			{/* 태그 없음, 헤더 관련 정리 event */}
			<OrderListTable />
			</div>

			{/* DrawerComponent 추가 - 상태와 닫기 핸들러 전달 */}
			<div style={{ display: openDrawer ? "block" : "none" }}>
				<DrawerComponent />
			</div>
		</Layout>
	);
};

export default OrderComponent;
