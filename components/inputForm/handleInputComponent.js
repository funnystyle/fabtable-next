import { DatePicker, Form, Input, Radio, Select } from "antd";
import React, { useEffect } from "react";
import { handleCodeListFilter } from "@components/inputForm/handleCodeListFilter";
import { handleSelectChange } from "@components/inputForm/handleSelectChange";
import Link from "next/link";
import dayjs from "dayjs";

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

    const handleSetToday = (e, fieldName) => {
      e.preventDefault(); // 기본 동작 방지
      console.log("fieldName", fieldName);
      form.setFieldValue(fieldName, dayjs()); // 오늘 날짜로 설정
    };

    return (
      <Form.Item
        key={recordColumn.id}
        label={
          <Link href="/" onClick={(e) => handleSetToday(e, recordColumn.name)}>
            {recordColumn.displayName}
          </Link>
        }
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

  if (recordColumn.connectionDiv === 'CODE' && recordColumn.formDiv === 'RADIO') {
    const codeList = handleCodeListFilter(selectedCodes, recordColumn);

    codeRelationSet.add({ codeGroupId: recordColumn.codeGroupId, name: recordColumn.name });

    if (codeList.length === 0) {
      form.resetFields([recordColumn.name]);
    }

    return (
      <Form.Item
        key={component.id}
        label={recordColumn.displayName}
        name={recordColumn.name}
      >
        {codeList.length === 0 ? (
          // ✅ codeList가 비어있을 때: 비활성화된 Radio.Group
          <Radio.Group disabled>
            <Radio value="">선택할 옵션이 없습니다.</Radio>
          </Radio.Group>
        ) : (
          <Radio.Group
            onChange={(e) => {
              const selectedOption = codeList.find(option => option.codeName === e.target.value);
              const option = {
                value: selectedOption.codeName,
                label: selectedOption.codeName,
                'data-codegroup-id': recordColumn.codeGroupId,
                'data-id': selectedOption.id,
                'data-child-relations': JSON.stringify(selectedOption.childRelations),
              };
              handleSelectChange(
                form,
                codeRelationSet,
                selectedCodes,
                setSelectedCodes,
                selectedOption.codeName, // ✅ 선택된 값
                option // ✅ 선택된 객체 자체를 전달
              );
            }}
            data-codegroup-id={recordColumn.codeGroupId}
            defaultValue={codeList.length === 1 ? codeList[0].codeName : undefined}
          >
            {codeList.map(option => (
              <Radio
                key={option.id}
                value={option.codeName}
                data-codegroup-id={recordColumn.codeGroupId}
                data-id={option.id}
                data-child-relations={JSON.stringify(option.childRelations)}
              >
                {option.codeName}
              </Radio>
            ))}
          </Radio.Group>
        )}
      </Form.Item>
    );
  }



  return null;
}