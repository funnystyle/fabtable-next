import { DatePicker, Form, Input, Radio, Select } from "antd";
import React, { useEffect } from "react";
import { handleCodeListFilter } from "@components/inputForm/handleCodeListFilter";
import { handleSelectChange } from "@components/inputForm/handleSelectChange";
import Link from "next/link";
import dayjs from "dayjs";
import { handleComponentInputName } from "@components/inputForm/handleComponentInputName";

export const componentCodeRadio = (form, selectedCodes, setSelectedCodes, codeRelationSet, recordColumn, component, index = -1) => {
  const codeList = handleCodeListFilter(selectedCodes, recordColumn);
  const name = handleComponentInputName(recordColumn, index);

  codeRelationSet.add({ codeGroupId: recordColumn.codeGroupId, name: recordColumn.name });

  if (codeList.length === 0) {
    form.resetFields([recordColumn.name]);
  }

  return (
    <Form.Item
      key={name}
      label={recordColumn.displayName}
      name={name}
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