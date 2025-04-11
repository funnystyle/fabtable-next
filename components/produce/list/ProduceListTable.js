// pages/order.js
import React, { useEffect, useState } from "react";
import { Badge, Dropdown, } from "antd";
import TableOnRowSelect2 from "@components/TableOnRowSelect2";
import { transformTagData } from "@components/order/table/transformTagData";
import PagingArea from "@components/list/PagingArea";
import useMenuTabStore from "@store/useMenuTabStore";
import { useGetCodeList } from "@components/api/useGetCodeList";
import ListPopover from "@components/list/Popover";
import useProduceListSearchRecordModalStore from "@store/useProduceListSearchRecordModalStore";
import useTableSelectKeysProduceListStore from "@store/useTableSelectKeysProduceListStore";
import { useWebsocket } from "@components/ws/useWebsocket";
import CsListHeaderData from "@components/cs/list/CsListHeaderData";
import { produceListRightItem } from "./data/produceListRightItem";
import MemoPopover from "@components/list/MemoPopover";
import { CheckOutlined } from "@ant-design/icons";

const ProduceListTable = ({ handleReload, isPending }) => {

  const [headerList, setHeaderList] = useState([]);

  const { data, setOpenCopyModal, setOpenEditModal } = useProduceListSearchRecordModalStore();
  const { tooltipList: soList } = useGetCodeList("특주사양");
  const { tooltipList: cuList } = useGetCodeList("고객사");
  const { tooltipList: buList } = useGetCodeList("납품처");

  const {datas} = useTableSelectKeysProduceListStore();

  const handleContextMenuClick = (e) => {
    // if (parseInt(e.key) === 1) {

    // } else if (parseInt(e.key) === 2) {
    //   setOpenCopyModal(true);
    // } else if (parseInt(e.key) === 3) {
    //   setOpenEditModal(true);
    // }
  };

  const { moveUrl } = useMenuTabStore();
  // const { setRecord, setTagInfoList, setIsCopy } = useRecordDataStore();
  // const router = useRouter();

  const handleDoubleClick = (record) => {
    // setRecord(record);
    // setIsCopy(false);
    // moveUrl("/order/create");
    // router.push("/order/create");
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

  const handleSettingTooltipData = (data) => {
    return data.map((item => {
      item.specialOrderNumber = item.specialOrderNumber ? handleSettingTooltip(item.specialOrderNumber, soList) : "";
      item.customer = item.customer ? handleSettingTooltip(item.customer, cuList) : "";
      item.buyer = item.buyer ? handleSettingTooltip(item.buyer, buList) : "";

      return item;
    }));
  }

  const openPopup = ({
		url = '/',
		name = 'popupWindow',
		width = 1280,
		height = 1120,
		resizable = 'yes',
		scrollbars = 'yes',
	}) => {
		const screenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
		const screenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;
		const screenWidth = window.screen.availWidth;
		const screenHeight = window.screen.availHeight;
	
		const left = screenLeft + (screenWidth - width) / 2;
		const top = screenTop + (screenHeight - height) / 2;
	
		const features = `width=${width},height=${height},top=${top},left=${left},resizable=${resizable},scrollbars=${scrollbars}`;
	
		window.open(url, name, features);
	};

  const randomTag = (index) => {
    const randomNumber = Math.floor(Math.random() * 6);

    const tags = [
      <Badge key="1" color="#FFC069" text="작업대기" className="packing-bedge" />,
      <Badge key="2"
        color="rgba(0,0,0,0.15)"
        text="작업대기"
        className="packing-bedge disabled"
        style={{
          color: "rgba(0, 0, 0, 0.25)",
        }}
      />,
      <Badge key="3"
        color="#1677FF"
        text="작업진행"
        className="packing-bedge"
        style={{
          color: "#0958D9",
        }}
      />,
      <Badge key="4"
        text="작업중단"
        status="error"
        className="packing-bedge"
        style={{
          color: "#FF4D4F",
        }}
      />,
      <Badge key="5"
        color="#389E0D"
        text="작업수정"
        className="packing-bedge"
        style={{
          color: "#389E0D",
        }}
      />,
      <Badge key="6"
        count={<CheckOutlined />}
        text="작업완료"
        className="packing-bedge complete"
      />,
    ]
    return (
      <div>
        <span onClick={() => openPopup({
          url: "/publish/produce_popup2",
          name: "produce_popup2",
        })} style={{ cursor: "pointer" }}>
            {tags[index % tags.length]}
        </span>
      </div>
    );
  }

  const handlePreprocessData = (data) => {
    const transform = (transformTagData(data) || []);

    const settingKey = handleSettingKeyToData(transform);

    const settingTooltip = handleSettingTooltipData(settingKey);

    const settingMemo = handleSettingMemoData(settingTooltip)
      .map((item, index) => {
        return {...item,
          assembleStatus: randomTag(index),
          internalLeakageStatus: randomTag(index+2),
          externalLeakageStatus: randomTag(index+4),
          pidStatus: randomTag(index+6),
          caseStatus: randomTag(index+8),
          pressureStatus: randomTag(index+10),
          calibrateStatus: randomTag(index+12),
          ratioStatus: randomTag(index+14),
          piStatus: randomTag(index+16),
          packingStatus: randomTag(index+18),
          warehouseStatus: randomTag(index+20),
        }
      });

    return settingMemo;
  }

  useEffect(() => {
    // setTagInfoList(data?.tagInfoList || []);
  }, [data]);

  useWebsocket("/topic/orderList", (message) => {
    const newOrder = JSON.parse(message.body);
    console.log("📬 새 주문:", newOrder);
    handleReload(true);
  });

  return (
    <>
      <PagingArea modalStore={useProduceListSearchRecordModalStore} keysStore={useTableSelectKeysProduceListStore} />

      {/* 태그 없음, 헤더 관련 정리 event */}
      <CsListHeaderData setHeaderList={setHeaderList} headerDiv={"PRODUCE"} />
      <Dropdown
        menu={{
          items: produceListRightItem,
          onClick: handleContextMenuClick,
        }}
        trigger={["contextMenu"]}
      >
        <div>
          {/* 테이블 */}
          <TableOnRowSelect2 header={headerList} serverData={handlePreprocessData(data)} scrollY={"calc(100vh - 260px)"} topOffset={351} onRowDoubleClick={handleDoubleClick} isPending={isPending}
                             keysStore={useTableSelectKeysProduceListStore} modalStore={useProduceListSearchRecordModalStore} />
        </div>
      </Dropdown>
    </>
  );
};

export default ProduceListTable;
