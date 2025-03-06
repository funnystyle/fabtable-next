import React from "react";
import {handleCopyModalComponentRow} from "@components/list/handleCopyModalComponentRow";

export const handleCopyModalBox = (form, item, index) => {
  const componentsList = item.components;

  // item.subDisplayName이 있을 경우 타이틀 표시
  return (
    <div key={`box-${index}`}>
      {componentsList.map((components, index) => handleCopyModalComponentRow(form, components, index))}
    </div>
  );
}