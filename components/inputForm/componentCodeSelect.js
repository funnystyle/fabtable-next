import { Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { handleCodeListFilter } from "@components/inputForm/handleCodeListFilter";
import { handleSelectChange } from "@components/inputForm/handleSelectChange";
import { handleComponentInputName } from "@components/inputForm/handleComponentInputName";
import useRecordSelectCodesStore from "@store/useRecordSelectCodesStore";
import useRecordDataStore from "@store/useRecordDataStore";

const ComponentCodeSelect = ({ form, codeRelationSet, recordColumn, component, index = -1 }) => {

  const [codeList, setCodeList] = useState([]);
  const name = handleComponentInputName(recordColumn, index);

  codeRelationSet.add({ codeGroupId: recordColumn.codeGroupId, name: recordColumn.name });

  const { selectedCodes, setSelectedCodes } = useRecordSelectCodesStore();



  let codeCount = 0;

  const productCategory = form.getFieldValue("productCategory");
  const productModel = form.getFieldValue("productModel");
  const productChannel = form.getFieldValue("productChannel");
  const productFluid = form.getFieldValue("fluid");

  const isMadee5000s = productCategory === "MADEE" && productModel === "5000s" && recordColumn.displayName === "Unit 구분";

  if (isMadee5000s) {
    if (productChannel === "2CH") {
      codeCount = 2;
    } else if (productChannel === "3CH") {
      codeCount = 3;
    } else if (productChannel === "4CH") {
      codeCount = 4;
    } else if (productChannel === "5CH") {
      codeCount = 5;
    } else if (productChannel === "6CH") {
      codeCount = 6;
    }
  }

  const isPs = productCategory === "MARU" && (productModel === "8200s" || productModel === "9000s" || productModel === "9300s")  && recordColumn.name === "conversionFactor";
  const isThisGas = productFluid === "Ar" || productFluid === "He" || productFluid === "Ne" || productFluid === "H2(4%)N2" || productFluid === "H2(5%)N2";



  const { isNew, serialNumber, setSerialNumber } = useRecordDataStore();

  const handleSerialNumberSetting = (value) => {
    if (isNew) return;
    if (name !== "productionDepartment") return;
    if (serialNumber.length <= 11) return;
    const number = value.slice(value.length - 2, value.length - 1);
    const newSerialNumber = serialNumber.slice(0, 11) + number
    setSerialNumber(newSerialNumber);
  }

  useEffect(() => {
    const newCodeList = handleCodeListFilter(selectedCodes, recordColumn);
    if (isPs && isThisGas) {
      setCodeList(newCodeList.filter((code) => code.codeName !== "1"));
    } else {
      setCodeList(newCodeList);
    }
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
        (recordColumn.name === "conversionFactor" ?
            <Input placeholder={`${recordColumn.displayName || '값을 입력하세요'}`}/>
          : <Select placeholder="선택할 옵션이 없습니다." disabled={true} />
        )) : (
        codeList.length === 1 && recordColumn.name === "conversionFactor" ? (
          <Input placeholder={`${recordColumn.displayName || '값을 입력하세요'}`}
                 value={codeList[0].codeName}
          />
          )
        : (
        <Select
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          placeholder="선택하세요"
          onChange={(value, option) => {

            handleSerialNumberSetting(value);
            handleSelectChange(form, codeRelationSet, selectedCodes, setSelectedCodes, option)
          }}
          data-codegroup-id={recordColumn.codeGroupId}
          initialvalue={
            codeList.length === 1 ? codeList[0].codeName : undefined
          }

          options={
            codeList
              ? (isMadee5000s ? codeList.map(option => ({
                value: option.codeName,
                label: option.codeName,
                'data-codegroup-id': recordColumn.codeGroupId,
                'data-id': option.id,
                'data-child-relations' : JSON.stringify(option.childRelations),
              })).slice(0, codeCount)
                  :
                    codeList.map(option => ({
                  value: option.codeName,
                  label: option.codeName,
                  'data-codegroup-id': recordColumn.codeGroupId,
                  'data-id': option.id,
                  'data-child-relations' : JSON.stringify(option.childRelations),
                }))

              )
              : []
          }
        />
      ))}
    </Form.Item>
  );
}

export default ComponentCodeSelect;