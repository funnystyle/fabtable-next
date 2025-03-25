import React from "react";
import { componentDisabled } from "@components/inputForm/componentDisabled";
import { componentStringInput } from "@components/inputForm/componentStringInput";
import { componentDate } from "@components/inputForm/componentDate";
import ComponentCodeSelect from "@components/inputForm/componentCodeSelect";
import ComponentCodeRadio from "@components/inputForm/componentCodeRadio";
import { componentCodeCheckbox } from "@components/inputForm/componentCodeCheckbox";
import { componentStringTextarea } from "@components/inputForm/componentStringTextarea";
import { componentNumberInput } from "@components/inputForm/componentNumberInput";

export const handleInputComponent = (form, codeRelationSet, selectedCodes, setSelectedCodes, component) => {

  const recordColumn = component.recordColumn;

  if (recordColumn.connectionDiv === 'NONE' && recordColumn.formDiv === 'DISABLED') {
    return componentDisabled(recordColumn);
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
    return componentCodeCheckbox(form, selectedCodes, setSelectedCodes, codeRelationSet, recordColumn, component);
  }



  return null;
}