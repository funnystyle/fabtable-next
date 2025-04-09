import { componentNumberInput } from "@components/inputForm/componentNumberInput";
import ComponentStringInput from "@components/inputForm/ComponentStringInput";
import { componentStringTextarea } from "@components/inputForm/componentStringTextarea";
import { componentDate } from "@components/inputForm/componentDate";
import ComponentCodeSelect from "@components/inputForm/componentCodeSelect";
import ComponentCodeRadio from "@components/inputForm/componentCodeRadio";
import ComponentCodeCheckbox from "@components/inputForm/componentCodeCheckbox";
import React from "react";
import { componentDatetime } from "../inputForm/componentDatetime";

const ModalComponent = ({form, codeRelationSet, selectedCodes, setSelectedCodes, component}) => {

  const recordColumn = component.recordColumn;

  if (recordColumn.connectionDiv === 'NONE' && recordColumn.formDiv === 'DISABLED') {
    return <ComponentStringInput recordColumn={recordColumn} />
  }

  if (recordColumn.connectionDiv === 'NONE' && recordColumn.formDiv === 'NUMBER') {
    return componentNumberInput(recordColumn);
  }

  if (recordColumn.connectionDiv === 'NONE' && recordColumn.formDiv === 'STRING') {
    return <ComponentStringInput recordColumn={recordColumn} />
  }

  if (recordColumn.connectionDiv === 'NONE' && recordColumn.formDiv === 'TEXT') {
    return componentStringTextarea(recordColumn);
  }

  if (recordColumn.connectionDiv === 'NONE' && recordColumn.formDiv === 'DATE') {
    return componentDate(form, recordColumn);
  }

  if (recordColumn.connectionDiv === 'NONE' && recordColumn.formDiv === 'DATETIME') {
    return componentDatetime(form, recordColumn);
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