// pages/order.js
import React, { useEffect, useState } from "react";
import { Dropdown, message, } from "antd";
import TableOnRowSelect2 from "@components/TableOnRowSelect2";
import { orderListRightItem } from "@components/order/list/data/orderListRightItem";
import OrderListHeaderData from "@components/order/list/OrderListHeaderData";
import { transformTagData } from "@components/order/table/transformTagData";
import PagingArea from "@components/list/PagingArea";
import useMenuTabStore from "@store/useMenuTabStore";
import useRecordDataStore from "@store/useRecordDataStore";
import { useRouter } from "next/router";
import { useGetCodeList } from "@components/api/useGetCodeList";
import ListPopover from "@components/list/Popover";
import useOrderListSearchRecordModalStore from "@store/useOrderListSearchRecordModalStore";
import useTableSelectKeysOrderListStore from "@store/useTableSelectKeysOrderListStore";
import { useWebsocket } from "@components/ws/useWebsocket";
import { handleRecordInfoMemoPopup, handleRecordInfoPopup } from "@components/popup/handleOpenPopup";
import useRecordListCopyModalStore from "@store/useRecordListCopyModalStore";
import useRecordListEditModalStore from "@store/useRecordListEditModalStore";
import { useSetNowState } from "@components/api/useSetNowState";
import { useGetDocxUrl } from "@components/api/useGetDocxUrl";
import { showDrawer } from "@components/drawer/showDrawer";
import useDrawerStore from "@store/useDrawerStore";
import { useDownloadOrderListExcel } from "@components/api/useDownloadOrderListExcel";
import { useDeleteRecord } from "@components/api/useDeleteRecord";
import MemoPopover from "@components/list/MemoPopover";
import useOrderListLoadingStore from "@store/useOrderListLoadingStore";

