// pages/order/create/index.js
import React, { useEffect } from "react";
import { Button, Flex, } from "antd";
import OrderListButtonAllList from "@components/order/list/button/OrderListButtonAllList";
import OrderListButtonStatusSelect from "@components/order/list/button/OrderListButtonStatusSelect";
import OrderListButtonStatusChange from "@components/order/list/button/OrderListButtonStatusChange";
import OrderListButtonCopy from "@components/order/list/button/OrderListButtonCopy";
import OrderListButtonEdit from "@components/order/list/button/OrderListButtonEdit";
import OrderListButtonExcel from "@components/order/list/button/OrderListButtonExcel";
import OrderListButtonPrint from "@components/order/list/button/OrderListButtonPrint";
import { useSetNowState } from "@components/api/useSetNowState";
import ShowInfoButton from "@/components/common/ShowInfoButton";
import { useGetCodeList } from "@components/api/useGetCodeList";
import { RedoOutlined } from "@ant-design/icons";
import useTableSelectKeysOrderListStore from "@store/useTableSelectKeysOrderListStore";
import useDrawerStore from "@store/useDrawerStore";

const OrderListButtonArea = ({ keysStore, modalStore, type }) => {

  const { setDeleteTagKeyName, searchStatusList, setSearchStatusList, setSearchKeyword, tags, setTags } = modalStore();

  const { handleReload: nowStatusUpdate } = useSetNowState();

  const { codeNameList, isSuccess } = useGetCodeList("현재상태");

  useEffect(() => {
    if (isSuccess) {
      setSearchStatusList(codeNameList);
    }
  }, [isSuccess]);

  return (
    // <div className="contents-top-scroll">
    <Flex gap="small" align="center" className="btn-big" style={{
      position: "sticky",
      top: "0",
      zIndex: "10",
      marginBottom: "12px",
      // paddingTop: "8px",
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
        {/* <OrderListButtonTotalInfo /> */}
        <ShowInfoButton keysStore={keysStore} />

        <OrderListButtonStatusSelect statusList={codeNameList} searchStatusList={searchStatusList} setSearchStatusList={setSearchStatusList} />

        <OrderListButtonStatusChange statusList={codeNameList.slice(10, 14)} nowStatusUpdate={nowStatusUpdate} keysStore={keysStore} />
      </Flex>

      {type === "order" &&
        <Flex gap="small" className="btn-spacing-area">
          <OrderListButtonCopy />

          <OrderListButtonEdit />
        </Flex>
      }

      <Flex gap="small">
        <Button>항목편집</Button>

        <OrderListButtonExcel keysStore={keysStore} modalStore={modalStore} />

        <OrderListButtonPrint keyStore={useTableSelectKeysOrderListStore} drawerStore={useDrawerStore}/>
      </Flex>

      {type === "produce" &&
        <Flex gap={4} className="btn-spacing-area">
          <Button
            variant="outlined"
            icon={<RedoOutlined />}
            className="icon-redo"
            // onClick={showPackingModal}
          >
            포장 및 입고완료 공정 열기
          </Button>
        </Flex>
      }
    </Flex>
    // </div>
  );
};

export default OrderListButtonArea;
