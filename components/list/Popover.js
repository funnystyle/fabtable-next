import { Button, Col, DatePicker, Flex, Form, Input, InputNumber, Popover, Row, Select } from "antd";
import InputComponent from "@components/inputForm/InputComponent";
import Link from "next/link";
import React from "react";
import {handleCopyModalBoxRow} from "@components/list/handleCopyModalBoxRow";

const ListPopover = ({ codeName, tooltip }) => {

  const popText = <span className="pop-title">{codeName}</span>;
  const popContent = (
    <div className="pop-txt">
      {tooltip.split("\n").map((text, index) => (
        <React.Fragment key={`list-popover-${index}`}>
          {index !== 0 && <br />}
          {text}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <Popover
      placement="leftTop"
      autoAdjustOverflow={true}
      title={popText}
      content={popContent}
      overlayInnerStyle={{ backgroundColor: "#FFFBE6", maxWidth: "264px" }}
    >
      <Button type="text">{codeName}</Button>
    </Popover>
  );
}

export default ListPopover;

