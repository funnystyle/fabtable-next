import React from "react";
import { componentDisabled } from "@components/inputForm/componentDisabled";
import { componentStringInput } from "@components/inputForm/componentStringInput";
import { componentDate } from "@components/inputForm/componentDate";
import ComponentCodeSelect from "@components/inputForm/componentCodeSelect";
import ComponentCodeRadio from "@components/inputForm/componentCodeRadio";
import ComponentCodeCheckbox from "@components/inputForm/componentCodeCheckbox";
import { componentStringTextarea } from "@components/inputForm/componentStringTextarea";
import { componentNumberInput } from "@components/inputForm/componentNumberInput";

export const handleCsRecordInputComponent = (form, codeRelationSet, selectedCodes, setSelectedCodes, component, index) => {

  const recordColumn = component.recordColumn;

  if (recordColumn.connectionDiv === 'NONE' && recordColumn.formDiv === 'DISABLED') {
    return componentDisabled(recordColumn, index);
  }

  if (recordColumn.connectionDiv === 'NONE' && recordColumn.formDiv === 'NUMBER') {
    return componentNumberInput(recordColumn, index);
  }

  if (recordColumn.connectionDiv === 'NONE' && recordColumn.formDiv === 'STRING') {
    return componentStringInput(recordColumn, index);
  }

  if (recordColumn.connectionDiv === 'NONE' && recordColumn.formDiv === 'TEXT') {
    return componentStringTextarea(recordColumn, index);
  }

  if (recordColumn.connectionDiv === 'NONE' && recordColumn.formDiv === 'DATE') {
    return componentDate(form, recordColumn, index);
  }

  // 'CODE' 타입 처리
  if (recordColumn.connectionDiv === 'CODE' && recordColumn.formDiv === 'SELECT') {
    return (
      <ComponentCodeSelect form={form} selectedCodes={selectedCodes} setSelectedCodes={setSelectedCodes} codeRelationSet={codeRelationSet} recordColumn={recordColumn} component={component} index={index} />
    );
  }

  if (recordColumn.connectionDiv === 'CODE' && recordColumn.formDiv === 'RADIO') {
    return (
      <ComponentCodeRadio form={form} selectedCodes={selectedCodes} setSelectedCodes={setSelectedCodes} codeRelationSet={codeRelationSet} recordColumn={recordColumn} component={component} index={index} />
    );
  }

  if (recordColumn.connectionDiv === 'CODE' && recordColumn.formDiv === 'CHECKBOX') {
    return (
      <ComponentCodeCheckbox form={form} selectedCodes={selectedCodes} setSelectedCodes={setSelectedCodes} codeRelationSet={codeRelationSet} recordColumn={recordColumn} component={component} index={index} />
    );
  }



  return null;
}