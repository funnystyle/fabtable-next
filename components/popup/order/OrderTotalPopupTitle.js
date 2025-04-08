import React from "react";
import { Flex, Typography, } from "antd";

const { Title } = Typography;

const OrderTotalPopupTitle = ({ title, data }) => {

  return (
    <Flex align="center" justify="space-between" className="system-title-area">
      <Title level={3} className="title-page">{title}</Title>

      <Flex align="center" justify="space-between" className="control-info-area">
        <p>{data?.oldSerialNumber}</p>
        <p>{data?.serialNumber}</p>
        <p>{`${data?.productCategory} ${data?.subModelName}`}</p>
      </Flex>
    </Flex>
  );
};

export default OrderTotalPopupTitle;
