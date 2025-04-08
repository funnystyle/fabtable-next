import React from "react";
import ComponentDisabled from "@components/inputForm/ComponentDisabled";
import ComponentStringInput from "@components/inputForm/ComponentStringInput";
import { componentDate } from "@components/inputForm/componentDate";
import ComponentCodeSelect from "@components/inputForm/componentCodeSelect";
import ComponentCodeRadio from "@components/inputForm/componentCodeRadio";
import ComponentCodeCheckbox from "@components/inputForm/componentCodeCheckbox";
import { componentStringTextarea } from "@components/inputForm/componentStringTextarea";
import { componentNumberInput } from "@components/inputForm/componentNumberInput";
import ComponentReadOnly from "@components/inputForm/componentReadOnly";
import { componentDatetime } from "@components/inputForm/componentDatetime";

const CsRecordInputComponent = ({ form, codeRelationSet, component, index }) => {

  const recordColumn = component.recordColumn;

  if (recordColumn.connectionDiv === 'NONE' && recordColumn.formDiv === 'DISABLED') {
    return <ComponentDisabled recordColumn={recordColumn} index={index} />;
  }

  if (recordColumn.connectionDiv === 'NONE' && recordColumn.formDiv === 'READONLY') {
    return (
      <ComponentReadOnly recordColumn={recordColumn} form={form} index={index} />
    );
  }

  if (recordColumn.connectionDiv === 'NONE' && recordColumn.formDiv === 'NUMBER') {
    return componentNumberInput(recordColumn, index);
  }

  if (recordColumn.connectionDiv === 'NONE' && recordColumn.formDiv === 'STRING') {
    return <ComponentStringInput recordColumn={recordColumn} index={index} />
  }

  if (recordColumn.connectionDiv === 'NONE' && recordColumn.formDiv === 'TEXT') {
    return componentStringTextarea(recordColumn, index);
  }

  if (recordColumn.connectionDiv === 'NONE' && recordColumn.formDiv === 'DATE') {
    return componentDate(form, recordColumn, index);
  }

  if (recordColumn.connectionDiv === 'NONE' && recordColumn.formDiv === 'DATETIME') {
    return componentDatetime(form, recordColumn, index);
  }

  // 'CODE' 타입 처리
  if (recordColumn.connectionDiv === 'CODE' && recordColumn.formDiv === 'SELECT') {
    return (
      <ComponentCodeSelect form={form} codeRelationSet={codeRelationSet} recordColumn={recordColumn} component={component} index={index} />
    );
  }

  if (recordColumn.connectionDiv === 'CODE' && recordColumn.formDiv === 'RADIO') {
    return (
      <ComponentCodeRadio form={form} codeRelationSet={codeRelationSet} recordColumn={recordColumn} component={component} index={index} />
    );
  }

  if (recordColumn.connectionDiv === 'CODE' && recordColumn.formDiv === 'CHECKBOX') {
    return (
      <ComponentCodeCheckbox form={form} codeRelationSet={codeRelationSet} recordColumn={recordColumn} component={component} index={index} />
    );
  }

  return null;
}

export default CsRecordInputComponent;