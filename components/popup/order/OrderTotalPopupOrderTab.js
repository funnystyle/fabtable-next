// pages/order_popup.js
import React from "react";
import { Splitter, } from "antd";
import OrderTotalPopupBasic from "@components/popup/order/OrderTotalPopupBasic";
import OrderTotalPopupMemo from "@components/popup/order/OrderTotalPopupMemo";

const OrderTotalPopupOrderTab = ({ data }) => {

  const basicList = [["serialNumber", "oldSerialNumber", "scheduledDeliveryDate"
    , "productionPlanDate", "inspectionPlanDate", "productionDepartment", "saler", "salesDatetime"
    , "deliverman", "deliverDatetime", "remark"]];

  const customerList = [["buyer", "customer", "deliveryType", "poNumber", "projectNumber"]];

  const productList = [
    [
    "productCategory"
    , "productModel"
    , "subModelName"
    , "productChannel"
    , "productUnit"
    , "mfcSpecification"
    , "mountPosition"
    , "bodyType"
    , "flowRange"
    , "communication"
    , "customerCode"
    , "ioSize"
    , "maxData"
    , "valve"
    , "seal"
    , "valveSeat"
    , "rearPressure"
    , "hastelloy"
    , "fluid"
    , "calibrationFluid"
    , "liquidPrecursor"
    , "calLiquid"
  ],
    ["flowrate"
      , "conversionFactor"
      , "convertedFlowrate"
      , "flowrateUnit"
      , "mgmrType"
      , "mgmrBin"
      , "maxFlowMgmr"
      , "pressureUnit"
      , "minimumPressure"
      , "normalPressure"
      , "maximumPressure"
      , "controlPressureUnit"
      , "controlPressure"
      , "fittingType"
      , "sealSize"
      , "communicationPortShape"
      , "communicationPortPosition"
      , "revision"
      , "specialOrderNumber"
    ]
  ];

  return (
//      {/* 메인 탭 1: 수주 정보 */}
    <Splitter>
      <Splitter.Panel defaultSize="28%" collapsible>
        <Splitter layout="vertical">
          <Splitter.Panel>
            {/* 기본정보 */}
            <OrderTotalPopupBasic title={"기본정보"} data={data} list={basicList} />
          </Splitter.Panel>

          <Splitter.Panel>
            {/* 고객정보 */}
            <OrderTotalPopupBasic title={"고객정보"} data={data} list={customerList} />
          </Splitter.Panel>
        </Splitter>
      </Splitter.Panel>

      <Splitter.Panel collapsible>
        {/* 재품 정보 */}
        <OrderTotalPopupBasic title={"제품정보"} data={data} list={productList} />
        {/*<OrderProduct />*/}
      </Splitter.Panel>

      <Splitter.Panel collapsible>
        {/* 메모 */}
        <OrderTotalPopupMemo data={data} />
      </Splitter.Panel>
    </Splitter>
  );
};

export default OrderTotalPopupOrderTab;
