import { DatePicker, Form, Input, Radio, Select } from "antd";
import React, { useEffect, useState } from "react";
import { handleCodeListFilter } from "@components/inputForm/handleCodeListFilter";
import { handleSelectChange } from "@components/inputForm/handleSelectChange";
import Link from "next/link";
import dayjs from "dayjs";
import { handleComponentInputName } from "@components/inputForm/handleComponentInputName";
import useRecordDataStore from "@store/useRecordDataStore";
import useRecordSelectCodesStore from "@store/useRecordSelectCodesStore";

const ComponentCodeSelect = ({ form, codeRelationSet, recordColumn, component, index = -1 }) => {

  const [codeList, setCodeList] = useState([]);
  const name = handleComponentInputName(recordColumn, index);

  codeRelationSet.add({ codeGroupId: recordColumn.codeGroupId, name: recordColumn.name });

  const { selectedCodes, setSelectedCodes } = useRecordSelectCodesStore();

  useEffect(() => {
    setCodeList(handleCodeListFilter(selectedCodes, recordColumn));
  }, [selectedCodes]);

  useEffect(() => {
    if (codeList.length === 0) {
      form.resetFields([name]);
    }
    if (codeList.length === 1) {
      form.setFieldsValue({ [name]: codeList[0].codeName });
    }
  }, [codeList]);

  return (
    <Form.Item
      key={name}
      label={recordColumn.displayName}
      name={name}
      // rules={[{ required: true, message: `${recordColumn.displayName}를 선택하세요!` }]}
    >
      {codeList.length === 0 ? (
        // ✅ codeList가 비어있을 때: 비활성화된 Select
        <Select placeholder="선택할 옵션이 없습니다." disabled={true} />
      ) : (
        <Select
          placeholder="선택하세요"
          onChange={(value, option) =>
            handleSelectChange(form, codeRelationSet, selectedCodes, setSelectedCodes, option)
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

export default ComponentCodeSelect;