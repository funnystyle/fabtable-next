// components/OrderInfoCreateNew.tsx
import React from 'react';
import { Form, Input, DatePicker, Select, Button, Row, Col, message, Radio, Checkbox } from 'antd';
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAxios, postAxios } from "@api/apiClient";

const { Option } = Select;

const OrderInfoCreateNew = () => {
  const [form] = Form.useForm();

  const [columnList, setColumnList] = useState([]);
  const [queryKey, setQueryKey] = useState(["standardInfoResponse", Math.random()]);
  const { data:columnResponse, isLoading, isSuccess, isError } = useQuery({
    queryKey,
    queryFn: () => getAxios("/user/record-column", {}),
  });

  useEffect(() => {
    if (isSuccess) {
      console.log("columnResponse : ", columnResponse);
      setColumnList(columnResponse.data.list);
    }
  }, [isSuccess]);

  const { mutate: orderInfoCreate } = useMutation({
    mutationKey: "orderInfoCreate",
    mutationFn: (values) => postAxios("/admin/order-info", values),
  });

  const handleSubmit = async (values) => {
    columnList.forEach((item) => {
      if (item.formDiv === 'DATE' && values[item.columnName]) {
        values[item.columnName] = values[item.columnName].format('YYYY-MM-DD');
      }
    });



    await orderInfoCreate(values);
    message.success('수주 등록이 완료되었습니다!');

    // 같은 폴더의 OrderInfoList로 이동
    window.location.href = "/samples/orderInfo/OrderInfoListAntd";

  };

  const handleReset = () => {
    form.resetFields();
  };



  const [selectedCodes, setSelectedCodes] = useState([]); // 선택된 코드 상태 저장

  // 선택된 코드 정보를 갱신하는 함수
  const handleSelectChange = (value, option) => {

    const codeGroupId = option?.props['data-codegroup-id'];  // codeGroupId를 추출
    const codeId = option?.props['data-id'];  // codeId를 추출
    const childRelations = JSON.parse(option?.props['data-child-relations']);  // childRelations를 추출

    const newSelectedCodes = [...selectedCodes];

    // 이미 선택된 코드가 있으면 업데이트, 없으면 추가
    const index = newSelectedCodes.findIndex(
        (item) => item.codeGroupId === codeGroupId
    );
    if (index !== -1) {
      newSelectedCodes[index] = { codeGroupId, commonCodeId: codeId, childRelations };
    } else {
      newSelectedCodes.push({ codeGroupId, commonCodeId: codeId, childRelations });
    }

    setSelectedCodes(newSelectedCodes);

    console.log("newSelectedCodes : ", newSelectedCodes);
  };

  const handleRadioChange = (e) => {

    console.log('e:', e);
    console.log('e.target:', e.target);
    console.log('e.target.data-codegroup-id:', e.target['data-codegroup-id']);

    const value = e.target.value;
    const codeGroupId = e.target['data-codegroup-id'];  // codeGroupId를 추출
    const childRelations = JSON.parse(e.target['data-child-relations']);  // childRelations를 추출
    const newSelectedCodes = [...selectedCodes];

    // 이미 선택된 코드가 있으면 업데이트, 없으면 추가
    const index = newSelectedCodes.findIndex(
      (item) => item.codeGroupId === codeGroupId
    );
    if (index !== -1) {
      newSelectedCodes[index] = { codeGroupId, commonCodeId: value, childRelations };
    } else {
      newSelectedCodes.push({ codeGroupId, commonCodeId: value, childRelations });
    }

    setSelectedCodes(newSelectedCodes);
  };

  const renderFormItem = (item) => {

    console.log(item);
    // 'CODE' 타입 처리
    if (item.connectionDiv === 'CODE' && item.formDiv === 'SELECT') {

      let codeList = item.codeList;

      for (let i = 0; i < item.codeList.length; i++) {
        const code = item.codeList[i];

        if (code.parentRelations && code.parentRelations.length > 0) {
          // selectedCodes에서 codeGroupId만 추출하여 리스트로 만듦
          const selectedCodeGroupIds = selectedCodes.map(selectedCode => selectedCode.codeGroupId);

          // selectedCodeGroupIds 배열을 기준으로 필터링
          const filteredSelectedCodeGroupIds = selectedCodeGroupIds.filter(codeGroupId =>
            code.parentRelations.some(relation => relation.id === codeGroupId)
          );

          // filteredSelectedCodeGroupIds에 포함된 codeGroupId에 대해
          // 각 selectedCode에서 childRelations 중 code.codeGroupId와 일치하는 것을 찾기
          const filteredSelectedCodeChildRelations = selectedCodes.filter(selectedCode =>
            filteredSelectedCodeGroupIds.includes(selectedCode.codeGroupId)
          ).map(selectedCode => selectedCode.childRelations.filter(childRelation => childRelation.id === item.codeGroupId));

          console.log("filteredSelectedCodeChildRelations : ", filteredSelectedCodeChildRelations);
        }
      }



      return (
          <Form.Item
              key={item.id}
              label={item.displayName}
              name={item.name}
              // rules={[{ required: true, message: `${item.displayName}를 선택하세요!` }]}
          >
            <Select
              placeholder="선택하세요"
              onChange={handleSelectChange}
              data-codegroup-id={item.codeGroupId}

              // disabled={codeList && codeList.length === 1}
              defaultValue={
                codeList && codeList.length === 1
                  ? codeList[0].codeName
                  : undefined
              }
              options={
                codeList
                  ? codeList.map(option => ({
                      value: option.codeName,
                      label: option.codeName,
                      'data-codegroup-id': item.codeGroupId,
                      'data-id': option.id,
                      'data-child-relations' : JSON.stringify(option.childRelations)
                    }))
                  : []
              }
            />
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

        {columnList.map(renderFormItem)}

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

export default OrderInfoCreateNew;
