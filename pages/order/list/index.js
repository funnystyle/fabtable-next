// pages/order.js
import React, {useEffect, useState} from "react";
import {Layout, Space,} from "antd";

import DrawerComponent from "@publish/components/drawer";
import {useQuery} from "@tanstack/react-query";
import {getAxios} from "@api/apiClient";
import OrderListTitle from "@components/order/list/OrderListTitle";
import OrderCreateTab from "@components/order/create/OrderCreateTab";
import OrderListSearchTags from "@components/order/list/OrderListSearchTags";
import OrderListButtonArea from "@components/order/list/OrderListButtonArea";
import OrderListTable from "@components/order/list/OrderListTable";
import useOrderListQueryStore from "@store/useOrderListQueryStore";

const OrderComponent = ({ contentHeight }) => {

	// --------- 드로어 관련
	const [openDrawer, setOpenDrawer] = useState(false); // Drawer 열림 상태
	const [drawerHeader, setDrawerHeader] = useState(null); // Drawer 헤더
	const [drawerContent, setDrawerContent] = useState(null); // Drawer 본문 내용
	const [drawerFooter, setDrawerFooter] = useState(null); // Drawer 푸터 버튼
	const [drawerTitle, setDrawerTitle] = useState(""); // Drawer 제목 상태

	const closeDrawer = () => {
		setOpenDrawer(false);
	};
	// --------- 드로어 관련

	const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 선택된 행

	// --------- 상태 리스트 상수
	const {setSearchStatusList} = useOrderListQueryStore();
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
				<OrderListTitle title="영업 관리" />

				<OrderCreateTab activeKey={1} />

				<Space direction="vertical" size={12} style={{ width: "100%" }}>
					{/*  검색결과 */}
					<OrderListSearchTags />

					{/* 상단 버튼 */}
					<OrderListButtonArea selectedRowKeys={selectedRowKeys} statusList={statusList}
															 setOpenDrawer={setOpenDrawer} setDrawerHeader={setDrawerHeader}
															 setDrawerContent={setDrawerContent} setDrawerFooter={setDrawerFooter} setDrawerTitle={setDrawerTitle} />
				</Space>
			</div>

			{/* 태그 없음, 헤더 관련 정리 event */}
			<OrderListTable contentHeight={contentHeight} selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys} />

			{/* DrawerComponent 추가 - 상태와 닫기 핸들러 전달 */}
			<div style={{ display: openDrawer ? "block" : "none" }}>
				<DrawerComponent
					open={openDrawer}
					onClose={closeDrawer}
					title={drawerTitle}
					headerContent={drawerHeader} // 동적으로 헤더 변경
					content={drawerContent} // 동적으로 본문 변경
					footer={drawerFooter} // 동적으로 푸터 버튼 변경
					selectedRowKeys={selectedRowKeys}
				/>
			</div>
		</Layout>
	);
};

export default OrderComponent;
