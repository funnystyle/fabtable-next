import React from "react";
import { Button, Flex, Tooltip } from "antd";
import { SettingOutlined } from "@ant-design/icons";

const OrderTotalPopupBasic = ({ title, data, list }) => {

  const handleShowValue = (recordColumns, name) => {
    if (!recordColumns || !name || recordColumns.length === 0) {
      return null;
    }
    const recordColumn = recordColumns.find((recordColumn) => recordColumn.name === name);
    if (recordColumn) {
      const displayName = recordColumn.displayName;
      let value = data[name];
      if (recordColumn.dataType === "Date") {
        value = value ? `${value.substring(0, 10)} 00:00` : "";
      }
      return (
        <>
          <Flex align="center" className="order-info-area">
            <div className="title-order-info">
              <Tooltip title={displayName}>
                <span>{displayName}</span>
              </Tooltip>
            </div>

            <div className="txt-order-info">
              <Tooltip title={value}>
                <span>{value}</span>
              </Tooltip>
            </div>
          </Flex>
        </>
      );
    }

  }

  return (
    <div className="tab-content-in top-h">
      <Flex align="center" justify="space-between" className="title-bg-blue">
        <p className="titie-info">{title}</p>

        <p>
          <Button icon={<SettingOutlined />} size="small" />
        </p>
      </Flex>

      <Flex className="order-info-wrap">
        {list.map((list, index) =>
          <div key={`order-total-basic-${index}`}>
            {list.map((name, index) =>
              (
                <React.Fragment key={`order-total-basic-item-${index}`}>
                  {handleShowValue(data?.recordColumns, name)}
                </React.Fragment>
              ))}
          </div>
        )}
      </Flex>
    </div>
  );
};

export default OrderTotalPopupBasic;