const OrderListTable = ({ handleReload, isPending }) => {

  const [headerList, setHeaderList] = useState([]);

  const { data, searchKeyword, searchStatusList, searchData } = useOrderListSearchRecordModalStore();
  const { setOpenCopyModal } = useRecordListCopyModalStore();
  const { setOpenEditModal } = useRecordListEditModalStore();

  const { tooltipList: soList } = useGetCodeList("특주사양");
  const { tooltipList: cuList } = useGetCodeList("고객사");
  const { tooltipList: buList } = useGetCodeList("납품처");
  const { tooltipList: stList } = useGetCodeList("현재상태");
  const { handleReload: nowStatusUpdate } = useSetNowState();

  const {datas} = useTableSelectKeysOrderListStore();
  const { certificateId } = useDrawerStore();

  const { handleReload:docxReload } = useGetDocxUrl(certificateId);
  const { handleDownload } = useDownloadOrderListExcel();

  const {multipleDeleteRecord} = useDeleteRecord(null, true);
  const handleContextMenuClick = (e) => {
    console.log("e.key", e.key);
    if (parseInt(e.key) === 1) {
      handleRecordInfoPopup(window, datas);
    } else if (parseInt(e.key) === 2) {
      setOpenCopyModal(true);
    } else if (parseInt(e.key) === 3) {
      setOpenEditModal(true);
    } else if (e.key === "4-1" || e.key === "4-2" || e.key === "4-3" || e.key === "4-4") {
      const statusList = stList.slice(10, 14)
      const status = statusList[parseInt(e.key.split("-")[1]) - 1];
      if (status) {
        nowStatusUpdate(datas.map((data) => data.id), status.codeName);
      }
    } else if (parseInt(e.key) === 5) {
      handleRecordInfoMemoPopup(window, datas);
    } else if (e.key === "6-1") {
      showDrawer("label", handleReload, useTableSelectKeysOrderListStore, useDrawerStore)
    } else if (e.key === "6-2") {
      showDrawer("report", handleReload, useTableSelectKeysOrderListStore, useDrawerStore)
      // 7로 시작할 경우
    } else if (e.key.startsWith("7")) {
      const keyIndex = e.key.substring(2); // 7- 를 제거한 키값
      const ids = datas.map((data) => data.id);
      const headerDiv = "SALES";
      if (keyIndex === "1-1") {
        handleDownload(false, false, headerDiv, ids, searchKeyword, searchData, searchStatusList);
      } else if (keyIndex === "1-2") {
        handleDownload(false, true, headerDiv, ids, searchKeyword, searchData, searchStatusList);
      } else if (keyIndex === "2-1") {
        handleDownload(true, false, headerDiv, ids, searchKeyword, searchData, searchStatusList);
      } else if (keyIndex === "2-2") {
        handleDownload(true, true, headerDiv, ids, searchKeyword, searchData, searchStatusList);
      }
    } else if (parseInt(e.key) === 8) {
      multipleDeleteRecord(datas.map((data) => data.id));
    }
  };

  const { moveUrl } = useMenuTabStore();
  const { setRecord, setTagInfoList, setIsCopy } = useRecordDataStore();
  const router = useRouter();

  const handleDoubleClick = (record) => {
    record.salesTeamMemo = record?.salesTeamMemo?.props?.value;
    setRecord(record);
    setIsCopy(false);
    moveUrl("/order/create");
    router.push("/order/create");
  }

  const handleSettingKeyToData = (data) => {
    return data.map((item, index) => {
      item.key = item.id;
      return item;
    });
  }

  const handleSettingTooltip = (value, tooltipList) => {
    // tooltipList 는 codeName, tooltip으로 이루어진 오브젝트 배열
    // value와 동일한 codeName을 가진 tooltipList의 index를 찾고 해당 tooltipList의 tooltip을 반환
    const tooltip = tooltipList.find(item => item.codeName === value);

    if (!tooltip) return value;

    if (!tooltip) {
      return value;
    }

    return <ListPopover codeName={tooltip.codeName} tooltip={tooltip.tooltip} />;
  }


  const handleSettingTooltipData = (data) => {
    return data.map((item => {
      item.specialOrderNumber = item.specialOrderNumber ? handleSettingTooltip(item.specialOrderNumber, soList) : "";
      item.customer = item.customer ? handleSettingTooltip(item.customer, cuList) : "";
      item.buyer = item.buyer ? handleSettingTooltip(item.buyer, buList) : "";

      return item;
    }));
  }

  const handleSettingMemo = (name, value) => {

    if (!value) return value;

    return <MemoPopover name={name} value={value} />;
  }

  const handleSettingMemoData = (data) => {
    return data.map((item => {
      item.salesTeamMemo = item.salesTeamMemo ? handleSettingMemo("영업팀 메모", item.salesTeamMemo) : "";
      item.produceTeamMemo = item.produceTeamMemo ? handleSettingMemo("제조팀 메모", item.produceTeamMemo) : "";
      item.qcTeamMemo = item.qcTeamMemo ? handleSettingMemo("품질팀 메모", item.qcTeamMemo) : "";

      return item;
    }));
  }

  const handlePreprocessData = (data) => {
    const transform = (transformTagData(data) || []);

    const settingKey = handleSettingKeyToData(transform);

    const settingTooltip = handleSettingTooltipData(settingKey);

    const settingMemo = handleSettingMemoData(settingTooltip);

    return settingMemo;
  }

  useEffect(() => {
    setTagInfoList(data?.tagInfoList || []);
  }, [data]);

  const { setProgress } = useOrderListLoadingStore();
  useWebsocket("/topic/orderList", (msg) => {
    const orderResultInfo = JSON.parse(msg.body);
    console.log("📬 주문 수정 정보:", orderResultInfo);
    if (orderResultInfo.total && orderResultInfo.current) {
      const percent = Math.floor((orderResultInfo.current / orderResultInfo.total) * 100);
      setProgress(percent);
    }

    if (orderResultInfo.reload) {
      handleReload(true);
    }
    if (orderResultInfo.copyComplete) {
      message.success('복제가 완료되었습니다!');
    }
  });

  return (
    <>
      <PagingArea modalStore={useOrderListSearchRecordModalStore} keysStore={useTableSelectKeysOrderListStore} />

      {/* 태그 없음, 헤더 관련 정리 event */}
      <OrderListHeaderData setHeaderList={setHeaderList} headerDiv={"SALES"} />
      <Dropdown
        menu={{
          items: orderListRightItem,
          onClick: handleContextMenuClick,
        }}
        trigger={["contextMenu"]}
      >
        <div>
          {/* 테이블 */}
          <TableOnRowSelect2 header={headerList} serverData={handlePreprocessData(data)} scrollY={"calc(100vh - 260px)"} topOffset={351} onRowDoubleClick={handleDoubleClick} isPending={isPending}
                             keysStore={useTableSelectKeysOrderListStore} modalStore={useOrderListSearchRecordModalStore} />
        </div>
      </Dropdown>
    </>
  );
};

export default OrderListTable;
