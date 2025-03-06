import {Typography} from "antd";
import React from "react";
import {handleCopyModalComponentRow} from "@components/list/handleCopyModalComponentRow";

const { Title } = Typography;

export const handleCopyModalBox = (form, item, index) => {
  const componentsList = item.components;

  // item.subDisplayName이 있을 경우 타이틀 표시
  return (
    <div key={`box-${index}`}>
      {componentsList.map((components) => handleCopyModalComponentRow(form, components))}
    </div>
  );
}