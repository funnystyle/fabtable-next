// pages/order.js
import React, { useEffect } from "react";
import { Layout, Progress, Spin, } from "antd";

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
import useOrderListLoadingStore from "@store/useOrderListLoadingStore";


const OrderComponent = ({ isActive = true }) => {

  const { handleReload, isPending } = useGetRecords(useOrderListSearchRecordModalStore);

  // --------- 드로어 관련
  const { openDrawer } = useDrawerStore();
  // --------- 드로어 관련

  const { loading, setLoading, progress, setProgress } = useOrderListLoadingStore();
  useEffect(() => {
    setLoading(isPending);
    setProgress(0);
  }, [isPending]);

  return (
    <Layout>
      <Spin spinning={loading} style={{ textAlign: "center" }}>

        {loading && progress !== 0 && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(255, 255, 255, 0.6)", // 반투명 배경
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000, // 다른 컴포넌트 위에 떠있도록
            }}
          >
            <Progress type="circle" percent={progress} />
          </div>
        )}
        <div className="contents-flex">
          <ListTitle title="영업 관리" isActive={isActive} modalStore={useOrderListSearchRecordModalStore} />

          {/*  검색결과 */}
          <ListSearchTags modalStore={useOrderListSearchRecordModalStore} />

          {/* 상단 버튼 */}
          <OrderListButtonArea keysStore={useTableSelectKeysOrderListStore} modalStore={useOrderListSearchRecordModalStore} type={"order"} />

          {/* 태그 없음, 헤더 관련 정리 event */}
          <OrderListTable handleReload={handleReload} isPending={isPending} />
        </div>

        <SearchModal searchLocation={"order"} searchType={"LIST"} isActive={isActive} modalStore={useOrderListSearchRecordModalStore} inBoxType={"recordCreateOpenModal"} />

        {/* DrawerComponent 추가 - 상태와 닫기 핸들러 전달 */}
        <div style={{ display: openDrawer ? "block" : "none" }}>
          <DrawerComponent drawerStore={useDrawerStore} />
        </div>
      </Spin>
    </Layout>
  );
};

export default OrderComponent;
