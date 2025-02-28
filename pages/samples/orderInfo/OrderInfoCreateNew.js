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


  const mySet = new Set(); // 빈 Set 생성
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

    let newSelectedCodes = [...selectedCodes];

    // 상위 코드가 변경될 경우, 기존에 선택된 해당 그룹의 하위 코드 삭제
    newSelectedCodes = newSelectedCodes.filter(
      (item) => !childRelations.some(child => child.id === item.codeGroupId) // 하위 코드와 연결된 기존 선택 항목 제거
    );

    // 기존에 선택된 코드가 있으면 업데이트, 없으면 추가
    const index = newSelectedCodes.findIndex((item) => item.codeGroupId === codeGroupId);
    if (index !== -1) {
      newSelectedCodes[index] = { codeGroupId, commonCodeId: codeId, childRelations };
    } else {
      newSelectedCodes.push({ codeGroupId, commonCodeId: codeId, childRelations });
    }

    setSelectedCodes(newSelectedCodes);


    const formValues = form.getFieldsValue(); // 현재 폼의 모든 필드 값 가져오기
    Object.keys(formValues).filter((name) => {
      mySet.forEach((item) => {
        childRelations.forEach((relation) => {
          if (relation.id === item.codeGroupId && item.name === name) {
            form.resetFields([name]);
          }
        });
      });
    });
  };

  const handleCodeListFilter = (item) => {
    let codeList = [];
    for (let i = 0; i < item.codeList.length; i++) {
      const code = item.codeList[i];

      if (code.parentRelations == null && code.parentRelations.length <= 0) { // 최상위 코드일 경우 바로 입력
        codeList.push(code);
      } else { // 자식코드일 경우 선택된 코드에 따라 필터링
        // selectedCodes에서 현재 코드의 부모 코드의 관계에 속하는 모든 codeGroupId를 필터링
        const filteredSelectedCodeGroupIds = selectedCodes
          .map(selectedCode => selectedCode.codeGroupId)
          .filter(codeGroupId => code.parentRelations.some(relation => relation.id === codeGroupId));

        // 부모 코드들에 대한 선택된 값 리스트
        const parentSelectedCodes = selectedCodes
          .filter(selectedCode => filteredSelectedCodeGroupIds.includes(selectedCode.codeGroupId))
          .map(selectedCode => selectedCode.commonCodeId);

        // 하나라도 부모 코드 관계에 해당하면 추가
        const isChildRelation = parentSelectedCodes.every(parentSelectedCode =>
          code.parentRelations.some(relation =>
            relation.relations.some(rel => rel.parentCodeId === parentSelectedCode)
          )
        );

        if (isChildRelation) {
          codeList.push(code);
        }
      }
    }

    return codeList;
  }

  const renderFormItem = (item) => {

    // 'CODE' 타입 처리
    if (item.connectionDiv === 'CODE' && item.formDiv === 'SELECT') {

      const codeList = handleCodeListFilter(item);

      mySet.add({ codeGroupId: item.codeGroupId, name: item.name });

      if (codeList.length === 0) {
        form.resetFields([item.name]);
      }

      return (
          <Form.Item
              key={item.id}
              label={item.displayName}
              name={item.name}
              // rules={[{ required: true, message: `${item.displayName}를 선택하세요!` }]}
          >
            {codeList.length === 0 ? (
              // ✅ codeList가 비어있을 때: 비활성화된 Select
              <Select placeholder="선택할 옵션이 없습니다." disabled={true} />
            ) : (
              <Select
                placeholder="선택하세요"
                onChange={handleSelectChange}
                data-codegroup-id={item.codeGroupId}
                defaultValue={
                codeList.length === 1 ? codeList[0].codeName : undefined
                }

                options={
                  codeList
                    ? codeList.map(option => ({
                        value: option.codeName,
                        label: option.codeName,
                        'data-codegroup-id': item.codeGroupId,
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

    if (item.connectionDiv === 'NONE' && item.formDiv === 'STRING') {
      console.log("item", item);
      return (
        <Form.Item
          key={item.id}
          label={item.displayName}
          name={item.name}
          // rules={[{ required: true, message: `${item.displayName}를 입력하세요!` }]}
        >
          <Input placeholder={`${item.displayName || '값을 입력하세요'}`} />
        </Form.Item>
      );
    }

    if (item.connectionDiv === 'NONE' && item.formDiv === 'DATE') {
      return (
        <Form.Item
          key={item.id}
          label={item.displayName}
          name={item.name}
        >
          <DatePicker style={{ width: '100%' }} />
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
