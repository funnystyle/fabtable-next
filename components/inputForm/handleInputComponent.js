import React from "react";
import { componentDisabled } from "@components/inputForm/componentDisabled";
import { componentStringInput } from "@components/inputForm/componentStringInput";
import { componentDate } from "@components/inputForm/componentDate";
import ComponentCodeSelect from "@components/inputForm/componentCodeSelect";
import ComponentCodeRadio from "@components/inputForm/componentCodeRadio";
import ComponentCodeCheckbox from "@components/inputForm/componentCodeCheckbox";
import { componentStringTextarea } from "@components/inputForm/componentStringTextarea";
import { componentNumberInput } from "@components/inputForm/componentNumberInput";
import ComponentReadOnly from "@components/inputForm/componentReadOnly";

export const handleInputComponent = (form, codeRelationSet, component, index) => {

  const recordColumn = component.recordColumn;

  if (recordColumn.connectionDiv === 'NONE' && recordColumn.formDiv === 'DISABLED') {
    return componentDisabled(recordColumn);
  }

  if (recordColumn.connectionDiv === 'NONE' && recordColumn.formDiv === 'READONLY') {
    return (
      <ComponentReadOnly recordColumn={recordColumn} form={form} />
    );
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
      <ComponentCodeSelect form={form} codeRelationSet={codeRelationSet} recordColumn={recordColumn} component={component} />
    );
  }

  if (recordColumn.connectionDiv === 'CODE' && recordColumn.formDiv === 'RADIO') {
    return (
      <ComponentCodeRadio form={form} codeRelationSet={codeRelationSet} recordColumn={recordColumn} component={component} />
    );
  }

  if (recordColumn.connectionDiv === 'CODE' && recordColumn.formDiv === 'CHECKBOX') {
    return (
      <ComponentCodeCheckbox form={form} codeRelationSet={codeRelationSet} recordColumn={recordColumn} component={component} />
    );
  }



  return null;
}