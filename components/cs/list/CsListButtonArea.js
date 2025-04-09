// pages/order/create/index.js
import React, { useEffect } from "react";
import { Button, Flex, } from "antd";
import OrderListButtonAllList from "@components/order/list/button/OrderListButtonAllList";
import OrderListButtonStatusSelect from "@components/order/list/button/OrderListButtonStatusSelect";
import useCsDataStore from "@store/useCsDataStore";
import OrderListButtonStatusChange from "@components/order/list/button/OrderListButtonStatusChange";
import { useSetCsState } from "@components/api/useSetCsState";
import CsCopyButton from "@components/cs/list/button/CsCopyButton";
import { useGetCodeList } from "@components/api/useGetCodeList";
import useCsListSearchCsModalStore from "@store/useCsListSearchCsModalStore";
import useCsListHistoryCsModalStore from "@store/useCsListHistoryCsModalStore";
import CsHistoryButton from "@components/cs/list/button/CsHistoryButton";
import useTableSelectKeysCsListStore from "@store/useTableSelectKeysCsListStore";
import OrderListButtonTotalInfo from "@components/order/list/button/OrderListButtonTotalInfo";
import CsHeaderDivButton from "@components/cs/list/button/CsHeaderDivButton";

const CsListButtonArea = () => {

  const { setDeleteTagKeyName, searchStatusList, setSearchStatusList, setSearchKeyword, tags, setTags } = useCsListSearchCsModalStore();
  const { datas, selectedRowKeys } = useTableSelectKeysCsListStore();

  const { handleReload: nowStatusUpdate } = useSetCsState();

  const { codeNameList, isSuccess } = useGetCodeList("CS상태");

  useEffect(() => {
    if (isSuccess) {
      setSearchStatusList(codeNameList);
    }
  }, [isSuccess]);

  return (
    <Flex gap="small" align="center" className="btn-big" style={{
      position: "sticky",
      top: "0",
      zIndex: "10",
      paddingBottom: "12px",
      paddingTop: "8px",
      backgroundColor: "#FFF",
    }}>
      <OrderListButtonAllList
        setDeleteTagKeyName={setDeleteTagKeyName}
        setSearchStatusList={setSearchStatusList}
        setSearchKeyword={setSearchKeyword}
        statusList={codeNameList}
        tags={tags}
        setTags={setTags}
      />

      <Flex gap="small" className="btn-spacing-area">
        <OrderListButtonTotalInfo datas={datas.map((item) => {
          return { id: item.recordId, serialNumber: item.serialNumber }
        })} />

        <CsHistoryButton openLength={selectedRowKeys.length} modalStore={useCsListHistoryCsModalStore} />

        <OrderListButtonStatusSelect statusList={codeNameList.slice(1)} searchStatusList={searchStatusList} setSearchStatusList={setSearchStatusList} />

        <OrderListButtonStatusChange statusList={codeNameList.slice(1)} nowStatusUpdate={nowStatusUpdate} keysStore={useTableSelectKeysCsListStore} />

        <CsHeaderDivButton />
      </Flex>

      <Flex gap="small" className="btn-spacing-area">
        <CsCopyButton />

        <Button>항목편집</Button>
      </Flex>
    </Flex>
    // </div>
  );
};

export default CsListButtonArea;
