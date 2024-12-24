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
