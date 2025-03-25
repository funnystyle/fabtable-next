import { componentNumberInput } from "@components/inputForm/componentNumberInput";
import { componentStringInput } from "@components/inputForm/componentStringInput";
import { componentStringTextarea } from "@components/inputForm/componentStringTextarea";
import { componentDate } from "@components/inputForm/componentDate";
import ComponentCodeSelect from "@components/inputForm/componentCodeSelect";
import ComponentCodeRadio from "@components/inputForm/componentCodeRadio";
import ComponentCodeCheckbox from "@components/inputForm/componentCodeCheckbox";
import React from "react";

const ModalComponent = ({form, codeRelationSet, selectedCodes, setSelectedCodes, component}) => {

  const recordColumn = component.recordColumn;

  if (recordColumn.connectionDiv === 'NONE' && recordColumn.formDiv === 'DISABLED') {
    return componentStringInput(recordColumn);
    // return componentDisabled(recordColumn);
  }

  if (recordColumn.connectionDiv === 'NONE' && recordColumn.formDiv === 'NUMBER') {
    return componentNumberInput(recordColumn);
  }

  if (recordColumn.connectionDiv === 'NONE' && recordColumn.formDiv === 'STRING') {
    return componentStringInput(recordColumn);
  }

  if (recordColumn.connectionDiv === 'NONE' && recordColumn.formDiv === 'TEXT') {
    return componentStringTextarea(recordColumn);
  }

  if (recordColumn.connectionDiv === 'NONE' && recordColumn.formDiv === 'DATE') {
    return componentDate(form, recordColumn);
  }

  // 'CODE' 타입 처리
  if (recordColumn.connectionDiv === 'CODE' && recordColumn.formDiv === 'SELECT') {
    return (
      <ComponentCodeSelect form={form} selectedCodes={selectedCodes} setSelectedCodes={setSelectedCodes} codeRelationSet={codeRelationSet} recordColumn={recordColumn} component={component} />
    );
  }

  if (recordColumn.connectionDiv === 'CODE' && recordColumn.formDiv === 'RADIO') {
    return (
      <ComponentCodeRadio form={form} selectedCodes={selectedCodes} setSelectedCodes={setSelectedCodes} codeRelationSet={codeRelationSet} recordColumn={recordColumn} component={component} />
    );
  }

  if (recordColumn.connectionDiv === 'CODE' && recordColumn.formDiv === 'CHECKBOX') {
    return (
      <ComponentCodeCheckbox form={form} selectedCodes={selectedCodes} setSelectedCodes={setSelectedCodes} codeRelationSet={codeRelationSet} recordColumn={recordColumn} component={component} />
    );
  }

  return null;
}

export default ModalComponent;