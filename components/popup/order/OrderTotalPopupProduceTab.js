// pages/order_popup.js
import React from "react";
import { Splitter, } from "antd";
import OrderAssembly from "@components/popup/order/OrderAssembly";
import OrderLeak from "@components/popup/order/OrderLeak";
import OrderPID from "@components/popup/order/OrderPID";
import OrderCase from "@components/popup/order/OrderCase";
import OrderPI from "@components/popup/order/OrderPI";
import OrderPacking from "@components/popup/order/OrderPacking";
import OrderCorrect from "@components/popup/order/OrderCorrect";

const OrderTotalPopupProduceTab = () => {

  return (
    //{/* 메인 탭 2: 제조 정보 */}
    <Splitter>
      <Splitter.Panel defaultSize="28%" collapsible>
        {/* 조립정보 */}
        <OrderAssembly />
      </Splitter.Panel>

      <Splitter.Panel defaultSize="28%" collapsible>
        <Splitter layout="vertical">
          <Splitter.Panel>
            {/* 리크정보 */}
            <OrderLeak />
          </Splitter.Panel>

          <Splitter.Panel defaultSize="16%">
            {/* PID정보 */}
            <OrderPID />
          </Splitter.Panel>

          <Splitter.Panel defaultSize="12%">
            {/* 케이스 조립정보 */}
            <OrderCase />
          </Splitter.Panel>

          <Splitter.Panel defaultSize="16%">
            {/* PI정보 */}
            <OrderPI />
          </Splitter.Panel>

          <Splitter.Panel defaultSize="20%">
            {/* 포장 및 입고정보 */}
            <OrderPacking />
          </Splitter.Panel>
        </Splitter>
      </Splitter.Panel>

      <Splitter.Panel collapsible>
        {/* 교정정보 */}
        <OrderCorrect />
      </Splitter.Panel>
    </Splitter>
  );
};

export default OrderTotalPopupProduceTab;
