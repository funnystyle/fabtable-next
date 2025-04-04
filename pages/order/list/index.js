// pages/order.js
import React, { useEffect } from "react";
import { Layout, } from "antd";

import DrawerComponent from "@publish/components/drawer";
import OrderListTitle from "@components/order/list/OrderListTitle";
import OrderListSearchTags from "@components/order/list/OrderListSearchTags";
import OrderListButtonArea from "@components/order/list/OrderListButtonArea";
import OrderListTable from "@components/order/list/OrderListTable";
import useDrawerStore from "@store/useDrawerStore";
import { useGetRecords } from "@components/api/useGetRecords";
import { useGetCodeList } from "@components/api/useGetCodeList";
import useOrderListSearchRecordModalStore from "@store/useOrderListSearchRecordModalStore";
import SearchModal from "@components/searchModal/SearchModal";
import { stompClient } from "@lib/socket";



const OrderComponent = ({ isActive=true }) => {

	const { handleReload, isPending } = useGetRecords(useOrderListSearchRecordModalStore);

	// --------- 드로어 관련
	const { openDrawer } = useDrawerStore();
	// --------- 드로어 관련

	// --------- 상태 리스트 상수
	const { setSearchStatusList } = useOrderListSearchRecordModalStore();
	const { codeNameList, isSuccess } = useGetCodeList("현재상태");

	useEffect(() => {
		if (isSuccess) {
			setSearchStatusList(codeNameList);
		}
	}, [isSuccess]);

	useEffect(() => {
    stompClient.onConnect = () => {
      console.log("🔌 STOMP 연결됨");

      // ✅ 구독
      stompClient.subscribe("/topic/orderInfoCreate", (message) => {
        const newOrder = JSON.parse(message.body);
        console.log("📬 새 주문:", newOrder);
				alert("새 주문이 도착했습니다.");

        // 🔁 목록 다시 불러오기
        // queryClient.invalidateQueries(["orderList"]);
      });
    };

    stompClient.activate(); // 연결 시작

    return () => {
      stompClient.deactivate(); // 컴포넌트 종료 시 연결 해제
    };
  }, []);

	return (
		<Layout>
			<div className="contents-flex">
				<OrderListTitle title="영업 관리" isActive={isActive} />

				{/*  검색결과 */}
				<OrderListSearchTags />

				{/* 상단 버튼 */}
				<OrderListButtonArea statusList={codeNameList} handleReload={handleReload} />

				{/* 태그 없음, 헤더 관련 정리 event */}
				<OrderListTable handleReload={handleReload} isPending={isPending} />
			</div>

			<SearchModal searchLocation={"order"} searchType={"LIST"} isActive={isActive} modalStore={useOrderListSearchRecordModalStore} />

			{/* DrawerComponent 추가 - 상태와 닫기 핸들러 전달 */}
			<div style={{ display: openDrawer ? "block" : "none" }}>
				<DrawerComponent />
			</div>
		</Layout>
	);
};

export default OrderComponent;
