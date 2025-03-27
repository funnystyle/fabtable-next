// pages/order.js
import React, { useEffect, useState } from "react";
import { Button, Dropdown, Flex, Layout, Space, } from "antd";

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
import { DownOutlined, RedoOutlined } from "@ant-design/icons";

const operationItems = [
	{
		label: "접수내용",
		key: "1",
	},
	{
		label: "진행내역",
		key: "2",
	},
	{
		label: "출장내역",
		key: "3",
	},
	{
		label: "후속조치",
		key: "4",
	},
];

const stateItems = [
	{
		label: "접수",
		key: "1",
	},
	{
		label: "진행",
		key: "2",
	},
	{
		label: "종결",
		key: "3",
	},
	{
		label: "취소",
		key: "4",
	},
];

const handleMenuClick = (e) => {
	// message.info("Click on menu item.");
	console.log("click", e);
};

const excelItems = [
	{
		label: "편집 항목만",
		key: "1",
		children: [
			{
				key: "1-1",
				label: "선택한 행",
			},
			{
				key: "1-2",
				label: "전체 행",
			},
		],
	},
	{
		label: "전체 항목",
		key: "2",
		children: [
			{
				key: "2-1",
				label: "선택한 행",
			},
			{
				key: "2-2",
				label: "전체 행",
			},
		],
	},
];

const printItems = [
	{
		label: "프린트",
		key: "1",
	},
	{
		label: "양식 다운로드",
		key: "2",
	},
];

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
					{/* <OrderListButtonArea statusList={statusList} /> */}
					<Flex gap="small" align="center" className="btn-big" style={{
								position: "sticky",
								top: "0",
								zIndex: "10",
								paddingBottom: "12px",
								paddingTop: "8px",
								backgroundColor: "#FFF",
							}}>
							<Button
								variant="outlined"
								icon={<RedoOutlined />}
								className="icon-redo"
							>
								전체 목록
							</Button>

							<Flex gap="small" className="btn-spacing-area">
								<Button variant="outlined">수주 종합정보</Button>

								<Button variant="outlined">C/S 이력</Button>

								<Dropdown
									menu={{ items: stateItems, onClick: handleMenuClick }}
								>
									<Button>
										<Space>
											상태별 보기
											<DownOutlined />
										</Space>
									</Button>
								</Dropdown>

								<Dropdown
									menu={{ items: operationItems, onClick: handleMenuClick }}
								>
									<Button>
										<Space>
											구분별 보기
											<DownOutlined />
										</Space>
									</Button>
								</Dropdown>
							</Flex>

							<Flex gap="small" className="btn-spacing-area">
								<Button>C/S 복제하기</Button>

								<Button>항목편집</Button>

								<Dropdown
									menu={{ items: excelItems, onClick: handleMenuClick }}
									className="excel-menu"
								>
									<Button>
										<Space>
											엑셀 다운로드
											<DownOutlined />
										</Space>
									</Button>
								</Dropdown>

								<Dropdown menu={{ items: printItems }}>
									<Button>
										<Space>
											출력하기
											<DownOutlined />
										</Space>
									</Button>
								</Dropdown>
							</Flex>
						</Flex>
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
