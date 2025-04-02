// components/common/CustomEmpty.js
import React from "react";
import { Empty } from "antd";

const CustomEmpty = () => (
  <Empty
    image={Empty.PRESENTED_IMAGE_SIMPLE}
    description="조회 내역이 없습니다."
  />
);

export default CustomEmpty;
