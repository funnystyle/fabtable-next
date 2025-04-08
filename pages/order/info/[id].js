// pages/order_popup.js
import React, { useEffect, useState } from "react";
import { Spin, Tabs, Typography, } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useRouter } from "next/router";
import { useGetRecordDetail } from "@components/api/useGetRecordDetail";
import OrderTotalPopupTitle from "@components/popup/order/OrderTotalPopupTitle";
import OrderTotalPopupInfoButton from "@components/popup/order/OrderTotalPopupInfoButton";
import OrderTotalPopupOrderTab from "@components/popup/order/OrderTotalPopupOrderTab";
import OrderTotalPopupProduceTab from "@components/popup/order/OrderTotalPopupProduceTab";

const { Title } = Typography;

dayjs.extend(customParseFormat);

const { TabPane } = Tabs;

const OrderPopComponent = () => {

  const router = useRouter();
  const { id } = router.query; // <- 여기서 id 값을 받음
  const { data, isLoading } = useGetRecordDetail(id);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
		setLoading(isLoading);
  }, [isLoading, data]);
  return (
    <Spin spinning={loading} style={{ textAlign: "center" }}>
      <div className="system-popup-wrap">
        <OrderTotalPopupTitle title={"수주 종합정보"} data={data} />

        <div className="popup-contents pd0">
          <OrderTotalPopupInfoButton data={data} />

          <Tabs defaultActiveKey="1" type="card" className="tab-round">
            {/* 메인 탭 1: 수주 정보 */}
            <TabPane tab="수주 정보" key="1">
              <OrderTotalPopupOrderTab key="1" data={data} />
            </TabPane>

            {/* 메인 탭 2: 제조 정보 */}
            <TabPane tab="제조 정보" key="2">
            <OrderTotalPopupProduceTab key="2" data={data} />
            </TabPane>

            {/* 메인 탭 2: 품질 정보 */}
            <TabPane tab="품질 정보" key="3"></TabPane>
          </Tabs>
        </div>
      </div>
    </Spin>
  );
};

OrderPopComponent.getLayout = (page) => page;

export default OrderPopComponent;
