import { Button, Col, DatePicker, Flex, Form, Input, InputNumber, Row, Select } from "antd";
import InputComponent from "@components/inputForm/InputComponent";
import Link from "next/link";
import React from "react";
import {handleCopyModalBoxRow} from "@components/list/handleCopyModalBoxRow";

export const handleCopyModal = (form, selectKeysLength, list) => {

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <>
      <Flex align="center" justify="space-between">
        <p className="total-txt">
          선택 총 <strong>{selectKeysLength}</strong> 건
        </p>

        <Button type="link" className="btn-reset-txt" onClick={handleReset}>
          입력 초기화
        </Button>
      </Flex>

      <p className="modal-txt">복수의 수주 복제 시 수량을 꼭 확인하세요.</p>

      {list.map((item, index) => handleCopyModalBoxRow(form, item, index))}
    </>
  );
}