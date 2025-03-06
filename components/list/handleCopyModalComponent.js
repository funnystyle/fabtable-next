import {Col, DatePicker, Form, Input, InputNumber, Radio, Select} from "antd";
import React, { useEffect } from "react";
import { handleCodeListFilter } from "@components/inputForm/handleCodeListFilter";
import { handleSelectChange } from "@components/inputForm/handleSelectChange";
import Link from "next/link";
import dayjs from "dayjs";

export const handleCopyModalComponent = (form, component, index) => {

  const handleComponent = (recordColumn) => {
    if (recordColumn.connectionDiv === 'NONE' && recordColumn.formDiv === 'NUMBER') {
      return (
        <Form.Item label={`${recordColumn.displayName}`} name={`${recordColumn.name}`}>
          <InputNumber
            min={1}
            max={10}
            // onChange={onChange}
          />
        </Form.Item>
      );
    }

    if (recordColumn.connectionDiv === 'NONE' && recordColumn.formDiv === 'STRING') {
      return (
        <Form.Item label={`${recordColumn.displayName}`} name={`${recordColumn.name}`}>
          <Input placeholder={`${recordColumn.displayName || '값을 입력하세요'}`}/>
        </Form.Item>
      );
    }

    if (recordColumn.connectionDiv === 'NONE' && recordColumn.formDiv === 'DATE') {

      const handleSetToday = (e, fieldName) => {
        e.preventDefault(); // 기본 동작 방지
        form.setFieldValue(fieldName, dayjs()); // 오늘 날짜로 설정
      };

      return (
        <Form.Item
          label={
            <Link href="/" onClick={(e) => handleSetToday(e, recordColumn.name)}>
              {recordColumn.displayName}
            </Link>
          }
          name={recordColumn.name}
        >
          <DatePicker style={{width: '100%'}} placeholder="날짜 선택"/>
        </Form.Item>
      );
    }

    // 'CODE' 타입 처리
    if (recordColumn.connectionDiv === 'CODE' && recordColumn.formDiv === 'SELECT') {

      const codeList = recordColumn.codeList;

      return (
        <Form.Item
          label={recordColumn.displayName}
          name={recordColumn.name}
        >
          {codeList.length === 0 ? (
            // ✅ codeList가 비어있을 때: 비활성화된 Select
            <Select placeholder="선택할 옵션이 없습니다." disabled={true}/>
          ) : (
            <Select
              placeholder="선택하세요"
              defaultValue={
                codeList.length === 1 ? codeList[0].codeName : undefined
              }
              options={
                codeList
                  ? codeList.map(option => ({
                    value: option.codeName,
                    label: option.codeName,
                  }))
                  : []
              }
            />
          )}
        </Form.Item>
      );
    }


    return null;
  }

  const recordColumn = component.recordColumn;

  return (
    <div key={`component-${index}`}>
      {handleComponent(recordColumn)}
    </div>
  )
}