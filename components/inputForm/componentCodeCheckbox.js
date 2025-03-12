import { Checkbox, DatePicker, Flex, Form, Input, Radio, Select } from "antd";
import React, { useEffect } from "react";
import { handleCodeListFilter } from "@components/inputForm/handleCodeListFilter";
import { handleSelectChange } from "@components/inputForm/handleSelectChange";
import Link from "next/link";
import dayjs from "dayjs";
import { handleComponentInputName } from "@components/inputForm/handleComponentInputName";

export const componentCodeCheckbox = (form, selectedCodes, setSelectedCodes, codeRelationSet, recordColumn, component, index = -1) => {
  const codeList = recordColumn.codeList;
  const hasEtc = codeList.some(option => option.codeName === "기타" || option.codeName === "etc");
  const name = handleComponentInputName(recordColumn, index);
  return (
    <Form.Item
      label={recordColumn.displayName}
      name={name}
      key={name}
    >
      {codeList.length === 0 ? (
        // ✅ codeList가 비어있을 때: 비활성화된 체크박스 그룹
        <Checkbox.Group disabled>
          <Checkbox value="none">선택할 옵션이 없습니다.</Checkbox>
        </Checkbox.Group>
      ) : (
        <Checkbox.Group>
          <Flex gap={4} align="center" style={{ flexWrap: "wrap" }}>
            {codeList.filter(option => option.codeName !== "기타" && option.codeName !== "etc").map(option => (
              <Checkbox key={option.codeName} value={option.codeName} style={{ lineHeight: "22px" }}>
                {option.codeName}
              </Checkbox>
            ))}

            {/* 기타(etc) 체크박스 & 입력 필드 추가 */}
            {hasEtc && (
              <Flex align="center" className="etc-area">
                <Checkbox value="기타" style={{ lineHeight: "22px" }}>
                  기타
                </Checkbox>
                <Input placeholder="직접 입력" style={{ flex: "1" }} />
              </Flex>
            )}
          </Flex>
        </Checkbox.Group>
      )}
    </Form.Item>
  );
}