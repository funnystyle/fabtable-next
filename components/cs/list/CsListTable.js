// pages/order.js
import React, { useEffect, useState } from "react";
import { Dropdown, } from "antd";
import TableOnRowSelect2 from "@components/TableOnRowSelect2";
import { transformTagData } from "@components/order/table/transformTagData";
import CsListHeaderData from "@components/cs/list/CsListHeaderData";
import PagingArea from "@components/list/PagingArea";
import { csListRightItem } from "./data/csListRightItem";
import useMenuTabStore from "@store/useMenuTabStore";
import useCsDataStore from "@store/useCsDataStore";
import { useRouter } from "next/router";
import useCsListSearchCsModalStore from "@store/useCsListSearchCsModalStore";
import useTableSelectKeysCsListStore from "@store/useTableSelectKeysCsListStore";
import { useWebsocket } from "@components/ws/useWebsocket";
import { useGetCodeList } from "@components/api/useGetCodeList";
import { useSetCsState } from "@components/api/useSetCsState";
import { handleCsCopy } from "@components/cs/list/button/handleCsCopy";
import { handleOpenCsHistory } from "@components/cs/list/button/handleOpenCsHistory";
import useCsListHistoryCsModalStore from "@store/useCsListHistoryCsModalStore";
import { handleRecordInfoPopup } from "@components/popup/handleOpenPopup";
import { useDownloadCsDetailExcel } from "@components/api/useDownloadCsDetailExcel";
import { useDeleteCs } from "@components/api/useDeleteCs";

const CsListTable = ({ handleReload, isPending }) => {

  const [headerList, setHeaderList] = useState([]);

  const { data } = useCsListSearchCsModalStore();
  const { tooltipList: stList } = useGetCodeList("CS상태");
  const { handleReload: nowStatusUpdate } = useSetCsState();

  const { datas } = useTableSelectKeysCsListStore();

  const {handleDownload} = useDownloadCsDetailExcel();
  const {mutate: deleteCs} = useDeleteCs();

  const handleContextMenuClick = (e) => {
    if (e.key.startsWith("1")) {
      const statusList = stList.slice(1);
      const status = statusList[parseInt(e.key.split("-")[1]) - 1];
      if (status) {
        nowStatusUpdate(datas.map((data) => data.id), status.codeName);
      }
    } else if (parseInt(e.key) === 2) {
      handleCsCopy(useTableSelectKeysCsListStore, moveUrl, useCsDataStore, router)
    } else if (parseInt(e.key) === 3) {
      handleOpenCsHistory(datas.length, useCsListHistoryCsModalStore);
    } else if (parseInt(e.key) === 4) {
      handleRecordInfoPopup(window, datas.map((item) => {
        return { id: item.recordId, serialNumber: item.serialNumber }
      }));
    } else if (e.key === "6-2") {
      const printId = new Set();
      datas.forEach((item => {
        printId.add(item.id);
      }));
      printId.forEach((item) => {
        handleDownload(item);
      });
    } else if (parseInt(e.key) === 8) {
      datas.forEach((data => {
        deleteCs({id:data.id});
      }));
    }
  };

  const { moveUrl } = useMenuTabStore();
  const { setCs, setIsCopy, setTagInfoList } = useCsDataStore();
  const router = useRouter();

  const handleDoubleClick = (record) => {
    setCs(record);
    setIsCopy(false);
    moveUrl("/cs/create");
    router.push("/cs/create");
  }

  const handleSettingKeyToData = (data) => {
    return (transformTagData(data) || []).map((item, index) => {
      item.key = index;
      return item;
    });
  }

  useEffect(() => {
    setTagInfoList(data?.tagInfoList || []);
  }, [data]);

  useWebsocket("/topic/csList", (message) => {
    const newOrder = JSON.parse(message.body);
    console.log("📬 새 CS:", newOrder);
    handleReload(true);
  });

  return (
    <>
      <PagingArea modalStore={useCsListSearchCsModalStore} keysStore={useTableSelectKeysCsListStore} />
      {/* 태그 없음, 헤더 관련 정리 event */}
      <CsListHeaderData setHeaderList={setHeaderList} headerDiv={"CS"} />
      <Dropdown
        menu={{
          items: csListRightItem,
          onClick: handleContextMenuClick,

        }}
        trigger={["contextMenu"]}
      >
        <div>
          {/* 테이블 */}
          <TableOnRowSelect2 header={headerList} serverData={handleSettingKeyToData(data)} scrollY={"calc(100vh - 330px)"} topOffset={330} onRowDoubleClick={handleDoubleClick} isPending={isPending}
                             keysStore={useTableSelectKeysCsListStore} modalStore={useCsListSearchCsModalStore}
          />
        </div>
      </Dropdown>
    </>
  );
};

export default CsListTable;
