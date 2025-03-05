import { Button, Col, DatePicker, Flex, Form, Input, InputNumber, Row, Select } from "antd";
import { handleInputComponent } from "@components/inputForm/handleInputComponent";
import Link from "next/link";
import React from "react";

export const handleCopyModal = (selectKeysLength) => {
  return (
    <>
      <Flex align="center" justify="space-between">
        <p className="total-txt">
          선택 총 <strong>{selectKeysLength}</strong> 건
        </p>

        <Button type="link" className="btn-reset-txt">
          입력 초기화
        </Button>
      </Flex>

      <p className="modal-txt">복수의 수주 복제 시 수량을 꼭 확인하세요.</p>

      <Flex align="center" gap={4} className="tit-area">
        <p className="tit-type">복제 설정</p>
      </Flex>

      <Form layout="vertical" className="modal-input-area">
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item label="복제수량" name="num-input1">
              <InputNumber
                min={1}
                max={10}
                defaultValue={3}
                // onChange={onChange}
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="분류코드"
              tooltip={
                <>
                  제조2팀 (0) <br />
                  R&D혁신센터 (1) <br />
                  제조2팀 (2)
                </>
              }
            >
              <Select
                defaultValue="groupCode1"
                // onChange={handleChange}
                options={[
                  {
                    value: "groupCode1",
                    label: "0",
                  },
                  {
                    value: "groupCode2",
                    label: "1",
                  },
                  {
                    value: "groupCode3",
                    label: "2",
                  },
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label={<Link href={"/"}>납품계획일</Link>}
              name="input4"
            >
              <DatePicker
                // onChange={onChange}
                          placeholder="날짜 선택" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="출고종류">
              <Select
                defaultValue="release1"
                // onChange={handleChange}
                options={[
                  {
                    value: "release1",
                    label: "제품 매출",
                  },
                  {
                    value: "release2",
                    label: "수리 (유상)",
                  },
                  {
                    value: "release3",
                    label: "수리 (무상)",
                  },
                  {
                    value: "release4",
                    label: "DEMO (유상)",
                  },
                  {
                    value: "release5",
                    label: "DEMO (무상)",
                  },
                  {
                    value: "release6",
                    label: "CS 대체품",
                  },
                  {
                    value: "release7",
                    label: "STOCK (CS)",
                  },
                  {
                    value: "release8",
                    label: "STOCK (양산)",
                  },
                  {
                    value: "release9",
                    label: "사내활용",
                  },
                  {
                    value: "release10",
                    label: "ETC",
                  },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="P/O 번호" name="po_num">
              <Input placeholder="미해당 시 비워두세요" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="프로젝트 번호" name="project_num">
              <Input placeholder="미해당 시 비워두세요" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}