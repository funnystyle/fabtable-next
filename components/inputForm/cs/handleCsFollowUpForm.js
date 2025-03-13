import {Button, DatePicker, Flex, Form, Input, Radio, Tooltip, Typography} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";
import React from "react";
import Link from "next/link";
import dayjs from "dayjs";

const {Title} = Typography;

export const handleCsFollowUpForm = (form, keys, setKeys, checkedKeySet, setCheckedKeySet, isCommon, setIsCommon, index) => {

  const handleSetToday = (e, fieldName) => {
    e.preventDefault(); // 기본 동작 방지
    console.log("fieldName", fieldName);
    form.setFieldValue(fieldName, dayjs()); // 오늘 날짜로 설정
  };

  const handleReset = () => {
    form.resetFields([
      `ox1-${index + 1}`,
      `ox2-${index + 1}`,
      `analyzeDate-${index + 1}`,
      `analyzeDate2-${index + 1}`,
      `analyzeDate3-${index + 1}`,
      `tat-${index + 1}`,
      `etc2-${index + 1}`
    ]);
  }


  return (

    <div className="info-input-box" key={`cs-follow-up-${index}`}>
      <Flex
        align="center"
        gap={12}
        justify="space-between"
        className="title-area"
      >
        <Flex align="center" gap={4}>
          <Title
            level={4}
            className="title-bullet"
            style={{
              marginBottom: "0",
            }}
          >
            {isCommon ? "공통" : `제품 ${index + 1}`}
          </Title>

          {isCommon && (
            <>
              <Tooltip title="CS 넘버 내에 속한 모든 제품에 동일한 내용이 적용됩니다.">
                <InfoCircleOutlined/>
              </Tooltip>

              <p className="total-num">
                총 <strong>{keys.length}</strong>개 제품에 동일하게 적용
              </p>
            </>
          )}
        </Flex>

        <Button type="text" className="btn-all-reset"
                onClick={() => handleReset()}
        >
          초기화
        </Button>
      </Flex>

      <Form form={form} layout="vertical" className="info-input-area flex-w-none">
        <Flex gap={4}>
          <Form.Item label="원인분석 요청" name={`ox1-${index + 1}`}>
            <Radio.Group>
              <Radio value="o1">O</Radio>
              <Radio value="x1">X</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="긴급" name={`ox2-${index + 1}`}>
            <Radio.Group>
              <Radio value="o2">O</Radio>
              <Radio value="x2">X</Radio>
            </Radio.Group>
          </Form.Item>

          <Flex gap={4} align="center" className="action-info">
            <Form.Item
              label={
                <Link href={"/"} onClick={(e) => handleSetToday(e, `analyzeDate-${index + 1}`)}>
                  분석 요청일
                </Link>
              }
              name={`analyzeDate-${index + 1}`}
            >
              <DatePicker
                placeholder="날짜 선택"
              />
            </Form.Item>

            <Form.Item
              label={<Link href={"/"} onClick={(e) => handleSetToday(e, `analyzeDate2-${index + 1}`)}>분석 납기일</Link>}
              name={`analyzeDate2-${index + 1}`}
            >
              <DatePicker
                placeholder="날짜 선택"
              />
            </Form.Item>

            <Form.Item
              label={<Link href={"/"} onClick={(e) => handleSetToday(e, `analyzeDate3-${index + 1}`)}>분석 완료일</Link>}
              name={`analyzeDate3-${index + 1}`}
            >
              <DatePicker
                placeholder="날짜 선택"
              />
            </Form.Item>

            <Form.Item
              label="TAT"
              name={`tat-${index + 1}`}
              tooltip={
                <span>
														경과일 자동 계산 <br/>
														(분석 완료일 - 분석 요청일)
													</span>
              }
            >
              <Input placeholder="-"/>
            </Form.Item>

            <Form.Item label="기타" name={`etc2-${index + 1}`}>
              <Input placeholder="-"/>
            </Form.Item>
          </Flex>
        </Flex>
      </Form>
    </div>

  );
}