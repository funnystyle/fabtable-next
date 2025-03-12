import { DatePicker, Form, Input, Radio, Select } from "antd";
import React, { useEffect } from "react";
import { handleCodeListFilter } from "@components/inputForm/handleCodeListFilter";
import { handleSelectChange } from "@components/inputForm/handleSelectChange";
import Link from "next/link";
import dayjs from "dayjs";
import { componentDisabled } from "@components/inputForm/componentDisabled";
import { componentStringInput } from "@components/inputForm/componentStringInput";
import { componentDate } from "@components/inputForm/componentDate";
import { componentCodeSelect } from "@components/inputForm/componentCodeSelect";
import { componentCodeRadio } from "@components/inputForm/componentCodeRadio";
import { componentCodeCheckbox } from "@components/inputForm/componentCodeCheckbox";
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
    return componentCodeSelect(form, selectedCodes, setSelectedCodes, codeRelationSet, recordColumn, component, index);
  }

  if (recordColumn.connectionDiv === 'CODE' && recordColumn.formDiv === 'RADIO') {
    return componentCodeRadio(form, selectedCodes, setSelectedCodes, codeRelationSet, recordColumn, component, index);
  }

  if (recordColumn.connectionDiv === 'CODE' && recordColumn.formDiv === 'CHECKBOX') {
    return componentCodeCheckbox(form, selectedCodes, setSelectedCodes, codeRelationSet, recordColumn, component, index);
  }



  return null;
}