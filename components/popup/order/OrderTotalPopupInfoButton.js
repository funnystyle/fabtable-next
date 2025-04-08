import React from "react";
import { Button, Flex, } from "antd";

const OrderTotalPopupInfoButton = ({ data }) => {

  return (
    <Flex gap={4} className="btn-r-area">
      <Button color="primary" variant="outlined" size="small">
        부적합 이력
      </Button>

      <Button color="primary" variant="outlined" size="small">
        제어계수
      </Button>

      <Button color="primary" variant="outlined" size="small">
        비율제어
      </Button>
    </Flex>
  );
};

export default OrderTotalPopupInfoButton;
