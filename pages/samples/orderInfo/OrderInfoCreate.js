// components/OrderInfoCreate.tsx
import React from 'react';
import { Form, Input, DatePicker, Select, Button, Row, Col, message } from 'antd';
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAxios } from "@components/AxiosCall";

const { Option } = Select;

const OrderInfoCreate = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    console.log('Form Values:', values);
    message.success('수주 등록이 완료되었습니다!');
  };

  const handleReset = () => {
    form.resetFields();
  };

  const [standardInfoList, setStandardInfoList] = useState([]);
  const [queryKey, setQueryKey] = useState(["standardInfoResponse", Math.random()]);
  const { data:standardInfoResponse, isLoading, isSuccess, isError } = useQuery({
    queryKey,
    queryFn: () => getAxios("/api/v1/user/standard-info", {entityName : "OrderInfo"}),
  });

  useEffect(() => {
    if (isSuccess) {
      console.log("standardInfoResponse : ", standardInfoResponse);
      setStandardInfoList(standardInfoResponse.data.list);
    }
  }, [isSuccess]);


  const [selectedCodes, setSelectedCodes] = useState([]); // 선택된 코드 상태 저장

  // 선택된 코드 정보를 갱신하는 함수
  const handleSelectChange = (value, option, item) => {
    const codeGroupId = option?.props['data-codegroup-id'];  // codeGroupId를 추출
    const newSelectedCodes = [...selectedCodes];

    // 이미 선택된 코드가 있으면 업데이트, 없으면 추가
    const index = newSelectedCodes.findIndex(
        (item) => item.codeGroupId === codeGroupId
    );
    if (index !== -1) {
      newSelectedCodes[index] = { codeGroupId, commonCodeId: value };
    } else {
      newSelectedCodes.push({ codeGroupId, commonCodeId: value });
    }

    setSelectedCodes(newSelectedCodes);
  };

  const renderFormItem = (item) => {
    if (item.standardInfoDiv === 'STRING') {
      return (
        <Form.Item
          key={item.id}
          label={item.displayName}
          name={item.columnName}
          rules={[{ required: true, message: `${item.displayName}를 입력하세요!` }]}
        >
          <Input placeholder={`예: ${item.description || '값을 입력하세요'}`} />
        </Form.Item>
      );
    }

    // 'CODE' 타입 처리
    if (item.standardInfoDiv === 'CODE') {

      //selectedCodes에 선택된 코드 정보가 저장됩니다
      //                parentCodeGroupId가 있을 경우 의 commonCodeId가 parentCode인 commonCode만 보여집니다

      let codeList = item.codeList;
      if (item.parentCodeGroupId) {
        codeList = item.codeList.filter((code) => code.parentCommonCodeId === selectedCodes.find((selectedCode) => selectedCode.codeGroupId === item.parentCodeGroupId)?.commonCodeId);
      }

      if (item.codeGroupId === 7) {
        console.log("item.codeList : ", item.codeList);
        console.log("item.parentCodeGroupId : ", item.parentCodeGroupId);
        console.log("selectedCodes : ", selectedCodes);
        console.log("codeList : ", codeList);
      }

      // todo 1갱일때 기본값 설정
      // 다른거 선택시 선택 초기화

      return (
          <Form.Item
              key={item.id}
              label={item.displayName}
              name={item.columnName}
              rules={[{ required: true, message: `${item.displayName}를 선택하세요!` }]}
          >
            <Select placeholder={`선택하세요`}
                    onChange={handleSelectChange}
                    data-codegroup-id={item.codeGroupId}
            >
              {/* 옵션들이 data.list에서 올바르게 매핑되어 있어야 합니다
               selectedCodes에 선택된 코드 정보가 저장됩니다
               parentCodeGroupId가 있을 경우 의 commonCodeId가 parentCode인 commonCode만 보여집니다
               */}
              {codeList && codeList.map((option) => (
                  <Option key={option.id} value={option.id} data-codegroup-id={item.codeGroupId}>
                    {option.codeName}
                  </Option>
              ))}
            </Select>
          </Form.Item>
      );
    }
    // 다른 타입에 대한 처리 추가 가능
    return null;
  };

  return (
    <div style={{ padding: '24px', background: '#fff', borderRadius: '8px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>수주 등록</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >

        {standardInfoList.map(renderFormItem)}

        {/* Order Date */}
        {/*<Form.Item*/}
        {/*  label="수주일"*/}
        {/*  name="orderDate"*/}
        {/*  rules={[{ required: true, message: '수주일을 선택하세요!' }]}*/}
        {/*>*/}
        {/*  <DatePicker style={{ width: '100%' }} />*/}
        {/*</Form.Item>*/}

        {/* Status */}
        {/*<Form.Item*/}
        {/*  label="상태"*/}
        {/*  name="status"*/}
        {/*  rules={[{ required: true, message: '상태를 선택하세요!' }]}*/}
        {/*>*/}
        {/*  <Select placeholder="상태를 선택하세요">*/}
        {/*    <Option value="pending">진행 중</Option>*/}
        {/*    <Option value="completed">완료</Option>*/}
        {/*    <Option value="canceled">취소됨</Option>*/}
        {/*  </Select>*/}
        {/*</Form.Item>*/}

        {/* Buttons */}
        <Row gutter={16} justify="end">
          <Col>
            <Button onClick={handleReset}>초기화</Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit">등록</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default OrderInfoCreate;
