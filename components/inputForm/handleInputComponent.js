import { DatePicker, Form, Input, Select } from "antd";
import React, { useEffect } from "react";
import { handleCodeListFilter } from "@components/inputForm/handleCodeListFilter";
import { handleSelectChange } from "@components/inputForm/handleSelectChange";

export const handleInputComponent = (form, codeRelationSet, selectedCodes, setSelectedCodes, component) => {

  const recordColumn = component.recordColumn;

  if (recordColumn.connectionDiv === 'NONE' && recordColumn.formDiv === 'STRING') {
    return (
      <Form.Item key={recordColumn.id} label={`${recordColumn.displayName}`} name={`${recordColumn.name}`}>
        <Input placeholder={`${recordColumn.displayName || '값을 입력하세요'}`} />
      </Form.Item>
    );
  }

  if (recordColumn.connectionDiv === 'NONE' && recordColumn.formDiv === 'DATE') {
    return (
      <Form.Item
        key={recordColumn.id}
        label={recordColumn.displayName}
        name={recordColumn.name}
      >
        <DatePicker style={{ width: '100%' }} placeholder="날짜 선택" />
      </Form.Item>
    );
  }

  // 'CODE' 타입 처리
  if (recordColumn.connectionDiv === 'CODE' && recordColumn.formDiv === 'SELECT') {

    const codeList = handleCodeListFilter(selectedCodes, recordColumn);

    codeRelationSet.add({ codeGroupId: recordColumn.codeGroupId, name: recordColumn.name });

    if (codeList.length === 0) {
      form.resetFields([recordColumn.name]);
    }

    // (form, codeRelationSet, selectedCodes, setSelectedCodes, value, option)
    const defaultOption = codeList.length === 1 ? codeList[0] : null;

    return (
      <Form.Item
        key={component.id}
        label={recordColumn.displayName}
        name={recordColumn.name}
        // rules={[{ required: true, message: `${recordColumn.displayName}를 선택하세요!` }]}
      >
        {codeList.length === 0 ? (
          // ✅ codeList가 비어있을 때: 비활성화된 Select
          <Select placeholder="선택할 옵션이 없습니다." disabled={true} />
        ) : (
          <Select
            placeholder="선택하세요"
            onChange={(value, option) =>
              handleSelectChange(form, codeRelationSet, selectedCodes, setSelectedCodes, value, option)
            }
            data-codegroup-id={recordColumn.codeGroupId}
            defaultValue={
              codeList.length === 1 ? codeList[0].codeName : undefined
            }

            options={
              codeList
                ? codeList.map(option => ({
                  value: option.codeName,
                  label: option.codeName,
                  'data-codegroup-id': recordColumn.codeGroupId,
                  'data-id': option.id,
                  'data-child-relations' : JSON.stringify(option.childRelations),
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